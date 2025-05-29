
import React, { useState } from 'react';
import { Save, Key, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    nomodApiKey: localStorage.getItem('nomod_api_key') || '',
    googleCalendarApiKey: localStorage.getItem('google_calendar_api_key') || '',
    businessName: localStorage.getItem('business_name') || "Ahmed's Photography Studio",
    businessEmail: localStorage.getItem('business_email') || '',
    businessPhone: localStorage.getItem('business_phone') || ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('nomod_api_key', settings.nomodApiKey);
    localStorage.setItem('google_calendar_api_key', settings.googleCalendarApiKey);
    localStorage.setItem('business_name', settings.businessName);
    localStorage.setItem('business_email', settings.businessEmail);
    localStorage.setItem('business_phone', settings.businessPhone);

    console.log('Settings saved:', settings);

    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully"
    });
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
    
    // Simulate API test
    toast({
      title: "Connection Test",
      description: "Nomod API connection test completed"
    });
  };

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

      {/* API Configuration */}
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

      {/* Business Information */}
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
        </CardContent>
      </Card>

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
