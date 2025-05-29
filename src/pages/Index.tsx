
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import Bookings from '@/components/Bookings';
import Team from '@/components/Team';
import Financials from '@/components/Financials';
import Calendar from '@/components/Calendar';
import Settings from '@/components/Settings';
import BottomNavigation from '@/components/BottomNavigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'bookings':
        return <Bookings />;
      case 'calendar':
        return <Calendar />;
      case 'team':
        return <Team />;
      case 'financials':
        return <Financials />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {renderContent()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
