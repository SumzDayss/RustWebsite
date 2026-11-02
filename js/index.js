async function ieladetSpelesDatus() {
  var spele = await iegutJson("/api/game");
  var nosaukums = document.getElementById("spelines-nosaukums");
  var apraksts = document.getElementById("spelines-apraksts");
  if (!spele) {
    apraksts.textContent = "Dati nav pieejami.";
    return;
  }
  nosaukums.textContent = "Kas ir " + spele.nosaukums + "?";
  apraksts.textContent = spele.apraksts;
  uzstaditAttelu(document.getElementById("galvenais-attels"), spele.galvenais_attels);
}

ieladetSpelesDatus();
