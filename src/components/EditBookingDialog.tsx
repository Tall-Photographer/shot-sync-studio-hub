
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface EditBookingDialogProps {
  trigger: React.ReactNode;
  booking: any;
  onBookingUpdated?: (booking: any) => void;
}

const EditBookingDialog = ({ trigger, booking, onBookingUpdated }: EditBookingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    client: '',
    service: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    assignedTo: '',
    amount: '',
    expenses: '',
    paymentStatus: 'unpaid',
    notes: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (booking && open) {
      console.log('Loading booking data for edit:', booking);
      setBookingData({
        name: booking.name || '',
        client: booking.client || '',
        service: booking.service || '',
        date: booking.date || '',
        startTime: booking.time ? booking.time.split(' - ')[0] : '',
        endTime: booking.time ? booking.time.split(' - ')[1] : '',
        location: booking.location || '',
        assignedTo: booking.assignedTo || '',
        amount: booking.amount ? booking.amount.replace('$', '') : '',
        expenses: booking.expenses ? booking.expenses.replace('$', '') : '',
        paymentStatus: booking.paymentStatus || 'unpaid',
        notes: booking.notes || ''
      });
    }
  }, [booking, open]);

  const clients = [
    'Sarah Johnson',
    'Mike Davis', 
    'Emma Wilson',
    'John Smith',
    'Lisa Brown'
  ];

  const teamMembers = [
    'Alex Thompson',
    'Emma Wilson', 
    'Mike Johnson',
    'Sarah Davis'
  ];

  const handleInputChange = (field: string, value: string) => {
    console.log('Updating field:', field, 'with value:', value);
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting booking update:', bookingData);
    
    const updatedBooking = {
      ...booking,
      ...bookingData,
      amount: bookingData.amount ? `$${bookingData.amount}` : '$0',
      expenses: bookingData.expenses ? `$${bookingData.expenses}` : '$0',
      time: `${bookingData.startTime} - ${bookingData.endTime}`
    };

    console.log('Updated booking:', updatedBooking);
    
    toast({
      title: "Booking Updated",
      description: "Booking has been updated successfully"
    });

    onBookingUpdated?.(updatedBooking);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="bookingName">Booking Name</Label>
            <Input
              id="bookingName"
              value={bookingData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Sarah & John Wedding"
            />
          </div>

          <div>
            <Label htmlFor="client">Client</Label>
            <Select onValueChange={(value) => handleInputChange('client', value)} value={bookingData.client}>
              <SelectTrigger>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client} value={client}>{client}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="service">Service Type</Label>
            <Select onValueChange={(value) => handleInputChange('service', value)} value={bookingData.service}>
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

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={bookingData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={bookingData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={bookingData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
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
            <Label htmlFor="assignedTo">Assigned Team Member</Label>
            <Select onValueChange={(value) => handleInputChange('assignedTo', value)} value={bookingData.assignedTo}>
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member} value={member}>{member}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={bookingData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="expenses">Expenses ($)</Label>
              <Input
                id="expenses"
                type="number"
                step="0.01"
                value={bookingData.expenses}
                onChange={(e) => handleInputChange('expenses', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <Select onValueChange={(value) => handleInputChange('paymentStatus', value)} value={bookingData.paymentStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
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
              Update Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookingDialog;
