async function ieladetSarakstu() {
  var vieta = document.getElementById("saraksts");
  try {
    var ieraksti = await iegutJson("/api/saturs");
    paraditSarakstu(vieta, ieraksti);
  } catch (kluda) {
    paraditKludu(vieta, "Neizdevās ielādēt datus");
  }
}

function paraditSarakstu(vieta, ieraksti) {
  vieta.textContent = "";
  var saraksts = document.createElement("ul");
  saraksts.className = "cards";
  for (var i = 0; i < ieraksti.length; i++) {
    var ieraksts = ieraksti[i];
    var rinda = izveidotSaturaRindu(ieraksts);
    saraksts.appendChild(rinda);
  }
  vieta.appendChild(saraksts);
}

function izveidotSaturaRindu(ieraksts) {
  var rinda = document.createElement("li");
  var saite = document.createElement("a");
  saite.href = "content.html?id=" + ieraksts.id;
  var virsraksts = izveidotTekstaElementu("strong", ieraksts.nosaukums);
  saite.appendChild(virsraksts);
  rinda.appendChild(saite);
  return rinda;
}

async function ieladetIerakstu(id) {
  var vieta = document.getElementById("detalizeti");
  var sarakstaVieta = document.getElementById("saraksts");
  sarakstaVieta.textContent = "";
  try {
    var ieraksts = await iegutJson("/api/saturs/" + id);
    paraditIerakstu(vieta, ieraksts);
  } catch (kluda) {
    if (kluda.status === 404) {
      paraditNekasNav(vieta);
    } else {
      paraditKludu(vieta, "Neizdevās ielādēt datus");
    }
  }
}

function paraditIerakstu(vieta, ieraksts) {
  vieta.textContent = "";
  var virsraksts = izveidotTekstaElementu("h3", ieraksts.nosaukums);
  vieta.appendChild(virsraksts);
  var apraksts = izveidotTekstaElementu("p", ieraksts.apraksts);
  vieta.appendChild(apraksts);
  pievienotAtpakalSaiti(vieta);
}

function paraditNekasNav(vieta) {
  vieta.textContent = "";
  var rindkopa = izveidotTekstaElementu("p", "Nav atrasts. ");
  var saite = document.createElement("a");
  saite.href = "content.html";
  saite.textContent = "Atpakaļ";
  rindkopa.appendChild(saite);
  vieta.appendChild(rindkopa);
}

function pievienotAtpakalSaiti(vieta) {
  var rindkopa = document.createElement("p");
  var saite = document.createElement("a");
  saite.href = "content.html";
  saite.textContent = "← Atpakaļ";
  rindkopa.appendChild(saite);
  vieta.appendChild(rindkopa);
}

var adrese = location.search;
var id = "";
if (adrese.indexOf("id=") !== -1) {
  var dalas = adrese.split("id=");
  id = dalas[1].split("&")[0];
}

if (id !== "") {
  ieladetIerakstu(id);
} else {
  ieladetSarakstu();
}
