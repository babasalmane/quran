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

// Export function to get Quran metadata for all 114 suras
export function getQuranMetadata(): { number: number; name: string; englishName: string; totalAyahs: number }[] {
  return [
    { number: 1, name: "الفاتحة", englishName: "Al-Fatiha", totalAyahs: 7 },
    { number: 2, name: "البقرة", englishName: "Al-Baqarah", totalAyahs: 286 },
    { number: 3, name: "آل عمران", englishName: "Ali 'Imran", totalAyahs: 200 },
    { number: 4, name: "النساء", englishName: "An-Nisa", totalAyahs: 176 },
    { number: 5, name: "المائدة", englishName: "Al-Ma'idah", totalAyahs: 120 },
    { number: 6, name: "الأنعام", englishName: "Al-An'am", totalAyahs: 165 },
    { number: 7, name: "الأعراف", englishName: "Al-A'raf", totalAyahs: 206 },
    { number: 8, name: "الأنفال", englishName: "Al-Anfal", totalAyahs: 75 },
    { number: 9, name: "التوبة", englishName: "At-Tawbah", totalAyahs: 129 },
    { number: 10, name: "يونس", englishName: "Yunus", totalAyahs: 109 },
    { number: 11, name: "هود", englishName: "Hud", totalAyahs: 123 },
    { number: 12, name: "يوسف", englishName: "Yusuf", totalAyahs: 111 },
    { number: 13, name: "الرعد", englishName: "Ar-Ra'd", totalAyahs: 43 },
    { number: 14, name: "إبراهيم", englishName: "Ibrahim", totalAyahs: 52 },
    { number: 15, name: "الحجر", englishName: "Al-Hijr", totalAyahs: 99 },
    { number: 16, name: "النحل", englishName: "An-Nahl", totalAyahs: 128 },
    { number: 17, name: "الإسراء", englishName: "Al-Isra", totalAyahs: 111 },
    { number: 18, name: "الكهف", englishName: "Al-Kahf", totalAyahs: 110 },
    { number: 19, name: "مريم", englishName: "Maryam", totalAyahs: 98 },
    { number: 20, name: "طه", englishName: "Ta-Ha", totalAyahs: 135 },
    { number: 21, name: "الأنبياء", englishName: "Al-Anbiya", totalAyahs: 112 },
    { number: 22, name: "الحج", englishName: "Al-Hajj", totalAyahs: 78 },
    { number: 23, name: "المؤمنون", englishName: "Al-Mu'minun", totalAyahs: 118 },
    { number: 24, name: "النور", englishName: "An-Nur", totalAyahs: 64 },
    { number: 25, name: "الفرقان", englishName: "Al-Furqan", totalAyahs: 77 },
    { number: 26, name: "الشعراء", englishName: "Ash-Shu'ara", totalAyahs: 227 },
    { number: 27, name: "النمل", englishName: "An-Naml", totalAyahs: 93 },
    { number: 28, name: "القصص", englishName: "Al-Qasas", totalAyahs: 88 },
    { number: 29, name: "العنكبوت", englishName: "Al-Ankabut", totalAyahs: 69 },
    { number: 30, name: "الروم", englishName: "Ar-Rum", totalAyahs: 60 },
    { number: 31, name: "لقمان", englishName: "Luqman", totalAyahs: 34 },
    { number: 32, name: "السجدة", englishName: "As-Sajdah", totalAyahs: 30 },
    { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", totalAyahs: 73 },
    { number: 34, name: "سبأ", englishName: "Saba", totalAyahs: 54 },
    { number: 35, name: "فاطر", englishName: "Fatir", totalAyahs: 45 },
    { number: 36, name: "يس", englishName: "Ya-Sin", totalAyahs: 83 },
    { number: 37, name: "الصافات", englishName: "As-Saffat", totalAyahs: 182 },
    { number: 38, name: "ص", englishName: "Sad", totalAyahs: 88 },
    { number: 39, name: "الزمر", englishName: "Az-Zumar", totalAyahs: 75 },
    { number: 40, name: "غافر", englishName: "Ghafir", totalAyahs: 85 },
    { number: 41, name: "فصلت", englishName: "Fussilat", totalAyahs: 54 },
    { number: 42, name: "الشورى", englishName: "Ash-Shura", totalAyahs: 53 },
    { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", totalAyahs: 89 },
    { number: 44, name: "الدخان", englishName: "Ad-Dukhan", totalAyahs: 59 },
    { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", totalAyahs: 37 },
    { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", totalAyahs: 35 },
    { number: 47, name: "محمد", englishName: "Muhammad", totalAyahs: 38 },
    { number: 48, name: "الفتح", englishName: "Al-Fath", totalAyahs: 29 },
    { number: 49, name: "الحجرات", englishName: "Al-Hujurat", totalAyahs: 18 },
    { number: 50, name: "ق", englishName: "Qaf", totalAyahs: 45 },
    { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", totalAyahs: 60 },
    { number: 52, name: "الطور", englishName: "At-Tur", totalAyahs: 49 },
    { number: 53, name: "النجم", englishName: "An-Najm", totalAyahs: 62 },
    { number: 54, name: "القمر", englishName: "Al-Qamar", totalAyahs: 55 },
    { number: 55, name: "الرحمن", englishName: "Ar-Rahman", totalAyahs: 78 },
    { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", totalAyahs: 96 },
    { number: 57, name: "الحديد", englishName: "Al-Hadid", totalAyahs: 29 },
    { number: 58, name: "المجادلة", englishName: "Al-Mujadila", totalAyahs: 22 },
    { number: 59, name: "الحشر", englishName: "Al-Hashr", totalAyahs: 24 },
    { number: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", totalAyahs: 13 },
    { number: 61, name: "الصف", englishName: "As-Saff", totalAyahs: 14 },
    { number: 62, name: "الجمعة", englishName: "Al-Jumu'ah", totalAyahs: 11 },
    { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", totalAyahs: 11 },
    { number: 64, name: "التغابن", englishName: "At-Taghabun", totalAyahs: 18 },
    { number: 65, name: "الطلاق", englishName: "At-Talaq", totalAyahs: 12 },
    { number: 66, name: "التحريم", englishName: "At-Tahrim", totalAyahs: 12 },
    { number: 67, name: "الملك", englishName: "Al-Mulk", totalAyahs: 30 },
    { number: 68, name: "القلم", englishName: "Al-Qalam", totalAyahs: 52 },
    { number: 69, name: "الحاقة", englishName: "Al-Haqqah", totalAyahs: 52 },
    { number: 70, name: "المعارج", englishName: "Al-Ma'arij", totalAyahs: 44 },
    { number: 71, name: "نوح", englishName: "Nuh", totalAyahs: 28 },
    { number: 72, name: "الجن", englishName: "Al-Jinn", totalAyahs: 28 },
    { number: 73, name: "المزمل", englishName: "Al-Muzzammil", totalAyahs: 20 },
    { number: 74, name: "المدثر", englishName: "Al-Muddathir", totalAyahs: 56 },
    { number: 75, name: "القيامة", englishName: "Al-Qiyamah", totalAyahs: 40 },
    { number: 76, name: "الإنسان", englishName: "Al-Insan", totalAyahs: 31 },
    { number: 77, name: "المرسلات", englishName: "Al-Mursalat", totalAyahs: 50 },
    { number: 78, name: "النبأ", englishName: "An-Naba", totalAyahs: 40 },
    { number: 79, name: "النازعات", englishName: "An-Nazi'at", totalAyahs: 46 },
    { number: 80, name: "عبس", englishName: "Abasa", totalAyahs: 42 },
    { number: 81, name: "التكوير", englishName: "At-Takwir", totalAyahs: 29 },
    { number: 82, name: "الإنفطار", englishName: "Al-Infitar", totalAyahs: 19 },
    { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", totalAyahs: 36 },
    { number: 84, name: "الإنشقاق", englishName: "Al-Inshiqaq", totalAyahs: 25 },
    { number: 85, name: "البروج", englishName: "Al-Buruj", totalAyahs: 22 },
    { number: 86, name: "الطارق", englishName: "At-Tariq", totalAyahs: 17 },
    { number: 87, name: "الأعلى", englishName: "Al-A'la", totalAyahs: 19 },
    { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", totalAyahs: 26 },
    { number: 89, name: "الفجر", englishName: "Al-Fajr", totalAyahs: 30 },
    { number: 90, name: "البلد", englishName: "Al-Balad", totalAyahs: 20 },
    { number: 91, name: "الشمس", englishName: "Ash-Shams", totalAyahs: 15 },
    { number: 92, name: "الليل", englishName: "Al-Layl", totalAyahs: 21 },
    { number: 93, name: "الضحى", englishName: "Ad-Duha", totalAyahs: 11 },
    { number: 94, name: "الشرح", englishName: "Ash-Sharh", totalAyahs: 8 },
    { number: 95, name: "التين", englishName: "At-Tin", totalAyahs: 8 },
    { number: 96, name: "العلق", englishName: "Al-Alaq", totalAyahs: 19 },
    { number: 97, name: "القدر", englishName: "Al-Qadr", totalAyahs: 5 },
    { number: 98, name: "البينة", englishName: "Al-Bayyinah", totalAyahs: 8 },
    { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", totalAyahs: 8 },
    { number: 100, name: "العاديات", englishName: "Al-Adiyat", totalAyahs: 11 },
    { number: 101, name: "القارعة", englishName: "Al-Qari'ah", totalAyahs: 11 },
    { number: 102, name: "التكاثر", englishName: "At-Takathur", totalAyahs: 8 },
    { number: 103, name: "العصر", englishName: "Al-Asr", totalAyahs: 3 },
    { number: 104, name: "الهمزة", englishName: "Al-Humazah", totalAyahs: 9 },
    { number: 105, name: "الفيل", englishName: "Al-Fil", totalAyahs: 5 },
    { number: 106, name: "قريش", englishName: "Quraysh", totalAyahs: 4 },
    { number: 107, name: "الماعون", englishName: "Al-Ma'un", totalAyahs: 7 },
    { number: 108, name: "الكوثر", englishName: "Al-Kawthar", totalAyahs: 3 },
    { number: 109, name: "الكافرون", englishName: "Al-Kafirun", totalAyahs: 6 },
    { number: 110, name: "النصر", englishName: "An-Nasr", totalAyahs: 3 },
    { number: 111, name: "المسد", englishName: "Al-Masad", totalAyahs: 5 },
    { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", totalAyahs: 4 },
    { number: 113, name: "الفلق", englishName: "Al-Falaq", totalAyahs: 5 },
    { number: 114, name: "الناس", englishName: "An-Nas", totalAyahs: 6 }
  ];
}

// Arabic numerals mapping (western to Arabic)
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

// Helper function to convert western numbers to Arabic numerals
export function toArabicNumeral(num: number): string {
  return num.toString().split('').map(digit => arabicNumerals[digit] || digit).join('');
}
