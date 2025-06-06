
import React, { useState, useEffect } from 'react';
import { Plus, Calendar, User, MapPin, DollarSign, FileText, Edit, Receipt, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import QuotationDialog from './QuotationDialog';
import NewBookingDialog from './NewBookingDialog';
import EditBookingDialog from './EditBookingDialog';
import { useBookings } from '@/hooks/useBookings';
import { useClients } from '@/hooks/useClients';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import { useToast } from '@/hooks/use-toast';

interface BookingsProps {
  selectedBookingId?: number | null;
  onBookingUpdated?: (booking: any) => void;
  onBookingCancelled?: (bookingId: number) => void;
}

const Bookings = ({ selectedBookingId, onBookingUpdated, onBookingCancelled }: BookingsProps) => {
  const [activeTab, setActiveTab] = useState('all');
  const { bookings, loading, updateBooking } = useBookings();
  const { clients } = useClients();
  const { teamMembers } = useTeamMembers();
  const { toast } = useToast();

  // Scroll to selected booking when it changes
  useEffect(() => {
    if (selectedBookingId) {
      const element = document.getElementById(`booking-${selectedBookingId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
        }, 2000);
      }
    }
  }, [selectedBookingId]);

  const handleBookingUpdated = (updatedBooking: any) => {
    onBookingUpdated?.(updatedBooking);
    toast({
      title: "Booking Updated",
      description: "The booking has been successfully updated",
    });
  };

  const handleCancelBooking = async (bookingId: string) => {
    await updateBooking(bookingId, { status: 'cancelled' });
    onBookingCancelled?.(parseInt(bookingId));
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

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const getTeamMemberNames = (memberIds: string[]) => {
    return memberIds
      .map(id => teamMembers.find(m => m.id === id)?.name || 'Unknown')
      .join(', ') || 'Not assigned';
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

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading bookings...</div>
        </div>
      </div>
    );
  }

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
          onBookingAdded={() => {}}
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
              {bookings.filter(b => b.payment_status === 'unpaid').length}
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
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                {activeTab === 'all' ? 'No bookings yet' : `No ${activeTab} bookings`}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id} id={`booking-${booking.id}`} className="bg-white shadow-sm border-0 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">{booking.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{getClientName(booking.client_id || '')}</p>
                  </div>
                  <div className="flex flex-col space-y-1 ml-2 flex-shrink-0">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    <Badge className={getPaymentColor(booking.payment_status)}>
                      {booking.payment_status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{booking.date} • {booking.start_time} - {booking.end_time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{booking.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">Assigned to: {getTeamMemberNames(booking.assigned_team_member_ids)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 flex-shrink-0" />
                    <span>AED {booking.amount?.toLocaleString() || '0'}</span>
                  </div>
                </div>

                {booking.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-700 break-words">{booking.notes}</p>
                  </div>
                )}

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
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;
