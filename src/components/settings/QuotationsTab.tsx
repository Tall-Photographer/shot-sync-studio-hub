
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QuotationForm from '../quotation/QuotationForm';
import QuotationPDFViewer from '../quotation/QuotationPDFViewer';
import QuotationList from './quotations/QuotationList';
import EmptyQuotations from './quotations/EmptyQuotations';
import { Quotation } from '@/types/quotation';
import { generateQuotationNumber, getDefaultQuotationData } from '@/utils/quotationUtils';

const QuotationsTab = () => {
  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    const saved = localStorage.getItem('quotations');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);
  const [viewingQuotation, setViewingQuotation] = useState<Quotation | null>(null);
  const [documentType, setDocumentType] = useState<'quotation' | 'invoice'>('quotation');
  const { toast } = useToast();

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
        quotationNumber: generateQuotationNumber(quotations),
        createdAt: now,
        updatedAt: now,
        ...getDefaultQuotationData(),
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

  const handleViewQuotation = (quotation: Quotation) => {
    setViewingQuotation(quotation);
    setDocumentType('quotation');
  };

  const handleEditQuotation = (quotation: Quotation) => {
    setEditingQuotation(quotation);
    setShowForm(true);
  };

  const convertToInvoice = (quotation: Quotation) => {
    setViewingQuotation(quotation);
    setDocumentType('invoice');
    console.log('Converting to invoice:', quotation);
    toast({
      title: "Success",
      description: "Viewing as invoice"
    });
  };

  const handleCreateQuotation = () => {
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingQuotation(null);
  };

  const handleBackToQuotations = () => {
    setViewingQuotation(null);
    setDocumentType('quotation');
  };

  if (viewingQuotation) {
    return (
      <div className="space-y-6 max-w-full overflow-hidden">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBackToQuotations}>
            ← Back to Quotations
          </Button>
        </div>
        <QuotationPDFViewer quotation={viewingQuotation} documentType={documentType} />
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="space-y-6 max-w-full overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {editingQuotation ? 'Edit Quotation' : 'Create New Quotation'}
          </h2>
        </div>
        <QuotationForm
          quotation={editingQuotation}
          onSave={handleSaveQuotation}
          onCancel={handleCancelForm}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quotations</h2>
        <Button onClick={handleCreateQuotation} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Quotation
        </Button>
      </div>

      {quotations.length === 0 ? (
        <EmptyQuotations onCreateQuotation={handleCreateQuotation} />
      ) : (
        <QuotationList
          quotations={quotations}
          onViewQuotation={handleViewQuotation}
          onEditQuotation={handleEditQuotation}
          onConvertToInvoice={convertToInvoice}
          onDeleteQuotation={handleDeleteQuotation}
        />
      )}
    </div>
  );
};

export default QuotationsTab;
