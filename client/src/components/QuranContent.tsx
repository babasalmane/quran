import { useRef, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MoreVertical, Book } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { type Sura, type Ayah } from "@/lib/quranAPI";

interface QuranContentProps {
  sura: Sura;
  currentAyah: number;
  setCurrentAyah: (ayahNumber: number) => void;
  isAutoScrolling: boolean;
  fontSize: number;
  darkMode: boolean;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export default function QuranContent({
  sura,
  currentAyah,
  setCurrentAyah,
  isAutoScrolling,
  fontSize,
  darkMode,
  scrollRef
}: QuranContentProps) {
  const verseRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const { toast } = useToast();
  const [scrollIndicatorStyle, setScrollIndicatorStyle] = useState({ height: '15%', top: '0%' });
  
  // Font size classes based on fontSize value (1-5)
  const fontSizeClasses = [
    "text-lg", // 1
    "text-xl", // 2
    "text-2xl", // 3 (default)
    "text-3xl", // 4
    "text-4xl", // 5
  ];
  
  useEffect(() => {
    // Scroll to current ayah when it changes
    if (verseRefs.current[currentAyah]) {
      verseRefs.current[currentAyah]?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [currentAyah]);
  
  useEffect(() => {
    const updateScrollIndicator = () => {
      if (!scrollRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      const indicatorHeight = Math.min(30, Math.max(10, 100 / (scrollHeight / clientHeight)));
      
      setScrollIndicatorStyle({
        height: `${indicatorHeight}%`,
        top: `${(scrollPercentage * (100 - indicatorHeight)) / 100}%`
      });
    };
    
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', updateScrollIndicator);
      // Initialize
      updateScrollIndicator();
      
      return () => {
        scrollElement.removeEventListener('scroll', updateScrollIndicator);
      };
    }
  }, [scrollRef]);
  
  const handleVerseClick = (ayahNumber: number) => {
    if (!isAutoScrolling) {
      setCurrentAyah(ayahNumber);
    }
  };
  
  const handleCopyVerse = (ayah: Ayah) => {
    navigator.clipboard.writeText(`${ayah.text}\n\n(${sura.name}, ${ayah.numberInSurah})`);
    toast({
      title: "تم النسخ",
      description: "تم نسخ الآية إلى الحافظة"
    });
  };
  
  return (
    <main 
      className="relative h-[calc(100vh-64px)] overflow-y-auto p-4 transition-colors duration-300"
      ref={scrollRef}
      dir="rtl"
    >
      <div 
        className="scroll-indicator absolute right-0 w-1 bg-primary transition-all duration-300"
        style={{ height: scrollIndicatorStyle.height, top: scrollIndicatorStyle.top }}
      />
      
      <div className="sura-header mb-6 text-center">
        <div className="sura-bismillah mb-4">
          <p className="font-[Amiri] text-2xl dark:text-white">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        </div>
        <h2 className="font-[Amiri] text-2xl font-bold text-primary dark:text-white mb-1">
          سورة {sura.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {sura.totalAyahs} آية
        </p>
      </div>
      
      <div className="verses-container max-w-3xl mx-auto">
        {/* Book-style continuous text with inline verse numbers */}
        <div className="quran-page p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <p className={`font-[Amiri] ${fontSizeClasses[fontSize - 1]} leading-loose text-justify dark:text-white`}>
            {sura.ayahs.map((ayah, index) => (
              <span 
                key={ayah.numberInSurah}
                id={`verse-${ayah.numberInSurah}`}
                ref={el => verseRefs.current[ayah.numberInSurah] = el}
                className={`verse-inline inline ${
                  currentAyah === ayah.numberInSurah ? "bg-amber-50 dark:bg-amber-900/30 rounded-md px-1" : ""
                }`}
                onClick={() => handleVerseClick(ayah.numberInSurah)}
              >
                {ayah.text}
                <span 
                  className="verse-number inline-flex mx-1 bg-primary text-white px-1 rounded-full text-xs align-middle cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVerseClick(ayah.numberInSurah);
                  }}
                >
                  {ayah.numberInSurah}
                </span>
                {" "}
              </span>
            ))}
          </p>
        </div>
        
        <div className="end-of-sura text-center my-12">
          <div className="inline-block mx-auto bg-amber-100 dark:bg-amber-900/30 p-2 rounded-md">
            <Book className="mx-auto text-primary mb-1" size={24} />
            <p className="text-primary text-sm font-medium">نهاية السورة</p>
          </div>
        </div>
      </div>
    </main>
  );
}
