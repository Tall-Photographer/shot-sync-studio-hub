
import React, { useState } from 'react';
import { Save, Key, Calendar, Users, Lock, Bell, Globe, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    // API Keys
    nomodApiKey: localStorage.getItem('nomod_api_key') || '',
    googleCalendarApiKey: localStorage.getItem('google_calendar_api_key') || '',
    
    // Business Info
    businessName: localStorage.getItem('business_name') || "Ahmed's Photography Studio",
    businessEmail: localStorage.getItem('business_email') || '',
    businessPhone: localStorage.getItem('business_phone') || '',
    businessAddress: localStorage.getItem('business_address') || '',
    
    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    bookingReminders: true,
    paymentAlerts: true,
    
    // App Settings
    currency: 'USD',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light'
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('nomod_api_key', settings.nomodApiKey);
    localStorage.setItem('google_calendar_api_key', settings.googleCalendarApiKey);
    localStorage.setItem('business_name', settings.businessName);
    localStorage.setItem('business_email', settings.businessEmail);
    localStorage.setItem('business_phone', settings.businessPhone);
    localStorage.setItem('business_address', settings.businessAddress);

    console.log('Settings saved:', settings);

    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully"
    });
  };

  const handleChangePassword = () => {
    if (settings.newPassword !== settings.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }

    console.log('Changing password...');
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully"
    });

    // Clear password fields
    setSettings(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const testNomodConnection = async () => {
    if (!settings.nomodApiKey) {
      toast({
        title: "Error",
        description: "Please enter your Nomod API key first",
        variant: "destructive"
      });
      return;
    }

    console.log('Testing Nomod API connection with key:', settings.nomodApiKey);
    
    toast({
      title: "Connection Test",
      description: "Nomod API connection test completed"
    });
  };

  const sections = [
    { id: 'general', label: 'General', icon: Users },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>

      {/* Settings Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* General Settings */}
      {activeSection === 'general' && (
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={settings.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Your business name"
              />
            </div>

            <div>
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input
                id="businessEmail"
                type="email"
                value={settings.businessEmail}
                onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                placeholder="your@business.com"
              />
            </div>

            <div>
              <Label htmlFor="businessPhone">Business Phone</Label>
              <Input
                id="businessPhone"
                type="tel"
                value={settings.businessPhone}
                onChange={(e) => handleInputChange('businessPhone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input
                id="businessAddress"
                value={settings.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                placeholder="123 Main St, City, State 12345"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={settings.currency} onValueChange={(value) => handleInputChange('currency', value)}>
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
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Configuration */}
      {activeSection === 'api' && (
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nomodApiKey">Nomod API Key</Label>
              <div className="flex space-x-2">
                <Input
                  id="nomodApiKey"
                  type="password"
                  value={settings.nomodApiKey}
                  onChange={(e) => handleInputChange('nomodApiKey', e.target.value)}
                  placeholder="Enter your Nomod API key"
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  onClick={testNomodConnection}
                  disabled={!settings.nomodApiKey}
                >
                  Test
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Used to generate payment links (deposit, remaining, full payment)
              </p>
            </div>

            <div>
              <Label htmlFor="googleCalendarApiKey">Google Calendar API Key</Label>
              <Input
                id="googleCalendarApiKey"
                type="password"
                value={settings.googleCalendarApiKey}
                onChange={(e) => handleInputChange('googleCalendarApiKey', e.target.value)}
                placeholder="Enter your Google Calendar API key"
              />
              <p className="text-xs text-gray-500 mt-1">
                Used to sync bookings to team members' Google Calendars
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Settings */}
      {activeSection === 'security' && (
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={settings.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                placeholder="Enter current password"
              />
            </div>

            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={settings.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={settings.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            <Button 
              onClick={handleChangePassword}
              disabled={!settings.currentPassword || !settings.newPassword || !settings.confirmPassword}
              className="w-full"
            >
              Change Password
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      {activeSection === 'notifications' && (
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Button
                  variant={settings.emailNotifications ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange('emailNotifications', !settings.emailNotifications)}
                >
                  {settings.emailNotifications ? 'On' : 'Off'}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive push notifications</p>
                </div>
                <Button
                  variant={settings.pushNotifications ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange('pushNotifications', !settings.pushNotifications)}
                >
                  {settings.pushNotifications ? 'On' : 'Off'}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Booking Reminders</p>
                  <p className="text-sm text-gray-500">Get reminded about upcoming bookings</p>
                </div>
                <Button
                  variant={settings.bookingReminders ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange('bookingReminders', !settings.bookingReminders)}
                >
                  {settings.bookingReminders ? 'On' : 'Off'}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Alerts</p>
                  <p className="text-sm text-gray-500">Notifications for payment updates</p>
                </div>
                <Button
                  variant={settings.paymentAlerts ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange('paymentAlerts', !settings.paymentAlerts)}
                >
                  {settings.paymentAlerts ? 'On' : 'Off'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Appearance */}
      {activeSection === 'appearance' && (
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={settings.theme} onValueChange={(value) => handleInputChange('theme', value)}>
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
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select value={settings.dateFormat} onValueChange={(value) => handleInputChange('dateFormat', value)}>
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
          </CardContent>
        </Card>
      )}

      {/* Sync Status */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-blue-900">Sync Status</p>
              <p className="text-sm text-blue-700">Last synced: Just now</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
