import { Menu, Search, Bookmark, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  onSearchClick: () => void;
  onBookmarkClick: () => void;
  onSettingsClick: () => void;
}

export default function Header({
  title,
  onMenuClick,
  onSearchClick,
  onBookmarkClick,
  onSettingsClick
}: HeaderProps) {
  return (
    <header className="bg-white dark:bg-[#1A1A1A] shadow-md flex items-center justify-between px-4 py-3 sticky top-0 z-20 transition-colors">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </Button>
        <div className="flex items-center">
          <img 
            src="/assets/icon_1743799431115.png" 
            alt="Quran Icon" 
            className="w-8 h-8 ml-2 mr-2" 
          />
          <h1 className="text-primary dark:text-white font-medium mr-4 text-xl">
            {title}
          </h1>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary dark:text-white"
          onClick={onSearchClick}
        >
          <Search size={22} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary dark:text-white"
          onClick={onBookmarkClick}
        >
          <Bookmark size={22} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary dark:text-white"
          onClick={onSettingsClick}
        >
          <Settings size={22} />
        </Button>
      </div>
    </header>
  );
}
