const express = require("express");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2/promise");
const multer = require("multer");

const app = express();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "rust_lapa",
  dateStrings: true
});

const storage = multer.diskStorage({
  destination: path.join(__dirname, "img", "galerija"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname).toLowerCase());
  }
});
const upload = multer({ storage });
const saturs = JSON.parse(fs.readFileSync(path.join(__dirname, "saturs.json"), "utf8"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/img", express.static(path.join(__dirname, "img")));

const lapas = ["index", "description", "content", "news", "gallery", "search", "admin"];
lapas.forEach((lapa) => {
  app.get(`/${lapa}.html`, (req, res) => res.sendFile(path.join(__dirname, `${lapa}.html`)));
});
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/style.css", (req, res) => res.sendFile(path.join(__dirname, "style.css")));

app.get("/api/game", async function (req, res, next) {
  const [rows] = await pool.query("SELECT * FROM par_speli LIMIT 1");
  res.json(rows[0] || null);
});

app.put("/api/game", async function (req, res, next) {
  const b = req.body;
  await pool.query(
    "UPDATE par_speli SET izstradatajs = ?, izdevejs = ?, zanrs = ?, izdosanas_gads = ?, platforma = ?, apraksts = ?, galvenais_attels = ? WHERE id = ?",
    [b.izstradatajs, b.izdevejs, b.zanrs, b.izdosanas_gads, b.platforma, b.apraksts, b.galvenais_attels, 1]
  );
  res.json({ ok: true });
});

app.get("/api/news", async function (req, res, next) {
  const [rows] = await pool.query("SELECT * FROM zinas ORDER BY publicesanas_datums DESC");
  res.json(rows);
});

app.post("/api/news", async function (req, res, next) {
  const b = req.body;
  const [r] = await pool.query(
    "INSERT INTO zinas (spele_id, kategorija, virsraksts, iss_apraksts, pilns_saturs, attels, publicesanas_datums) VALUES (1, ?, ?, ?, ?, ?, ?)",
    [b.kategorija, b.virsraksts, b.iss_apraksts, b.pilns_saturs, b.attels || "", b.publicesanas_datums]
  );
  res.json({ id: r.insertId });
});

app.put("/api/news/:id", async function (req, res, next) {
  const b = req.body;
  await pool.query(
    "UPDATE zinas SET kategorija = ?, virsraksts = ?, iss_apraksts = ?, pilns_saturs = ?, attels = ?, publicesanas_datums = ? WHERE id = ?",
    [b.kategorija, b.virsraksts, b.iss_apraksts, b.pilns_saturs, b.attels || "", b.publicesanas_datums, req.params.id]
  );
  res.json({ ok: true });
});

app.delete("/api/news/:id", async function (req, res, next) {
  await pool.query("DELETE FROM zinas WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
});

app.get("/api/gallery", async function (req, res, next) {
  const [rows] = await pool.query("SELECT * FROM galerija ORDER BY id");
  res.json(rows);
});

app.post("/api/gallery", upload.single("attels"), async function (req, res, next) {
  if (!req.file) return res.status(400).json({ error: "Nav fails" });
  const cels = "img/galerija/" + req.file.filename;
  const [r] = await pool.query(
    "INSERT INTO galerija (spele_id, attela_cels, nosaukums, apraksts) VALUES (1, ?, ?, ?)",
    [cels, req.body.nosaukums, req.body.apraksts]
  );
  res.json({ id: r.insertId, attela_cels: cels });
});

app.delete("/api/gallery/:id", async function (req, res, next) {
  const [rows] = await pool.query("SELECT attela_cels FROM galerija WHERE id = ?", [req.params.id]);
  await pool.query("DELETE FROM galerija WHERE id = ?", [req.params.id]);
  if (rows[0]) fs.unlink(path.join(__dirname, rows[0].attela_cels), function () {});
  res.json({ ok: true });
});

app.get("/api/saturs", function (req, res) {
  res.json(saturs);
});

app.get("/api/saturs/:id", function (req, res) {
  var i = 0;
  var ieraksts = null;
  while (i < saturs.length) {
    if (saturs[i].id == req.params.id) {
      ieraksts = saturs[i];
      break;
    }
    i = i + 1;
  }
  if (ieraksts) res.json(ieraksts);
  else res.status(404).json({ error: "Nav atrasts" });
});

app.get("/api/search", async function (req, res, next) {
  var q = req.query.q || "";
  if (q === "") return res.json({ zinas: [], saturs: [] });
  var [zinas] = await pool.query(
    "SELECT * FROM zinas WHERE virsraksts LIKE ? OR iss_apraksts LIKE ? OR pilns_saturs LIKE ?",
    ["%" + q + "%", "%" + q + "%", "%" + q + "%"]
  );
  var atrasts = [];
  var i = 0;
  var q2 = q.toLowerCase();
  while (i < saturs.length) {
    if ((saturs[i].nosaukums + " " + saturs[i].apraksts).toLowerCase().indexOf(q2) !== -1) {
      atrasts.push(saturs[i]);
    }
    i = i + 1;
  }
  res.json({ zinas: zinas, saturs: atrasts });
});

app.use((req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ error: "Nav atrasts" });
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Servera kļūda" });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
