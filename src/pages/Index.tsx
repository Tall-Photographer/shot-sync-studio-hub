
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Clients from '../components/Clients';
import Bookings from '../components/Bookings';
import Team from '../components/Team';
import Financials from '../components/Financials';
import BottomNavigation from '../components/BottomNavigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
        <div className="pb-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/team" element={<Team />} />
            <Route path="/financials" element={<Financials />} />
          </Routes>
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Index;
