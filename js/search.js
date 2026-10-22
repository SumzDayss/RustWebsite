var forma = document.getElementById("meklesanas-forma");

forma.addEventListener("submit", function (event) {
  event.preventDefault();

  var q = document.getElementById("jautajums").value.trim();

  fetch("/api/search?q=" + encodeURIComponent(q))
    .then(function (response) {
      return response.json();
    })
    .then(function (rezultati) {
      var html = "";

      if (rezultati.saturs.length > 0) {
        html += "<h3>Saturs</h3><ul>";

        for (var i = 0; i < rezultati.saturs.length; i++) {
          var s = rezultati.saturs[i];
          html += "<li><a href=\"content.html?id=" + s.id + "\">" + s.nosaukums + "</a></li>";
        }

        html += "</ul>";
      }

      if (rezultati.zinas.length > 0) {
        html += "<h3>Ziņas</h3><ul>";

        for (var j = 0; j < rezultati.zinas.length; j++) {
          var z = rezultati.zinas[j];
          html += "<li><strong>" + z.virsraksts + "</strong> — " + z.iss_apraksts + "</li>";
        }

        html += "</ul>";
      }

      if (html === "") {
        html = "<p>Neko neizdevās atrast.</p>";
      }

      document.getElementById("rezultati").innerHTML = html;
    });
});
