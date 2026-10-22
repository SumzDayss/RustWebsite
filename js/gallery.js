fetch("/api/gallery")
  .then(function (r) { return r.json(); })
  .then(function (atteli) {
    var el = document.getElementById("galerija");
    if (!atteli.length) { el.textContent = "Pagaidām nav attēlu."; return; }
    el.innerHTML = "<ul class=\"cards\">" + atteli.map(function (a) {
      return "<li>" +
        "<img src=\"" + a.attela_cels + "\" alt=\"" + a.nosaukums + "\">" +
        "<p><strong>" + a.nosaukums + "</strong></p>" +
        "<p>" + a.apraksts + "</p>" +
        "</li>";
    }).join("") + "</ul>";
  });
