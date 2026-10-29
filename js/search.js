async function meklet(event) {
  event.preventDefault();
  var jautajums = document.getElementById("jautajums").value;
  var vieta = document.getElementById("rezultati");
  var meklesanasUrl = "/api/search?q=" + jautajums;
  try {
    var rezultati = await iegutJson(meklesanasUrl);
    paraditRezultatus(vieta, rezultati);
  } catch (kluda) {
    paraditKludu(vieta, "Neizdevās ielādēt datus");
  }
}

function paraditRezultatus(vieta, rezultati) {
  vieta.textContent = "";
  if (rezultati.saturs.length === 0 && rezultati.zinas.length === 0) {
    vieta.textContent = "Neko neizdevās atrast.";
    return;
  }
  if (rezultati.saturs.length > 0) {
    paraditSaturaRezultatus(vieta, rezultati.saturs);
  }
  if (rezultati.zinas.length > 0) {
    paraditZinuRezultatus(vieta, rezultati.zinas);
  }
}

function paraditSaturaRezultatus(vieta, saturs) {
  var virsraksts = izveidotTekstaElementu("h3", "Saturs");
  vieta.appendChild(virsraksts);
  var saraksts = document.createElement("ul");
  for (var i = 0; i < saturs.length; i++) {
    var ieraksts = saturs[i];
    var rinda = izveidotSaturaRezultatuRindu(ieraksts);
    saraksts.appendChild(rinda);
  }
  vieta.appendChild(saraksts);
}

function izveidotSaturaRezultatuRindu(ieraksts) {
  var rinda = document.createElement("li");
  var saite = document.createElement("a");
  saite.href = "content.html?id=" + ieraksts.id;
  saite.textContent = ieraksts.nosaukums;
  rinda.appendChild(saite);
  return rinda;
}

function paraditZinuRezultatus(vieta, zinas) {
  var virsraksts = izveidotTekstaElementu("h3", "Ziņas");
  vieta.appendChild(virsraksts);
  var saraksts = document.createElement("ul");
  for (var i = 0; i < zinas.length; i++) {
    var zina = zinas[i];
    var rinda = izveidotZinasRezultatuRindu(zina);
    saraksts.appendChild(rinda);
  }
  vieta.appendChild(saraksts);
}

function izveidotZinasRezultatuRindu(zina) {
  var rinda = document.createElement("li");
  var virsraksts = izveidotTekstaElementu("strong", zina.virsraksts);
  rinda.appendChild(virsraksts);
  var teksts = document.createTextNode(" — " + zina.iss_apraksts);
  rinda.appendChild(teksts);
  return rinda;
}

var forma = document.getElementById("meklesanas-forma");
forma.addEventListener("submit", meklet);
