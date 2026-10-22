var forma = document.getElementById("zinas-forma");
var poga = document.getElementById("zinas-poga");
var atceltPoga = document.getElementById("atcelt-poga");

function ieladetZinas() {
  fetch("/api/news").then(function (r) { return r.json(); }).then(function (zinas) {
    document.getElementById("zinu-saraksts").innerHTML = zinas.map(function (z) {
      return "<div class=\"ieraksts\">" +
        "<strong>" + z.virsraksts + "</strong> <small>(" + z.kategorija + ")</small><br>" +
        "<button class=\"dzest-poga\" onclick=\"labot(" + z.id + ")\">Labot</button> " +
        "<button class=\"dzest-poga\" onclick=\"dzestZinu(" + z.id + ")\">Dzēst</button>" +
        "</div>";
    }).join("") || "<p>Nav ziņu.</p>";
  });
}

forma.addEventListener("submit", function (e) {
  e.preventDefault();
  var id = document.getElementById("zinas-id").value;
  var dati = {
    kategorija: document.getElementById("kategorija").value,
    virsraksts: document.getElementById("virsraksts").value,
    iss_apraksts: document.getElementById("iss_apraksts").value,
    pilns_saturs: document.getElementById("pilns_saturs").value,
    attels: document.getElementById("attels").value,
    publicesanas_datums: document.getElementById("publicesanas_datums").value
  };
  var url = id ? "/api/news/" + id : "/api/news";
  var metode = id ? "PUT" : "POST";

  fetch(url, {
    method: metode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dati)
  }).then(function () {
    forma.reset();
    document.getElementById("zinas-id").value = "";
    poga.textContent = "Pievienot";
    atceltPoga.hidden = true;
    ieladetZinas();
  });
});

function labot(id) {
  fetch("/api/news").then(function (r) { return r.json(); }).then(function (zinas) {
    var z = zinas.find(function (x) { return x.id === id; });
    if (!z) return;
    document.getElementById("zinas-id").value = z.id;
    document.getElementById("kategorija").value = z.kategorija;
    document.getElementById("virsraksts").value = z.virsraksts;
    document.getElementById("iss_apraksts").value = z.iss_apraksts;
    document.getElementById("pilns_saturs").value = z.pilns_saturs;
    document.getElementById("attels").value = z.attels || "";
    document.getElementById("publicesanas_datums").value = z.publicesanas_datums.slice(0, 10);
    poga.textContent = "Saglabāt";
    atceltPoga.hidden = false;
    window.scrollTo(0, 0);
  });
}

atceltPoga.addEventListener("click", function () {
  forma.reset();
  document.getElementById("zinas-id").value = "";
  poga.textContent = "Pievienot";
  atceltPoga.hidden = true;
});

function dzestZinu(id) {
  if (!confirm("Dzēst?")) return;
  fetch("/api/news/" + id, { method: "DELETE" }).then(ieladetZinas);
}

document.getElementById("galerijas-forma").addEventListener("submit", function (e) {
  e.preventDefault();
  var fd = new FormData();
  fd.append("attels", document.getElementById("galerijas-fails").files[0]);
  fd.append("nosaukums", document.getElementById("galerijas-nosaukums").value);
  fd.append("apraksts", document.getElementById("galerijas-apraksts").value);

  fetch("/api/gallery", { method: "POST", body: fd }).then(function () {
    e.target.reset();
    ieladetGaleriju();
  });
});

function ieladetGaleriju() {
  fetch("/api/gallery").then(function (r) { return r.json(); }).then(function (atteli) {
    document.getElementById("galerijas-saraksts").innerHTML = atteli.map(function (a) {
      return "<div class=\"ieraksts\">" +
        "<img src=\"" + a.attela_cels + "\" alt=\"\">" +
        "<strong>" + a.nosaukums + "</strong><br>" +
        "<button class=\"dzest-poga\" onclick=\"dzestAttelu(" + a.id + ")\">Dzēst</button>" +
        "</div>";
    }).join("") || "<p>Nav attēlu.</p>";
  });
}

function dzestAttelu(id) {
  if (!confirm("Dzēst?")) return;
  fetch("/api/gallery/" + id, { method: "DELETE" }).then(ieladetGaleriju);
}

ieladetZinas();
ieladetGaleriju();
