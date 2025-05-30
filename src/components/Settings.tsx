
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

      <Tabs defaultValue="general" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 h-12 sm:h-10">
          <TabsTrigger value="general" className="flex items-center gap-1 text-xs sm:text-sm px-3 sm:px-4 py-3 sm:py-2 min-h-[44px] sm:min-h-[40px]">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">General</span>
            <span className="sm:hidden">Gen</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-1 text-xs sm:text-sm px-3 sm:px-4 py-3 sm:py-2 min-h-[44px] sm:min-h-[40px]">
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">API Keys</span>
            <span className="sm:hidden">API</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1 text-xs sm:text-sm px-3 sm:px-4 py-3 sm:py-2 min-h-[44px] sm:min-h-[40px]">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
            <span className="sm:hidden">Sec</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1 text-xs sm:text-sm px-3 sm:px-4 py-3 sm:py-2 min-h-[44px] sm:min-h-[40px]">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
            <span className="sm:hidden">Not</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-1 text-xs sm:text-sm px-3 sm:px-4 py-3 sm:py-2 min-h-[44px] sm:min-h-[40px]">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
            <span className="sm:hidden">App</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-8">
          <GeneralTab />
        </TabsContent>

        <TabsContent value="api" className="mt-8">
          <ApiTab />
        </TabsContent>

        <TabsContent value="security" className="mt-8">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="notifications" className="mt-8">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="appearance" className="mt-8">
          <AppearanceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
