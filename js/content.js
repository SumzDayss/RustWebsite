var sarakstsEl = document.getElementById("saraksts");
var detalizetiEl = document.getElementById("detalizeti");
var id = new URLSearchParams(location.search).get("id");

function raditSarakstu() {
  fetch("/api/saturs")
    .then(function (response) {
      return response.json();
    })
    .then(function (dati) {
      var html = "<ul class=\"cards\">";

      for (var i = 0; i < dati.length; i++) {
        var d = dati[i];
        html += "<li><a href=\"content.html?id=" + d.id + "\"><strong>" + d.nosaukums + "</strong></a></li>";
      }

      html += "</ul>";
      sarakstsEl.innerHTML = html;
    });
}

function raditIerakstu() {
  fetch("/api/saturs/" + encodeURIComponent(id))
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Nav atrasts");
      }
      return response.json();
    })
    .then(function (ieraksts) {
      sarakstsEl.innerHTML = "";
      detalizetiEl.innerHTML = "<h3>" + ieraksts.nosaukums + "</h3>" +
        "<p>" + ieraksts.apraksts + "</p>" +
        "<p><a href=\"content.html\">← Atpakaļ</a></p>";
    })
    .catch(function () {
      detalizetiEl.innerHTML = "<p>Nav atrasts. <a href=\"content.html\">Atpakaļ</a></p>";
    });
}

if (id) {
  raditIerakstu();
} else {
  raditSarakstu();
}
