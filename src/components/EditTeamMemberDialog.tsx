
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface EditTeamMemberDialogProps {
  trigger: React.ReactNode;
  member: any;
  onMemberUpdated?: (member: any) => void;
}

const EditTeamMemberDialog = ({ trigger, member, onMemberUpdated }: EditTeamMemberDialogProps) => {
  const [open, setOpen] = useState(false);
  const [memberData, setMemberData] = useState({
    name: member.name || '',
    role: member.role || '',
    email: member.email || '',
    phone: member.phone || '',
    status: member.status || 'active',
    specialties: member.specialties || []
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setMemberData(prev => ({ ...prev, [field]: value }));
  };

  const addSpecialty = (specialty: string) => {
    if (specialty && !memberData.specialties.includes(specialty)) {
      setMemberData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }));
    }
  };

  const removeSpecialty = (specialty: string) => {
    setMemberData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedMember = {
      ...member,
      ...memberData
    };

    console.log('Updating team member:', updatedMember);
    
    toast({
      title: "Profile Updated",
      description: "Team member profile has been updated successfully"
    });

    onMemberUpdated?.(updatedMember);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={memberData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => handleInputChange('role', value)} value={memberData.role}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Senior Photographer">Senior Photographer</SelectItem>
                <SelectItem value="Portrait Specialist">Portrait Specialist</SelectItem>
                <SelectItem value="Event Photographer">Event Photographer</SelectItem>
                <SelectItem value="Assistant">Assistant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={memberData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={memberData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => handleInputChange('status', value)} value={memberData.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Specialties</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {memberData.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {specialty}
                  <button
                    type="button"
                    onClick={() => removeSpecialty(specialty)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <Select onValueChange={addSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Add specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Wedding">Wedding</SelectItem>
                <SelectItem value="Portrait">Portrait</SelectItem>
                <SelectItem value="Corporate">Corporate</SelectItem>
                <SelectItem value="Events">Events</SelectItem>
                <SelectItem value="Headshots">Headshots</SelectItem>
                <SelectItem value="Family">Family</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Update Profile
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamMemberDialog;
