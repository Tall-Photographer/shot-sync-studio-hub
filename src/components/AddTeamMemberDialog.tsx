
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddTeamMemberDialogProps {
  trigger: React.ReactNode;
  onMemberAdded?: (member: any) => void;
}

const AddTeamMemberDialog = ({ trigger, onMemberAdded }: AddTeamMemberDialogProps) => {
  const [open, setOpen] = useState(false);
  const [memberData, setMemberData] = useState({
    name: '',
    role: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setMemberData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMember = {
      id: Date.now(),
      ...memberData,
      status: 'active',
      activeBookings: 0,
      totalEarnings: '$0',
      specialties: [],
      joinDate: new Date().toISOString().split('T')[0]
    };

    console.log('Adding new team member:', newMember);
    
    // Simulate sending app link
    toast({
      title: "Team Member Added",
      description: `App invitation sent to ${memberData.email}`
    });

    onMemberAdded?.(newMember);
    setOpen(false);
    
    // Reset form
    setMemberData({
      name: '',
      role: '',
      email: '',
      phone: ''
    });
  };

  const sendAppLink = () => {
    toast({
      title: "App Link Sent",
      description: `Download link sent to ${memberData.email}`
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={memberData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={memberData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={memberData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>

          <div>
            <Label htmlFor="role">Role *</Label>
            <Select onValueChange={(value) => handleInputChange('role', value)} required>
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

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Add & Send Invite
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamMemberDialog;
