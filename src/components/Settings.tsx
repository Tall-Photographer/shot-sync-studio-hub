import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Key, Shield, Bell, Palette, DollarSign, FileText } from 'lucide-react';
import { GeneralTab } from './settings/GeneralTab';
import { ApiTab } from './settings/ApiTab';
import { SecurityTab } from './settings/SecurityTab';
import { NotificationsTab } from './settings/NotificationsTab';
import { AppearanceTab } from './settings/AppearanceTab';
import FinanceTab from './settings/FinanceTab';
import QuotationsTab from './settings/QuotationsTab';

interface SettingsProps {
  onNavigateToFinancials?: () => void;
}

const Settings = ({ onNavigateToFinancials }: SettingsProps) => {
  const handleViewFinancials = () => {
    console.log('Navigating to financial dashboard');
    if (onNavigateToFinancials) {
      onNavigateToFinancials();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <div className="sticky top-0 bg-gray-50 z-10 pb-4">
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-0.5 h-auto p-1 bg-muted">
            <TabsTrigger value="general" className="flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm px-1 sm:px-3 py-2 sm:py-2 min-h-[60px] sm:min-h-[44px] touch-manipulation">
              <User className="w-4 h-4 flex-shrink-0" />
              <span className="text-[10px] sm:text-sm leading-tight">General</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm px-1 sm:px-3 py-2 sm:py-2 min-h-[60px] sm:min-h-[44px] touch-manipulation">
              <Key className="w-4 h-4 flex-shrink-0" />
              <span className="text-[10px] sm:text-sm leading-tight">API</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm px-1 sm:px-3 py-2 sm:py-2 min-h-[60px] sm:min-h-[44px] touch-manipulation">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span className="text-[10px] sm:text-sm leading-tight">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm px-1 sm:px-3 py-2 sm:py-2 min-h-[60px] sm:min-h-[44px] touch-manipulation">
              <Bell className="w-4 h-4 flex-shrink-0" />
              <span className="text-[10px] sm:text-sm leading-tight">Notify</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm px-1 sm:px-3 py-2 sm:py-2 min-h-[60px] sm:min-h-[44px] touch-manipulation md:col-start-5">
              <Palette className="w-4 h-4 flex-shrink-0" />
              <span className="text-[10px] sm:text-sm leading-tight">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm px-1 sm:px-3 py-2 sm:py-2 min-h-[60px] sm:min-h-[44px] touch-manipulation md:col-start-6">
              <DollarSign className="w-4 h-4 flex-shrink-0" />
              <span className="text-[10px] sm:text-sm leading-tight">Finance</span>
            </TabsTrigger>
            <TabsTrigger value="quotations" className="flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm px-1 sm:px-3 py-2 sm:py-2 min-h-[60px] sm:min-h-[44px] touch-manipulation md:col-start-7">
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span className="text-[10px] sm:text-sm leading-tight">Quotes</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="pt-12 sm:pt-4">
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

          <TabsContent value="finance" className="mt-0 focus-visible:outline-none">
            <FinanceTab onViewFinancials={handleViewFinancials} />
          </TabsContent>

          <TabsContent value="quotations" className="mt-0 focus-visible:outline-none">
            <QuotationsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
