
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useFinancialRecords } from '@/hooks/useFinancialRecords';
import { useBookings } from '@/hooks/useBookings';

interface AddIncomeDialogProps {
  trigger: React.ReactNode;
}

const AddIncomeDialog = ({ trigger }: AddIncomeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [incomeData, setIncomeData] = useState({
    description: '',
    amount: '',
    category: '',
    booking_id: '',
    notes: ''
  });
  
  const { addFinancialRecord } = useFinancialRecords();
  const { bookings } = useBookings();

  const handleInputChange = (field: string, value: string) => {
    setIncomeData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setIncomeData({
      description: '',
      amount: '',
      category: '',
      booking_id: '',
      notes: ''
    });
    setDate(new Date());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const record = {
      type: 'income' as const,
      description: incomeData.description,
      amount: parseFloat(incomeData.amount),
      date: format(date, 'yyyy-MM-dd'),
      category: incomeData.category || null,
      booking_id: incomeData.booking_id || null,
      notes: incomeData.notes || null,
      team_member_id: null
    };

    const result = await addFinancialRecord(record);
    if (result) {
      resetForm();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={incomeData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Payment from client..."
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount (AED)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={incomeData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => setDate(date || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Wedding Photography">Wedding Photography</SelectItem>
                <SelectItem value="Portrait Session">Portrait Session</SelectItem>
                <SelectItem value="Event Photography">Event Photography</SelectItem>
                <SelectItem value="Corporate">Corporate</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="booking">Related Booking (Optional)</Label>
            <Select onValueChange={(value) => handleInputChange('booking_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select booking" />
              </SelectTrigger>
              <SelectContent>
                {bookings.map((booking) => (
                  <SelectItem key={booking.id} value={booking.id}>
                    {booking.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={incomeData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes about this income..."
              rows={3}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Add Income
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddIncomeDialog;
