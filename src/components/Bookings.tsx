
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NewBookingDialog from './NewBookingDialog';
import BookingFilters from './BookingFilters';
import BookingCard from './BookingCard';
import BookingTabs from './BookingTabs';
import BookingStats from './BookingStats';
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
  const { bookings, allBookings, loading, updateBooking, filters, applyFilters, clearFilters } = useBookings();
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

  const handleCompleteBooking = async (bookingId: string) => {
    await updateBooking(bookingId, { status: 'completed' });
    toast({
      title: "Booking Completed",
      description: "The booking has been marked as completed",
    });
  };

  const handleCreateInvoice = (booking: any) => {
    console.log('Creating invoice for booking:', booking);
    toast({
      title: "Invoice Created",
      description: `Invoice created for ${booking.name}`
    });
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
    { id: 'all', label: 'All Bookings', count: allBookings.length },
    { id: 'confirmed', label: 'Confirmed', count: allBookings.filter(b => b.status === 'confirmed').length },
    { id: 'completed', label: 'Completed', count: allBookings.filter(b => b.status === 'completed').length },
    { id: 'pending', label: 'Pending', count: allBookings.filter(b => b.status === 'pending').length },
    { id: 'cancelled', label: 'Cancelled', count: allBookings.filter(b => b.status === 'cancelled').length }
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

      {/* Filters */}
      <BookingFilters
        filters={filters}
        onFiltersChange={applyFilters}
        onClearFilters={clearFilters}
      />

      {/* Tabs */}
      <BookingTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Quick Stats */}
      <BookingStats bookings={allBookings} />

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                {activeTab === 'all' ? 'No bookings found' : `No ${activeTab} bookings found`}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              selectedBookingId={selectedBookingId}
              onBookingUpdated={handleBookingUpdated}
              onCancelBooking={handleCancelBooking}
              onCompleteBooking={handleCompleteBooking}
              onCreateInvoice={handleCreateInvoice}
              getClientName={getClientName}
              getTeamMemberNames={getTeamMemberNames}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;
