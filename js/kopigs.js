async function iegutJson(url) {
  var atbilde = await fetch(url);
  return atbilde.json();
}

function izveidotTekstaElementu(tips, teksts) {
  var elements = document.createElement(tips);
  elements.textContent = teksts;
  return elements;
}

function izveidotZinasInfo(zina) {
  var rindkopa = document.createElement("p");
  var mazais = document.createElement("small");
  mazais.textContent = zina.kategorija + " · " + zina.publicesanas_datums;
  rindkopa.appendChild(mazais);
  return rindkopa;
}

var VIETA_ATTELS = "img/placeholder.svg";

function attelaAdrese(cels) {
  var teksts = String(cels || "").trim();
  return teksts === "" ? VIETA_ATTELS : teksts;
}

function uzstaditAttelu(element, cels) {
  if (!element) return;
  element.src = attelaAdrese(cels);
  element.addEventListener("error", function () {
    if (element.src.indexOf(VIETA_ATTELS) === -1) element.src = VIETA_ATTELS;
  });
}

function izveidotAttelu(cels, alt, klase) {
  var attels = document.createElement("img");
  if (klase) attels.className = klase;
  attels.alt = alt || "";
  attels.loading = "lazy";
  uzstaditAttelu(attels, cels);
  return attels;
}
