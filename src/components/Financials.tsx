
import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AddExpenseDialog from './AddExpenseDialog';

const Financials = () => {
  const [financialRecords, setFinancialRecords] = useState([
    {
      id: 1,
      type: 'income',
      description: 'Sarah & John Wedding Payment',
      amount: 'AED 9,200',
      date: '2025-05-30',
      category: 'Wedding Photography',
      relatedBooking: 'Sarah & John Wedding',
      status: 'completed'
    },
    {
      id: 2,
      type: 'expense',
      description: 'Camera Equipment Rental',
      amount: 'AED 850',
      date: '2025-05-28',
      category: 'Equipment Rental',
      relatedBooking: 'Sarah & John Wedding',
      status: 'completed'
    },
    {
      id: 3,
      type: 'income',
      description: 'Corporate Headshots',
      amount: 'AED 2,390',
      date: '2025-06-02',
      category: 'Portrait Session',
      relatedBooking: 'Corporate Headshots',
      status: 'pending'
    }
  ]);

  const handleExpenseAdded = (newExpense: any) => {
    setFinancialRecords(prev => [newExpense, ...prev]);
  };

  const handleIncomeAdded = (newIncome: any) => {
    const incomeRecord = {
      ...newIncome,
      type: 'income'
    };
    setFinancialRecords(prev => [incomeRecord, ...prev]);
  };

  const totalIncome = financialRecords
    .filter(record => record.type === 'income')
    .reduce((sum, record) => {
      const amount = parseFloat(record.amount.replace('AED ', '').replace(',', ''));
      return sum + amount;
    }, 0);

  const totalExpenses = financialRecords
    .filter(record => record.type === 'expense')
    .reduce((sum, record) => {
      const amount = parseFloat(record.amount.replace('AED ', '').replace(',', ''));
      return sum + amount;
    }, 0);

  const netProfit = totalIncome - totalExpenses;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'income': return 'bg-green-100 text-green-800';
      case 'expense': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Financials</h1>
        <div className="flex space-x-2">
          <AddExpenseDialog
            trigger={
              <Button variant="outline" className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            }
            onExpenseAdded={handleExpenseAdded}
          />
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Income
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Total Income</p>
                <p className="text-2xl font-bold text-green-700">AED {totalIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-700">AED {totalExpenses.toLocaleString()}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${netProfit >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>Net Profit</p>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                  AED {netProfit.toLocaleString()}
                </p>
              </div>
              <DollarSign className={`w-8 h-8 ${netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Records */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {financialRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{record.description}</h4>
                    <Badge className={getTypeColor(record.type)}>
                      {record.type}
                    </Badge>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {record.date}
                    </span>
                    {record.category && (
                      <span>Category: {record.category}</span>
                    )}
                    {record.relatedBooking && (
                      <span>Booking: {record.relatedBooking}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    record.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {record.type === 'expense' ? '-' : '+'}{record.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financials;
