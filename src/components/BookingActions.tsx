
import React from 'react';
import { Edit, FileText, Receipt, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import QuotationDialog from './QuotationDialog';
import EditBookingDialog from './EditBookingDialog';
import { Booking } from '@/hooks/useBookings';

interface BookingActionsProps {
  booking: Booking;
  onBookingUpdated?: (booking: any) => void;
  onCancelBooking: (bookingId: string) => void;
  onCompleteBooking: (bookingId: string) => void;
  onCreateInvoice: (booking: any) => void;
}

const BookingActions = ({
  booking,
  onBookingUpdated,
  onCancelBooking,
  onCompleteBooking,
  onCreateInvoice
}: BookingActionsProps) => {
  return (
    <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2">
      <EditBookingDialog
        booking={booking}
        onBookingUpdated={onBookingUpdated}
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
        onClick={() => onCreateInvoice(booking)}
        className="flex items-center gap-1 w-full"
      >
        <Receipt className="w-3 h-3" />
        <span className="hidden sm:inline">Invoice</span>
      </Button>

      {(booking.status === 'confirmed' || booking.status === 'pending') && (
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => onCompleteBooking(booking.id)}
          className="flex items-center gap-1 text-blue-600 border-blue-600 hover:bg-blue-50 w-full"
        >
          <CheckCircle className="w-3 h-3" />
          <span className="hidden sm:inline">Complete</span>
        </Button>
      )}

      {booking.status !== 'cancelled' && booking.status !== 'completed' && (
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
                onClick={() => onCancelBooking(booking.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Cancel Booking
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default BookingActions;
