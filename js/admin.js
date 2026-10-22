var forma = document.getElementById("zinas-forma");
var poga = document.getElementById("zinas-poga");
var atceltPoga = document.getElementById("atcelt-poga");
var zinas = [];

function ieladetZinas() {
  fetch("/api/news")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      zinas = data;
      var html = "";

      for (var i = 0; i < zinas.length; i++) {
        var z = zinas[i];
        html += "<div class=\"ieraksts\">" +
          "<strong>" + z.virsraksts + "</strong> <small>(" + z.kategorija + ")</small><br>" +
          "<button class=\"dzest-poga\" onclick=\"labot(" + z.id + ")\">Labot</button> " +
          "<button class=\"dzest-poga\" onclick=\"dzestZinu(" + z.id + ")\">Dzēst</button>" +
          "</div>";
      }

      if (html === "") {
        html = "<p>Nav ziņu.</p>";
      }

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
  var atrasta = null;

  for (var i = 0; i < zinas.length; i++) {
    if (zinas[i].id === id) {
      atrasta = zinas[i];
      break;
    }
  }

  if (atrasta === null) {
    return;
  }

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

      for (var i = 0; i < atteli.length; i++) {
        var a = atteli[i];
        html += "<div class=\"ieraksts\">" +
          "<img src=\"" + a.attela_cels + "\" alt=\"\">" +
          "<strong>" + a.nosaukums + "</strong><br>" +
          "<button class=\"dzest-poga\" onclick=\"dzestAttelu(" + a.id + ")\">Dzēst</button>" +
          "</div>";
      }

      if (html === "") {
        html = "<p>Nav attēlu.</p>";
      }

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

ieladetZinas();
ieladetGaleriju();
