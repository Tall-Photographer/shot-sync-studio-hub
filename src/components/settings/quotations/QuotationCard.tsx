
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Quotation } from '@/types/quotation';

interface QuotationCardProps {
  quotation: Quotation;
  onView: (quotation: Quotation) => void;
  onEdit: (quotation: Quotation) => void;
  onConvertToInvoice: (quotation: Quotation) => void;
  onDelete: (id: string) => void;
}

const QuotationCard = ({
  quotation,
  onView,
  onEdit,
  onConvertToInvoice,
  onDelete
}: QuotationCardProps) => {
  return (
    <Card className="w-full">
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
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(quotation)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(quotation)}
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onConvertToInvoice(quotation)}
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            Convert to Invoice
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(quotation.id)}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuotationCard;
