
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Quotation, QuotationItem } from '../settings/QuotationsTab';

interface QuotationFormProps {
  quotation?: Quotation | null;
  onSave: (quotation: Partial<Quotation>) => void;
  onCancel: () => void;
}

const QuotationForm = ({ quotation, onSave, onCancel }: QuotationFormProps) => {
  const [formData, setFormData] = useState({
    issueDate: new Date().toISOString().split('T')[0],
    shootingDate: '',
    billTo: {
      name: '',
      address: '',
      rtnNumber: ''
    },
    items: [
      {
        id: '1',
        description: 'Product Photography',
        quantity: 21,
        price: 150,
        total: 3150
      }
    ] as QuotationItem[],
    paymentTerms: '50% booking confirmation\n50% when deliverables are ready'
  });

  useEffect(() => {
    if (quotation) {
      setFormData({
        issueDate: quotation.issueDate,
        shootingDate: quotation.shootingDate,
        billTo: quotation.billTo,
        items: quotation.items,
        paymentTerms: quotation.paymentTerms
      });
    }
  }, [quotation]);

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
    return {
      subtotal,
      total: subtotal
    };
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('billTo.')) {
      const billToField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        billTo: {
          ...prev.billTo,
          [billToField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
      total: field === 'quantity' || field === 'price' 
        ? (field === 'quantity' ? value : updatedItems[index].quantity) * 
          (field === 'price' ? value : updatedItems[index].price)
        : updatedItems[index].total
    };
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      price: 0,
      total: 0
    };
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totals = calculateTotals();
    onSave({
      ...formData,
      ...totals
    });
  };

  const totals = calculateTotals();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="issueDate">Issue Date</Label>
          <Input
            id="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={(e) => handleInputChange('issueDate', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="shootingDate">Shooting Date</Label>
          <Input
            id="shootingDate"
            type="date"
            value={formData.shootingDate}
            onChange={(e) => handleInputChange('shootingDate', e.target.value)}
            required
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bill To</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="billToName">Client Name</Label>
            <Input
              id="billToName"
              value={formData.billTo.name}
              onChange={(e) => handleInputChange('billTo.name', e.target.value)}
              placeholder="Enter client name"
              required
            />
          </div>
          <div>
            <Label htmlFor="billToAddress">Address</Label>
            <Textarea
              id="billToAddress"
              value={formData.billTo.address}
              onChange={(e) => handleInputChange('billTo.address', e.target.value)}
              placeholder="Enter client address"
              rows={3}
              required
            />
          </div>
          <div>
            <Label htmlFor="billToRtn">RTN Number</Label>
            <Input
              id="billToRtn"
              value={formData.billTo.rtnNumber}
              onChange={(e) => handleInputChange('billTo.rtnNumber', e.target.value)}
              placeholder="Enter RTN number"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Items/Services</CardTitle>
          <Button type="button" onClick={addItem} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Item description"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                    min="1"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label>Price (AED)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                    min="0"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label>Total</Label>
                  <Input
                    value={item.total.toFixed(2)}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div className="col-span-1">
                  {formData.items.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-end space-y-2">
              <div className="text-right">
                <div className="text-lg font-semibold">
                  Total: {totals.total.toFixed(2)} AED
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <Label htmlFor="paymentTerms">Payment Terms</Label>
        <Textarea
          id="paymentTerms"
          value={formData.paymentTerms}
          onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
          placeholder="Enter payment terms"
          rows={3}
          required
        />
      </div>

      <div className="flex space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
          {quotation ? 'Update Quotation' : 'Create Quotation'}
        </Button>
      </div>
    </form>
  );
};

export default QuotationForm;
