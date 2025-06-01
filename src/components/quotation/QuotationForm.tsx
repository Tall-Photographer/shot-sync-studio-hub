
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
        description: 'PRODUCT PHOTOGRAPHY',
        quantity: 21,
        price: 150,
        total: 3150,
        detailedDescription: '5 PRODUCTS\n5 IMAGES EACH\nUP TO 4 HOURS AT CLIENT\'S LOCATION'
      }
    ] as QuotationItem[],
    deliverables: 'ALL FINAL EDITED IMAGES TO BE DELIVERED IN 2 WORKING DAYS',
    paymentTerms: '50% booking confirmation\n50% when deliverables are ready',
    bankDetails: `BANK NAME: ADCB BANK
ACCOUNT NAME: AHMED ADEL OSMAN MAHMOUD ATTIA
ACCOUNT NUMBER (AED): 11391890910001
IBAN: AE370030011391890910001
SWIFT CODE: ADCBAEAA`,
    termsAndConditions: `The above quotation is made as per the brief shared and subject to the conditions noted below:
Once signed this Estimate stands as a binding contract between two parties. ("Contract")
Any dispute, difference, controversy, or claim arising out of or in connection with this contract, including (but not limited to) any question regarding its existence, validity, interpretation, performance, discharge and applicable remedies, shall be subject to the exclusive jurisdiction of the Courts of the Dubai International Financial Centre ("the DIFC Courts").
Less than 48-hour cancellation notice before the shoot, 50% of the total amount will be due.
Additional production hours (including but not limited to filming, photography, and editing) are charged AED 500 per hour.
Late payment fee of AED 250 per 15-day delay will be applied from the payment due day.
Tallphotographer.com retains ownership of the RAW Files.
Tallphotographer.com owns exclusive rights to any footage until the payment is received. The client waves all the claims.
The individual signing this contract is the authorized signatory for the Client.`
  });

  useEffect(() => {
    if (quotation) {
      setFormData({
        issueDate: quotation.issueDate,
        shootingDate: quotation.shootingDate || '',
        billTo: quotation.billTo,
        items: quotation.items,
        deliverables: quotation.deliverables,
        paymentTerms: quotation.paymentTerms,
        bankDetails: quotation.bankDetails,
        termsAndConditions: quotation.termsAndConditions
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
      total: 0,
      detailedDescription: ''
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
          <Label htmlFor="shootingDate">Shooting Date (Optional)</Label>
          <Input
            id="shootingDate"
            type="date"
            value={formData.shootingDate}
            onChange={(e) => handleInputChange('shootingDate', e.target.value)}
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
          <div className="space-y-6">
            {formData.items.map((item, index) => (
              <div key={item.id} className="space-y-4 p-4 border rounded-lg">
                <div className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5">
                    <Label>Service Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="e.g., PRODUCT PHOTOGRAPHY"
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
                
                <div>
                  <Label htmlFor={`detailedDescription-${index}`}>Detailed Description (Optional)</Label>
                  <Textarea
                    id={`detailedDescription-${index}`}
                    value={item.detailedDescription || ''}
                    onChange={(e) => handleItemChange(index, 'detailedDescription', e.target.value)}
                    placeholder="e.g., 5 PRODUCTS&#10;5 IMAGES EACH&#10;UP TO 4 HOURS AT CLIENT'S LOCATION"
                    rows={3}
                    className="font-mono text-sm"
                  />
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
        <Label htmlFor="deliverables">Deliverables</Label>
        <Textarea
          id="deliverables"
          value={formData.deliverables}
          onChange={(e) => handleInputChange('deliverables', e.target.value)}
          placeholder="Enter deliverables details"
          rows={3}
          required
        />
      </div>

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

      <div>
        <Label htmlFor="bankDetails">Bank Details</Label>
        <Textarea
          id="bankDetails"
          value={formData.bankDetails}
          onChange={(e) => handleInputChange('bankDetails', e.target.value)}
          placeholder="Enter bank details"
          rows={5}
          required
        />
      </div>

      <div>
        <Label htmlFor="termsAndConditions">Terms and Conditions</Label>
        <Textarea
          id="termsAndConditions"
          value={formData.termsAndConditions}
          onChange={(e) => handleInputChange('termsAndConditions', e.target.value)}
          placeholder="Enter terms and conditions"
          rows={8}
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
