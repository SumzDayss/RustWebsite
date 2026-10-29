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
const atlautieTipi = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (atlautieTipi.indexOf(file.mimetype) === -1) {
      return cb(new Error("Atļauts augšupielādēt tikai JPEG, PNG, WEBP vai GIF attēlus"));
    }
    cb(null, true);
  }
});

function augsUpielade(req, res, next) {
  upload.single("attels")(req, res, function (kluda) {
    if (kluda) {
      if (kluda.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "Attēls ir pārāk liels (max 5 MB)" });
      }
      return res.status(400).json({ error: kluda.message });
    }
    next();
  });
}

const saturs = JSON.parse(fs.readFileSync(path.join(__dirname, "saturs.json"), "utf8"));

function irTukss(vertiba) {
  return vertiba === undefined || vertiba === null || String(vertiba).trim() === "";
}

function parbauditSpeli(b) {
  if (irTukss(b.izstradatajs)) return "Izstrādātājs ir obligāts";
  if (irTukss(b.izdevejs)) return "Izdevējs ir obligāts";
  if (irTukss(b.zanrs)) return "Žanrs ir obligāts";
  if (irTukss(b.izdosanas_gads)) return "Izdošanas gads ir obligāts";
  if (irTukss(b.platforma)) return "Platforma ir obligāta";
  if (irTukss(b.apraksts)) return "Apraksts ir obligāts";
  if (irTukss(b.galvenais_attels)) return "Galvenais attēls ir obligāts";
  if (String(b.izstradatajs).length > 100) return "Izstrādātājs ir pārāk garš (max 100)";
  if (String(b.izdevejs).length > 100) return "Izdevējs ir pārāk garš (max 100)";
  if (String(b.zanrs).length > 50) return "Žanrs ir pārāk garš (max 50)";
  if (String(b.platforma).length > 50) return "Platforma ir pārāk gara (max 50)";
  if (String(b.galvenais_attels).length > 255) return "Galvenā attēla ceļš ir pārāk garš (max 255)";
  var gads = Number(b.izdosanas_gads);
  if (!Number.isInteger(gads) || gads < 1901 || gads > 2155) return "Izdošanas gads nav derīgs";
  return null;
}

function parbauditGaleriju(b) {
  if (irTukss(b.nosaukums)) return "Nosaukums ir obligāts";
  if (irTukss(b.apraksts)) return "Apraksts ir obligāts";
  if (String(b.nosaukums).length > 100) return "Nosaukums ir pārāk garš (max 100)";
  if (String(b.apraksts).length > 255) return "Apraksts ir pārāk garš (max 255)";
  return null;
}

function parbauditZinu(b) {
  if (irTukss(b.kategorija)) return "Kategorija ir obligāta";
  if (irTukss(b.virsraksts)) return "Virsraksts ir obligāts";
  if (irTukss(b.iss_apraksts)) return "Īsais apraksts ir obligāts";
  if (irTukss(b.pilns_saturs)) return "Pilns saturs ir obligāts";
  if (irTukss(b.publicesanas_datums)) return "Publicēšanas datums ir obligāts";
  if (String(b.kategorija).length > 50) return "Kategorija ir pārāk gara (max 50)";
  if (String(b.virsraksts).length > 150) return "Virsraksts ir pārāk garš (max 150)";
  if (String(b.iss_apraksts).length > 255) return "Īsais apraksts ir pārāk garš (max 255)";
  if (b.attels && String(b.attels).length > 255) return "Attēla ceļš ir pārāk garš (max 255)";
  var datums = String(b.publicesanas_datums);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datums)) return "Datuma formātam jābūt YYYY-MM-DD";
  var gads = Number(datums.slice(0, 4));
  var menesis = Number(datums.slice(5, 7));
  var diena = Number(datums.slice(8, 10));
  var parbaude = new Date(gads, menesis - 1, diena);
  if (parbaude.getFullYear() !== gads || parbaude.getMonth() !== menesis - 1 || parbaude.getDate() !== diena) {
    return "Datums nav derīgs";
  }
  return null;
}

async function dzestAtteluFailu(cels) {
  if (!cels) return;
  if (cels.indexOf("img/galerija/") !== 0 || cels.indexOf("..") !== -1) return;
  const [zinas] = await pool.query("SELECT COUNT(*) AS skaits FROM zinas WHERE attels = ?", [cels]);
  const [galerija] = await pool.query("SELECT COUNT(*) AS skaits FROM galerija WHERE attela_cels = ?", [cels]);
  const [spele] = await pool.query("SELECT COUNT(*) AS skaits FROM par_speli WHERE galvenais_attels = ?", [cels]);
  var skaits = Number(zinas[0].skaits) + Number(galerija[0].skaits) + Number(spele[0].skaits);
  if (skaits === 0) {
    fs.unlink(path.join(__dirname, cels), function () {});
  }
}

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
  var kluda = parbauditSpeli(b);
  if (kluda) return res.status(400).json({ error: kluda });
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
  var kluda = parbauditZinu(b);
  if (kluda) return res.status(400).json({ error: kluda });
  const [r] = await pool.query(
    "INSERT INTO zinas (spele_id, kategorija, virsraksts, iss_apraksts, pilns_saturs, attels, publicesanas_datums) VALUES (1, ?, ?, ?, ?, ?, ?)",
    [b.kategorija, b.virsraksts, b.iss_apraksts, b.pilns_saturs, b.attels || "", b.publicesanas_datums]
  );
  res.json({ id: r.insertId });
});

app.put("/api/news/:id", async function (req, res, next) {
  const b = req.body;
  var kluda = parbauditZinu(b);
  if (kluda) return res.status(400).json({ error: kluda });
  const [veci] = await pool.query("SELECT attels FROM zinas WHERE id = ?", [req.params.id]);
  await pool.query(
    "UPDATE zinas SET kategorija = ?, virsraksts = ?, iss_apraksts = ?, pilns_saturs = ?, attels = ?, publicesanas_datums = ? WHERE id = ?",
    [b.kategorija, b.virsraksts, b.iss_apraksts, b.pilns_saturs, b.attels || "", b.publicesanas_datums, req.params.id]
  );
  if (veci[0] && veci[0].attels && veci[0].attels !== (b.attels || "")) {
    await dzestAtteluFailu(veci[0].attels);
  }
  res.json({ ok: true });
});

app.delete("/api/news/:id", async function (req, res, next) {
  const [rows] = await pool.query("SELECT attels FROM zinas WHERE id = ?", [req.params.id]);
  await pool.query("DELETE FROM zinas WHERE id = ?", [req.params.id]);
  if (rows[0]) await dzestAtteluFailu(rows[0].attels);
  res.json({ ok: true });
});

app.get("/api/gallery", async function (req, res, next) {
  const [rows] = await pool.query("SELECT * FROM galerija ORDER BY id");
  res.json(rows);
});

app.post("/api/gallery", augsUpielade, async function (req, res, next) {
  if (!req.file) return res.status(400).json({ error: "Nav fails" });
  var kluda = parbauditGaleriju(req.body);
  if (kluda) return res.status(400).json({ error: kluda });
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
  if (rows[0]) await dzestAtteluFailu(rows[0].attela_cels);
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
