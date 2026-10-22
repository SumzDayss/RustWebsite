function ieladet() {
  fetch("/api/news")
    .then(function (response) {
      return response.json();
    })
    .then(function (zinas) {
      var el = document.getElementById("zinu-saraksts");

      if (zinas.length === 0) {
        el.textContent = "Pagaidām nav ziņu.";
        return;
      }

      var html = "";

      for (var i = 0; i < zinas.length; i++) {
        var z = zinas[i];
        html += "<article>" +
          "<h3>" + z.virsraksts + "</h3>" +
          "<p><small>" + z.kategorija + " · " + z.publicesanas_datums + "</small></p>";

        if (z.attels) {
          html += "<img src=\"" + z.attels + "\" alt=\"\">";
        }

        html += "<p>" + z.iss_apraksts + "</p>" +
          "<p>" + z.pilns_saturs + "</p>" +
          "</article>";
      }

      el.innerHTML = html;
    });
}

ieladet();
