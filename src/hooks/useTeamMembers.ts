
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  hourly_rate: number;
  status: string;
}

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchTeamMembers = async () => {
    if (!user) return;
    
    try {
      console.log('Fetching team members for user:', user.id);
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching team members:', error);
        throw error;
      }
      
      console.log('Fetched team members:', data);
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error",
        description: "Failed to fetch team members. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    if (!user) return;

    try {
      console.log('Adding team member:', member);
      const { data, error } = await supabase
        .from('team_members')
        .insert([{ ...member, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Error adding team member:', error);
        throw error;
      }
      
      console.log('Added team member:', data);
      setTeamMembers(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Team member added successfully"
      });
      return data;
    } catch (error) {
      console.error('Error adding team member:', error);
      toast({
        title: "Error",
        description: "Failed to add team member. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateTeamMember = async (id: string, updates: Partial<TeamMember>) => {
    try {
      console.log('Updating team member:', id, updates);
      const { data, error } = await supabase
        .from('team_members')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating team member:', error);
        throw error;
      }
      
      console.log('Updated team member:', data);
      setTeamMembers(prev => prev.map(member => member.id === id ? data : member));
      toast({
        title: "Success",
        description: "Team member updated successfully"
      });
    } catch (error) {
      console.error('Error updating team member:', error);
      toast({
        title: "Error",
        description: "Failed to update team member. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [user]);

  return {
    teamMembers,
    loading,
    addTeamMember,
    updateTeamMember,
    refetch: fetchTeamMembers
  };
};
