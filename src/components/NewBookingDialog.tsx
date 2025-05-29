
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
    startTime: '',
    endTime: '',
    location: '',
    assignedTo: '',
    amount: '',
    expenses: '',
    paymentStatus: 'unpaid',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

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
    setBookingData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!bookingData.name.trim()) {
      newErrors.name = 'Booking name is required';
    }
    if (!bookingData.client) {
      newErrors.client = 'Client must be selected';
    }
    if (!bookingData.date) {
      newErrors.date = 'Date is required';
    }
    if (!bookingData.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    if (!bookingData.endTime) {
      newErrors.endTime = 'End time is required';
    }
    if (bookingData.startTime && bookingData.endTime && bookingData.startTime >= bookingData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }
    if (!bookingData.assignedTo) {
      newErrors.assignedTo = 'Team member must be assigned';
    }
    if (bookingData.amount && isNaN(Number(bookingData.amount))) {
      newErrors.amount = 'Amount must be a valid number';
    }
    if (bookingData.expenses && isNaN(Number(bookingData.expenses))) {
      newErrors.expenses = 'Expenses must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting",
        variant: "destructive"
      });
      return;
    }

    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'pending',
      amount: bookingData.amount ? `$${bookingData.amount}` : '$0',
      expenses: bookingData.expenses ? `$${bookingData.expenses}` : '$0',
      time: `${bookingData.startTime} - ${bookingData.endTime}`
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
      startTime: '',
      endTime: '',
      location: '',
      assignedTo: '',
      amount: '',
      expenses: '',
      paymentStatus: 'unpaid',
      notes: ''
    });
    setErrors({});
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
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="client">Linked Client *</Label>
            <Select onValueChange={(value) => handleInputChange('client', value)}>
              <SelectTrigger className={errors.client ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client} value={client}>{client}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.client && <p className="text-red-500 text-xs mt-1">{errors.client}</p>}
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

          <div>
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={bookingData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={errors.date ? 'border-red-500' : ''}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                id="startTime"
                type="time"
                value={bookingData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                className={errors.startTime ? 'border-red-500' : ''}
              />
              {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
            </div>
            <div>
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                type="time"
                value={bookingData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                className={errors.endTime ? 'border-red-500' : ''}
              />
              {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
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
            <Label htmlFor="assignedTo">Assigned Photographer/Assistant *</Label>
            <Select onValueChange={(value) => handleInputChange('assignedTo', value)}>
              <SelectTrigger className={errors.assignedTo ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member} value={member}>{member}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.assignedTo && <p className="text-red-500 text-xs mt-1">{errors.assignedTo}</p>}
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
                className={errors.amount ? 'border-red-500' : ''}
              />
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
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
                className={errors.expenses ? 'border-red-500' : ''}
              />
              {errors.expenses && <p className="text-red-500 text-xs mt-1">{errors.expenses}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <Select onValueChange={(value) => handleInputChange('paymentStatus', value)} defaultValue="unpaid">
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
              Create Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewBookingDialog;
