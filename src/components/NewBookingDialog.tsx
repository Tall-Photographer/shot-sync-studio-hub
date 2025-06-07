
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBookings } from '@/hooks/useBookings';
import { useClients } from '@/hooks/useClients';
import { useTeamMembers } from '@/hooks/useTeamMembers';

interface NewBookingDialogProps {
  trigger: React.ReactNode;
  onBookingAdded?: (booking: any) => void;
  defaultDate?: string;
}

const NewBookingDialog = ({ trigger, onBookingAdded, defaultDate }: NewBookingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    client_id: '',
    service_ids: [] as string[],
    date: defaultDate || '',
    start_time: '',
    end_time: '',
    location: '',
    assigned_team_member_ids: [] as string[],
    amount: '',
    expenses: '',
    payment_status: 'unpaid',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showNewClientInput, setShowNewClientInput] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [showNewServiceInput, setShowNewServiceInput] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const { toast } = useToast();
  const { addBooking } = useBookings();
  const { clients, addClient } = useClients();
  const { teamMembers } = useTeamMembers();

  // Create some default services if none exist
  const [serviceTypes, setServiceTypes] = useState([
    'Wedding Photography',
    'Portrait Session',
    'Family Photography',
    'Corporate Photography',
    'Event Photography'
  ]);

  const handleInputChange = (field: string, value: string | string[]) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTeamMemberToggle = (memberId: string, checked: boolean) => {
    const updatedAssignments = checked 
      ? [...bookingData.assigned_team_member_ids, memberId]
      : bookingData.assigned_team_member_ids.filter(id => id !== memberId);
    handleInputChange('assigned_team_member_ids', updatedAssignments);
  };

  const handleServiceToggle = (service: string, checked: boolean) => {
    const updatedServices = checked 
      ? [...bookingData.service_ids, service]
      : bookingData.service_ids.filter(s => s !== service);
    handleInputChange('service_ids', updatedServices);
  };

  const handleAddNewClient = async () => {
    if (newClientName.trim()) {
      const newClient = await addClient({
        name: newClientName.trim(),
        email: '',
        phone: '',
        last_booked: '',
        notes: ''
      });
      
      if (newClient) {
        handleInputChange('client_id', newClient.id);
        setNewClientName('');
        setShowNewClientInput(false);
      }
    }
  };

  const handleAddNewService = () => {
    if (newServiceName.trim() && !serviceTypes.includes(newServiceName.trim())) {
      const newService = newServiceName.trim();
      setServiceTypes(prev => [...prev, newService]);
      handleInputChange('service_ids', [...bookingData.service_ids, newService]);
      setNewServiceName('');
      setShowNewServiceInput(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!bookingData.name.trim()) {
      newErrors.name = 'Booking name is required';
    }
    if (!bookingData.client_id) {
      newErrors.client_id = 'Client must be selected or created';
    }
    if (bookingData.service_ids.length === 0) {
      newErrors.service_ids = 'At least one service must be selected';
    }
    if (!bookingData.date) {
      newErrors.date = 'Date is required';
    }
    if (!bookingData.start_time) {
      newErrors.start_time = 'Start time is required';
    }
    if (!bookingData.end_time) {
      newErrors.end_time = 'End time is required';
    }
    if (bookingData.start_time && bookingData.end_time && bookingData.start_time >= bookingData.end_time) {
      newErrors.end_time = 'End time must be after start time';
    }
    if (bookingData.assigned_team_member_ids.length === 0) {
      newErrors.assigned_team_member_ids = 'At least one team member must be assigned';
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      name: bookingData.name,
      client_id: bookingData.client_id,
      service_ids: bookingData.service_ids,
      date: bookingData.date,
      start_time: bookingData.start_time,
      end_time: bookingData.end_time,
      location: bookingData.location,
      assigned_team_member_ids: bookingData.assigned_team_member_ids,
      status: 'pending',
      amount: bookingData.amount ? Number(bookingData.amount) : 0,
      expenses: bookingData.expenses ? Number(bookingData.expenses) : 0,
      payment_status: bookingData.payment_status,
      notes: bookingData.notes
    };

    console.log('Creating new booking:', newBooking);
    
    const createdBooking = await addBooking(newBooking);
    
    if (createdBooking) {
      onBookingAdded?.(createdBooking);
      setOpen(false);
      
      // Reset form
      setBookingData({
        name: '',
        client_id: '',
        service_ids: [],
        date: defaultDate || '',
        start_time: '',
        end_time: '',
        location: '',
        assigned_team_member_ids: [],
        amount: '',
        expenses: '',
        payment_status: 'unpaid',
        notes: ''
      });
      setErrors({});
      setShowNewClientInput(false);
      setShowNewServiceInput(false);
      setNewClientName('');
      setNewServiceName('');
    }
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
            <Label htmlFor="client">Client *</Label>
            {!showNewClientInput ? (
              <div className="space-y-2">
                <Select onValueChange={(value) => {
                  if (value === 'new-client') {
                    setShowNewClientInput(true);
                  } else {
                    handleInputChange('client_id', value);
                  }
                }} value={bookingData.client_id}>
                  <SelectTrigger className={errors.client_id ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select client or create new" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
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
            {errors.client_id && <p className="text-red-500 text-xs mt-1">{errors.client_id}</p>}
          </div>

          <div>
            <Label>Service Types *</Label>
            <div className="space-y-2 mt-2 max-h-32 overflow-y-auto border rounded-md p-2">
              {serviceTypes.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={bookingData.service_ids.includes(service)}
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
            
            {bookingData.service_ids.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-600">Selected: {bookingData.service_ids.join(', ')}</p>
              </div>
            )}
            {errors.service_ids && <p className="text-red-500 text-xs mt-1">{errors.service_ids}</p>}
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
                value={bookingData.start_time}
                onChange={(e) => handleInputChange('start_time', e.target.value)}
                className={errors.start_time ? 'border-red-500' : ''}
              />
              {errors.start_time && <p className="text-red-500 text-xs mt-1">{errors.start_time}</p>}
            </div>
            <div>
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                type="time"
                value={bookingData.end_time}
                onChange={(e) => handleInputChange('end_time', e.target.value)}
                className={errors.end_time ? 'border-red-500' : ''}
              />
              {errors.end_time && <p className="text-red-500 text-xs mt-1">{errors.end_time}</p>}
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
            <Label>Assigned Team Members *</Label>
            <div className="space-y-2 mt-2 max-h-32 overflow-y-auto border rounded-md p-2">
              {teamMembers.length === 0 ? (
                <p className="text-sm text-gray-500">No team members available. Add team members first.</p>
              ) : (
                teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={member.id}
                      checked={bookingData.assigned_team_member_ids.includes(member.id)}
                      onCheckedChange={(checked) => handleTeamMemberToggle(member.id, checked as boolean)}
                    />
                    <Label htmlFor={member.id} className="text-sm">{member.name}</Label>
                  </div>
                ))
              )}
            </div>
            {errors.assigned_team_member_ids && <p className="text-red-500 text-xs mt-1">{errors.assigned_team_member_ids}</p>}
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
                className={errors.amount ? 'border-red-500' : ''}
              />
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
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
                className={errors.expenses ? 'border-red-500' : ''}
              />
              {errors.expenses && <p className="text-red-500 text-xs mt-1">{errors.expenses}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <Select onValueChange={(value) => handleInputChange('payment_status', value)} defaultValue="unpaid">
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
