// Delad formel: vilket tal galler just nu.
// Alla ytor (appen, tal.html, bild.html) maste rakna likadant for att
// widgeten och facit ska visa samma kort.
//
// STEG_MIN styr hur ofta talet byts. Andra har — inte pa varje sida.
// 37 ar primtal mot 100, sa serien gar igenom alla 100 tal innan den
// upprepar sig.
var STEG_MIN = 1;

function aktuelltTal(nu, stegMin) {
  var steg = (stegMin || STEG_MIN) * 60000;
  var block = Math.floor((nu || Date.now()) / steg);
  return ((block * 37) % 100 + 100) % 100;
}

// Millisekunder tills nasta byte, sa sidor kan ladda om sig sjalva i takt.
function msTillNasta(stegMin) {
  var steg = (stegMin || STEG_MIN) * 60000;
  return steg - (Date.now() % steg) + 500;
}

// ?steg=1 i adressen ger en minut, ?steg=15 ger en kvart osv.
function stegFranUrl() {
  var v = parseInt(new URLSearchParams(location.search).get('steg'), 10);
  return (v >= 1 && v <= 1440) ? v : STEG_MIN;
}
