
import { useState, useEffect } from 'react';

export interface ApiSettings {
  nomodApiKey: string;
  googleCalendarApiKey: string;
  stripeApiKey: string;
  twilioApiKey: string;
}

export const useApiSettings = () => {
  const [apiSettings, setApiSettings] = useState<ApiSettings>({
    nomodApiKey: '',
    googleCalendarApiKey: '',
    stripeApiKey: '',
    twilioApiKey: ''
  });

  useEffect(() => {
    console.log('Loading API settings from localStorage');
    
    const savedApi = localStorage.getItem('api_settings');
    if (savedApi) {
      setApiSettings(JSON.parse(savedApi));
    }

    // Load individual API keys for backward compatibility
    const nomodKey = localStorage.getItem('nomod_api_key');
    
    if (nomodKey) {
      setApiSettings(prev => ({
        ...prev,
        nomodApiKey: nomodKey || prev.nomodApiKey
      }));
    }
  }, []);

  const saveApiSettings = () => {
    console.log('Saving API settings:', apiSettings);
    localStorage.setItem('api_settings', JSON.stringify(apiSettings));
    
    // Save individual API keys for backward compatibility
    localStorage.setItem('nomod_api_key', apiSettings.nomodApiKey);
  };

  return {
    apiSettings,
    setApiSettings,
    saveApiSettings
  };
};
