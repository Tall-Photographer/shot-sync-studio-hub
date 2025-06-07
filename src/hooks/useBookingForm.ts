
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useBookings } from '@/hooks/useBookings';

interface BookingFormData {
  name: string;
  client_id: string;
  service_ids: string[];
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  assigned_team_member_ids: string[];
  amount: string;
  expenses: string;
  payment_status: string;
  notes: string;
}

export const useBookingForm = (defaultDate?: string, onSuccess?: (booking: any) => void) => {
  const [bookingData, setBookingData] = useState<BookingFormData>({
    name: '',
    client_id: '',
    service_ids: [],
    date: defaultDate || '',
    start_time: '',
    end_time: '',
    location: '',
    assigned_team_member_ids: [],
    amount: '',
    expenses: '',
    payment_status: 'unpaid',
    notes: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { addBooking } = useBookings();

  const handleInputChange = (field: string, value: string | string[]) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!bookingData.name.trim()) {
      newErrors.name = 'Booking name is required';
    }
    if (!bookingData.client_id) {
      newErrors.client_id = 'Client must be selected or created';
    }
    if (bookingData.service_ids.length === 0) {
      newErrors.service_ids = 'At least one service must be selected';
    }
    if (!bookingData.date) {
      newErrors.date = 'Date is required';
    }
    if (!bookingData.start_time) {
      newErrors.start_time = 'Start time is required';
    }
    if (!bookingData.end_time) {
      newErrors.end_time = 'End time is required';
    }
    if (bookingData.start_time && bookingData.end_time && bookingData.start_time >= bookingData.end_time) {
      newErrors.end_time = 'End time must be after start time';
    }
    if (bookingData.assigned_team_member_ids.length === 0) {
      newErrors.assigned_team_member_ids = 'At least one team member must be assigned';
    }
    if (bookingData.amount && isNaN(Number(bookingData.amount))) {
      newErrors.amount = 'Amount must be a valid number';
    }
    if (bookingData.expenses && isNaN(Number(bookingData.expenses))) {
      newErrors.expenses = 'Expenses must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting",
        variant: "destructive"
      });
      return false;
    }

    const newBooking = {
      name: bookingData.name,
      client_id: bookingData.client_id,
      service_ids: bookingData.service_ids,
      date: bookingData.date,
      start_time: bookingData.start_time,
      end_time: bookingData.end_time,
      location: bookingData.location,
      assigned_team_member_ids: bookingData.assigned_team_member_ids,
      status: 'pending',
      amount: bookingData.amount ? Number(bookingData.amount) : 0,
      expenses: bookingData.expenses ? Number(bookingData.expenses) : 0,
      payment_status: bookingData.payment_status,
      notes: bookingData.notes
    };

    console.log('Creating new booking:', newBooking);
    
    const createdBooking = await addBooking(newBooking);
    
    if (createdBooking) {
      onSuccess?.(createdBooking);
      resetForm();
      return true;
    }
    return false;
  };

  const resetForm = () => {
    setBookingData({
      name: '',
      client_id: '',
      service_ids: [],
      date: defaultDate || '',
      start_time: '',
      end_time: '',
      location: '',
      assigned_team_member_ids: [],
      amount: '',
      expenses: '',
      payment_status: 'unpaid',
      notes: ''
    });
    setErrors({});
  };

  return {
    bookingData,
    errors,
    handleInputChange,
    submitForm,
    resetForm
  };
};
