
import React, { useState, useEffect } from 'react';
import { Plus, Calendar, User, MapPin, DollarSign, FileText, Edit, Receipt, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import QuotationDialog from './QuotationDialog';
import NewBookingDialog from './NewBookingDialog';
import EditBookingDialog from './EditBookingDialog';
import { useToast } from '@/hooks/use-toast';

interface BookingsProps {
  selectedBookingId?: number | null;
  onBookingUpdated?: (booking: any) => void;
  onBookingCancelled?: (bookingId: number) => void;
}

const Bookings = ({ selectedBookingId, onBookingUpdated, onBookingCancelled }: BookingsProps) => {
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

  // Scroll to selected booking when it changes
  useEffect(() => {
    if (selectedBookingId) {
      const element = document.getElementById(`booking-${selectedBookingId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add highlight effect
        element.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
        }, 2000);
      }
    }
  }, [selectedBookingId]);

  const handleBookingAdded = (newBooking: any) => {
    setBookings(prev => [...prev, newBooking]);
  };

  const handleBookingUpdated = (updatedBooking: any) => {
    setBookings(prev => prev.map(booking => 
      booking.id === updatedBooking.id ? updatedBooking : booking
    ));
    
    // Notify parent component about the update
    onBookingUpdated?.(updatedBooking);
    
    toast({
      title: "Booking Updated",
      description: "The booking has been successfully updated",
    });
  };

  const handleCancelBooking = (bookingId: number) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    ));
    
    // Notify parent component about the cancellation
    onBookingCancelled?.(bookingId);
    
    toast({
      title: "Booking Cancelled",
      description: "The booking has been successfully cancelled",
    });
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
    { id: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  return (
    <div className="p-4 space-y-6 pb-24 sm:pb-6">
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
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-red-600">
              {bookings.filter(b => b.status === 'cancelled').length}
            </p>
            <p className="text-xs text-red-600">Cancelled</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} id={`booking-${booking.id}`} className="bg-white shadow-sm border-0 transition-all">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{booking.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{booking.client}</p>
                </div>
                <div className="flex flex-col space-y-1 ml-2 flex-shrink-0">
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
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{booking.date} • {booking.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{booking.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Assigned to: {booking.assignedTo}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 flex-shrink-0" />
                  <span>{booking.amount}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-700 break-words">{booking.notes}</p>
              </div>

              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <EditBookingDialog
                  booking={booking}
                  onBookingUpdated={handleBookingUpdated}
                  trigger={
                    <Button size="sm" variant="outline" className="flex items-center gap-1 w-full">
                      <Edit className="w-3 h-3" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                  }
                />
                
                <QuotationDialog
                  booking={booking}
                  trigger={
                    <Button size="sm" variant="outline" className="flex items-center gap-1 w-full">
                      <FileText className="w-3 h-3" />
                      <span className="hidden sm:inline">Quote</span>
                    </Button>
                  }
                />
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleCreateInvoice(booking)}
                  className="flex items-center gap-1 w-full"
                >
                  <Receipt className="w-3 h-3" />
                  <span className="hidden sm:inline">Invoice</span>
                </Button>

                {booking.status !== 'cancelled' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex items-center gap-1 text-red-600 border-red-600 hover:bg-red-50 w-full">
                        <X className="w-3 h-3" />
                        <span className="hidden sm:inline">Cancel</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel this booking? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleCancelBooking(booking.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Cancel Booking
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
