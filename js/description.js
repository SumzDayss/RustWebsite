async function ieladetSpeli() {
  var vieta = document.getElementById("spelines-dati");
  try {
    var spele = await iegutJson("/api/game");
    paraditSpelesDatus(vieta, spele);
  } catch (kluda) {
    paraditKludu(vieta, "Neizdevās ielādēt datus");
  }
}

function paraditSpelesDatus(vieta, spele) {
  if (!spele) {
    vieta.textContent = "Dati nav pieejami.";
    return;
  }
  var nosaukums = document.getElementById("spelines-nosaukums");
  nosaukums.textContent = spele.nosaukums;
  document.title = spele.nosaukums + " – Par spēli";
  var saturs = izveidotSpelesSaturs(spele);
  vieta.textContent = "";
  vieta.appendChild(saturs);
}

function izveidotSpelesSaturs(spele) {
  var saturs = document.createElement("div");
  saturs.className = "speles-saturs";
  var attels = document.createElement("img");
  attels.className = "speles-attels";
  attels.src = spele.galvenais_attels;
  attels.alt = spele.nosaukums;
  saturs.appendChild(attels);
  var informacija = izveidotSpelesInformaciju(spele);
  saturs.appendChild(informacija);
  return saturs;
}

function izveidotSpelesInformaciju(spele) {
  var informacija = document.createElement("div");
  informacija.className = "speles-info";
  var saraksts = document.createElement("dl");
  pievienotDatuRindu(saraksts, "Izstrādātājs", spele.izstradatajs);
  pievienotDatuRindu(saraksts, "Izdevējs", spele.izdevejs);
  pievienotDatuRindu(saraksts, "Žanrs", spele.zanrs);
  pievienotDatuRindu(saraksts, "Izdošanas gads", spele.izdosanas_gads);
  pievienotDatuRindu(saraksts, "Platforma", spele.platforma);
  informacija.appendChild(saraksts);
  var apraksts = izveidotTekstaElementu("p", spele.apraksts);
  informacija.appendChild(apraksts);
  return informacija;
}

function pievienotDatuRindu(saraksts, nosaukums, vertiba) {
  var termins = izveidotTekstaElementu("dt", nosaukums);
  saraksts.appendChild(termins);
  var vertibasElements = izveidotTekstaElementu("dd", vertiba);
  saraksts.appendChild(vertibasElements);
}

ieladetSpeli();
