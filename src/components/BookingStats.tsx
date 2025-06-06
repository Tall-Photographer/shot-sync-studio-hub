
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Booking } from '@/hooks/useBookings';

interface BookingStatsProps {
  bookings: Booking[];
}

const BookingStats = ({ bookings }: BookingStatsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
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
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-3 text-center">
          <p className="text-lg font-bold text-blue-600">
            {bookings.filter(b => b.status === 'completed').length}
          </p>
          <p className="text-xs text-blue-600">Completed</p>
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
  );
};

export default BookingStats;
