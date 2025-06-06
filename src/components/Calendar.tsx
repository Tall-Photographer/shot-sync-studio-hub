
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NewBookingDialog from './NewBookingDialog';
import EditBookingDialog from './EditBookingDialog';
import { useBookings } from '@/hooks/useBookings';
import { useClients } from '@/hooks/useClients';
import { useTeamMembers } from '@/hooks/useTeamMembers';

interface CalendarProps {
  updatedBooking?: any;
  cancelledBookingId?: number;
}

const Calendar = ({ updatedBooking, cancelledBookingId }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('month');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const { bookings, loading } = useBookings();
  const { clients } = useClients();
  const { teamMembers } = useTeamMembers();

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };

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
    return bookings.filter(booking => booking.date === date && booking.status !== 'cancelled');
  };

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const getTeamMemberName = (memberIds: string[]) => {
    if (memberIds.length === 0) return 'Unassigned';
    const member = teamMembers.find(m => m.id === memberIds[0]);
    return member?.name || 'Unknown';
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">{formatDate(currentDate)}</h3>
            <NewBookingDialog
              trigger={
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Booking
                </Button>
              }
              onBookingAdded={() => {}}
              defaultDate={dateStr}
            />
          </div>
          {dayBookings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No bookings for this day</p>
          ) : (
            <div className="space-y-3">
              {dayBookings.map((booking) => (
                <EditBookingDialog
                  key={booking.id}
                  booking={booking}
                  onBookingUpdated={() => {}}
                  trigger={
                    <div className="bg-blue-50 rounded-lg p-3 cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{booking.name}</h4>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{booking.start_time} - {booking.end_time}</p>
                      <p className="text-sm text-blue-600">📸 {getTeamMemberName(booking.assigned_team_member_ids)}</p>
                    </div>
                  }
                />
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
            <div 
              className="bg-white rounded-lg border min-h-[120px] p-2 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleDayClick(weekDays[index].toISOString().split('T')[0])}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">
                  {weekDays[index].getDate()}
                </p>
                <NewBookingDialog
                  trigger={
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 w-6 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  }
                  onBookingAdded={() => {}}
                  defaultDate={weekDays[index].toISOString().split('T')[0]}
                />
              </div>
              {getBookingsForDate(weekDays[index].toISOString().split('T')[0]).map((booking) => (
                <EditBookingDialog
                  key={booking.id}
                  booking={booking}
                  onBookingUpdated={() => {}}
                  trigger={
                    <div 
                      className="bg-blue-100 rounded text-xs p-1 mb-1 cursor-pointer hover:bg-blue-200 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="font-medium truncate">{booking.name}</p>
                      <p className="text-gray-600">{booking.start_time}</p>
                    </div>
                  }
                />
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
                  className={`bg-white rounded border min-h-[80px] p-1 cursor-pointer hover:bg-gray-50 transition-colors ${
                    isCurrentMonth ? '' : 'opacity-50'
                  }`}
                  onClick={() => handleDayClick(day.toISOString().split('T')[0])}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm font-medium ${
                      isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {day.getDate()}
                    </p>
                    <NewBookingDialog
                      trigger={
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-4 w-4 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Plus className="w-2 h-2" />
                        </Button>
                      }
                      onBookingAdded={() => {}}
                      defaultDate={day.toISOString().split('T')[0]}
                    />
                  </div>
                  {dayBookings.slice(0, 2).map((booking) => (
                    <EditBookingDialog
                      key={booking.id}
                      booking={booking}
                      onBookingUpdated={() => {}}
                      trigger={
                        <div 
                          className="bg-blue-100 rounded text-xs p-1 mb-1 cursor-pointer hover:bg-blue-200 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p className="font-medium truncate">{booking.name}</p>
                        </div>
                      }
                    />
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

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading calendar...</div>
        </div>
      </div>
    );
  }

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

      {/* Selected Date New Booking Dialog */}
      {selectedDate && (
        <NewBookingDialog
          trigger={<div />}
          onBookingAdded={() => {}}
          defaultDate={selectedDate}
        />
      )}
    </div>
  );
};

export default Calendar;
