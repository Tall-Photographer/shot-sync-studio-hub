
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBookingForm } from '@/hooks/useBookingForm';
import ClientSelector from '@/components/booking-form/ClientSelector';
import ServiceSelector from '@/components/booking-form/ServiceSelector';
import TeamMemberSelector from '@/components/booking-form/TeamMemberSelector';

interface NewBookingDialogProps {
  trigger: React.ReactNode;
  onBookingAdded?: (booking: any) => void;
  defaultDate?: string;
}

const NewBookingDialog = ({ trigger, onBookingAdded, defaultDate }: NewBookingDialogProps) => {
  const [open, setOpen] = useState(false);
  
  const {
    bookingData,
    errors,
    handleInputChange,
    submitForm,
    resetForm
  } = useBookingForm(defaultDate, (booking) => {
    onBookingAdded?.(booking);
    setOpen(false);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        resetForm();
      }
    }}>
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

          <ClientSelector
            value={bookingData.client_id}
            onChange={(value) => handleInputChange('client_id', value)}
            error={errors.client_id}
          />

          <ServiceSelector
            selectedServices={bookingData.service_ids}
            onServiceChange={(services) => handleInputChange('service_ids', services)}
            error={errors.service_ids}
          />

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

          <TeamMemberSelector
            selectedMembers={bookingData.assigned_team_member_ids}
            onMemberChange={(members) => handleInputChange('assigned_team_member_ids', members)}
            error={errors.assigned_team_member_ids}
          />

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
