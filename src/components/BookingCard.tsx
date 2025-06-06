
import React from 'react';
import { Calendar, User, MapPin, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Booking } from '@/hooks/useBookings';
import BookingActions from './BookingActions';

interface BookingCardProps {
  booking: Booking;
  selectedBookingId?: number | null;
  onBookingUpdated?: (booking: any) => void;
  onCancelBooking: (bookingId: string) => void;
  onCompleteBooking: (bookingId: string) => void;
  onCreateInvoice: (booking: any) => void;
  getClientName: (clientId: string) => string;
  getTeamMemberNames: (memberIds: string[]) => string;
}

const BookingCard = ({
  booking,
  selectedBookingId,
  onBookingUpdated,
  onCancelBooking,
  onCompleteBooking,
  onCreateInvoice,
  getClientName,
  getTeamMemberNames
}: BookingCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
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

  return (
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

        <BookingActions
          booking={booking}
          onBookingUpdated={onBookingUpdated}
          onCancelBooking={onCancelBooking}
          onCompleteBooking={onCompleteBooking}
          onCreateInvoice={onCreateInvoice}
        />
      </CardContent>
    </Card>
  );
};

export default BookingCard;
