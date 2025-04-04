import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
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
    <header className="bg-black text-white flex items-center justify-between px-4 py-3 sticky top-0 z-20">
      <div className="flex items-center">
        <span className="text-sm">ج ١ | ج ١</span>
      </div>
      <div className="flex items-center space-x-6">
        <span className="text-sm">استماع</span>
        <span className="text-sm">التالي</span>
        <span className="text-sm">السابق</span>
      </div>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={onSettingsClick}
        >
          <MoreVertical size={20} />
        </Button>
      </div>
    </header>
  );
}
