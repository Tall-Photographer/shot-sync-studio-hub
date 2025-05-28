
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface NewBookingDialogProps {
  trigger: React.ReactNode;
  onBookingAdded?: (booking: any) => void;
}

const NewBookingDialog = ({ trigger, onBookingAdded }: NewBookingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    client: '',
    service: '',
    date: '',
    time: '',
    location: '',
    assignedTo: '',
    amount: '',
    notes: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingData.name || !bookingData.client || !bookingData.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'pending',
      paymentStatus: 'unpaid',
      amount: bookingData.amount ? `$${bookingData.amount}` : '$0'
    };

    console.log('Creating new booking:', newBooking);
    
    toast({
      title: "Booking Created",
      description: "New booking has been added successfully"
    });

    onBookingAdded?.(newBooking);
    setOpen(false);
    
    // Reset form
    setBookingData({
      name: '',
      client: '',
      service: '',
      date: '',
      time: '',
      location: '',
      assignedTo: '',
      amount: '',
      notes: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Booking</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="bookingName">Booking Name *</Label>
            <Input
              id="bookingName"
              value={bookingData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Sarah & John Wedding"
              required
            />
          </div>

          <div>
            <Label htmlFor="client">Client Name *</Label>
            <Input
              id="client"
              value={bookingData.client}
              onChange={(e) => handleInputChange('client', e.target.value)}
              placeholder="Enter client name"
              required
            />
          </div>

          <div>
            <Label htmlFor="service">Service Type</Label>
            <Select onValueChange={(value) => handleInputChange('service', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Wedding Photography">Wedding Photography</SelectItem>
                <SelectItem value="Portrait Session">Portrait Session</SelectItem>
                <SelectItem value="Family Photography">Family Photography</SelectItem>
                <SelectItem value="Corporate Photography">Corporate Photography</SelectItem>
                <SelectItem value="Event Photography">Event Photography</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={bookingData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={bookingData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                placeholder="e.g., 14:00 - 18:00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={bookingData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter location"
            />
          </div>

          <div>
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Select onValueChange={(value) => handleInputChange('assignedTo', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alex Thompson">Alex Thompson</SelectItem>
                <SelectItem value="Emma Wilson">Emma Wilson</SelectItem>
                <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                <SelectItem value="Sarah Davis">Sarah Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={bookingData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={bookingData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Create Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewBookingDialog;
