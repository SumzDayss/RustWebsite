function ieladet() {
  fetch("/api/gallery")
    .then(function (response) {
      return response.json();
    })
    .then(function (atteli) {
      var el = document.getElementById("galerija");

      if (atteli.length === 0) {
        el.textContent = "Pagaidām nav attēlu.";
        return;
      }

      var html = "<ul class=\"cards\">";

      for (var i = 0; i < atteli.length; i++) {
        var a = atteli[i];
        html += "<li><img src=\"" + a.attela_cels + "\" alt=\"" + a.nosaukums + "\">" +
          "<p><strong>" + a.nosaukums + "</strong></p>" +
          "<p>" + a.apraksts + "</p></li>";
      }

      html += "</ul>";
      el.innerHTML = html;
    });
}

ieladet();
