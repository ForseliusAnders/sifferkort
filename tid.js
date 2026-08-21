// Delad formel: vilket tal galler just nu.
// Alla ytor (appen, tal.html, bild.html) maste rakna likadant for att
// widgeten och facit ska visa samma kort.
//
// Formeln ar medvetet enkel sa den kan skrivas i Widgys formelsprak:
//     (timme * 60 + minut) mod 100
// Den byter varje minut och nar alla 100 tal under ett dygn.
// Lokal tid anvands — samma klocka som telefonen visar.

function aktuelltTal(nu) {
  var d = nu ? new Date(nu) : new Date();
  return (d.getHours() * 60 + d.getMinutes()) % 100;
}

// Millisekunder till nasta minutskifte, sa sidor kan ladda om sig i takt.
function msTillNasta() {
  var d = new Date();
  return (60 - d.getSeconds()) * 1000 - d.getMilliseconds() + 300;
}

// Behalls for bakatkompatibilitet med ?steg= i gamla lankar.
function stegFranUrl() { return 1; }
