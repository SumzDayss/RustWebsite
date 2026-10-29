async function iegutJson(url) {
  var atbilde = await fetch(url);
  if (!atbilde.ok) {
    var kluda = new Error("Neizdevās ielādēt datus");
    kluda.status = atbilde.status;
    throw kluda;
  }
  var atbildesDati = await atbilde.json();
  return atbildesDati;
}

function paraditKludu(vieta, teksts) {
  vieta.textContent = teksts;
}

function izveidotTekstaElementu(tips, teksts) {
  var elements = document.createElement(tips);
  elements.textContent = teksts;
  return elements;
}

function izveidotZinasInfo(zina) {
  var rindkopa = document.createElement("p");
  var mazaisElements = document.createElement("small");
  var teksts = zina.kategorija + " · " + zina.publicesanas_datums;
  mazaisElements.textContent = teksts;
  rindkopa.appendChild(mazaisElements);
  return rindkopa;
}
