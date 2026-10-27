var forma = document.getElementById("meklesanas-forma");

forma.addEventListener("submit", function (event) {
  event.preventDefault();

  var q = document.getElementById("jautajums").value;
  fetch("/api/search?q=" + q)
    .then(function (response) {
      return response.json();
    })
    .then(function (rezultati) {
      var html = "";
      var i = 0;
      if (rezultati.saturs.length > 0) {
        html += "<h3>Saturs</h3><ul>";
        i = 0;
        while (i < rezultati.saturs.length) {
          html += "<li><a href=\"content.html?id=" + rezultati.saturs[i].id + "\">" + rezultati.saturs[i].nosaukums + "</a></li>";
          i = i + 1;
        }
        html += "</ul>";
      }
      if (rezultati.zinas.length > 0) {
        html += "<h3>Ziņas</h3><ul>";
        i = 0;
        while (i < rezultati.zinas.length) {
          html += "<li><strong>" + rezultati.zinas[i].virsraksts + "</strong> — " + rezultati.zinas[i].iss_apraksts + "</li>";
          i = i + 1;
        }
        html += "</ul>";
      }
      if (html == "") {
        html = "<p>Neko neizdevās atrast.</p>";
      }
      document.getElementById("rezultati").innerHTML = html;
    });
});
