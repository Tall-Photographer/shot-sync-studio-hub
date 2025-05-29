
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');

  const bookings = [
    {
      id: 1,
      name: 'Sarah & John Wedding',
      date: '2025-05-30',
      time: '14:00 - 18:00',
      assignedTo: 'Alex Thompson',
      status: 'confirmed'
    },
    {
      id: 2,
      name: 'Corporate Headshots',
      date: '2025-06-02',
      time: '10:00 - 12:00',
      assignedTo: 'Emma Wilson',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Family Photos',
      date: '2025-06-05',
      time: '09:00 - 11:00',
      assignedTo: 'Alex Thompson',
      status: 'confirmed'
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    
    setCurrentDate(newDate);
  };

  const getBookingsForDate = (date: string) => {
    return bookings.filter(booking => booking.date === date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDayView = () => {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayBookings = getBookingsForDate(dateStr);

    return (
      <Card className="bg-white shadow-sm border-0">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-4">{formatDate(currentDate)}</h3>
          {dayBookings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No bookings for this day</p>
          ) : (
            <div className="space-y-3">
              {dayBookings.map((booking) => (
                <div key={booking.id} className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{booking.name}</h4>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{booking.time}</p>
                  <p className="text-sm text-blue-600">📸 {booking.assignedTo}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });

    return (
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={day} className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">{day}</p>
            <div className="bg-white rounded-lg border min-h-[120px] p-2">
              <p className="text-sm font-medium mb-2">
                {weekDays[index].getDate()}
              </p>
              {getBookingsForDate(weekDays[index].toISOString().split('T')[0]).map((booking) => (
                <div key={booking.id} className="bg-blue-100 rounded text-xs p-1 mb-1">
                  <p className="font-medium truncate">{booking.name}</p>
                  <p className="text-gray-600">{booking.time.split(' - ')[0]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMonthView = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const weeks = [];
    const currentWeekDate = new Date(startDate);
    
    while (currentWeekDate <= lastDay || currentWeekDate.getDay() !== 0) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(currentWeekDate));
        currentWeekDate.setDate(currentWeekDate.getDate() + 1);
      }
      weeks.push(week);
      if (week[6] > lastDay && week[6].getDay() === 6) break;
    }

    return (
      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2">
            {week.map((day, dayIndex) => {
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const dayBookings = getBookingsForDate(day.toISOString().split('T')[0]);
              
              return (
                <div 
                  key={dayIndex} 
                  className={`bg-white rounded border min-h-[80px] p-1 ${
                    isCurrentMonth ? '' : 'opacity-50'
                  }`}
                >
                  <p className={`text-sm font-medium mb-1 ${
                    isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {day.getDate()}
                  </p>
                  {dayBookings.slice(0, 2).map((booking) => (
                    <div key={booking.id} className="bg-blue-100 rounded text-xs p-1 mb-1">
                      <p className="font-medium truncate">{booking.name}</p>
                    </div>
                  ))}
                  {dayBookings.length > 2 && (
                    <p className="text-xs text-gray-500">+{dayBookings.length - 2} more</p>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('day')}
          >
            Day
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('week')}
          >
            Week
          </Button>
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('month')}
          >
            Month
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigateDate('prev')}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <h2 className="text-lg font-semibold">
          {viewMode === 'month' ? formatMonth(currentDate) : formatDate(currentDate)}
        </h2>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigateDate('next')}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar View */}
      {viewMode === 'day' && renderDayView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'month' && renderMonthView()}
    </div>
  );
};

export default Calendar;
