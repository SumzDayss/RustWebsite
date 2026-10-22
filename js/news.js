fetch("/api/news")
  .then(function (r) { return r.json(); })
  .then(function (zinas) {
    var el = document.getElementById("zinu-saraksts");
    if (!zinas.length) { el.textContent = "Pagaidām nav ziņu."; return; }
    el.innerHTML = zinas.map(function (z) {
      return "<article>" +
        "<h3>" + z.virsraksts + "</h3>" +
        "<p><small>" + z.kategorija + " · " + z.publicesanas_datums + "</small></p>" +
        (z.attels ? "<img src=\"" + z.attels + "\" alt=\"\">" : "") +
        "<p>" + z.iss_apraksts + "</p>" +
        "<p>" + z.pilns_saturs + "</p>" +
        "</article>";
    }).join("");
  });
