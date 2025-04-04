import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { toArabicNumeral } from "@shared/quranData";

interface BottomControlsProps {
  isAutoScrolling: boolean;
  scrollSpeed: number;
  onAutoScrollToggle: () => void;
  onScrollSpeedChange: (value: number) => void;
  currentSura: number;
  totalSuras: number;
  currentAyah: number;
  totalAyahs: number;
  suraName: string;
  onPrevSura: () => void;
  onNextSura: () => void;
}

export default function BottomControls({
  isAutoScrolling,
  scrollSpeed,
  onAutoScrollToggle,
  onScrollSpeedChange,
  currentSura,
  totalSuras,
  currentAyah,
  totalAyahs,
  suraName,
  onPrevSura,
  onNextSura
}: BottomControlsProps) {
  
  const handleSliderChange = (value: number[]) => {
    onScrollSpeedChange(value[0]);
  };
  
  const currentPositionText = `${suraName}: ${toArabicNumeral(currentAyah)}/${toArabicNumeral(totalAyahs)}`;
  
  return (
    <div className="bottom-controls z-20 fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1A1A1A] shadow-lg px-4 py-3 flex items-center justify-between transition-colors" dir="rtl">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-primary dark:text-white" 
          onClick={onPrevSura}
          disabled={currentSura <= 1}
        >
          <ChevronRight size={24} />
        </Button>
        
        <span className="font-[Amiri] text-sm dark:text-white mx-2">
          {currentPositionText}
        </span>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-primary dark:text-white" 
          onClick={onNextSura}
          disabled={currentSura >= totalSuras}
        >
          <ChevronLeft size={24} />
        </Button>
      </div>
      
      <div className="auto-scroll-controls flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary dark:text-white"
          onClick={onAutoScrollToggle}
        >
          {isAutoScrolling ? <Pause size={24} /> : <Play size={24} />}
        </Button>
        
        <div className="hidden sm:flex auto-scroll-speed-control items-center mx-2">
          <Slider
            value={[scrollSpeed]}
            min={1}
            max={10}
            step={1}
            className="w-24 md:w-32"
            onValueChange={handleSliderChange}
          />
        </div>
      </div>
    </div>
  );
}
