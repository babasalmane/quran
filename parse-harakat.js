import * as fs from 'fs';

// Read the harakat text file
const harakatText = fs.readFileSync('attached_assets/harakat', 'utf8');

// Parse the Quran text
function parseQuranText(text) {
  // Split by surah markers
  const surahs = text.split('&&').filter(s => s.trim());
  
  const parsedSurahs = [];
  
  surahs.forEach((surah, index) => {
    // Get surah number (indexed from 1)
    const suraNumber = index + 1;
    
    // Get surah name and English name based on well-known information
    let suraName, englishName, englishNameTranslation, revelationType;
    
    // This is a simplified approach - in a production app, you'd have a complete mapping
    switch(suraNumber) {
      case 1:
        suraName = "الفاتحة";
        englishName = "Al-Fatiha";
        englishNameTranslation = "The Opening";
        revelationType = "Meccan";
        break;
      case 2:
        suraName = "البقرة";
        englishName = "Al-Baqarah";
        englishNameTranslation = "The Cow";
        revelationType = "Medinan";
        break;
      case 3:
        suraName = "آل عمران";
        englishName = "Aal-E-Imran";  
        englishNameTranslation = "The Family of Imran";
        revelationType = "Medinan";
        break;
      case 4:
        suraName = "النساء";
        englishName = "An-Nisa";
        englishNameTranslation = "The Women";
        revelationType = "Medinan";
        break;
      case 5:
        suraName = "المائدة";
        englishName = "Al-Ma'idah";
        englishNameTranslation = "The Table Spread";
        revelationType = "Medinan";
        break;
      // Add more mappings as needed
      default:
        suraName = `Surah ${suraNumber}`;
        englishName = `Surah ${suraNumber}`;
        englishNameTranslation = `Surah ${suraNumber}`;
        revelationType = "Unknown";
    }
    
    // Split by verse markers and process each verse
    const verses = surah.split('##').map(v => v.trim()).filter(v => v);
    
    const ayahs = verses.map((verse, idx) => {
      return {
        number: idx + 1,
        text: verse,
        translation: "", // No translation requested
        numberInSurah: idx + 1,
        juz: 0, // Simplified
        sajda: false // Simplified
      };
    });
    
    parsedSurahs.push({
      number: suraNumber,
      name: suraName,
      englishName,
      englishNameTranslation,
      revelationType,
      ayahs,
      totalAyahs: ayahs.length
    });
  });
  
  return parsedSurahs;
}

// Generate the Quran data file with the parsed content
function generateQuranDataFile(suras) {
  const suraMetadata = suras.map(sura => ({
    number: sura.number,
    name: sura.name,
    englishName: sura.englishName,
    englishNameTranslation: sura.englishNameTranslation,
    totalAyahs: sura.totalAyahs
  }));
  
  const fileContent = `// This file is auto-generated - do not edit manually
  
export const suraMetadata = ${JSON.stringify(suraMetadata, null, 2)};

export const quranData = ${JSON.stringify(suras, null, 2)};
`;

  fs.writeFileSync('shared/quranData.ts', fileContent);
  console.log('Quran data file has been updated with the new harakat text.');
}

// Execute the parsing and file generation
const parsedSurahs = parseQuranText(harakatText);
generateQuranDataFile(parsedSurahs);