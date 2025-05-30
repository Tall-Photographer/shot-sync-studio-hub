
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { useApiSettings } from '@/hooks/useApiSettings';

export const ApiTab = () => {
  const { toast } = useToast();
  const { apiSettings, setApiSettings, saveApiSettings } = useApiSettings();

  const handleSave = () => {
    saveApiSettings();
    toast({
      title: "API Keys Saved",
      description: "API keys have been updated successfully"
    });
  };

  return (
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

        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save API Keys
        </Button>
      </CardContent>
    </Card>
  );
};
