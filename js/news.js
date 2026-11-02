async function ieladetZinas() {
  var zinas = await iegutJson("/api/news");
  var vieta = document.getElementById("zinu-saraksts");
  vieta.textContent = "";
  zinas.forEach(function (zina) {
    var kartite = document.createElement("article");
    kartite.appendChild(izveidotTekstaElementu("h3", zina.virsraksts));
    kartite.appendChild(izveidotZinasInfo(zina));
    if (zina.attels) {
      kartite.appendChild(izveidotAttelu(zina.attels, zina.virsraksts, "zinas-attels"));
    }
    kartite.appendChild(izveidotTekstaElementu("p", zina.iss_apraksts));
    kartite.appendChild(izveidotTekstaElementu("p", zina.pilns_saturs));
    vieta.appendChild(kartite);
  });
}

ieladetZinas();
