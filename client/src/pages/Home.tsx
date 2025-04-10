import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PageWrapper } from "@/components/ui/layout";
import Header from "@/components/Header";
import NavigationDrawer from "@/components/NavigationDrawer";
import QuranContent from "@/components/QuranContent";
import SearchOverlay from "@/components/SearchOverlay";
import SettingsPanel from "@/components/SettingsPanel";
import { fetchAllSuras, fetchSura, fetchUserPreferences, updateUserPreferences, createBookmark } from "@/lib/quranAPI";
import { useAutoScroll } from "@/lib/useAutoScroll";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  // State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentSura, setCurrentSura] = useState(1);
  const [currentAyah, setCurrentAyah] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(3);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  
  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Hooks
  const { toast } = useToast();
  const { isAutoScrolling, toggleAutoScroll, setScrollSpeed: setAutoScrollSpeed } = useAutoScroll(scrollRef);
  
  // Queries
  const { data: suras = [] } = useQuery({
    queryKey: ['/api/quran/suras'],
    queryFn: () => fetchAllSuras()
  });
  
  const { data: currentSuraData, isLoading: isLoadingSura } = useQuery({
    queryKey: ['/api/quran/suras', currentSura],
    queryFn: () => fetchSura(currentSura)
  });
  
  const { data: preferences, isLoading: isLoadingPreferences } = useQuery({
    queryKey: ['/api/preferences'],
    queryFn: () => fetchUserPreferences()
  });
  
  // Mutations
  const updatePreferencesMutation = useMutation({
    mutationFn: (prefs: Partial<{
      currentSura: number;
      currentAyah: number;
      fontSize: number;
      scrollSpeed: number;
      darkMode: boolean;
      doNotDisturb: boolean;
    }>) => updateUserPreferences(prefs),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    }
  });
  
  const createBookmarkMutation = useMutation({
    mutationFn: (bookmark: {
      suraId: number;
      ayahId: number;
      note?: string;
    }) => createBookmark(bookmark),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
      toast({
        title: "تم إضافة الإشارة المرجعية",
        description: "تمت إضافة الإشارة المرجعية بنجاح"
      });
    }
  });
  
  // Effects
  useEffect(() => {
    // Load user preferences
    if (preferences) {
      setCurrentSura(preferences.currentSura);
      setCurrentAyah(preferences.currentAyah);
      setFontSize(preferences.fontSize);
      setScrollSpeed(preferences.scrollSpeed);
      setDarkMode(preferences.darkMode);
      setDoNotDisturb(preferences.doNotDisturb);
      setAutoScrollSpeed(preferences.scrollSpeed);
      
      // Apply dark mode
      if (preferences.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [preferences]);
  
  // Save current position when it changes
  useEffect(() => {
    if (currentSura && currentAyah) {
      updatePreferencesMutation.mutate({
        currentSura,
        currentAyah
      });
    }
  }, [currentSura, currentAyah]);
  
  // Apply dark mode when it changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Apply do-not-disturb mode when it changes
  useEffect(() => {
    if (doNotDisturb) {
      document.body.classList.add('do-not-disturb-active');
    } else {
      document.body.classList.remove('do-not-disturb-active');
    }
  }, [doNotDisturb]);
  
  // Handlers
  const handleSuraSelect = (suraNumber: number) => {
    setCurrentSura(suraNumber);
    setCurrentAyah(1); // Reset to first ayah when changing sura
  };
  
  const handleSettingsChange = (newSettings: Partial<{
    darkMode: boolean;
    fontSize: number;
    scrollSpeed: number;
    doNotDisturb: boolean;
  }>) => {
    if (newSettings.darkMode !== undefined) setDarkMode(newSettings.darkMode);
    if (newSettings.fontSize !== undefined) setFontSize(newSettings.fontSize);
    if (newSettings.scrollSpeed !== undefined) {
      setScrollSpeed(newSettings.scrollSpeed);
      setAutoScrollSpeed(newSettings.scrollSpeed);
    }
    if (newSettings.doNotDisturb !== undefined) setDoNotDisturb(newSettings.doNotDisturb);
    
    // Save to server
    updatePreferencesMutation.mutate(newSettings);
  };
  
  const handlePrevSura = () => {
    if (currentSura > 1) {
      setCurrentSura(currentSura - 1);
      setCurrentAyah(1); // Reset to first ayah
    }
  };
  
  const handleNextSura = () => {
    if (currentSura < 114 && currentSura < suras.length) {
      setCurrentSura(currentSura + 1);
      setCurrentAyah(1); // Reset to first ayah
    }
  };
  
  const handleSearchResultSelect = (suraId: number, ayahId: number) => {
    setCurrentSura(suraId);
    setCurrentAyah(ayahId);
  };
  
  const handleBookmark = () => {
    // Create a bookmark for the current sura and ayah
    createBookmarkMutation.mutate({
      suraId: currentSura,
      ayahId: currentAyah,
      note: `${currentSuraData?.name} - آية ${currentAyah}`
    });
  };
  
  // Render loading state
  if (isLoadingSura || isLoadingPreferences) {
    return (
      <PageWrapper className="flex items-center justify-center dark:bg-darkBg">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-lg text-primary dark:text-white">جاري تحميل القرآن الكريم...</p>
        </div>
      </PageWrapper>
    );
  }
  
  // If sura data isn't loaded yet
  if (!currentSuraData) {
    return null;
  }
  
  // Format the current position for display in the header
  const currentPositionText = `الآية ${currentAyah}/${currentSuraData.ayahs.length}`;

  return (
    <PageWrapper className={`dark:bg-darkBg transition-colors duration-300`}>
      <Header 
        title="القرآن الكريم"
        onMenuClick={() => setIsDrawerOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
        onBookmarkClick={handleBookmark}
        onSettingsClick={() => setIsSettingsOpen(true)}
        isAutoScrolling={isAutoScrolling}
        onAutoScrollToggle={toggleAutoScroll}
        currentSuraName={currentSuraData.name}
        currentPosition={currentPositionText}
      />
      
      <NavigationDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        suras={suras}
        onSuraSelect={handleSuraSelect}
        currentSura={currentSura}
      />
      
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onResultSelect={handleSearchResultSelect}
      />
      
      <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={{ darkMode, fontSize, scrollSpeed, doNotDisturb }}
        onSettingsChange={handleSettingsChange}
      />
      
      <QuranContent 
        sura={currentSuraData}
        currentAyah={currentAyah}
        setCurrentAyah={setCurrentAyah}
        isAutoScrolling={isAutoScrolling}
        fontSize={fontSize}
        darkMode={darkMode}
        scrollRef={scrollRef}
        onNextSura={handleNextSura}
      />
    </PageWrapper>
  );
}
