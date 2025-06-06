
import React from 'react';

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface BookingTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const BookingTabs = ({ tabs, activeTab, onTabChange }: BookingTabsProps) => {
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-shrink-0 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};

export default BookingTabs;
