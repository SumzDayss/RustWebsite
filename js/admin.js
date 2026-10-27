var forma = document.getElementById("zinas-forma");
var poga = document.getElementById("zinas-poga");
var atceltPoga = document.getElementById("atcelt-poga");
var zinas = [];
var spelesForma = document.getElementById("speles-forma");

function ieladetSpeli() {
  if (!spelesForma) return;
  fetch("/api/game")
    .then(function (response) {
      return response.json();
    })
    .then(function (spele) {
      if (!spele) return;
      document.getElementById("speles-izstradatajs").value = spele.izstradatajs || "";
      document.getElementById("speles-izdevejs").value = spele.izdevejs || "";
      document.getElementById("speles-zanrs").value = spele.zanrs || "";
      document.getElementById("speles-izdosanas-gads").value = spele.izdosanas_gads || "";
      document.getElementById("speles-platforma").value = spele.platforma || "";
      document.getElementById("speles-apraksts").value = spele.apraksts || "";
      document.getElementById("speles-galvenais-attels").value = spele.galvenais_attels || "";
    });
}

if (spelesForma) {
  spelesForma.addEventListener("submit", function (event) {
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
    fetch("/api/game", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dati)
    }).then(function () {
      var pazi = document.getElementById("speles-pazinojums");
      if (pazi) {
        pazi.textContent = "Saglabāts";
        setTimeout(function () {
          pazi.textContent = "";
        }, 2000);
      }
    });
  });
}

function ieladetZinas() {
  fetch("/api/news")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      zinas = data;
      var html = "";
      var i = 0;
      while (i < zinas.length) {
        var z = zinas[i];
        html += "<div class=\"ieraksts\"><strong>" + z.virsraksts + "</strong> <small>(" + z.kategorija + ")</small><br><button class=\"dzest-poga\" onclick=\"labot(" + z.id + ")\">Labot</button> <button class=\"dzest-poga\" onclick=\"dzestZinu(" + z.id + ")\">Dzēst</button></div>";
        i = i + 1;
      }
      if (html == "") html = "<p>Nav ziņu.</p>";
      document.getElementById("zinu-saraksts").innerHTML = html;
    });
}

forma.addEventListener("submit", function (event) {
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

  var url = "/api/news";
  var metode = "POST";

  if (id) {
    url = "/api/news/" + id;
    metode = "PUT";
  }

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
  var i = 0;
  var atrasta = null;
  while (i < zinas.length) {
    if (zinas[i].id == id) {
      atrasta = zinas[i];
      break;
    }
    i = i + 1;
  }
  if (atrasta == null) return;

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

function dzestZinu(id) {
  if (confirm("Dzēst?")) {
    fetch("/api/news/" + id, { method: "DELETE" }).then(function () {
      ieladetZinas();
    });
  }
}

document.getElementById("galerijas-forma").addEventListener("submit", function (event) {
  event.preventDefault();

  var fd = new FormData();
  fd.append("attels", document.getElementById("galerijas-fails").files[0]);
  fd.append("nosaukums", document.getElementById("galerijas-nosaukums").value);
  fd.append("apraksts", document.getElementById("galerijas-apraksts").value);

  fetch("/api/gallery", { method: "POST", body: fd }).then(function () {
    event.target.reset();
    ieladetGaleriju();
  });
});

function ieladetGaleriju() {
  fetch("/api/gallery")
    .then(function (response) {
      return response.json();
    })
    .then(function (atteli) {
      var html = "";
      var i = 0;
      while (i < atteli.length) {
        var a = atteli[i];
        html += "<div class=\"ieraksts\"><img src=\"" + a.attela_cels + "\" alt=\"\"><strong>" + a.nosaukums + "</strong><br><button class=\"dzest-poga\" onclick=\"dzestAttelu(" + a.id + ")\">Dzēst</button></div>";
        i = i + 1;
      }
      if (html == "") html = "<p>Nav attēlu.</p>";
      document.getElementById("galerijas-saraksts").innerHTML = html;
    });
}

function dzestAttelu(id) {
  if (confirm("Dzēst?")) {
    fetch("/api/gallery/" + id, { method: "DELETE" }).then(function () {
      ieladetGaleriju();
    });
  }
}

ieladetSpeli();
ieladetZinas();
ieladetGaleriju();
