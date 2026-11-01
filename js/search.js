async function meklet(event) {
  event.preventDefault();
  var q = document.getElementById("jautajums").value;
  var vieta = document.getElementById("rezultati");
  var rezultati = await iegutJson("/api/search?q=" + q);
  vieta.textContent = "";
  if (rezultati.saturs.length === 0 && rezultati.zinas.length === 0) {
    vieta.textContent = "Neko neizdevās atrast.";
    return;
  }
  if (rezultati.saturs.length > 0) {
    vieta.appendChild(izveidotTekstaElementu("h3", "Saturs"));
    var saraksts = document.createElement("ul");
    rezultati.saturs.forEach(function (ieraksts) {
      var rinda = document.createElement("li");
      var saite = document.createElement("a");
      saite.href = "content.html?id=" + ieraksts.id;
      saite.textContent = ieraksts.nosaukums;
      rinda.appendChild(saite);
      saraksts.appendChild(rinda);
    });
    vieta.appendChild(saraksts);
  }
  if (rezultati.zinas.length > 0) {
    vieta.appendChild(izveidotTekstaElementu("h3", "Ziņas"));
    var zinuSaraksts = document.createElement("ul");
    rezultati.zinas.forEach(function (zina) {
      var rinda = document.createElement("li");
      rinda.appendChild(izveidotTekstaElementu("strong", zina.virsraksts));
      rinda.appendChild(document.createTextNode(" — " + zina.iss_apraksts));
      zinuSaraksts.appendChild(rinda);
    });
    vieta.appendChild(zinuSaraksts);
  }
}

document.getElementById("meklesanas-forma").addEventListener("submit", meklet);
