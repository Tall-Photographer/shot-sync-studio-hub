
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Key, Shield, Bell, Palette } from 'lucide-react';
import { GeneralTab } from './settings/GeneralTab';
import { ApiTab } from './settings/ApiTab';
import { SecurityTab } from './settings/SecurityTab';
import { NotificationsTab } from './settings/NotificationsTab';
import { AppearanceTab } from './settings/AppearanceTab';

const Settings = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
          <TabsTrigger value="general" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3">
            <User className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">General</span>
            <span className="sm:hidden">Gen</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3">
            <Key className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">API Keys</span>
            <span className="sm:hidden">API</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Security</span>
            <span className="sm:hidden">Sec</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3">
            <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Notifications</span>
            <span className="sm:hidden">Not</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3">
            <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Appearance</span>
            <span className="sm:hidden">App</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralTab />
        </TabsContent>

        <TabsContent value="api">
          <ApiTab />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
