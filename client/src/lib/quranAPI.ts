import { apiRequest } from "./queryClient";

// Types
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

export interface SuraMetadata {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  totalAyahs: number;
}

export interface QuranPreferences {
  id: number;
  userId: number;
  currentSura: number;
  currentAyah: number;
  fontSize: number;
  scrollSpeed: number;
  darkMode: boolean;
}

export interface Bookmark {
  id: number;
  userId: number;
  suraId: number;
  ayahId: number;
  note: string | null;
  createdAt: string;
}

export interface SearchResult {
  sura: {
    number: number;
    name: string;
    englishName: string;
  };
  ayah: {
    number: number;
    numberInSurah: number;
    text: string;
    translation: string;
  };
}

// API functions
export async function fetchAllSuras(): Promise<SuraMetadata[]> {
  const response = await fetch('/api/quran/suras');
  if (!response.ok) {
    throw new Error('Failed to fetch suras');
  }
  const data = await response.json();
  return data.suras;
}

export async function fetchSura(suraNumber: number): Promise<Sura> {
  const response = await fetch(`/api/quran/suras/${suraNumber}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch sura ${suraNumber}`);
  }
  const data = await response.json();
  return data.sura;
}

export async function fetchUserPreferences(): Promise<QuranPreferences> {
  const response = await fetch('/api/preferences');
  if (!response.ok) {
    throw new Error('Failed to fetch user preferences');
  }
  const data = await response.json();
  return data.preferences;
}

export async function updateUserPreferences(preferences: Partial<QuranPreferences>): Promise<QuranPreferences> {
  const response = await apiRequest('POST', '/api/preferences', preferences);
  const data = await response.json();
  return data.preferences;
}

export async function fetchBookmarks(): Promise<Bookmark[]> {
  const response = await fetch('/api/bookmarks');
  if (!response.ok) {
    throw new Error('Failed to fetch bookmarks');
  }
  const data = await response.json();
  return data.bookmarks;
}

export async function createBookmark(bookmark: {
  suraId: number;
  ayahId: number;
  note?: string;
}): Promise<Bookmark> {
  const bookmarkData = {
    ...bookmark,
    userId: 1, // For demo purposes
    createdAt: new Date().toISOString(),
  };
  
  const response = await apiRequest('POST', '/api/bookmarks', bookmarkData);
  const data = await response.json();
  return data.bookmark;
}

export async function deleteBookmark(id: number): Promise<{ success: boolean }> {
  const response = await apiRequest('DELETE', `/api/bookmarks/${id}`, undefined);
  const data = await response.json();
  return data;
}

export async function searchQuran(query: string): Promise<SearchResult[]> {
  const response = await apiRequest('GET', `/api/quran/search?q=${encodeURIComponent(query)}`, undefined);
  const data = await response.json();
  return data.results;
}
