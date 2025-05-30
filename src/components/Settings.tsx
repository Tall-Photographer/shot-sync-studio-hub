
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
        <div className="sticky top-0 bg-gray-50 z-10 pb-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 h-14 sm:h-12 p-1">
            <TabsTrigger value="general" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-4 py-3 sm:py-2 min-h-[48px] sm:min-h-[44px] touch-manipulation">
              <User className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline truncate">General</span>
              <span className="sm:hidden">Gen</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-4 py-3 sm:py-2 min-h-[48px] sm:min-h-[44px] touch-manipulation">
              <Key className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline truncate">API Keys</span>
              <span className="sm:hidden">API</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-4 py-3 sm:py-2 min-h-[48px] sm:min-h-[44px] touch-manipulation">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline truncate">Security</span>
              <span className="sm:hidden">Sec</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-4 py-3 sm:py-2 min-h-[48px] sm:min-h-[44px] touch-manipulation">
              <Bell className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline truncate">Notifications</span>
              <span className="sm:hidden">Not</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-4 py-3 sm:py-2 min-h-[48px] sm:min-h-[44px] touch-manipulation">
              <Palette className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline truncate">Appearance</span>
              <span className="sm:hidden">App</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="pt-4">
          <TabsContent value="general" className="mt-0 focus-visible:outline-none">
            <GeneralTab />
          </TabsContent>

          <TabsContent value="api" className="mt-0 focus-visible:outline-none">
            <ApiTab />
          </TabsContent>

          <TabsContent value="security" className="mt-0 focus-visible:outline-none">
            <SecurityTab />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0 focus-visible:outline-none">
            <NotificationsTab />
          </TabsContent>

          <TabsContent value="appearance" className="mt-0 focus-visible:outline-none">
            <AppearanceTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
