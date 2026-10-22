var sarakstsEl = document.getElementById("saraksts");
var detalizetiEl = document.getElementById("detalizeti");
var id = new URLSearchParams(location.search).get("id");

if (id) {
  fetch("/api/saturs/" + encodeURIComponent(id))
    .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
    .then(function (i) {
      sarakstsEl.innerHTML = "";
      detalizetiEl.innerHTML =
        "<h3>" + i.nosaukums + "</h3>" +
        "<p>" + i.apraksts + "</p>" +
        "<p><a href=\"content.html\">← Atpakaļ</a></p>";
    })
    .catch(function () {
      detalizetiEl.innerHTML = "<p>Nav atrasts. <a href=\"content.html\">Atpakaļ</a></p>";
    });
} else {
  fetch("/api/saturs")
    .then(function (r) { return r.json(); })
    .then(function (dati) {
      sarakstsEl.innerHTML = "<ul class=\"cards\">" + dati.map(function (d) {
        return "<li><a href=\"content.html?id=" + d.id + "\"><strong>" + d.nosaukums + "</strong></a></li>";
      }).join("") + "</ul>";
    });
}
