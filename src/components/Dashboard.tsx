
import React from 'react';
import { Camera, Calendar, DollarSign, Users, Bell, Plus, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NewBookingDialog from './NewBookingDialog';
import AddExpenseDialog from './AddExpenseDialog';

interface DashboardProps {
  onNavigate?: (tab: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const upcomingBookings = [
    {
      id: 1,
      client: 'Sarah Johnson',
      service: 'Wedding Photography',
      date: '2025-05-30',
      time: '14:00 - 18:00',
      status: 'confirmed',
      assignedTo: 'Alex Thompson',
      location: 'Central Park, NYC'
    },
    {
      id: 2,
      client: 'Mike Davis',
      service: 'Portrait Session',
      date: '2025-06-02',
      time: '10:00 - 12:00',
      status: 'pending',
      assignedTo: 'Emma Wilson',
      location: 'Studio Downtown'
    }
  ];

  const stats = [
    { title: 'This Month Revenue', value: 'AED 45,680', icon: DollarSign, color: 'text-green-600', navigateTo: 'financials' },
    { title: 'Active Bookings', value: '8', icon: Calendar, color: 'text-blue-600', navigateTo: 'bookings' },
    { title: 'Total Clients', value: '34', icon: Users, color: 'text-purple-600', navigateTo: 'team' },
    { title: 'Pending Payments', value: '3', icon: Bell, color: 'text-orange-600', navigateTo: 'financials' }
  ];

  const handleBookingAdded = (newBooking: any) => {
    console.log('New booking added to dashboard:', newBooking);
  };

  const handleExpenseAdded = (newExpense: any) => {
    console.log('New expense added to dashboard:', newExpense);
  };

  const handleStatCardClick = (navigateTo: string) => {
    if (onNavigate) {
      onNavigate(navigateTo);
    }
  };

  const handleSeeAllBookings = () => {
    if (onNavigate) {
      onNavigate('bookings');
    }
  };

  const handleNotificationClick = () => {
    console.log('Notification clicked - opening notifications');
    // You can add notification functionality here
  };

  return (
    <div className="p-4 space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-start justify-between pt-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Ahmed's Studio</h1>
            <p className="text-gray-600 text-sm">Photography Business</p>
          </div>
        </div>
        <button
          onClick={handleNotificationClick}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <NewBookingDialog
          trigger={
            <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12">
              <Plus className="w-4 h-4 mr-2" />
              Add New Booking
            </Button>
          }
          onBookingAdded={handleBookingAdded}
        />
        
        <AddExpenseDialog
          trigger={
            <Button className="w-full bg-red-600 hover:bg-red-700 h-12">
              <Receipt className="w-4 h-4 mr-2" />
              Add New Expense
            </Button>
          }
          onExpenseAdded={handleExpenseAdded}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="bg-white shadow-sm border-0 cursor-pointer hover:shadow-md transition-shadow active:scale-95 transform transition-transform"
            onClick={() => handleStatCardClick(stat.navigateTo)}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-2 rounded-lg bg-gray-50 flex-shrink-0">
                  <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{stat.title}</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendar Overview */}
      <Card 
        className="bg-white shadow-sm border-0 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => handleStatCardClick('calendar')}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={day} className="text-xs sm:text-sm text-gray-600 py-2">
                {day}
              </div>
            ))}
            {[26, 27, 28, 29, 30, 31, 1].map((date, index) => (
              <div 
                key={date} 
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${
                  date === 30 ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {date}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Bookings */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg font-semibold">Upcoming Bookings</CardTitle>
          <button 
            onClick={handleSeeAllBookings}
            className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            See All
          </button>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          {upcomingBookings.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-gray-50 rounded-lg p-3 sm:p-4 cursor-pointer hover:bg-gray-100 transition-colors active:scale-98 transform transition-transform"
              onClick={() => handleStatCardClick('bookings')}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate pr-2">
                  {booking.client}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">{booking.service}</p>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{booking.date} • {booking.time}</p>
              <p className="text-xs sm:text-sm text-blue-600 truncate">📍 {booking.location}</p>
              <p className="text-xs text-gray-500 mt-2 truncate">Assigned to: {booking.assignedTo}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
