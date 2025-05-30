
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { useNotificationSettings } from '@/hooks/useNotificationSettings';

export const NotificationsTab = () => {
  const { toast } = useToast();
  const { notificationSettings, setNotificationSettings, saveNotificationSettings } = useNotificationSettings();

  const handleSave = () => {
    saveNotificationSettings();
    toast({
      title: "Notifications Updated",
      description: "Notification preferences have been saved"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="emailNotifications"
            checked={notificationSettings.emailNotifications}
            onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
          />
          <Label htmlFor="emailNotifications">Email Notifications</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="smsNotifications"
            checked={notificationSettings.smsNotifications}
            onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))}
          />
          <Label htmlFor="smsNotifications">SMS Notifications</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="pushNotifications"
            checked={notificationSettings.pushNotifications}
            onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
          />
          <Label htmlFor="pushNotifications">Push Notifications</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="bookingReminders"
            checked={notificationSettings.bookingReminders}
            onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, bookingReminders: checked }))}
          />
          <Label htmlFor="bookingReminders">Booking Reminders</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="paymentAlerts"
            checked={notificationSettings.paymentAlerts}
            onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, paymentAlerts: checked }))}
          />
          <Label htmlFor="paymentAlerts">Payment Alerts</Label>
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Notification Settings
        </Button>
      </CardContent>
    </Card>
  );
};
