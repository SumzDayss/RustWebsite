var sarakstsEl = document.getElementById("saraksts");
var detalizetiEl = document.getElementById("detalizeti");
var adrese = location.search;
var id = "";
var i = 0;
if (adrese.indexOf("id=") != -1) {
  var parts = adrese.split("id=");
  id = parts[1].split("&")[0];
}

function raditSarakstu() {
  fetch("/api/saturs")
    .then(function (response) {
      return response.json();
    })
    .then(function (dati) {
      var html = "<ul class=\"cards\">";
      i = 0;
      while (i < dati.length) {
        html += "<li><a href=\"content.html?id=" + dati[i].id + "\"><strong>" + dati[i].nosaukums + "</strong></a></li>";
        i = i + 1;
      }
      html += "</ul>";
      sarakstsEl.innerHTML = html;
    });
}

function raditIerakstu() {
  fetch("/api/saturs/" + id)
    .then(function (response) {
      if (response.ok == false) {
        return null;
      }
      return response.json();
    })
    .then(function (ieraksts) {
      if (ieraksts == null) {
        detalizetiEl.innerHTML = "<p>Nav atrasts. <a href=\"content.html\">Atpakaļ</a></p>";
        return;
      }
      sarakstsEl.innerHTML = "";
      detalizetiEl.innerHTML = "<h3>" + ieraksts.nosaukums + "</h3><p>" + ieraksts.apraksts + "</p><p><a href=\"content.html\">← Atpakaļ</a></p>";
    });
}

if (id != "") {
  raditIerakstu();
} else {
  raditSarakstu();
}
