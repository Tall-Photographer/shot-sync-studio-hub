
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddExpenseDialogProps {
  trigger: React.ReactNode;
  onExpenseAdded?: (expense: any) => void;
}

const AddExpenseDialog = ({ trigger, onExpenseAdded }: AddExpenseDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Get current date and time in Abu Dhabi timezone
  const now = new Date();
  const abuDhabiTime = new Date(now.getTime() + (4 * 60 * 60 * 1000)); // UTC+4
  const currentDate = abuDhabiTime.toISOString().split('T')[0];
  const currentTime = abuDhabiTime.toTimeString().slice(0, 5);

  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    date: currentDate,
    time: currentTime,
    category: '',
    relatedBooking: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sample bookings for linking
  const availableBookings = [
    'Sarah & John Wedding',
    'Corporate Headshots',
    'Family Summer Photos'
  ];

  const expenseCategories = [
    'Equipment Rental',
    'Transportation',
    'Studio Rent',
    'Marketing',
    'Software Subscription',
    'Insurance',
    'Office Supplies',
    'Professional Services',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setExpenseData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!expenseData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!expenseData.amount || isNaN(Number(expenseData.amount)) || Number(expenseData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    if (!expenseData.date) {
      newErrors.date = 'Date is required';
    }
    if (!expenseData.time) {
      newErrors.time = 'Time is required';
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

    const newExpense = {
      id: Date.now(),
      ...expenseData,
      amount: `AED ${expenseData.amount}`,
      type: 'expense',
      status: 'completed',
      createdAt: new Date().toISOString()
    };

    console.log('Creating new expense:', newExpense);
    
    toast({
      title: "Expense Added",
      description: "New expense has been recorded successfully"
    });

    onExpenseAdded?.(newExpense);
    setOpen(false);
    
    // Reset form
    setExpenseData({
      description: '',
      amount: '',
      date: currentDate,
      time: currentTime,
      category: '',
      relatedBooking: '',
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
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              value={expenseData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="e.g., Camera Equipment Rental"
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <Label htmlFor="amount">Amount (AED) *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={expenseData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="0.00"
              className={errors.amount ? 'border-red-500' : ''}
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={expenseData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div>
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={expenseData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className={errors.time ? 'border-red-500' : ''}
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="relatedBooking">Related Booking (Optional)</Label>
            <Select onValueChange={(value) => handleInputChange('relatedBooking', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Link to booking" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                {availableBookings.map((booking) => (
                  <SelectItem key={booking} value={booking}>{booking}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={expenseData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes..."
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
