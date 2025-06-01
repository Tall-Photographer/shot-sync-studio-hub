
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QuotationForm from '../quotation/QuotationForm';
import QuotationPDFViewer from '../quotation/QuotationPDFViewer';

export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  detailedDescription?: string;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  issueDate: string;
  shootingDate?: string;
  billTo: {
    name: string;
    address: string;
    rtnNumber: string;
  };
  items: QuotationItem[];
  deliverables: string;
  paymentTerms: string;
  bankDetails: string;
  termsAndConditions: string;
  subtotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

const QuotationsTab = () => {
  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    const saved = localStorage.getItem('quotations');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);
  const [viewingQuotation, setViewingQuotation] = useState<Quotation | null>(null);
  const { toast } = useToast();

  const generateQuotationNumber = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const dateStr = `${day}/${month}/${year}`;
    
    // Find the highest sequence number for today
    const todayQuotations = quotations.filter(q => 
      q.quotationNumber.startsWith(dateStr)
    );
    
    const sequenceNumber = todayQuotations.length + 1;
    return `${dateStr}/${sequenceNumber}`;
  };

  const saveQuotations = (updatedQuotations: Quotation[]) => {
    setQuotations(updatedQuotations);
    localStorage.setItem('quotations', JSON.stringify(updatedQuotations));
  };

  const handleSaveQuotation = (quotationData: Partial<Quotation>) => {
    const now = new Date().toISOString();
    
    if (editingQuotation) {
      const updatedQuotations = quotations.map(q => 
        q.id === editingQuotation.id 
          ? { ...editingQuotation, ...quotationData, updatedAt: now }
          : q
      );
      saveQuotations(updatedQuotations);
      toast({
        title: "Success",
        description: "Quotation updated successfully"
      });
    } else {
      const newQuotation: Quotation = {
        id: Date.now().toString(),
        quotationNumber: generateQuotationNumber(),
        createdAt: now,
        updatedAt: now,
        deliverables: 'ALL FINAL EDITED IMAGES TO BE DELIVERED IN 2 WORKING DAYS',
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
The individual signing this contract is the authorized signatory for the Client.`,
        ...quotationData
      } as Quotation;
      
      const updatedQuotations = [...quotations, newQuotation];
      saveQuotations(updatedQuotations);
      toast({
        title: "Success",
        description: "Quotation created successfully"
      });
    }
    
    setShowForm(false);
    setEditingQuotation(null);
  };

  const handleDeleteQuotation = (id: string) => {
    const updatedQuotations = quotations.filter(q => q.id !== id);
    saveQuotations(updatedQuotations);
    toast({
      title: "Success",
      description: "Quotation deleted successfully"
    });
  };

  const convertToInvoice = (quotation: Quotation) => {
    // Here you could save to invoices array in localStorage
    console.log('Converting to invoice:', quotation);
    toast({
      title: "Success",
      description: "Quotation converted to invoice"
    });
  };

  if (viewingQuotation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewingQuotation(null)}>
            ← Back to Quotations
          </Button>
        </div>
        <QuotationPDFViewer quotation={viewingQuotation} />
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {editingQuotation ? 'Edit Quotation' : 'Create New Quotation'}
          </h2>
        </div>
        <QuotationForm
          quotation={editingQuotation}
          onSave={handleSaveQuotation}
          onCancel={() => {
            setShowForm(false);
            setEditingQuotation(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quotations</h2>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Quotation
        </Button>
      </div>

      {quotations.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quotations yet</h3>
            <p className="text-gray-600 mb-4">Create your first quotation to get started</p>
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create First Quotation
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {quotations.map((quotation) => (
            <Card key={quotation.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{quotation.quotationNumber}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {quotation.billTo.name} • {quotation.issueDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{quotation.total.toLocaleString()} AED</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewingQuotation(quotation)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingQuotation(quotation);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => convertToInvoice(quotation)}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    Convert to Invoice
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteQuotation(quotation.id)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuotationsTab;
