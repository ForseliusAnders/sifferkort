// Delad formel: vilket tal galler just nu.
// Alla ytor (appen, tal.html, bild.html) maste rakna likadant for att
// widgeten och facit ska visa samma kort.
//
// Formeln ar medvetet enkel sa den kan skrivas i Widgys formelsprak:
//     (timme * 60 + kvart) mod 100     dar kvart = minut avrundad ner till 0/15/30/45
// Den byter var 15:e minut — samma takt som iOS ritar om widgets, sa
// tal- och bildwidgeten hinner visa samma kort.
// Lokal tid anvands — samma klocka som telefonen visar.

function aktuelltTal(nu) {
  var d = nu ? new Date(nu) : new Date();
  return (d.getHours() * 60 + Math.floor(d.getMinutes() / 15) * 15) % 100;
}

// Millisekunder till nasta kvartsskifte, sa sidor kan ladda om sig i takt.
function msTillNasta() {
  var d = new Date();
  var kvarMin = 15 - (d.getMinutes() % 15) - 1;
  return (kvarMin * 60 + (60 - d.getSeconds())) * 1000 + 500;
}

// Behalls for bakatkompatibilitet med ?steg= i gamla lankar.
function stegFranUrl() { return 1; }
