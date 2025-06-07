
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  total_bookings: number;
  total_spent: number;
  last_booked: string;
  notes: string;
}

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchClients = async () => {
    if (!user) return;
    
    try {
      console.log('Fetching clients for user:', user.id);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clients:', error);
        throw error;
      }
      
      console.log('Fetched clients:', data);
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: "Error",
        description: "Failed to fetch clients. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addClient = async (client: Omit<Client, 'id' | 'total_bookings' | 'total_spent'>) => {
    if (!user) return;

    try {
      console.log('Adding client:', client);
      const { data, error } = await supabase
        .from('clients')
        .insert([{ ...client, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Error adding client:', error);
        throw error;
      }
      
      console.log('Added client:', data);
      setClients(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Client added successfully"
      });
      return data;
    } catch (error) {
      console.error('Error adding client:', error);
      toast({
        title: "Error",
        description: "Failed to add client. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateClient = async (id: string, updates: Partial<Client>) => {
    try {
      console.log('Updating client:', id, updates);
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating client:', error);
        throw error;
      }
      
      console.log('Updated client:', data);
      setClients(prev => prev.map(client => client.id === id ? data : client));
      toast({
        title: "Success",
        description: "Client updated successfully"
      });
    } catch (error) {
      console.error('Error updating client:', error);
      toast({
        title: "Error",
        description: "Failed to update client. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchClients();
  }, [user]);

  return {
    clients,
    loading,
    addClient,
    updateClient,
    refetch: fetchClients
  };
};
