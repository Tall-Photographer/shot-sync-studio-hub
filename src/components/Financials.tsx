
import React from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar, Trash2, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useFinancialRecords } from '@/hooks/useFinancialRecords';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import AddExpenseDialog from './AddExpenseDialog';
import AddIncomeDialog from './AddIncomeDialog';

const Financials = () => {
  const { financialRecords, loading, deleteFinancialRecord } = useFinancialRecords();
  const { teamMembers } = useTeamMembers();

  const totalIncome = financialRecords
    .filter(record => record.type === 'income')
    .reduce((sum, record) => sum + record.amount, 0);

  const totalExpenses = financialRecords
    .filter(record => record.type === 'expense')
    .reduce((sum, record) => sum + record.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'income': return 'bg-green-100 text-green-800';
      case 'expense': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTeamMemberName = (teamMemberId: string | null) => {
    if (!teamMemberId) return null;
    const member = teamMembers.find(m => m.id === teamMemberId);
    return member ? member.name : 'Unknown Member';
  };

  const handleDeleteRecord = async (recordId: string) => {
    await deleteFinancialRecord(recordId);
  };

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading financial records...</div>
        </div>
      </div>
    );
  }

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
            onExpenseAdded={() => {}}
          />
          <AddIncomeDialog
            trigger={
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Income
              </Button>
            }
          />
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
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {financialRecords.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No financial records yet. Add your first income or expense to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {financialRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{record.description}</h4>
                      <Badge className={getTypeColor(record.type)}>
                        {record.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                      {record.category && (
                        <span>Category: {record.category}</span>
                      )}
                      {record.team_member_id && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {getTeamMemberName(record.team_member_id)}
                        </span>
                      )}
                    </div>
                    {record.notes && (
                      <p className="text-sm text-gray-500 mt-1">
                        Note: {record.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${
                        record.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {record.type === 'expense' ? '-' : '+'}AED {record.amount.toLocaleString()}
                      </p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this transaction? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteRecord(record.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Financials;
