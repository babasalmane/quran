import { X, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { fetchBookmarks, deleteBookmark, type SuraMetadata, type Bookmark as BookmarkType } from "@/lib/quranAPI";
import { queryClient } from "@/lib/queryClient";
import { toArabicNumeral } from "@shared/quranData";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  suras: SuraMetadata[];
  onSuraSelect: (suraNumber: number) => void;
  currentSura: number;
}

export default function NavigationDrawer({
  isOpen,
  onClose,
  suras,
  onSuraSelect,
  currentSura
}: NavigationDrawerProps) {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  
  // Fetch bookmarks when drawer opens
  useEffect(() => {
    if (isOpen) {
      const getBookmarks = async () => {
        try {
          const data = await fetchBookmarks();
          setBookmarks(data);
        } catch (error) {
          console.error("Failed to fetch bookmarks:", error);
        }
      };
      
      getBookmarks();
    }
  }, [isOpen]);
  
  const handleSuraSelect = (suraNumber: number) => {
    onSuraSelect(suraNumber);
    onClose();
  };
  
  const handleDeleteBookmark = async (id: number) => {
    try {
      await deleteBookmark(id);
      setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
    } catch (error) {
      console.error("Failed to delete bookmark:", error);
    }
  };
  
  const handleBookmarkSelect = (suraId: number, ayahId: number) => {
    onSuraSelect(suraId);
    // We'll update current ayah in Home component via parent callback
    onClose();
  };
  
  // To find sura name from sura ID for bookmarks
  const getSuraName = (suraId: number) => {
    const sura = suras.find(s => s.number === suraId);
    return sura ? sura.name : "";
  };
  
  return (
    <div 
      className={`fixed top-0 right-0 w-3/4 md:w-1/3 h-full bg-white dark:bg-[#1A1A1A] z-30 shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } overflow-hidden flex flex-col`}
      dir="rtl"
    >
      <div className="drawer-header bg-primary text-white p-4 flex justify-between items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-medium">السور</h2>
          <img 
            src="/assets/list_bkg_1743799329321.png" 
            alt="Separator" 
            className="h-2 w-24 mt-1 opacity-80" 
          />
        </div>
        <Button variant="ghost" size="icon" className="text-white" onClick={onClose}>
          <X size={24} />
        </Button>
      </div>
      
      <ScrollArea className="flex-grow overflow-y-auto">
        <div className="p-2">
          {suras.map((sura) => (
            <div 
              key={sura.number}
              className={`p-3 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${
                currentSura === sura.number ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
              onClick={() => handleSuraSelect(sura.number)}
            >
              <div>
                <span className="font-[Amiri] text-base font-medium dark:text-white">
                  {sura.name}
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-sm block">
                  {sura.englishName}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {toArabicNumeral(sura.totalAyahs)} آيات
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {bookmarks.length > 0 && (
        <div className="bookmark-section p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col items-start mb-3">
            <div className="flex items-center mb-1">
              <Bookmark size={18} className="text-primary" />
              <h3 className="text-primary dark:text-white font-medium mr-2">العلامات المرجعية</h3>
            </div>
            <img 
              src="/assets/list_bkg_1743799329321.png" 
              alt="Separator" 
              className="h-2 w-20 opacity-70" 
            />
          </div>
          
          <div className="space-y-2">
            {bookmarks.map((bookmark) => (
              <div 
                key={bookmark.id}
                className="p-2 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer"
                onClick={() => handleBookmarkSelect(bookmark.suraId, bookmark.ayahId)}
              >
                <div>
                  <span className="font-[Amiri] text-sm dark:text-white">
                    {getSuraName(bookmark.suraId)}، آية {toArabicNumeral(bookmark.ayahId)}
                  </span>
                  {bookmark.note && (
                    <span className="text-gray-600 dark:text-gray-400 text-xs block">
                      {bookmark.note}
                    </span>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBookmark(bookmark.id);
                  }}
                  className="text-gray-500"
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
