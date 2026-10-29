async function ieladetGaleriju() {
  var vieta = document.getElementById("galerija");
  try {
    var atteli = await iegutJson("/api/gallery");
    paraditGaleriju(vieta, atteli);
  } catch (kluda) {
    paraditKludu(vieta, "Neizdevās ielādēt datus");
  }
}

function paraditGaleriju(vieta, atteli) {
  vieta.textContent = "";
  if (!atteli || atteli.length === 0) {
    vieta.textContent = "Pagaidām nav attēlu.";
    return;
  }
  var saraksts = document.createElement("ul");
  saraksts.className = "cards";
  for (var i = 0; i < atteli.length; i++) {
    var attels = atteli[i];
    var rinda = izveidotGalerijasRindu(attels);
    saraksts.appendChild(rinda);
  }
  vieta.appendChild(saraksts);
}

function izveidotGalerijasRindu(attels) {
  var rinda = document.createElement("li");
  var attelaElements = document.createElement("img");
  attelaElements.src = attels.attela_cels;
  attelaElements.alt = attels.nosaukums;
  rinda.appendChild(attelaElements);
  var nosaukumaRindkopa = document.createElement("p");
  var nosaukums = izveidotTekstaElementu("strong", attels.nosaukums);
  nosaukumaRindkopa.appendChild(nosaukums);
  rinda.appendChild(nosaukumaRindkopa);
  var apraksts = izveidotTekstaElementu("p", attels.apraksts);
  rinda.appendChild(apraksts);
  return rinda;
}

ieladetGaleriju();
