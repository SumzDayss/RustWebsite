function ieladetSpeli() {
  fetch("/api/game")
    .then(function (response) {
      return response.json();
    })
    .then(function (spele) {
      if (spele) {
        document.getElementById("spelines-nosaukums").textContent = "Kas ir " + spele.nosaukums + "?";
        document.getElementById("spelines-apraksts").textContent = spele.apraksts;
        var galvenaisAttels = document.getElementById("galvenais-attels");
        if (galvenaisAttels) {
          galvenaisAttels.src = spele.galvenais_attels || "img/main.png";
        }
      }
    });
}

function ieladetIzceltoZinu() {
  fetch("/api/news")
    .then(function (response) {
      return response.json();
    })
    .then(function (zinas) {
      var el = document.getElementById("izcelta-zina");

      if (zinas.length === 0) {
        el.textContent = "Pagaidām nav ziņu.";
        return;
      }

      var z = zinas[0];
      el.innerHTML = "<h3>" + z.virsraksts + "</h3>" +
        "<p><small>" + z.kategorija + " · " + z.publicesanas_datums + "</small></p>" +
        "<p>" + z.iss_apraksts + "</p>" +
        "<a class=\"button dark\" href=\"news.html\">Visas ziņas</a>";
    });
}

ieladetSpeli();
ieladetIzceltoZinu();
