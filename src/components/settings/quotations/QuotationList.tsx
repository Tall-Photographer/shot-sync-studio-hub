
import React from 'react';
import { Quotation } from '@/types/quotation';
import QuotationCard from './QuotationCard';

interface QuotationListProps {
  quotations: Quotation[];
  onViewQuotation: (quotation: Quotation) => void;
  onEditQuotation: (quotation: Quotation) => void;
  onConvertToInvoice: (quotation: Quotation) => void;
  onDeleteQuotation: (id: string) => void;
}

const QuotationList = ({
  quotations,
  onViewQuotation,
  onEditQuotation,
  onConvertToInvoice,
  onDeleteQuotation
}: QuotationListProps) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl mx-auto space-y-4">
        {quotations.map((quotation) => (
          <QuotationCard
            key={quotation.id}
            quotation={quotation}
            onView={onViewQuotation}
            onEdit={onEditQuotation}
            onConvertToInvoice={onConvertToInvoice}
            onDelete={onDeleteQuotation}
          />
        ))}
      </div>
    </div>
  );
};

export default QuotationList;
