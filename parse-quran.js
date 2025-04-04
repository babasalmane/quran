import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the Quran text file
const quranText = fs.readFileSync(path.join(__dirname, 'attached_assets', 'harakat'), 'utf8');

// Define metadata for suras
const suraMetadata = [
  { name: "الفاتحة", englishName: "Al-Fatiha", englishNameTranslation: "The Opening", revelationType: "Meccan" },
  { name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", revelationType: "Medinan" },
  { name: "آل عمران", englishName: "Ali 'Imran", englishNameTranslation: "The Family of Imran", revelationType: "Medinan" },
  { name: "النساء", englishName: "An-Nisa", englishNameTranslation: "The Women", revelationType: "Medinan" },
  { name: "المائدة", englishName: "Al-Ma'idah", englishNameTranslation: "The Table Spread", revelationType: "Medinan" },
  { name: "الأنعام", englishName: "Al-An'am", englishNameTranslation: "The Cattle", revelationType: "Meccan" },
  { name: "الأعراف", englishName: "Al-A'raf", englishNameTranslation: "The Heights", revelationType: "Meccan" },
  { name: "الأنفال", englishName: "Al-Anfal", englishNameTranslation: "The Spoils of War", revelationType: "Medinan" },
  { name: "التوبة", englishName: "At-Tawbah", englishNameTranslation: "The Repentance", revelationType: "Medinan" },
  { name: "يونس", englishName: "Yunus", englishNameTranslation: "Jonah", revelationType: "Meccan" },
  { name: "هود", englishName: "Hud", englishNameTranslation: "Hud", revelationType: "Meccan" },
  { name: "يوسف", englishName: "Yusuf", englishNameTranslation: "Joseph", revelationType: "Meccan" },
  { name: "الرعد", englishName: "Ar-Ra'd", englishNameTranslation: "The Thunder", revelationType: "Medinan" },
  { name: "إبراهيم", englishName: "Ibrahim", englishNameTranslation: "Abraham", revelationType: "Meccan" },
  { name: "الحجر", englishName: "Al-Hijr", englishNameTranslation: "The Rocky Tract", revelationType: "Meccan" },
  { name: "النحل", englishName: "An-Nahl", englishNameTranslation: "The Bee", revelationType: "Meccan" },
  { name: "الإسراء", englishName: "Al-Isra", englishNameTranslation: "The Night Journey", revelationType: "Meccan" },
  { name: "الكهف", englishName: "Al-Kahf", englishNameTranslation: "The Cave", revelationType: "Meccan" },
  { name: "مريم", englishName: "Maryam", englishNameTranslation: "Mary", revelationType: "Meccan" },
  { name: "طه", englishName: "Ta-Ha", englishNameTranslation: "Ta-Ha", revelationType: "Meccan" },
  { name: "الأنبياء", englishName: "Al-Anbiya", englishNameTranslation: "The Prophets", revelationType: "Meccan" },
  { name: "الحج", englishName: "Al-Hajj", englishNameTranslation: "The Pilgrimage", revelationType: "Medinan" },
  { name: "المؤمنون", englishName: "Al-Mu'minun", englishNameTranslation: "The Believers", revelationType: "Meccan" },
  { name: "النور", englishName: "An-Nur", englishNameTranslation: "The Light", revelationType: "Medinan" },
  { name: "الفرقان", englishName: "Al-Furqan", englishNameTranslation: "The Criterion", revelationType: "Meccan" },
  { name: "الشعراء", englishName: "Ash-Shu'ara", englishNameTranslation: "The Poets", revelationType: "Meccan" },
  { name: "النمل", englishName: "An-Naml", englishNameTranslation: "The Ant", revelationType: "Meccan" },
  { name: "القصص", englishName: "Al-Qasas", englishNameTranslation: "The Stories", revelationType: "Meccan" },
  { name: "العنكبوت", englishName: "Al-'Ankabut", englishNameTranslation: "The Spider", revelationType: "Meccan" },
  { name: "الروم", englishName: "Ar-Rum", englishNameTranslation: "The Romans", revelationType: "Meccan" },
  { name: "لقمان", englishName: "Luqman", englishNameTranslation: "Luqman", revelationType: "Meccan" },
  { name: "السجدة", englishName: "As-Sajdah", englishNameTranslation: "The Prostration", revelationType: "Meccan" },
  { name: "الأحزاب", englishName: "Al-Ahzab", englishNameTranslation: "The Combined Forces", revelationType: "Medinan" },
  { name: "سبإ", englishName: "Saba'", englishNameTranslation: "Sheba", revelationType: "Meccan" },
  { name: "فاطر", englishName: "Fatir", englishNameTranslation: "Originator", revelationType: "Meccan" },
  { name: "يس", englishName: "Ya-Sin", englishNameTranslation: "Ya Sin", revelationType: "Meccan" },
  { name: "الصافات", englishName: "As-Saffat", englishNameTranslation: "Those who set the Ranks", revelationType: "Meccan" },
  { name: "ص", englishName: "Sad", englishNameTranslation: "The Letter Sad", revelationType: "Meccan" },
  { name: "الزمر", englishName: "Az-Zumar", englishNameTranslation: "The Troops", revelationType: "Meccan" },
  { name: "غافر", englishName: "Ghafir", englishNameTranslation: "The Forgiver", revelationType: "Meccan" },
  { name: "فصلت", englishName: "Fussilat", englishNameTranslation: "Explained in Detail", revelationType: "Meccan" },
  { name: "الشورى", englishName: "Ash-Shura", englishNameTranslation: "The Consultation", revelationType: "Meccan" },
  { name: "الزخرف", englishName: "Az-Zukhruf", englishNameTranslation: "The Ornaments of Gold", revelationType: "Meccan" },
  { name: "الدخان", englishName: "Ad-Dukhan", englishNameTranslation: "The Smoke", revelationType: "Meccan" },
  { name: "الجاثية", englishName: "Al-Jathiyah", englishNameTranslation: "The Crouching", revelationType: "Meccan" },
  { name: "الأحقاف", englishName: "Al-Ahqaf", englishNameTranslation: "The Wind-Curved Sandhills", revelationType: "Meccan" },
  { name: "محمد", englishName: "Muhammad", englishNameTranslation: "Muhammad", revelationType: "Medinan" },
  { name: "الفتح", englishName: "Al-Fath", englishNameTranslation: "The Victory", revelationType: "Medinan" },
  { name: "الحجرات", englishName: "Al-Hujurat", englishNameTranslation: "The Rooms", revelationType: "Medinan" },
  { name: "ق", englishName: "Qaf", englishNameTranslation: "The Letter Qaf", revelationType: "Meccan" },
  { name: "الذاريات", englishName: "Adh-Dhariyat", englishNameTranslation: "The Winnowing Winds", revelationType: "Meccan" },
  { name: "الطور", englishName: "At-Tur", englishNameTranslation: "The Mount", revelationType: "Meccan" },
  { name: "النجم", englishName: "An-Najm", englishNameTranslation: "The Star", revelationType: "Meccan" },
  { name: "القمر", englishName: "Al-Qamar", englishNameTranslation: "The Moon", revelationType: "Meccan" },
  { name: "الرحمن", englishName: "Ar-Rahman", englishNameTranslation: "The Beneficent", revelationType: "Medinan" },
  { name: "الواقعة", englishName: "Al-Waqi'ah", englishNameTranslation: "The Inevitable", revelationType: "Meccan" },
  { name: "الحديد", englishName: "Al-Hadid", englishNameTranslation: "The Iron", revelationType: "Medinan" },
  { name: "المجادلة", englishName: "Al-Mujadilah", englishNameTranslation: "The Pleading Woman", revelationType: "Medinan" },
  { name: "الحشر", englishName: "Al-Hashr", englishNameTranslation: "The Exile", revelationType: "Medinan" },
  { name: "الممتحنة", englishName: "Al-Mumtahanah", englishNameTranslation: "She that is to be examined", revelationType: "Medinan" },
  { name: "الصف", englishName: "As-Saff", englishNameTranslation: "The Ranks", revelationType: "Medinan" },
  { name: "الجمعة", englishName: "Al-Jumu'ah", englishNameTranslation: "The Congregation, Friday", revelationType: "Medinan" },
  { name: "المنافقون", englishName: "Al-Munafiqun", englishNameTranslation: "The Hypocrites", revelationType: "Medinan" },
  { name: "التغابن", englishName: "At-Taghabun", englishNameTranslation: "The Mutual Disillusion", revelationType: "Medinan" },
  { name: "الطلاق", englishName: "At-Talaq", englishNameTranslation: "The Divorce", revelationType: "Medinan" },
  { name: "التحريم", englishName: "At-Tahrim", englishNameTranslation: "The Prohibition", revelationType: "Medinan" },
  { name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", revelationType: "Meccan" },
  { name: "القلم", englishName: "Al-Qalam", englishNameTranslation: "The Pen", revelationType: "Meccan" },
  { name: "الحاقة", englishName: "Al-Haqqah", englishNameTranslation: "The Reality", revelationType: "Meccan" },
  { name: "المعارج", englishName: "Al-Ma'arij", englishNameTranslation: "The Ascending Stairways", revelationType: "Meccan" },
  { name: "نوح", englishName: "Nuh", englishNameTranslation: "Noah", revelationType: "Meccan" },
  { name: "الجن", englishName: "Al-Jinn", englishNameTranslation: "The Jinn", revelationType: "Meccan" },
  { name: "المزمل", englishName: "Al-Muzzammil", englishNameTranslation: "The Enshrouded One", revelationType: "Meccan" },
  { name: "المدثر", englishName: "Al-Muddathir", englishNameTranslation: "The Cloaked One", revelationType: "Meccan" },
  { name: "القيامة", englishName: "Al-Qiyamah", englishNameTranslation: "The Resurrection", revelationType: "Meccan" },
  { name: "الانسان", englishName: "Al-Insan", englishNameTranslation: "The Man", revelationType: "Medinan" },
  { name: "المرسلات", englishName: "Al-Mursalat", englishNameTranslation: "The Emissaries", revelationType: "Meccan" },
  { name: "النبإ", englishName: "An-Naba'", englishNameTranslation: "The Tidings", revelationType: "Meccan" },
  { name: "النازعات", englishName: "An-Nazi'at", englishNameTranslation: "Those who drag forth", revelationType: "Meccan" },
  { name: "عبس", englishName: "Abasa", englishNameTranslation: "He Frowned", revelationType: "Meccan" },
  { name: "التكوير", englishName: "At-Takwir", englishNameTranslation: "The Overthrowing", revelationType: "Meccan" },
  { name: "الإنفطار", englishName: "Al-Infitar", englishNameTranslation: "The Cleaving", revelationType: "Meccan" },
  { name: "المطففين", englishName: "Al-Mutaffifin", englishNameTranslation: "The Defrauding", revelationType: "Meccan" },
  { name: "الإنشقاق", englishName: "Al-Inshiqaq", englishNameTranslation: "The Sundering", revelationType: "Meccan" },
  { name: "البروج", englishName: "Al-Buruj", englishNameTranslation: "The Mansions of the Stars", revelationType: "Meccan" },
  { name: "الطارق", englishName: "At-Tariq", englishNameTranslation: "The Nightcomer", revelationType: "Meccan" },
  { name: "الأعلى", englishName: "Al-A'la", englishNameTranslation: "The Most High", revelationType: "Meccan" },
  { name: "الغاشية", englishName: "Al-Ghashiyah", englishNameTranslation: "The Overwhelming", revelationType: "Meccan" },
  { name: "الفجر", englishName: "Al-Fajr", englishNameTranslation: "The Dawn", revelationType: "Meccan" },
  { name: "البلد", englishName: "Al-Balad", englishNameTranslation: "The City", revelationType: "Meccan" },
  { name: "الشمس", englishName: "Ash-Shams", englishNameTranslation: "The Sun", revelationType: "Meccan" },
  { name: "الليل", englishName: "Al-Lail", englishNameTranslation: "The Night", revelationType: "Meccan" },
  { name: "الضحى", englishName: "Ad-Duha", englishNameTranslation: "The Morning Hours", revelationType: "Meccan" },
  { name: "الشرح", englishName: "Ash-Sharh", englishNameTranslation: "The Relief", revelationType: "Meccan" },
  { name: "التين", englishName: "At-Tin", englishNameTranslation: "The Fig", revelationType: "Meccan" },
  { name: "العلق", englishName: "Al-'Alaq", englishNameTranslation: "The Clot", revelationType: "Meccan" },
  { name: "القدر", englishName: "Al-Qadr", englishNameTranslation: "The Power", revelationType: "Meccan" },
  { name: "البينة", englishName: "Al-Bayyinah", englishNameTranslation: "The Clear Proof", revelationType: "Medinan" },
  { name: "الزلزلة", englishName: "Az-Zalzalah", englishNameTranslation: "The Earthquake", revelationType: "Medinan" },
  { name: "العاديات", englishName: "Al-'Adiyat", englishNameTranslation: "The Courser", revelationType: "Meccan" },
  { name: "القارعة", englishName: "Al-Qari'ah", englishNameTranslation: "The Calamity", revelationType: "Meccan" },
  { name: "التكاثر", englishName: "At-Takathur", englishNameTranslation: "The Rivalry in world increase", revelationType: "Meccan" },
  { name: "العصر", englishName: "Al-'Asr", englishNameTranslation: "The Declining Day", revelationType: "Meccan" },
  { name: "الهمزة", englishName: "Al-Humazah", englishNameTranslation: "The Traducer", revelationType: "Meccan" },
  { name: "الفيل", englishName: "Al-Fil", englishNameTranslation: "The Elephant", revelationType: "Meccan" },
  { name: "قريش", englishName: "Quraysh", englishNameTranslation: "Quraysh", revelationType: "Meccan" },
  { name: "الماعون", englishName: "Al-Ma'un", englishNameTranslation: "The Small Kindnesses", revelationType: "Meccan" },
  { name: "الكوثر", englishName: "Al-Kawthar", englishNameTranslation: "The Abundance", revelationType: "Meccan" },
  { name: "الكافرون", englishName: "Al-Kafirun", englishNameTranslation: "The Disbelievers", revelationType: "Meccan" },
  { name: "النصر", englishName: "An-Nasr", englishNameTranslation: "The Divine Support", revelationType: "Medinan" },
  { name: "المسد", englishName: "Al-Masad", englishNameTranslation: "The Palm Fiber", revelationType: "Meccan" },
  { name: "الإخلاص", englishName: "Al-Ikhlas", englishNameTranslation: "The Sincerity", revelationType: "Meccan" },
  { name: "الفلق", englishName: "Al-Falaq", englishNameTranslation: "The Daybreak", revelationType: "Meccan" },
  { name: "الناس", englishName: "An-Nas", englishNameTranslation: "The Mankind", revelationType: "Meccan" },
];

// Parse the Quran text
function parseQuranText(text) {
  const suras = [];
  const surasData = text.split('&&').filter(s => s.trim());

  for (let i = 0; i < surasData.length; i++) {
    const suraText = surasData[i].trim();
    const verses = suraText.split('##').map(v => v.trim()).filter(v => v);
    
    const ayahs = [];
    let ayahNumber = 1;
    let totalAyahNumber = i > 0 ? suras.reduce((sum, s, idx) => idx < i ? sum + s.ayahs.length : sum, 0) + 1 : 1;
    
    for (let j = 0; j < verses.length; j++) {
      // Create simple translation for now - we'll improve this later
      const translation = `Translation of verse ${j + 1}`;
      
      ayahs.push({
        number: totalAyahNumber,
        text: verses[j],
        translation: translation,
        numberInSurah: ayahNumber,
        juz: Math.ceil((i + 1) / 10), // Simple juz calculation
        sajda: false, // Default, we'd need separate data for prostration verses
      });
      
      ayahNumber++;
      totalAyahNumber++;
    }
    
    suras.push({
      number: i + 1,
      name: suraMetadata[i]?.name || `Sura ${i + 1}`,
      englishName: suraMetadata[i]?.englishName || `Sura ${i + 1}`,
      englishNameTranslation: suraMetadata[i]?.englishNameTranslation || `Chapter ${i + 1}`,
      revelationType: suraMetadata[i]?.revelationType || "Unknown",
      ayahs: ayahs,
      totalAyahs: ayahs.length,
    });
  }
  
  return suras;
}

// Generate the QuranData.ts file
function generateQuranDataFile(suras) {
  const result = {
    suras: suras
  };
  
  // Write to shared/quranData.ts
  const quranDataContent = `
// Auto-generated from the Quran text file

export interface Ayah {
  number: number;
  text: string;
  translation: string;
  numberInSurah: number;
  juz: number;
  sajda: boolean;
}

export interface Sura {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahs: Ayah[];
  totalAyahs: number;
}

export interface QuranData {
  suras: Sura[];
}

export function getQuranMetadata(): { number: number; name: string; englishName: string; englishNameTranslation: string; totalAyahs: number }[] {
  return quranData.suras.map(sura => ({
    number: sura.number,
    name: sura.name,
    englishName: sura.englishName,
    englishNameTranslation: sura.englishNameTranslation,
    totalAyahs: sura.totalAyahs
  }));
}

export const arabicNumerals: Record<string, string> = {
  '0': '٠',
  '1': '١',
  '2': '٢',
  '3': '٣',
  '4': '٤',
  '5': '٥',
  '6': '٦',
  '7': '٧',
  '8': '٨',
  '9': '٩'
};

export function toArabicNumeral(num: number): string {
  return num.toString().split('').map(digit => arabicNumerals[digit] || digit).join('');
}

// Full Quran data
export const quranData: QuranData = ${JSON.stringify(result, null, 2)};
`;
  
  fs.writeFileSync(path.join(__dirname, 'shared', 'quranData.ts'), quranDataContent);
  console.log('Generated shared/quranData.ts with all suras.');
}

// Execute the parsing and file generation
try {
  const suras = parseQuranText(quranText);
  generateQuranDataFile(suras);
} catch (error) {
  console.error('Error parsing Quran text:', error);
}