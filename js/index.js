async function ieladetSpelesDatus() {
  var nosaukumaVieta = document.getElementById("spelines-nosaukums");
  var aprakstaVieta = document.getElementById("spelines-apraksts");
  try {
    var spele = await iegutJson("/api/game");
    paraditSpelesDatus(nosaukumaVieta, aprakstaVieta, spele);
  } catch (kluda) {
    paraditKludu(aprakstaVieta, "Neizdevās ielādēt datus");
  }
}

function paraditSpelesDatus(nosaukumaVieta, aprakstaVieta, spele) {
  if (!spele) {
    aprakstaVieta.textContent = "Dati nav pieejami.";
    return;
  }
  nosaukumaVieta.textContent = "Kas ir " + spele.nosaukums + "?";
  aprakstaVieta.textContent = spele.apraksts;
  paraditGalvenoAttelu(spele.galvenais_attels);
}

function paraditGalvenoAttelu(attelaCels) {
  var galvenaisAttels = document.getElementById("galvenais-attels");
  if (!galvenaisAttels) {
    return;
  }
  if (!attelaCels) {
    galvenaisAttels.src = "img/main.png";
    return;
  }
  galvenaisAttels.src = attelaCels;
}

async function ieladetIzceltoZinu() {
  var zinasVieta = document.getElementById("izcelta-zina");
  try {
    var zinas = await iegutJson("/api/news");
    paraditIzceltoZinu(zinasVieta, zinas);
  } catch (kluda) {
    paraditKludu(zinasVieta, "Neizdevās ielādēt datus");
  }
}

function paraditIzceltoZinu(zinasVieta, zinas) {
  zinasVieta.textContent = "";
  if (!zinas || zinas.length === 0) {
    zinasVieta.textContent = "Pagaidām nav ziņu.";
    return;
  }
  var zina = zinas[0];
  pievienotIzceltasZinasDatus(zinasVieta, zina);
}

function pievienotIzceltasZinasDatus(zinasVieta, zina) {
  var virsraksts = izveidotTekstaElementu("h3", zina.virsraksts);
  zinasVieta.appendChild(virsraksts);
  var informacija = izveidotZinasInfo(zina);
  zinasVieta.appendChild(informacija);
  var issApraksts = izveidotTekstaElementu("p", zina.iss_apraksts);
  zinasVieta.appendChild(issApraksts);
  var saite = document.createElement("a");
  saite.className = "button dark";
  saite.href = "news.html";
  saite.textContent = "Visas ziņas";
  zinasVieta.appendChild(saite);
}

ieladetSpelesDatus();
ieladetIzceltoZinu();
