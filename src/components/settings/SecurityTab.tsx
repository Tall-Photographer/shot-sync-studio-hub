
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

export const SecurityTab = () => {
  const { toast } = useToast();
  
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

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

  return (
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
  );
};
