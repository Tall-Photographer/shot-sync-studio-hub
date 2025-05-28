
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Send, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuotationDialogProps {
  booking?: any;
  trigger: React.ReactNode;
}

const QuotationDialog = ({ booking, trigger }: QuotationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [quotationData, setQuotationData] = useState({
    title: booking?.name || '',
    client: booking?.client || '',
    service: booking?.service || '',
    amount: booking?.amount?.replace('$', '') || '',
    description: '',
    validUntil: '',
    terms: 'Payment due within 30 days. 50% deposit required to secure booking.'
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setQuotationData(prev => ({ ...prev, [field]: value }));
  };

  const generatePaymentLinks = async () => {
    const amount = parseFloat(quotationData.amount);
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    // Simulate Nomod API integration
    const depositAmount = (amount * 0.5).toFixed(2);
    const remainingAmount = (amount * 0.5).toFixed(2);

    console.log('Generating payment links:', {
      depositLink: `https://nomod.api/pay/deposit/${depositAmount}`,
      remainingLink: `https://nomod.api/pay/remaining/${remainingAmount}`,
      fullPaymentLink: `https://nomod.api/pay/full/${amount}`
    });

    toast({
      title: "Payment Links Generated",
      description: "Deposit, remaining, and full payment links created successfully"
    });
  };

  const sendQuotation = async (method: 'whatsapp' | 'email') => {
    console.log(`Sending quotation via ${method}:`, quotationData);
    
    // Simulate sending quotation
    toast({
      title: "Quotation Sent",
      description: `Quotation sent successfully via ${method === 'whatsapp' ? 'WhatsApp' : 'Email'}`
    });
    
    setOpen(false);
  };

  const convertToInvoice = () => {
    console.log('Converting quotation to invoice:', quotationData);
    toast({
      title: "Invoice Created",
      description: "Quotation has been converted to an invoice"
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Create Quotation
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Quotation Title</Label>
            <Input
              id="title"
              value={quotationData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter quotation title"
            />
          </div>

          <div>
            <Label htmlFor="client">Client Name</Label>
            <Input
              id="client"
              value={quotationData.client}
              onChange={(e) => handleInputChange('client', e.target.value)}
              placeholder="Enter client name"
            />
          </div>

          <div>
            <Label htmlFor="service">Service Type</Label>
            <Input
              id="service"
              value={quotationData.service}
              onChange={(e) => handleInputChange('service', e.target.value)}
              placeholder="Enter service type"
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={quotationData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="Enter total amount"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={quotationData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the services included..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="validUntil">Valid Until</Label>
            <Input
              id="validUntil"
              type="date"
              value={quotationData.validUntil}
              onChange={(e) => handleInputChange('validUntil', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="terms">Terms & Conditions</Label>
            <Textarea
              id="terms"
              value={quotationData.terms}
              onChange={(e) => handleInputChange('terms', e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-3 pt-4 border-t">
            <Button 
              onClick={generatePaymentLinks} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Generate Payment Links
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => sendQuotation('whatsapp')} 
                variant="outline"
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                Send via WhatsApp
              </Button>
              <Button 
                onClick={() => sendQuotation('email')} 
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Send via Email
              </Button>
            </div>

            <Button 
              onClick={convertToInvoice} 
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Convert to Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuotationDialog;
