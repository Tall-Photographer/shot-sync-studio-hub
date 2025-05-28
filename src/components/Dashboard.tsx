
import React from 'react';
import { Camera, Calendar, DollarSign, Users, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
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
    { title: 'This Month Revenue', value: '$12,450', icon: DollarSign, color: 'text-green-600' },
    { title: 'Active Bookings', value: '8', icon: Calendar, color: 'text-blue-600' },
    { title: 'Total Clients', value: '34', icon: Users, color: 'text-purple-600' },
    { title: 'Pending Payments', value: '3', icon: Bell, color: 'text-orange-600' }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ahmed's Studio</h1>
            <p className="text-gray-600">Photography Business</p>
          </div>
        </div>
        <Bell className="w-6 h-6 text-gray-600" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gray-50`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendar Overview */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={day} className="text-sm text-gray-600 py-2">
                {day}
              </div>
            ))}
            {[26, 27, 28, 29, 30, 31, 1].map((date, index) => (
              <div 
                key={date} 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Upcoming Bookings</CardTitle>
          <span className="text-sm text-blue-600 font-medium">See All</span>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingBookings.map((booking) => (
            <div key={booking.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{booking.client}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{booking.service}</p>
              <p className="text-sm text-gray-600 mb-1">{booking.date} • {booking.time}</p>
              <p className="text-sm text-blue-600">📍 {booking.location}</p>
              <p className="text-xs text-gray-500 mt-2">Assigned to: {booking.assignedTo}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
