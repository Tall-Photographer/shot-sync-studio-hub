
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useGeneralSettings } from '@/hooks/useGeneralSettings';
import { RefreshCw, Users, CheckCircle, Upload, X } from 'lucide-react';

export const GeneralTab = () => {
  const { generalSettings, setGeneralSettings, saveGeneralSettings } = useGeneralSettings();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState<string | null>(
    localStorage.getItem('last_contact_sync') || null
  );
  const [syncedContactsCount, setSyncedContactsCount] = useState<number>(
    parseInt(localStorage.getItem('synced_contacts_count') || '0')
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSyncContacts = async () => {
    setIsSyncing(true);
    console.log('Starting contact sync...');
    
    try {
      // Simulate contact sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSyncedCount = Math.floor(Math.random() * 50) + 20;
      const currentDate = new Date().toLocaleString();
      
      setSyncedContactsCount(mockSyncedCount);
      setLastSyncDate(currentDate);
      
      localStorage.setItem('last_contact_sync', currentDate);
      localStorage.setItem('synced_contacts_count', mockSyncedCount.toString());
      
      toast({
        title: "Contacts Synced Successfully",
        description: `Synced ${mockSyncedCount} contacts from Google Contacts`
      });
      
      console.log(`Contact sync completed: ${mockSyncedCount} contacts synced`);
    } catch (error) {
      console.error('Contact sync failed:', error);
      toast({
        title: "Sync Failed",
        description: "Failed to sync contacts. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setGeneralSettings(prev => ({ ...prev, businessLogo: base64 }));
        toast({
          title: "Logo Uploaded",
          description: "Your business logo has been uploaded successfully"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setGeneralSettings(prev => ({ ...prev, businessLogo: undefined }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast({
      title: "Logo Removed",
      description: "Your business logo has been removed"
    });
  };

  const handleSave = () => {
    saveGeneralSettings();
    toast({
      title: "Settings Saved",
      description: "Your general settings have been updated"
    });
  };

  return (
    <div className="space-y-6">
      {/* Business Information */}
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
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder="Your Photography Business"
            />
          </div>
          
          <div>
            <Label htmlFor="businessEmail">Business Email</Label>
            <Input
              id="businessEmail"
              type="email"
              value={generalSettings.businessEmail}
              onChange={(e) => handleInputChange('businessEmail', e.target.value)}
              placeholder="contact@yourbusiness.com"
            />
          </div>
          
          <div>
            <Label htmlFor="businessPhone">Business Phone</Label>
            <Input
              id="businessPhone"
              value={generalSettings.businessPhone}
              onChange={(e) => handleInputChange('businessPhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <Label htmlFor="businessAddress">Business Address</Label>
            <Textarea
              id="businessAddress"
              value={generalSettings.businessAddress}
              onChange={(e) => handleInputChange('businessAddress', e.target.value)}
              placeholder="123 Main St, City, State 12345"
              rows={3}
            />
          </div>

          {/* Logo Upload */}
          <div>
            <Label>Business Logo</Label>
            <div className="space-y-4">
              {generalSettings.businessLogo ? (
                <div className="flex items-center gap-4">
                  <img 
                    src={generalSettings.businessLogo} 
                    alt="Business Logo" 
                    className="w-20 h-20 object-contain border rounded"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRemoveLogo}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove Logo
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-4">Upload your business logo</p>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <p className="text-xs text-gray-500">
                Recommended: PNG or JPG format, max 2MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Sync */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Contact List Sync
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Sync your Google contacts to easily find and assign clients when creating bookings.
          </p>
          
          {lastSyncDate && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div className="text-sm">
                <p className="text-green-800 font-medium">
                  Last synced: {lastSyncDate}
                </p>
                <p className="text-green-600">
                  {syncedContactsCount} contacts available
                </p>
              </div>
            </div>
          )}
          
          <Button 
            onClick={handleSyncContacts}
            disabled={isSyncing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing Contacts...' : 'Sync Google Contacts'}
          </Button>
          
          <p className="text-xs text-gray-500">
            This will sync your Google contacts and make them available when creating bookings.
            Your contact information is stored securely and only used for booking management.
          </p>
        </CardContent>
      </Card>

      {/* Default Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Default Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="defaultCurrency">Default Currency</Label>
            <Input
              id="defaultCurrency"
              value={generalSettings.defaultCurrency}
              onChange={(e) => handleInputChange('defaultCurrency', e.target.value)}
              placeholder="AED"
            />
          </div>
          
          <div>
            <Label htmlFor="defaultTimeZone">Time Zone</Label>
            <Input
              id="defaultTimeZone"
              value={generalSettings.defaultTimeZone}
              onChange={(e) => handleInputChange('defaultTimeZone', e.target.value)}
              placeholder="Asia/Dubai"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Settings
        </Button>
      </div>
    </div>
  );
};
