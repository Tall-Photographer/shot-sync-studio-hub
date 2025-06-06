
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface FinancialRecord {
  id: string;
  user_id: string;
  booking_id?: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export const useFinancialRecords = () => {
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchFinancialRecords = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('financial_records')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFinancialRecords(data || []);
    } catch (error) {
      console.error('Error fetching financial records:', error);
      toast({
        title: "Error",
        description: "Failed to fetch financial records",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addFinancialRecord = async (record: Omit<FinancialRecord, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('financial_records')
        .insert([{ ...record, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setFinancialRecords(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Financial record added successfully"
      });
      return data;
    } catch (error) {
      console.error('Error adding financial record:', error);
      toast({
        title: "Error",
        description: "Failed to add financial record",
        variant: "destructive"
      });
    }
  };

  const updateFinancialRecord = async (id: string, updates: Partial<FinancialRecord>) => {
    try {
      const { data, error } = await supabase
        .from('financial_records')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setFinancialRecords(prev => prev.map(record => record.id === id ? data : record));
      toast({
        title: "Success",
        description: "Financial record updated successfully"
      });
    } catch (error) {
      console.error('Error updating financial record:', error);
      toast({
        title: "Error",
        description: "Failed to update financial record",
        variant: "destructive"
      });
    }
  };

  const deleteFinancialRecord = async (id: string) => {
    try {
      const { error } = await supabase
        .from('financial_records')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setFinancialRecords(prev => prev.filter(record => record.id !== id));
      toast({
        title: "Success",
        description: "Financial record deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting financial record:', error);
      toast({
        title: "Error",
        description: "Failed to delete financial record",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchFinancialRecords();
  }, [user]);

  return {
    financialRecords,
    loading,
    addFinancialRecord,
    updateFinancialRecord,
    deleteFinancialRecord,
    refetch: fetchFinancialRecords
  };
};
