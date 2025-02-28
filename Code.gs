/**
 * Copyright (C) 2023-2025 Arno Klein https://www.arno-klein.com
 * 
 * Permission to use, copy, modify, and distribute this software for any purpose with or without fee is hereby granted.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR
 * OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var jahresParameter = []

jahresParameter[2021] = {
  eckwert1 : 9744,
  eckwert2 : 14753, linearerProgressionsfaktor2 : 995.21, eingangssteuersatz2 : 1400,
  eckwert3 : 57918, linearerProgressionsfaktor3 : 208.85,  eingangssteuersatz3 : 2397, basisKorrektur3 : 950.96,
  eckwert4 : 274612, grenzsteuersatz4 : 0.42, basisKorrektur4 : 9136.63,
  grenzsteuersatz5 : 0.45, basisKorrektur5 : 17364.99,
  soliFreigrenze : 16956, soliSatz : 0.055, soliMilderungszoneSatz : 0.119
}

jahresParameter[2022] = {
  eckwert1 : 10347,
  eckwert2 : 14926, linearerProgressionsfaktor2 : 1088.67, eingangssteuersatz2 : 1400,
  eckwert3 : 58596, linearerProgressionsfaktor3 : 206.43,  eingangssteuersatz3 : 2397, basisKorrektur3 : 869.32,
  eckwert4 : 277825, grenzsteuersatz4 : 0.42, basisKorrektur4 : 9336.45,
  grenzsteuersatz5 : 0.45, basisKorrektur5 : 17671.2,
  soliFreigrenze : 16956, soliSatz : 0.055, soliMilderungszoneSatz : 0.119
}

jahresParameter[2023] = {
  eckwert1 : 10908,
  eckwert2 : 15999, linearerProgressionsfaktor2 : 979.18, eingangssteuersatz2 : 1400,
  eckwert3 : 62809, linearerProgressionsfaktor3 : 192.59, eingangssteuersatz3 : 2397, basisKorrektur3 : 966.53,
  eckwert4 : 277825, grenzsteuersatz4 : 0.42, basisKorrektur4 : 9972.98,
  grenzsteuersatz5 : 0.45, basisKorrektur5 : 18307.73,
  soliFreigrenze : 17543, soliSatz : 0.055, soliMilderungszoneSatz : 0.119
}

jahresParameter[2024] = {
  eckwert1 : 11604,    
  eckwert2 : 17005, linearerProgressionsfaktor2 : 922.98, eingangssteuersatz2 : 1400,
  eckwert3 : 66760, linearerProgressionsfaktor3 : 181.19, eingangssteuersatz3 : 2397, basisKorrektur3 : 1025.38,
  eckwert4 : 277825, grenzsteuersatz4 : 0.42, basisKorrektur4 : 10602.13,
  grenzsteuersatz5 : 0.45, basisKorrektur5 : 18936.88,
  soliFreigrenze : 18130, soliSatz : 0.055, soliMilderungszoneSatz : 0.119
}

jahresParameter[2025] = {
  eckwert1 : 12096,    
  eckwert2 : 17443, linearerProgressionsfaktor2 : 932.30, eingangssteuersatz2 : 1400,
  eckwert3 : 68480, linearerProgressionsfaktor3 : 176.64, eingangssteuersatz3 : 2397, basisKorrektur3 : 1015.13,
  eckwert4 : 277825, grenzsteuersatz4 : 0.42, basisKorrektur4 : 10911.92,
  grenzsteuersatz5 : 0.45, basisKorrektur5 : 19246.67,
  soliFreigrenze : 19950, soliSatz : 0.055, soliMilderungszoneSatz : 0.119
}

jahresParameter[2026] = {
  // Werte von 2025, ändern!
  // https://de.wikipedia.org/wiki/Einkommensteuer_(Deutschland)#Mathematische_Eigenschaften_der_Steuerfunktion
  eckwert1 : 12096,    
  eckwert2 : 17443, linearerProgressionsfaktor2 : 932.30, eingangssteuersatz2 : 1400,
  eckwert3 : 68480, linearerProgressionsfaktor3 : 176.64, eingangssteuersatz3 : 2397, basisKorrektur3 : 1015.13,
  eckwert4 : 277825, grenzsteuersatz4 : 0.42, basisKorrektur4 : 10911.92,
  grenzsteuersatz5 : 0.45, basisKorrektur5 : 19246.67,
  // https://de.wikipedia.org/wiki/Solidaritätszuschlag – normalerweise sollte sich nur soliFreigrenze ändern.
  // Der Wert von 2026 wurde schon 2024 festgelegt, trotzdem prüfen, ob er sich nochmal ändert.
  soliFreigrenze : 20350, soliSatz : 0.055, soliMilderungszoneSatz : 0.119
}

/**
 * Berechnet die deutsche Einkommensteuer nach Grundtarif (für Splittingtarif einfach zvE halbieren).
 * 
 * @param {number} einkommen zu versteuerndes Einkommen (zvE) in Euro
 * @param {number} jahr Jahr (2021–2024)
 * @return Einkommensteuerbetrag nach Grundtarif in Euro
 * @customfunction
 */
function EST_BETRAG(einkommen, jahr) {
  
  var zvE = Math.floor(einkommen)
  var year = jahr
  var eSt = 0;

  if (zvE <= jahresParameter[year].eckwert1) {
      eSt = 0;
  } else if (zvE <= jahresParameter[year].eckwert2) {
      var y = ( zvE - jahresParameter[year].eckwert1 ) / 10000;
      eSt = ( jahresParameter[year].linearerProgressionsfaktor2 * y + jahresParameter[year].eingangssteuersatz2 ) * y
  } else if (zvE <= jahresParameter[year].eckwert3) {
      var z = ( zvE - jahresParameter[year].eckwert2 ) / 10000;
      eSt = ( jahresParameter[year].linearerProgressionsfaktor3 * z + jahresParameter[year].eingangssteuersatz3 ) * z + jahresParameter[year].basisKorrektur3
  } else if (zvE <= jahresParameter[year].eckwert4) {
      eSt = jahresParameter[year].grenzsteuersatz4 * zvE - jahresParameter[year].basisKorrektur4
  } else  {
      eSt = jahresParameter[year].grenzsteuersatz5 * zvE - jahresParameter[year].basisKorrektur5
  }

  return Math.floor(eSt)
}

/**
 * Berechnet den Grenzsteuersatz der deutschen Einkommensteuer nach Grundtarif (für Splittingtarif einfach zvE halbieren).
 * 
 * @param {number} einkommen zu versteuerndes Einkommen (zvE) in Euro
 * @param {number} jahr Jahr (2021–2024)
 * @return Grenzsteuersatz nach Grundtarif in Prozent
 * @customfunction
 */
function EST_STEUERSATZ(einkommen, jahr) {
  var zvE = Math.floor(einkommen)
  var eSt = EST_BETRAG(zvE, jahr)
  return eSt / zvE
}

/**
 * Berechnet den Durchschnittssteuersatz der deutschen Einkommensteuer nach Grundtarif (für Splittingtarif einfach zvE halbieren).
 * 
 * @param {number} einkommen zu versteuerndes Einkommen (zvE) in Euro
 * @param {number} jahr Jahr (2021–2024)
 * @return Durchschnittssteuersatz nach Grundtarif in Prozent
 * @customfunction
 */
function EST_GRENZSTEUERSATZ(einkommen, jahr) {
  var zvE = Math.floor(einkommen)
  var year = jahr

  var grenzsteuersatz = 0;
  if (zvE <= jahresParameter[year].eckwert1) {
      grenzsteuersatz = 0;
  } else if (zvE <= jahresParameter[year].eckwert2) {
      grenzsteuersatz = jahresParameter[year].eingangssteuersatz2 / 10000 + (zvE - jahresParameter[year].eckwert1) / (jahresParameter[year].eckwert2 - jahresParameter[year].eckwert1) * (jahresParameter[year].eingangssteuersatz3 - jahresParameter[year].eingangssteuersatz2 ) / 10000
  } else if (zvE <= jahresParameter[year].eckwert3) {
      grenzsteuersatz = jahresParameter[year].eingangssteuersatz3 / 10000 + (zvE - jahresParameter[year].eckwert2) / (jahresParameter[year].eckwert3 - jahresParameter[year].eckwert2) * (jahresParameter[year].grenzsteuersatz4 - jahresParameter[year].eingangssteuersatz3 / 10000)
  } else if (zvE <= jahresParameter[year].eckwert4) {
      grenzsteuersatz = jahresParameter[year].grenzsteuersatz4
  } else  {
      grenzsteuersatz = jahresParameter[year].grenzsteuersatz5
  }

  return grenzsteuersatz
}

/**
 * Berechnet den Solidaritätszuschlag auf Basis der deutschen Einkommensteuer
 * 
 * @param {number} eSt Einkommensteuerbetrag
 * @param {number} jahr Jahr (2021–2024)
 * @return Solidaritätszuschlag in Euro
 * @customfunction
 */
function SOLZ_BETRAG(eSt, jahr) {
  if (eSt <= jahresParameter[jahr].soliFreigrenze) {
    return 0
  } else {
    var milderungsZoneHoechstbetrag = ( eSt - jahresParameter[jahr].soliFreigrenze ) * jahresParameter[jahr].soliMilderungszoneSatz
    var soliNormal = jahresParameter[jahr].soliSatz * eSt
    return Math.floor(Math.min(milderungsZoneHoechstbetrag, soliNormal) * 100) / 100
  }
}

/**
 * Berechnet den Grenzsteuersatz des Solidaritätszuschlags (aktuell 0, 5,5 % oder 11,9 % in der Minderungszone)
 * 
 * @param {number} eSt Einkommensteuerbetrag
 * @param {number} jahr Jahr (2021–2024)
 * @return Grenzsteuersatz in Prozent
 * @customfunction
 */
function SOLZ_GRENZSTEUERSATZ(eSt, jahr) {
  if (eSt <= jahresParameter[jahr].soliFreigrenze) {
    return 0
  } else {
    var milderungsZoneHoechstbetrag = ( eSt - jahresParameter[jahr].soliFreigrenze ) * jahresParameter[jahr].soliMilderungszoneSatz
    var soliNormal = jahresParameter[jahr].soliSatz * eSt
    if(milderungsZoneHoechstbetrag <= soliNormal) {
      return jahresParameter[jahr].soliMilderungszoneSatz
    } else {
      return jahresParameter[jahr].soliSatz
    }
  }
}
