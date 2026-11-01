async function ieladetZinas() {
  var zinas = await iegutJson("/api/news");
  var vieta = document.getElementById("zinu-saraksts");
  vieta.textContent = "";
  zinas.forEach(function (zina) {
    var kartite = document.createElement("article");
    kartite.appendChild(izveidotTekstaElementu("h3", zina.virsraksts));
    kartite.appendChild(izveidotZinasInfo(zina));
    if (zina.attels) {
      var attels = document.createElement("img");
      attels.src = zina.attels;
      attels.alt = "";
      kartite.appendChild(attels);
    }
    kartite.appendChild(izveidotTekstaElementu("p", zina.iss_apraksts));
    kartite.appendChild(izveidotTekstaElementu("p", zina.pilns_saturs));
    vieta.appendChild(kartite);
  });
}

ieladetZinas();
