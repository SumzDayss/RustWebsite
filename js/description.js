function ieladet() {
  fetch("/api/game")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Servera kļūda");
      }
      return response.json();
    })
    .then(function (spele) {
      var el = document.getElementById("spelines-dati");

      if (!spele) {
        el.textContent = "Dati nav pieejami.";
        return;
      }

      document.getElementById("spelines-nosaukums").textContent = spele.nosaukums;
      document.title = spele.nosaukums + " – Par spēli";

      el.innerHTML =
        "<div class=\"speles-saturs\">" +
          "<img class=\"speles-attels\" src=\"" + spele.galvenais_attels + "\" alt=\"" + spele.nosaukums + "\">" +
          "<div class=\"speles-info\">" +
            "<dl>" +
              "<dt>Izstrādātājs</dt><dd>" + spele.izstradatajs + "</dd>" +
              "<dt>Izdevējs</dt><dd>" + spele.izdevejs + "</dd>" +
              "<dt>Žanrs</dt><dd>" + spele.zanrs + "</dd>" +
              "<dt>Izdošanas gads</dt><dd>" + spele.izdosanas_gads + "</dd>" +
              "<dt>Platforma</dt><dd>" + spele.platforma + "</dd>" +
            "</dl>" +
            "<p>" + spele.apraksts + "</p>" +
          "</div>" +
        "</div>";
    })
    .catch(function () {
      document.getElementById("spelines-dati").textContent = "Neizdevās ielādēt datus.";
    });
}

ieladet();
