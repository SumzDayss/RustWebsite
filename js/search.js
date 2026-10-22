document.getElementById("meklesanas-forma").addEventListener("submit", function (e) {
  e.preventDefault();
  var q = document.getElementById("jautajums").value.trim();
  var el = document.getElementById("rezultati");

  fetch("/api/search?q=" + encodeURIComponent(q))
    .then(function (r) { return r.json(); })
    .then(function (rez) {
      var html = "";
      if (rez.saturs.length) {
        html += "<h3>Saturs</h3><ul>" + rez.saturs.map(function (s) {
          return "<li><a href=\"content.html?id=" + s.id + "\">" + s.nosaukums + "</a></li>";
        }).join("") + "</ul>";
      }
      if (rez.zinas.length) {
        html += "<h3>Ziņas</h3><ul>" + rez.zinas.map(function (z) {
          return "<li><strong>" + z.virsraksts + "</strong> — " + z.iss_apraksts + "</li>";
        }).join("") + "</ul>";
      }
      el.innerHTML = html || "<p>Neko neizdevās atrast.</p>";
    });
});
