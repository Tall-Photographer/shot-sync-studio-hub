
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { useGeneralSettings } from '@/hooks/useGeneralSettings';

export const GeneralTab = () => {
  const { toast } = useToast();
  const { generalSettings, setGeneralSettings, saveGeneralSettings } = useGeneralSettings();

  const handleSave = () => {
    saveGeneralSettings();
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully"
    });
  };

  return (
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
            placeholder="+971 50 123 4567"
          />
        </div>

        <div>
          <Label htmlFor="businessAddress">Business Address</Label>
          <Input
            id="businessAddress"
            value={generalSettings.businessAddress}
            onChange={(e) => setGeneralSettings(prev => ({ ...prev, businessAddress: e.target.value }))}
            placeholder="Dubai, UAE"
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
                <SelectItem value="Asia/Dubai">UAE Time (GMT+4)</SelectItem>
                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                <SelectItem value="America/Chicago">Central Time</SelectItem>
                <SelectItem value="Europe/London">GMT</SelectItem>
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
                <SelectItem value="AED">AED (د.إ)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save General Settings
        </Button>
      </CardContent>
    </Card>
  );
};
