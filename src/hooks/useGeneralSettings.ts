
import { useState, useEffect } from 'react';

export interface GeneralSettings {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  defaultTimeZone: string;
  defaultCurrency: string;
}

export const useGeneralSettings = () => {
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    defaultTimeZone: 'Asia/Dubai',
    defaultCurrency: 'AED'
  });

  useEffect(() => {
    console.log('Loading general settings from localStorage');
    
    const savedGeneral = localStorage.getItem('general_settings');
    if (savedGeneral) {
      setGeneralSettings(JSON.parse(savedGeneral));
    }

    // Load individual items for backward compatibility
    const businessEmail = localStorage.getItem('business_email');
    const businessPhone = localStorage.getItem('business_phone');
    
    if (businessEmail || businessPhone) {
      setGeneralSettings(prev => ({
        ...prev,
        businessEmail: businessEmail || prev.businessEmail,
        businessPhone: businessPhone || prev.businessPhone
      }));
    }
  }, []);

  const saveGeneralSettings = () => {
    console.log('Saving general settings:', generalSettings);
    localStorage.setItem('general_settings', JSON.stringify(generalSettings));
    
    // Save individual items for backward compatibility
    localStorage.setItem('business_email', generalSettings.businessEmail);
    localStorage.setItem('business_phone', generalSettings.businessPhone);
  };

  return {
    generalSettings,
    setGeneralSettings,
    saveGeneralSettings
  };
};
