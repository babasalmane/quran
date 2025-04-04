import { useState, useEffect } from 'react';
import { fetchUserPreferences, updateUserPreferences } from './quranAPI';
import { queryClient } from './queryClient';

export function useQuranReader() {
  const [currentSura, setCurrentSura] = useState(1);
  const [currentAyah, setCurrentAyah] = useState(1);
  const [fontSize, setFontSize] = useState(3);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences when component mounts
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const prefs = await fetchUserPreferences();
        setCurrentSura(prefs.currentSura);
        setCurrentAyah(prefs.currentAyah);
        setFontSize(prefs.fontSize);
        setScrollSpeed(prefs.scrollSpeed);
        setDarkMode(prefs.darkMode);
      } catch (error) {
        console.error("Failed to load preferences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  // Save preferences when they change
  const savePreferences = async (
    preferences: Partial<{
      currentSura: number;
      currentAyah: number;
      fontSize: number;
      scrollSpeed: number;
      darkMode: boolean;
    }>
  ) => {
    try {
      await updateUserPreferences(preferences);
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    } catch (error) {
      console.error("Failed to save preferences:", error);
    }
  };

  const setPosition = (sura: number, ayah: number) => {
    setCurrentSura(sura);
    setCurrentAyah(ayah);
    savePreferences({ currentSura: sura, currentAyah: ayah });
  };

  const setPreferences = (
    prefs: Partial<{
      fontSize: number;
      scrollSpeed: number;
      darkMode: boolean;
    }>
  ) => {
    if (prefs.fontSize !== undefined) setFontSize(prefs.fontSize);
    if (prefs.scrollSpeed !== undefined) setScrollSpeed(prefs.scrollSpeed);
    if (prefs.darkMode !== undefined) setDarkMode(prefs.darkMode);
    savePreferences(prefs);
  };

  return {
    currentSura,
    currentAyah,
    fontSize,
    scrollSpeed,
    darkMode,
    isLoading,
    setPosition,
    setPreferences,
  };
}
