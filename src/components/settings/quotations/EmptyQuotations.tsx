
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

interface EmptyQuotationsProps {
  onCreateQuotation: () => void;
}

const EmptyQuotations = ({ onCreateQuotation }: EmptyQuotationsProps) => {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quotations yet</h3>
          <p className="text-gray-600 mb-4">Create your first quotation to get started</p>
          <Button onClick={onCreateQuotation} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create First Quotation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyQuotations;
