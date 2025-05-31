
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Eye } from 'lucide-react';

const FinanceTab = ({ onViewFinancials }: { onViewFinancials: () => void }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Financial Management</h2>
        <p className="text-gray-600">Access and manage your studio's financial data.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Financial Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            View revenue, expenses, and profit analytics for your photography studio.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Revenue Tracking</span>
              </div>
              <p className="text-xs text-green-600 mt-1">Monitor income from bookings</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Expense Management</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">Track business expenses</p>
            </div>
          </div>

          <Button 
            onClick={onViewFinancials}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            View Financial Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceTab;
