
import { useState, useEffect } from 'react';

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  bookingReminders: boolean;
  paymentAlerts: boolean;
}

export const useNotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingReminders: true,
    paymentAlerts: true
  });

  useEffect(() => {
    console.log('Loading notification settings from localStorage');
    
    const savedNotifications = localStorage.getItem('notification_settings');
    if (savedNotifications) {
      setNotificationSettings(JSON.parse(savedNotifications));
    }
  }, []);

  const saveNotificationSettings = () => {
    console.log('Saving notification settings:', notificationSettings);
    localStorage.setItem('notification_settings', JSON.stringify(notificationSettings));
  };

  return {
    notificationSettings,
    setNotificationSettings,
    saveNotificationSettings
  };
};
