fetch("/api/game")
  .then(function (r) { return r.json(); })
  .then(function (s) {
    var el = document.getElementById("spelines-dati");
    if (!s) { el.textContent = "Dati nav pieejami."; return; }
    document.getElementById("spelines-nosaukums").textContent = s.nosaukums;
    el.innerHTML =
      "<p><strong>Izstrādātājs:</strong> " + s.izstradatajs + "</p>" +
      "<p><strong>Izdevējs:</strong> " + s.izdevejs + "</p>" +
      "<p><strong>Žanrs:</strong> " + s.zanrs + "</p>" +
      "<p><strong>Gads:</strong> " + s.izdosanas_gads + "</p>" +
      "<p><strong>Platforma:</strong> " + s.platforma + "</p>" +
      "<p>" + s.apraksts + "</p>";
  });
