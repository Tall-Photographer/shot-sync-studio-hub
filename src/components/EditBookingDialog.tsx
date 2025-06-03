
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X } from 'lucide-react';
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
    service: [] as string[],
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    assignedTo: [] as string[],
    amount: '',
    expenses: '',
    paymentStatus: 'unpaid',
    notes: ''
  });
  const [showNewClientInput, setShowNewClientInput] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [showNewServiceInput, setShowNewServiceInput] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (booking && open) {
      console.log('Loading booking data for edit:', booking);
      const assignedMembers = booking.assignedTo ? booking.assignedTo.split(', ') : [];
      const services = booking.service ? booking.service.split(', ') : [];
      setBookingData({
        name: booking.name || '',
        client: booking.client || '',
        service: services,
        date: booking.date || '',
        startTime: booking.time ? booking.time.split(' - ')[0] : '',
        endTime: booking.time ? booking.time.split(' - ')[1] : '',
        location: booking.location || '',
        assignedTo: assignedMembers,
        amount: booking.amount ? booking.amount.replace('AED ', '') : '',
        expenses: booking.expenses ? booking.expenses.replace('AED ', '') : '',
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

  const [serviceTypes, setServiceTypes] = useState([
    'Wedding Photography',
    'Portrait Session',
    'Family Photography',
    'Corporate Photography',
    'Event Photography'
  ]);

  const teamMembers = [
    'Alex Thompson',
    'Emma Wilson', 
    'Mike Johnson',
    'Sarah Davis'
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    console.log('Updating field:', field, 'with value:', value);
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleTeamMemberToggle = (member: string, checked: boolean) => {
    const updatedAssignments = checked 
      ? [...bookingData.assignedTo, member]
      : bookingData.assignedTo.filter(m => m !== member);
    handleInputChange('assignedTo', updatedAssignments);
  };

  const handleServiceToggle = (service: string, checked: boolean) => {
    const updatedServices = checked 
      ? [...bookingData.service, service]
      : bookingData.service.filter(s => s !== service);
    handleInputChange('service', updatedServices);
  };

  const handleAddNewClient = () => {
    if (newClientName.trim()) {
      handleInputChange('client', newClientName.trim());
      setNewClientName('');
      setShowNewClientInput(false);
    }
  };

  const handleAddNewService = () => {
    if (newServiceName.trim() && !serviceTypes.includes(newServiceName.trim())) {
      const newService = newServiceName.trim();
      setServiceTypes(prev => [...prev, newService]);
      handleInputChange('service', [...bookingData.service, newService]);
      setNewServiceName('');
      setShowNewServiceInput(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting booking update:', bookingData);
    
    const updatedBooking = {
      ...booking,
      ...bookingData,
      amount: bookingData.amount ? `AED ${bookingData.amount}` : 'AED 0',
      expenses: bookingData.expenses ? `AED ${bookingData.expenses}` : 'AED 0',
      time: `${bookingData.startTime} - ${bookingData.endTime}`,
      assignedTo: bookingData.assignedTo.join(', '),
      service: bookingData.service.join(', ')
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
            {!showNewClientInput ? (
              <div className="space-y-2">
                <Select onValueChange={(value) => {
                  if (value === 'new-client') {
                    setShowNewClientInput(true);
                  } else {
                    handleInputChange('client', value);
                  }
                }} value={bookingData.client}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client or create new" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client} value={client}>{client}</SelectItem>
                    ))}
                    <SelectItem value="new-client">
                      <div className="flex items-center">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Client
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Input
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="Enter new client name"
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddNewClient} size="sm">
                  Add
                </Button>
                <Button type="button" onClick={() => setShowNewClientInput(false)} variant="outline" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <div>
            <Label>Service Types</Label>
            <div className="space-y-2 mt-2 max-h-32 overflow-y-auto border rounded-md p-2">
              {serviceTypes.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={bookingData.service.includes(service)}
                    onCheckedChange={(checked) => handleServiceToggle(service, checked as boolean)}
                  />
                  <Label htmlFor={service} className="text-sm">{service}</Label>
                </div>
              ))}
            </div>
            
            {!showNewServiceInput ? (
              <Button
                type="button"
                onClick={() => setShowNewServiceInput(true)}
                variant="outline"
                size="sm"
                className="mt-2 w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Service Type
              </Button>
            ) : (
              <div className="flex space-x-2 mt-2">
                <Input
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="Enter new service type"
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddNewService} size="sm">
                  Add
                </Button>
                <Button type="button" onClick={() => setShowNewServiceInput(false)} variant="outline" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            {bookingData.service.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-600">Selected: {bookingData.service.join(', ')}</p>
              </div>
            )}
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
            <Label>Assigned Team Members</Label>
            <div className="space-y-2 mt-2 max-h-32 overflow-y-auto border rounded-md p-2">
              {teamMembers.map((member) => (
                <div key={member} className="flex items-center space-x-2">
                  <Checkbox
                    id={member}
                    checked={bookingData.assignedTo.includes(member)}
                    onCheckedChange={(checked) => handleTeamMemberToggle(member, checked as boolean)}
                  />
                  <Label htmlFor={member} className="text-sm">{member}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="amount">Amount (AED)</Label>
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
              <Label htmlFor="expenses">Expenses (AED)</Label>
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
