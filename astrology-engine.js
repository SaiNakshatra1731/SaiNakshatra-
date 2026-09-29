// ==========================================
// SAI NAKSHATRA - ASTROLOGY ENGINE
// ==========================================

// Rashi names
const RASHIS = [
    "Mesha (Aries)",
    "Vrishabha (Taurus)",
    "Mithuna (Gemini)",
    "Karka (Cancer)",
    "Simha (Leo)",
    "Kanya (Virgo)",
    "Tula (Libra)",
    "Vrishchika (Scorpio)",
    "Dhanu (Sagittarius)",
    "Makara (Capricorn)",
    "Kumbha (Aquarius)",
    "Meena (Pisces)"
];

// 27 Nakshatras
const NAKSHATRAS = [
    "Ashwini",
    "Bharani",
    "Krittika",
    "Rohini",
    "Mrigashira",
    "Ardra",
    "Punarvasu",
    "Pushya",
    "Ashlesha",
    "Magha",
    "Purva Phalguni",
    "Uttara Phalguni",
    "Hasta",
    "Chitra",
    "Swati",
    "Vishakha",
    "Anuradha",
    "Jyeshtha",
    "Mula",
    "Purva Ashadha",
    "Uttara Ashadha",
    "Shravana",
    "Dhanishtha",
    "Shatabhisha",
    "Purva Bhadrapada",
    "Uttara Bhadrapada",
    "Revati"
];


// Keep an angle between 0° and 360°
function normalizeDegrees(degrees) {
    degrees = degrees % 360;

    if (degrees < 0) {
        degrees += 360;
    }

    return degrees;
}


// Convert sidereal longitude to Rashi
function longitudeToRashi(siderealLongitude) {

    const longitude = normalizeDegrees(siderealLongitude);

    const rashiIndex = Math.floor(longitude / 30);

    return {
        index: rashiIndex,
        name: RASHIS[rashiIndex],
        degreeInRashi: longitude % 30
    };
}


// Convert sidereal Moon longitude to Nakshatra
function longitudeToNakshatra(siderealLongitude) {

    const longitude = normalizeDegrees(siderealLongitude);

    const nakshatraSize = 360 / 27;

    const nakshatraIndex = Math.floor(longitude / nakshatraSize);

    const positionInsideNakshatra =
        longitude % nakshatraSize;

    const pada =
        Math.floor(positionInsideNakshatra / (nakshatraSize / 4)) + 1;

    return {
        index: nakshatraIndex,
        name: NAKSHATRAS[nakshatraIndex],
        pada: pada
    };
}


// Main Moon result function
function calculateMoonResult(siderealMoonLongitude) {

    const rashi =
        longitudeToRashi(siderealMoonLongitude);

    const nakshatra =
        longitudeToNakshatra(siderealMoonLongitude);

    return {
        moonLongitude: siderealMoonLongitude,
        rashi: rashi,
        nakshatra: nakshatra
    };
}
