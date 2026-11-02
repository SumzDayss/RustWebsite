async function ieladetGaleriju() {
  var atteli = await iegutJson("/api/gallery");
  var vieta = document.getElementById("galerija");
  if (!atteli || atteli.length === 0) {
    vieta.textContent = "Pagaidām nav attēlu.";
    return;
  }
  var saraksts = document.createElement("ul");
  saraksts.className = "cards";
  atteli.forEach(function (attels) {
    var rinda = document.createElement("li");
    rinda.appendChild(izveidotAttelu(attels.attela_cels, attels.nosaukums, "galerijas-attels"));
    var nosaukums = document.createElement("p");
    nosaukums.appendChild(izveidotTekstaElementu("strong", attels.nosaukums));
    rinda.appendChild(nosaukums);
    rinda.appendChild(izveidotTekstaElementu("p", attels.apraksts));
    saraksts.appendChild(rinda);
  });
  vieta.textContent = "";
  vieta.appendChild(saraksts);
}

ieladetGaleriju();
