
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Booking {
  id: string;
  name: string;
  client_id: string;
  service_ids: string[];
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  assigned_team_member_ids: string[];
  status: string;
  amount: number;
  expenses: number;
  payment_status: string;
  notes: string;
  client?: {
    name: string;
  };
}

export interface BookingFilters {
  client_id?: string;
  status?: string;
  team_member_id?: string;
  month?: string;
  year?: string;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<BookingFilters>({});
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchBookings = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          client:clients(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      const bookingsData = data || [];
      setBookings(bookingsData);
      setFilteredBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (newFilters: BookingFilters) => {
    setFilters(newFilters);
    
    let filtered = [...bookings];

    if (newFilters.client_id) {
      filtered = filtered.filter(booking => booking.client_id === newFilters.client_id);
    }

    if (newFilters.status) {
      filtered = filtered.filter(booking => booking.status === newFilters.status);
    }

    if (newFilters.team_member_id) {
      filtered = filtered.filter(booking => 
        booking.assigned_team_member_ids.includes(newFilters.team_member_id!)
      );
    }

    if (newFilters.month && newFilters.year) {
      filtered = filtered.filter(booking => {
        if (!booking.date) return false;
        const bookingDate = new Date(booking.date);
        return bookingDate.getMonth() + 1 === parseInt(newFilters.month!) &&
               bookingDate.getFullYear() === parseInt(newFilters.year!);
      });
    } else if (newFilters.year) {
      filtered = filtered.filter(booking => {
        if (!booking.date) return false;
        const bookingDate = new Date(booking.date);
        return bookingDate.getFullYear() === parseInt(newFilters.year!);
      });
    }

    setFilteredBookings(filtered);
  };

  const clearFilters = () => {
    setFilters({});
    setFilteredBookings(bookings);
  };

  const addBooking = async (booking: Omit<Booking, 'id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{ ...booking, user_id: user.id }])
        .select(`
          *,
          client:clients(name)
        `)
        .single();

      if (error) throw error;
      const newBookings = [data, ...bookings];
      setBookings(newBookings);
      applyFilters(filters); // Reapply current filters
      toast({
        title: "Success",
        description: "Booking added successfully"
      });
      return data;
    } catch (error) {
      console.error('Error adding booking:', error);
      toast({
        title: "Error",
        description: "Failed to add booking",
        variant: "destructive"
      });
    }
  };

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          client:clients(name)
        `)
        .single();

      if (error) throw error;
      const updatedBookings = bookings.map(booking => booking.id === id ? data : booking);
      setBookings(updatedBookings);
      applyFilters(filters); // Reapply current filters
      toast({
        title: "Success",
        description: "Booking updated successfully"
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: "Failed to update booking",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  useEffect(() => {
    applyFilters(filters);
  }, [bookings]);

  return {
    bookings: filteredBookings,
    allBookings: bookings,
    loading,
    filters,
    addBooking,
    updateBooking,
    applyFilters,
    clearFilters,
    refetch: fetchBookings
  };
};
