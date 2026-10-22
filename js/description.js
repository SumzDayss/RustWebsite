function ieladet() {
  fetch("/api/game")
    .then(function (response) {
      return response.json();
    })
    .then(function (spele) {
      var el = document.getElementById("spelines-dati");

      if (!spele) {
        el.textContent = "Dati nav pieejami.";
        return;
      }

      document.getElementById("spelines-nosaukums").textContent = spele.nosaukums;
      el.innerHTML = "<p><strong>Izstrādātājs:</strong> " + spele.izstradatajs + "</p>" +
        "<p><strong>Izdevējs:</strong> " + spele.izdevejs + "</p>" +
        "<p><strong>Žanrs:</strong> " + spele.zanrs + "</p>" +
        "<p><strong>Gads:</strong> " + spele.izdosanas_gads + "</p>" +
        "<p><strong>Platforma:</strong> " + spele.platforma + "</p>" +
        "<p>" + spele.apraksts + "</p>";
    });
}

ieladet();
