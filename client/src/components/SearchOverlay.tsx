import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, X, Search, BookOpen } from "lucide-react";
import { searchQuran, type SearchResult } from "@/lib/quranAPI";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onResultSelect: (suraId: number, ayahId: number) => void;
}

export default function SearchOverlay({
  isOpen,
  onClose,
  onResultSelect
}: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  
  const handleSearch = async () => {
    if (searchQuery.length < 2) {
      setError("أدخل على الأقل حرفين للبحث");
      return;
    }
    
    try {
      setIsSearching(true);
      setError("");
      const results = await searchQuran(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setError("حدث خطأ أثناء البحث");
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleResultClick = (suraId: number, ayahId: number) => {
    onResultSelect(suraId, ayahId);
    onClose();
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-primary dark:text-white text-lg font-medium">البحث</DialogTitle>
          <DialogClose className="absolute right-4 top-4 text-gray-500" asChild>
            <Button variant="ghost" size="icon">
              <X size={18} />
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="search-input-container mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="البحث عن آية أو كلمة"
              className="w-full pl-10 pr-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Button 
              className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              size="icon"
              variant="ghost"
              onClick={handleSearch}
              disabled={isSearching}
            >
              <Search size={18} />
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        
        <div className="search-results max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="text-center text-gray-500 py-6">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full mb-2"></div>
              <p>جاري البحث...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((result, index) => (
                <div 
                  key={index}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => handleResultClick(result.sura.number, result.ayah.numberInSurah)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-[Amiri] font-medium dark:text-white">
                      {result.sura.name} - آية {result.ayah.numberInSurah}
                    </div>
                  </div>
                  
                  <p className="font-[Amiri] text-lg line-clamp-2 dark:text-white">
                    {result.ayah.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-6">
              <Search className="mx-auto text-3xl mb-2" size={32} />
              <p>ابحث عن آية أو كلمة للعثور على النتائج</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
