
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
import { useTeamMembers } from '@/hooks/useTeamMembers';

interface AddExpenseDialogProps {
  trigger: React.ReactNode;
  onExpenseAdded: (expense: any) => void;
}

const AddExpenseDialog = ({ trigger, onExpenseAdded }: AddExpenseDialogProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    category: '',
    booking_id: '',
    team_member_id: '',
    notes: ''
  });
  
  const { addFinancialRecord } = useFinancialRecords();
  const { bookings } = useBookings();
  const { teamMembers } = useTeamMembers();

  const handleInputChange = (field: string, value: string) => {
    setExpenseData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setExpenseData({
      description: '',
      amount: '',
      category: '',
      booking_id: '',
      team_member_id: '',
      notes: ''
    });
    setDate(new Date());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const record = {
      type: 'expense' as const,
      description: expenseData.description,
      amount: parseFloat(expenseData.amount),
      date: format(date, 'yyyy-MM-dd'),
      category: expenseData.category || null,
      booking_id: expenseData.booking_id || null,
      team_member_id: expenseData.team_member_id || null,
      notes: expenseData.notes || null
    };

    const result = await addFinancialRecord(record);
    if (result) {
      onExpenseAdded(result);
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
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={expenseData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Equipment rental, travel, etc..."
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount (AED)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={expenseData.amount}
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
                <SelectItem value="Equipment Rental">Equipment Rental</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="Salary">Salary</SelectItem>
                <SelectItem value="Advance Payment">Advance Payment</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="team_member">Team Member (Optional)</Label>
            <Select onValueChange={(value) => handleInputChange('team_member_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name} - {member.role}
                  </SelectItem>
                ))}
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
              value={expenseData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes about this expense..."
              rows={3}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
              Add Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;
