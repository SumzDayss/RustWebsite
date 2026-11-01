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
