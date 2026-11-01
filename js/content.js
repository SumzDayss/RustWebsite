async function ieladetSarakstu() {
  var ieraksti = await iegutJson("/api/saturs");
  var vieta = document.getElementById("saraksts");
  var saraksts = document.createElement("ul");
  saraksts.className = "cards";
  ieraksti.forEach(function (ieraksts) {
    var rinda = document.createElement("li");
    var saite = document.createElement("a");
    saite.href = "content.html?id=" + ieraksts.id;
    saite.appendChild(izveidotTekstaElementu("strong", ieraksts.nosaukums));
    rinda.appendChild(saite);
    saraksts.appendChild(rinda);
  });
  vieta.textContent = "";
  vieta.appendChild(saraksts);
}

async function ieladetIerakstu(id) {
  var ieraksts = await iegutJson("/api/saturs/" + id);
  var vieta = document.getElementById("detalizeti");
  document.getElementById("saraksts").textContent = "";
  vieta.textContent = "";
  vieta.appendChild(izveidotTekstaElementu("h3", ieraksts.nosaukums));
  vieta.appendChild(izveidotTekstaElementu("p", ieraksts.apraksts));
  var rindkopa = document.createElement("p");
  var saite = document.createElement("a");
  saite.href = "content.html";
  saite.textContent = "<- Atpakaļ";
  rindkopa.appendChild(saite);
  vieta.appendChild(rindkopa);
}

var id = new URLSearchParams(location.search).get("id");
if (id) {
  ieladetIerakstu(id);
} else {
  ieladetSarakstu();
}
