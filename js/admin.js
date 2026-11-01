var forma = document.getElementById("zinas-forma");
var poga = document.getElementById("zinas-poga");
var atceltPoga = document.getElementById("atcelt-poga");
var spelesForma = document.getElementById("speles-forma");
var zinas = [];

function escapeHtml(teksts) {
  return String(teksts)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function paraditPazinojumu(id, teksts, kluda) {
  var vieta = document.getElementById(id);
  vieta.style.color = kluda ? "red" : "green";
  vieta.textContent = teksts;
}

async function ieladetSpeli() {
  var atbilde = await fetch("/api/game");
  var spele = await atbilde.json();
  if (!spele) return;
  document.getElementById("speles-izstradatajs").value = spele.izstradatajs || "";
  document.getElementById("speles-izdevejs").value = spele.izdevejs || "";
  document.getElementById("speles-zanrs").value = spele.zanrs || "";
  document.getElementById("speles-izdosanas-gads").value = spele.izdosanas_gads || "";
  document.getElementById("speles-platforma").value = spele.platforma || "";
  document.getElementById("speles-apraksts").value = spele.apraksts || "";
  document.getElementById("speles-galvenais-attels").value = spele.galvenais_attels || "";
}

spelesForma.addEventListener("submit", async function (event) {
  event.preventDefault();
  var dati = {
    izstradatajs: document.getElementById("speles-izstradatajs").value,
    izdevejs: document.getElementById("speles-izdevejs").value,
    zanrs: document.getElementById("speles-zanrs").value,
    izdosanas_gads: document.getElementById("speles-izdosanas-gads").value,
    platforma: document.getElementById("speles-platforma").value,
    apraksts: document.getElementById("speles-apraksts").value,
    galvenais_attels: document.getElementById("speles-galvenais-attels").value
  };
  var atbilde = await fetch("/api/game", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dati)
  });
  if (!atbilde.ok) {
    var kluda = await atbilde.json();
    paraditPazinojumu("speles-pazinojums", kluda.error, true);
    return;
  }
  paraditPazinojumu("speles-pazinojums", "Saglabāts", false);
  setTimeout(function () {
    document.getElementById("speles-pazinojums").textContent = "";
  }, 2000);
});

async function ieladetZinas() {
  var atbilde = await fetch("/api/news");
  zinas = await atbilde.json();
  var rindas = zinas.map(function (z) {
    return '<div class="ieraksts"><strong>' + escapeHtml(z.virsraksts) +
      '</strong> <small>(' + escapeHtml(z.kategorija) + ')</small><br>' +
      '<button class="dzest-poga" onclick="labot(' + z.id + ')">Labot</button> ' +
      '<button class="dzest-poga" onclick="dzestZinu(' + z.id + ')">Dzēst</button></div>';
  });
  var html = rindas.join("");
  if (html === "") html = "<p>Nav ziņu.</p>";
  document.getElementById("zinu-saraksts").innerHTML = html;
}

forma.addEventListener("submit", async function (event) {
  event.preventDefault();
  var id = document.getElementById("zinas-id").value;
  var dati = {
    kategorija: document.getElementById("kategorija").value,
    virsraksts: document.getElementById("virsraksts").value,
    iss_apraksts: document.getElementById("iss_apraksts").value,
    pilns_saturs: document.getElementById("pilns_saturs").value,
    attels: document.getElementById("attels").value,
    publicesanas_datums: document.getElementById("publicesanas_datums").value
  };
  var atbilde = await fetch(id ? "/api/news/" + id : "/api/news", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dati)
  });
  if (!atbilde.ok) {
    var kluda = await atbilde.json();
    paraditPazinojumu("zinas-pazinojums", kluda.error, true);
    return;
  }
  document.getElementById("zinas-pazinojums").textContent = "";
  forma.reset();
  document.getElementById("zinas-id").value = "";
  poga.textContent = "Pievienot";
  atceltPoga.hidden = true;
  ieladetZinas();
});

function labot(id) {
  var atrasta = zinas.find(function (z) {
    return z.id == id;
  });
  if (!atrasta) return;
  document.getElementById("zinas-id").value = atrasta.id;
  document.getElementById("kategorija").value = atrasta.kategorija;
  document.getElementById("virsraksts").value = atrasta.virsraksts;
  document.getElementById("iss_apraksts").value = atrasta.iss_apraksts;
  document.getElementById("pilns_saturs").value = atrasta.pilns_saturs;
  document.getElementById("attels").value = atrasta.attels || "";
  document.getElementById("publicesanas_datums").value = atrasta.publicesanas_datums.slice(0, 10);
  poga.textContent = "Saglabāt";
  atceltPoga.hidden = false;
  window.scrollTo(0, 0);
}

atceltPoga.addEventListener("click", function () {
  forma.reset();
  document.getElementById("zinas-id").value = "";
  poga.textContent = "Pievienot";
  atceltPoga.hidden = true;
});

async function dzestZinu(id) {
  if (!confirm("Dzēst?")) return;
  await fetch("/api/news/" + id, { method: "DELETE" });
  ieladetZinas();
}

document.getElementById("galerijas-forma").addEventListener("submit", async function (event) {
  event.preventDefault();
  var fd = new FormData();
  fd.append("attels", document.getElementById("galerijas-fails").files[0]);
  fd.append("nosaukums", document.getElementById("galerijas-nosaukums").value);
  fd.append("apraksts", document.getElementById("galerijas-apraksts").value);
  var atbilde = await fetch("/api/gallery", { method: "POST", body: fd });
  if (!atbilde.ok) {
    var kluda = await atbilde.json();
    paraditPazinojumu("galerijas-pazinojums", kluda.error, true);
    return;
  }
  document.getElementById("galerijas-pazinojums").textContent = "";
  event.target.reset();
  ieladetGaleriju();
});

async function ieladetGaleriju() {
  var atbilde = await fetch("/api/gallery");
  var atteli = await atbilde.json();
  var rindas = atteli.map(function (a) {
    return '<div class="ieraksts"><img src="' + escapeHtml(a.attela_cels) + '" alt="">' +
      '<strong>' + escapeHtml(a.nosaukums) + '</strong><br>' +
      '<button class="dzest-poga" onclick="dzestAttelu(' + a.id + ')">Dzēst</button></div>';
  });
  var html = rindas.join("");
  if (html === "") html = "<p>Nav attēlu.</p>";
  document.getElementById("galerijas-saraksts").innerHTML = html;
}

async function dzestAttelu(id) {
  if (!confirm("Dzēst?")) return;
  await fetch("/api/gallery/" + id, { method: "DELETE" });
  ieladetGaleriju();
}

ieladetSpeli();
ieladetZinas();
ieladetGaleriju();
