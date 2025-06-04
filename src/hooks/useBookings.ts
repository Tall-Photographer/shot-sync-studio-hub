
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

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
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
      setBookings(data || []);
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
      setBookings(prev => [data, ...prev]);
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
      setBookings(prev => prev.map(booking => booking.id === id ? data : booking));
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

  return {
    bookings,
    loading,
    addBooking,
    updateBooking,
    refetch: fetchBookings
  };
};
