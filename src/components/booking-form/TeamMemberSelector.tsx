
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useTeamMembers } from '@/hooks/useTeamMembers';

interface TeamMemberSelectorProps {
  selectedMembers: string[];
  onMemberChange: (members: string[]) => void;
  error?: string;
}

const TeamMemberSelector = ({ selectedMembers, onMemberChange, error }: TeamMemberSelectorProps) => {
  const { teamMembers } = useTeamMembers();

  const handleTeamMemberToggle = (memberId: string, checked: boolean) => {
    const updatedMembers = checked 
      ? [...selectedMembers, memberId]
      : selectedMembers.filter(id => id !== memberId);
    onMemberChange(updatedMembers);
  };

  return (
    <div>
      <Label>Assigned Team Members *</Label>
      <div className="space-y-2 mt-2 max-h-32 overflow-y-auto border rounded-md p-2">
        {teamMembers.length === 0 ? (
          <p className="text-sm text-gray-500">No team members available. Add team members first.</p>
        ) : (
          teamMembers.map((member) => (
            <div key={member.id} className="flex items-center space-x-2">
              <Checkbox
                id={member.id}
                checked={selectedMembers.includes(member.id)}
                onCheckedChange={(checked) => handleTeamMemberToggle(member.id, checked as boolean)}
              />
              <Label htmlFor={member.id} className="text-sm">{member.name}</Label>
            </div>
          ))
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TeamMemberSelector;
