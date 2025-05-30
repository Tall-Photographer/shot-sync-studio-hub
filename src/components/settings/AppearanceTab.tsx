
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { useAppearanceSettings } from '@/hooks/useAppearanceSettings';

export const AppearanceTab = () => {
  const { toast } = useToast();
  const { appearanceSettings, setAppearanceSettings, saveAppearanceSettings } = useAppearanceSettings();

  const handleSave = () => {
    saveAppearanceSettings();
    toast({
      title: "Appearance Updated",
      description: "Appearance settings have been saved"
    });
  };

  return (
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
              <SelectItem value="ar">Arabic</SelectItem>
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

        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Appearance Settings
        </Button>
      </CardContent>
    </Card>
  );
};
