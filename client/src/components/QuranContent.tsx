import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Sura, type Ayah, createBookmark } from "@/lib/quranAPI";
import { queryClient } from "@/lib/queryClient";

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
  const verseRefs = useRef<Record<number, HTMLParagraphElement | null>>({});
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  
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
  
  const handleVerseClick = (ayahNumber: number) => {
    if (!isAutoScrolling) {
      setCurrentAyah(ayahNumber);
    }
  };
  
  const handleAddBookmark = async (ayahNumber: number) => {
    try {
      await createBookmark({
        suraId: sura.number,
        ayahId: ayahNumber
      });
      
      toast({
        title: "تمت إضافة الإشارة المرجعية",
        description: `تمت إضافة آية ${ayahNumber} من سورة ${sura.name} إلى المفضلة`,
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إضافة الإشارة المرجعية",
        variant: "destructive"
      });
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
      className="h-[calc(100vh-9rem)] overflow-y-auto"
      ref={scrollRef}
      dir="rtl"
    >
      {/* Sura title in rounded pill */}
      <div className="px-4 py-6">
        <div className="sura-title bg-white rounded-full border border-gray-300 shadow-sm mx-auto max-w-md py-3 px-6 text-center mb-4">
          <h2 className="font-[Amiri] text-xl font-bold">
            {sura.name}
          </h2>
        </div>
      
        {/* Bismillah */}
        <div className="bismillah text-center mb-6">
          <p className="font-[Amiri] text-2xl">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        </div>
        
        {/* Verses with parentheses for numbers */}
        <div className="verses space-y-6 text-center">
          {sura.ayahs.map((ayah) => (
            <p 
              key={ayah.numberInSurah}
              ref={el => verseRefs.current[ayah.numberInSurah] = el}
              className={`font-[Amiri] ${fontSizeClasses[fontSize - 1]} text-center leading-relaxed mb-2`}
              onClick={() => handleVerseClick(ayah.numberInSurah)}
            >
              {ayah.text} ({ayah.numberInSurah})
            </p>
          ))}
        </div>
        
        {/* Page counter */}
        <div className="page-counter text-center text-gray-500 mt-4 mb-8">
          <p className="text-sm">الصفحة ({currentPage})</p>  
        </div>
      </div>
      
      {/* Bottom navigation */}
      <div className="bottom-navigation fixed bottom-0 left-0 right-0 flex justify-center items-center space-x-8 py-2 bg-white border-t border-gray-200">
        <ChevronLeft size={20} className="text-gray-400" />
        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        <div className="w-4 h-4 border border-gray-300"></div>
      </div>
    </main>
  );
}
