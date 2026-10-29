async function ieladetZinas() {
  var sarakstaVieta = document.getElementById("zinu-saraksts");
  try {
    var zinas = await iegutJson("/api/news");
    paraditZinas(sarakstaVieta, zinas);
  } catch (kluda) {
    paraditKludu(sarakstaVieta, "Neizdevās ielādēt datus");
  }
}

function paraditZinas(sarakstaVieta, zinas) {
  sarakstaVieta.textContent = "";
  if (zinas.length === 0) {
    sarakstaVieta.textContent = "Pagaidām nav ziņu.";
    return;
  }
  for (var i = 0; i < zinas.length; i++) {
    var zina = zinas[i];
    var kartite = izveidotZinasKartiti(zina);
    sarakstaVieta.appendChild(kartite);
  }
}

function izveidotZinasKartiti(zina) {
  var kartite = document.createElement("article");
  var virsraksts = izveidotTekstaElementu("h3", zina.virsraksts);
  kartite.appendChild(virsraksts);
  var informacija = izveidotZinasInfo(zina);
  kartite.appendChild(informacija);
  var attels = izveidotZinasAttelu(zina.attels);
  if (attels) {
    kartite.appendChild(attels);
  }
  pievienotZinasTekstu(kartite, zina);
  return kartite;
}

function pievienotZinasTekstu(kartite, zina) {
  var issApraksts = izveidotTekstaElementu("p", zina.iss_apraksts);
  kartite.appendChild(issApraksts);
  var pilnsSaturs = izveidotTekstaElementu("p", zina.pilns_saturs);
  kartite.appendChild(pilnsSaturs);
}

function izveidotZinasAttelu(attelaCels) {
  if (!attelaCels) {
    return null;
  }
  var attels = document.createElement("img");
  attels.src = attelaCels;
  attels.alt = "";
  return attels;
}

ieladetZinas();
