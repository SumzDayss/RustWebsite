fetch("/api/game")
  .then(function (r) { return r.json(); })
  .then(function (s) {
    if (!s) return;
    document.getElementById("spelines-nosaukums").textContent = "Kas ir " + s.nosaukums + "?";
    document.getElementById("spelines-apraksts").textContent = s.apraksts;
  });

fetch("/api/news")
  .then(function (r) { return r.json(); })
  .then(function (zinas) {
    var el = document.getElementById("izcelta-zina");
    if (!zinas.length) { el.textContent = "Pagaidām nav ziņu."; return; }
    var z = zinas[0];
    el.innerHTML =
      "<h3>" + z.virsraksts + "</h3>" +
      "<p><small>" + z.kategorija + " · " + z.publicesanas_datums + "</small></p>" +
      "<p>" + z.iss_apraksts + "</p>" +
      "<a class=\"button dark\" href=\"news.html\">Visas ziņas</a>";
  });
