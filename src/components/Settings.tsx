
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Save, Key, Shield, Bell, Palette, User } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  
  const [generalSettings, setGeneralSettings] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    timezone: 'America/New_York',
    currency: 'USD'
  });

  const [apiSettings, setApiSettings] = useState({
    nomodApiKey: '',
    googleCalendarApiKey: '',
    stripeApiKey: '',
    twilioApiKey: ''
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingReminders: true,
    paymentAlerts: true
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    console.log('Loading settings from localStorage');
    
    const savedGeneral = localStorage.getItem('general_settings');
    if (savedGeneral) {
      setGeneralSettings(JSON.parse(savedGeneral));
    }

    const savedApi = localStorage.getItem('api_settings');
    if (savedApi) {
      setApiSettings(JSON.parse(savedApi));
    }

    const savedNotifications = localStorage.getItem('notification_settings');
    if (savedNotifications) {
      setNotificationSettings(JSON.parse(savedNotifications));
    }

    const savedAppearance = localStorage.getItem('appearance_settings');
    if (savedAppearance) {
      setAppearanceSettings(JSON.parse(savedAppearance));
    }

    // Load individual API keys for backward compatibility
    const nomodKey = localStorage.getItem('nomod_api_key');
    const businessEmail = localStorage.getItem('business_email');
    const businessPhone = localStorage.getItem('business_phone');
    
    if (nomodKey || businessEmail || businessPhone) {
      setGeneralSettings(prev => ({
        ...prev,
        businessEmail: businessEmail || prev.businessEmail,
        businessPhone: businessPhone || prev.businessPhone
      }));
      setApiSettings(prev => ({
        ...prev,
        nomodApiKey: nomodKey || prev.nomodApiKey
      }));
    }
  }, []);

  const handleGeneralSave = () => {
    console.log('Saving general settings:', generalSettings);
    localStorage.setItem('general_settings', JSON.stringify(generalSettings));
    
    // Save individual items for backward compatibility
    localStorage.setItem('business_email', generalSettings.businessEmail);
    localStorage.setItem('business_phone', generalSettings.businessPhone);
    
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully"
    });
  };

  const handleApiSave = () => {
    console.log('Saving API settings:', apiSettings);
    localStorage.setItem('api_settings', JSON.stringify(apiSettings));
    
    // Save individual API keys for backward compatibility
    localStorage.setItem('nomod_api_key', apiSettings.nomodApiKey);
    
    toast({
      title: "API Keys Saved",
      description: "API keys have been updated successfully"
    });
  };

  const handlePasswordChange = () => {
    console.log('Changing password');
    
    if (!securitySettings.currentPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive"
      });
      return;
    }

    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (securitySettings.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return;
    }

    // Simulate password change
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully"
    });

    setSecuritySettings(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleNotificationSave = () => {
    console.log('Saving notification settings:', notificationSettings);
    localStorage.setItem('notification_settings', JSON.stringify(notificationSettings));
    
    toast({
      title: "Notifications Updated",
      description: "Notification preferences have been saved"
    });
  };

  const handleAppearanceSave = () => {
    console.log('Saving appearance settings:', appearanceSettings);
    localStorage.setItem('appearance_settings', JSON.stringify(appearanceSettings));
    
    toast({
      title: "Appearance Updated",
      description: "Appearance settings have been saved"
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={generalSettings.businessName}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, businessName: e.target.value }))}
                  placeholder="Your Photography Studio"
                />
              </div>

              <div>
                <Label htmlFor="businessEmail">Business Email</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  value={generalSettings.businessEmail}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, businessEmail: e.target.value }))}
                  placeholder="contact@yourstudio.com"
                />
              </div>

              <div>
                <Label htmlFor="businessPhone">Business Phone</Label>
                <Input
                  id="businessPhone"
                  type="tel"
                  value={generalSettings.businessPhone}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, businessPhone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="businessAddress">Business Address</Label>
                <Input
                  id="businessAddress"
                  value={generalSettings.businessAddress}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, businessAddress: e.target.value }))}
                  placeholder="123 Main St, City, State 12345"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, timezone: value }))} value={generalSettings.timezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, currency: value }))} value={generalSettings.currency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleGeneralSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys & Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nomodApiKey">Nomod API Key</Label>
                <Input
                  id="nomodApiKey"
                  type="password"
                  value={apiSettings.nomodApiKey}
                  onChange={(e) => setApiSettings(prev => ({ ...prev, nomodApiKey: e.target.value }))}
                  placeholder="Enter your Nomod API key"
                />
              </div>

              <div>
                <Label htmlFor="googleCalendarApiKey">Google Calendar API Key</Label>
                <Input
                  id="googleCalendarApiKey"
                  type="password"
                  value={apiSettings.googleCalendarApiKey}
                  onChange={(e) => setApiSettings(prev => ({ ...prev, googleCalendarApiKey: e.target.value }))}
                  placeholder="Enter your Google Calendar API key"
                />
              </div>

              <div>
                <Label htmlFor="stripeApiKey">Stripe API Key</Label>
                <Input
                  id="stripeApiKey"
                  type="password"
                  value={apiSettings.stripeApiKey}
                  onChange={(e) => setApiSettings(prev => ({ ...prev, stripeApiKey: e.target.value }))}
                  placeholder="Enter your Stripe API key"
                />
              </div>

              <div>
                <Label htmlFor="twilioApiKey">Twilio API Key</Label>
                <Input
                  id="twilioApiKey"
                  type="password"
                  value={apiSettings.twilioApiKey}
                  onChange={(e) => setApiSettings(prev => ({ ...prev, twilioApiKey: e.target.value }))}
                  placeholder="Enter your Twilio API key"
                />
              </div>

              <Button onClick={handleApiSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save API Keys
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={securitySettings.currentPassword}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={securitySettings.newPassword}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={securitySettings.confirmPassword}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="twoFactor"
                  checked={securitySettings.twoFactorEnabled}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: checked }))}
                />
                <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
              </div>

              <Button onClick={handlePasswordChange} className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
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

              <Button onClick={handleNotificationSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select onValueChange={(value) => setAppearanceSettings(prev => ({ ...prev, theme: value }))} value={appearanceSettings.theme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Select onValueChange={(value) => setAppearanceSettings(prev => ({ ...prev, language: value }))} value={appearanceSettings.language}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select onValueChange={(value) => setAppearanceSettings(prev => ({ ...prev, dateFormat: value }))} value={appearanceSettings.dateFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timeFormat">Time Format</Label>
                  <Select onValueChange={(value) => setAppearanceSettings(prev => ({ ...prev, timeFormat: value }))} value={appearanceSettings.timeFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 Hour</SelectItem>
                      <SelectItem value="24h">24 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleAppearanceSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Appearance Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
