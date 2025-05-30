import React, { useState } from 'react';
import { Plus, Calendar, User, MapPin, DollarSign, FileText, Edit, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import QuotationDialog from './QuotationDialog';
import NewBookingDialog from './NewBookingDialog';
import EditBookingDialog from './EditBookingDialog';
import { useToast } from '@/hooks/use-toast';

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: 'Sarah & John Wedding',
      client: 'Sarah Johnson',
      service: 'Wedding Photography',
      date: '2025-05-30',
      time: '14:00 - 18:00',
      location: 'Central Park, NYC',
      assignedTo: 'Alex Thompson, Emma Wilson',
      status: 'confirmed',
      amount: 'AED 9,200',
      paymentStatus: 'partial',
      notes: 'Outdoor ceremony, backup indoor location ready'
    },
    {
      id: 2,
      name: 'Corporate Headshots',
      client: 'Mike Davis',
      service: 'Portrait Session',
      date: '2025-06-02',
      time: '10:00 - 12:00',
      location: 'Studio Downtown',
      assignedTo: 'Emma Wilson',
      status: 'pending',
      amount: 'AED 2,390',
      paymentStatus: 'unpaid',
      notes: 'Professional headshots for LinkedIn'
    },
    {
      id: 3,
      name: 'Family Summer Photos',
      client: 'Emma Wilson',
      service: 'Family Photography',
      date: '2025-06-05',
      time: '09:00 - 11:00',
      location: 'Riverside Park',
      assignedTo: 'Alex Thompson',
      status: 'confirmed',
      amount: 'AED 2,945',
      paymentStatus: 'paid',
      notes: 'Golden hour session with 3 kids'
    }
  ]);

  const handleBookingAdded = (newBooking: any) => {
    setBookings(prev => [...prev, newBooking]);
  };

  const handleBookingUpdated = (updatedBooking: any) => {
    setBookings(prev => prev.map(booking => 
      booking.id === updatedBooking.id ? updatedBooking : booking
    ));
  };

  const handleCreateInvoice = (booking: any) => {
    console.log('Creating invoice for booking:', booking);
    toast({
      title: "Invoice Created",
      description: `Invoice created for ${booking.name}`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-blue-100 text-blue-800';
      case 'unpaid': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  const tabs = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
    { id: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <NewBookingDialog
          trigger={
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          }
          onBookingAdded={handleBookingAdded}
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-blue-600">{bookings.length}</p>
            <p className="text-xs text-blue-600">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-green-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
            <p className="text-xs text-green-600">Confirmed</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-yellow-600">
              {bookings.filter(b => b.paymentStatus === 'unpaid').length}
            </p>
            <p className="text-xs text-yellow-600">Unpaid</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{booking.name}</h3>
                  <p className="text-sm text-gray-600">{booking.client}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <Badge className={getPaymentColor(booking.paymentStatus)}>
                    {booking.paymentStatus}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{booking.date} • {booking.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{booking.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Assigned to: {booking.assignedTo}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{booking.amount}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-700">{booking.notes}</p>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <EditBookingDialog
                  booking={booking}
                  onBookingUpdated={handleBookingUpdated}
                  trigger={
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                  }
                />
                
                <QuotationDialog
                  booking={booking}
                  trigger={
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Quote
                    </Button>
                  }
                />
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleCreateInvoice(booking)}
                  className="flex items-center gap-1"
                >
                  <Receipt className="w-3 h-3" />
                  Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
