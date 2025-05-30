
import { useState, useEffect } from 'react';

export interface AppearanceSettings {
  theme: string;
  language: string;
  dateFormat: string;
  timeFormat: string;
}

export const useAppearanceSettings = () => {
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>({
    theme: 'light',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  });

  useEffect(() => {
    console.log('Loading appearance settings from localStorage');
    
    const savedAppearance = localStorage.getItem('appearance_settings');
    if (savedAppearance) {
      setAppearanceSettings(JSON.parse(savedAppearance));
    }
  }, []);

  const saveAppearanceSettings = () => {
    console.log('Saving appearance settings:', appearanceSettings);
    localStorage.setItem('appearance_settings', JSON.stringify(appearanceSettings));
  };

  return {
    appearanceSettings,
    setAppearanceSettings,
    saveAppearanceSettings
  };
};
