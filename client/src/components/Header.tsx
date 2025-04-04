import { Menu, Search, Bookmark, Settings, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  onSearchClick: () => void;
  onBookmarkClick: () => void;
  onSettingsClick: () => void;
  isAutoScrolling: boolean;
  onAutoScrollToggle: () => void;
  currentSuraName?: string;
  currentPosition?: string;
}

export default function Header({
  title,
  onMenuClick,
  onSearchClick,
  onBookmarkClick,
  onSettingsClick,
  isAutoScrolling,
  onAutoScrollToggle,
  currentSuraName,
  currentPosition
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
        <h1 className="text-primary dark:text-white font-medium mr-4 text-xl">
          {currentSuraName || title}
        </h1>
        {currentPosition && (
          <span className="text-gray-600 dark:text-gray-300 text-sm hidden md:inline-block">
            {currentPosition}
          </span>
        )}
      </div>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary dark:text-white"
          onClick={onAutoScrollToggle}
        >
          {isAutoScrolling ? <Pause size={22} /> : <Play size={22} />}
        </Button>
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
