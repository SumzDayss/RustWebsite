async function ieladetSpeli() {
  var spele = await iegutJson("/api/game");
  var vieta = document.getElementById("spelines-dati");
  if (!spele) {
    vieta.textContent = "Dati nav pieejami.";
    return;
  }
  document.getElementById("spelines-nosaukums").textContent = spele.nosaukums;
  document.title = spele.nosaukums + " – Par spēli";

  var attels = izveidotAttelu(spele.galvenais_attels, spele.nosaukums, "speles-attels");

  var info = document.createElement("div");
  info.className = "speles-info";
  var saraksts = document.createElement("dl");
  var rindas = [
    ["Izstrādātājs", spele.izstradatajs],
    ["Izdevējs", spele.izdevejs],
    ["Žanrs", spele.zanrs],
    ["Izdošanas gads", spele.izdosanas_gads],
    ["Platforma", spele.platforma]
  ];
  rindas.forEach(function (rinda) {
    saraksts.appendChild(izveidotTekstaElementu("dt", rinda[0]));
    saraksts.appendChild(izveidotTekstaElementu("dd", rinda[1]));
  });
  info.appendChild(saraksts);
  info.appendChild(izveidotTekstaElementu("p", spele.apraksts));

  var saturs = document.createElement("div");
  saturs.className = "speles-saturs";
  saturs.appendChild(attels);
  saturs.appendChild(info);

  vieta.textContent = "";
  vieta.appendChild(saturs);
}

ieladetSpeli();
