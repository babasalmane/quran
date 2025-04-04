import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { X, Type, Moon, Sun, Clock, BellOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { updateUserPreferences } from "@/lib/quranAPI";
import { queryClient } from "@/lib/queryClient";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    darkMode: boolean;
    fontSize: number;
    scrollSpeed: number;
    doNotDisturb: boolean;
  };
  onSettingsChange: (settings: Partial<{
    darkMode: boolean;
    fontSize: number;
    scrollSpeed: number;
    doNotDisturb: boolean;
  }>) => void;
}

export default function SettingsPanel({
  isOpen,
  onClose,
  settings,
  onSettingsChange
}: SettingsPanelProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  
  // Reset local settings when the panel opens
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings, isOpen]);
  
  // Auto-save changes
  const saveChanges = async (updatedSettings: typeof localSettings) => {
    // Update settings in parent component immediately for responsive UI
    onSettingsChange(updatedSettings);
    
    // Save to server
    try {
      await updateUserPreferences({
        fontSize: updatedSettings.fontSize,
        scrollSpeed: updatedSettings.scrollSpeed,
        darkMode: updatedSettings.darkMode,
        doNotDisturb: updatedSettings.doNotDisturb
      });
      
      // Invalidate preferences cache
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };
  
  const handleDarkModeToggle = (checked: boolean) => {
    const updatedSettings = { ...localSettings, darkMode: checked };
    setLocalSettings(updatedSettings);
    saveChanges(updatedSettings);
  };
  
  const handleDoNotDisturbToggle = (checked: boolean) => {
    const updatedSettings = { ...localSettings, doNotDisturb: checked };
    setLocalSettings(updatedSettings);
    saveChanges(updatedSettings);
  };
  
  const handleFontSizeChange = (value: number[]) => {
    const updatedSettings = { ...localSettings, fontSize: value[0] };
    setLocalSettings(updatedSettings);
    saveChanges(updatedSettings);
  };
  
  const handleScrollSpeedChange = (value: number[]) => {
    const updatedSettings = { ...localSettings, scrollSpeed: value[0] };
    setLocalSettings(updatedSettings);
    saveChanges(updatedSettings);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md overflow-hidden" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-primary dark:text-white text-lg font-medium">الإعدادات</DialogTitle>
        </DialogHeader>
        
        <div className="settings-options space-y-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {localSettings.darkMode ? (
                <Moon size={20} className="text-amber-400 mr-2" />
              ) : (
                <Sun size={20} className="text-amber-500 mr-2" />
              )}
              <Label>الوضع الليلي</Label>
            </div>
            <Switch 
              checked={localSettings.darkMode} 
              onCheckedChange={handleDarkModeToggle}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <BellOff size={20} className="text-red-500 mr-2" />
              <Label>عدم الإزعاج</Label>
            </div>
            <Switch 
              checked={localSettings.doNotDisturb} 
              onCheckedChange={handleDoNotDisturbToggle}
            />
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <Type size={18} className="text-primary mr-2" />
              <Label>حجم الخط</Label>
            </div>
            <Slider
              value={[localSettings.fontSize]}
              min={1}
              max={5}
              step={1}
              className="w-full"
              onValueChange={handleFontSizeChange}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>صغير</span>
              <span>كبير</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <Clock size={18} className="text-primary mr-2" />
              <Label>سرعة التمرير التلقائي</Label>
            </div>
            <Slider
              value={[localSettings.scrollSpeed]}
              min={1}
              max={10}
              step={1}
              className="w-full"
              onValueChange={handleScrollSpeedChange}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>بطيء</span>
              <span>سريع</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
