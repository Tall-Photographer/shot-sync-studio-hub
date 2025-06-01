
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Share, FileText, Trash2, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import QuotationForm from '../quotation/QuotationForm';
import QuotationPDFViewer from '../quotation/QuotationPDFViewer';

export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  issueDate: string;
  shootingDate: string;
  billTo: {
    name: string;
    address: string;
    rtnNumber: string;
  };
  items: QuotationItem[];
  subtotal: number;
  total: number;
  paymentTerms: string;
  status: 'draft' | 'sent' | 'accepted' | 'converted';
  createdAt: string;
  updatedAt: string;
}

const QuotationsTab = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load quotations from localStorage
    const savedQuotations = localStorage.getItem('quotations');
    if (savedQuotations) {
      setQuotations(JSON.parse(savedQuotations));
    }
  }, []);

  const saveQuotations = (updatedQuotations: Quotation[]) => {
    setQuotations(updatedQuotations);
    localStorage.setItem('quotations', JSON.stringify(updatedQuotations));
  };

  const handleSaveQuotation = (quotationData: Partial<Quotation>) => {
    if (editingQuotation) {
      // Update existing quotation
      const updatedQuotations = quotations.map(q => 
        q.id === editingQuotation.id 
          ? { ...q, ...quotationData, updatedAt: new Date().toISOString() }
          : q
      );
      saveQuotations(updatedQuotations);
      toast({
        title: "Quotation Updated",
        description: "The quotation has been successfully updated."
      });
    } else {
      // Create new quotation
      const newQuotation: Quotation = {
        id: Date.now().toString(),
        quotationNumber: `NO.${Date.now().toString().slice(-6)}/${new Date().getFullYear()}`,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...quotationData
      } as Quotation;
      
      const updatedQuotations = [newQuotation, ...quotations];
      saveQuotations(updatedQuotations);
      toast({
        title: "Quotation Created",
        description: "New quotation has been successfully created."
      });
    }
    
    setIsFormOpen(false);
    setEditingQuotation(null);
  };

  const handleDeleteQuotation = (id: string) => {
    const updatedQuotations = quotations.filter(q => q.id !== id);
    saveQuotations(updatedQuotations);
    toast({
      title: "Quotation Deleted",
      description: "The quotation has been successfully deleted."
    });
  };

  const handleConvertToInvoice = (quotation: Quotation) => {
    const updatedQuotations = quotations.map(q => 
      q.id === quotation.id 
        ? { ...q, status: 'converted' as const, updatedAt: new Date().toISOString() }
        : q
    );
    saveQuotations(updatedQuotations);
    toast({
      title: "Converted to Invoice",
      description: "The quotation has been converted to an invoice."
    });
  };

  const handleShareQuotation = (quotation: Quotation) => {
    if (navigator.share) {
      navigator.share({
        title: `Quotation ${quotation.quotationNumber}`,
        text: `Quotation for ${quotation.billTo.name}`,
        url: window.location.href
      });
    } else {
      // Fallback for desktop - copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Quotation link copied to clipboard."
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Quotations & Invoices</h2>
          <p className="text-gray-600">Manage your quotations and convert them to invoices</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setEditingQuotation(null)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Quotation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingQuotation ? 'Edit Quotation' : 'Create New Quotation'}
              </DialogTitle>
            </DialogHeader>
            <QuotationForm
              quotation={editingQuotation}
              onSave={handleSaveQuotation}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingQuotation(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quotations.map((quotation) => (
          <Card key={quotation.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{quotation.quotationNumber}</CardTitle>
                <Badge className={getStatusColor(quotation.status)}>
                  {quotation.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{quotation.billTo.name}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Issue Date:</span>
                  <span>{quotation.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-semibold">{quotation.total} AED</span>
                </div>
              </div>
              
              <div className="flex gap-1 mt-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    setEditingQuotation(quotation);
                    setIsFormOpen(true);
                  }}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <QuotationPDFViewer quotation={quotation} />
                  </DialogContent>
                </Dialog>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleShareQuotation(quotation)}
                  className="flex-1"
                >
                  <Share className="w-3 h-3 mr-1" />
                  Share
                </Button>
              </div>
              
              <div className="flex gap-1 mt-2">
                {quotation.status !== 'converted' && (
                  <Button 
                    size="sm" 
                    onClick={() => handleConvertToInvoice(quotation)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Convert to Invoice
                  </Button>
                )}
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Quotation</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this quotation? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteQuotation(quotation.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {quotations.length === 0 && (
        <Card className="p-8 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No quotations yet</h3>
          <p className="text-gray-600 mb-4">Create your first quotation to get started</p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsFormOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Quotation
          </Button>
        </Card>
      )}
    </div>
  );
};

export default QuotationsTab;
