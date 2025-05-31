
import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign, Receipt, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Financials = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('2025-05');
  const [selectedTeamMember, setSelectedTeamMember] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const { toast } = useToast();

  const financialData = {
    monthlyRevenue: 12450,
    monthlyExpenses: 3200,
    netProfit: 9250,
    pendingPayments: 2800,
    paidInvoices: 8,
    unpaidInvoices: 3
  };

  const allTransactions = [
    {
      id: 1,
      type: 'income',
      description: 'Wedding Photography - Sarah Johnson',
      amount: 2500,
      date: '2025-05-25',
      status: 'completed',
      teamMember: 'Alex Thompson',
      client: 'Sarah Johnson'
    },
    {
      id: 2,
      type: 'expense',
      description: 'Camera Equipment Rental',
      amount: -450,
      date: '2025-05-24',
      status: 'completed',
      teamMember: 'Alex Thompson',
      client: null
    },
    {
      id: 3,
      type: 'income',
      description: 'Corporate Headshots - TechCorp',
      amount: 1200,
      date: '2025-05-23',
      status: 'pending',
      teamMember: 'Emma Wilson',
      client: 'Mike Davis'
    },
    {
      id: 4,
      type: 'expense',
      description: 'Studio Rent',
      amount: -800,
      date: '2025-05-20',
      status: 'completed',
      teamMember: null,
      client: null
    },
    {
      id: 5,
      type: 'income',
      description: 'Family Photography Session',
      amount: 800,
      date: '2025-05-22',
      status: 'completed',
      teamMember: 'James Rodriguez',
      client: 'Emma Wilson'
    }
  ];

  const teamMembers = ['Alex Thompson', 'Emma Wilson', 'James Rodriguez'];
  const clients = ['Sarah Johnson', 'Mike Davis', 'Emma Wilson'];

  const handleAddTransaction = () => {
    console.log('Adding new transaction');
    toast({
      title: "Add Transaction",
      description: "Opening transaction form"
    });
  };

  const handleExportData = () => {
    console.log('Exporting financial data');
    toast({
      title: "Export Started",
      description: "Financial data export in progress"
    });
  };

  // Filter transactions based on selected filters and active tab
  const filteredTransactions = allTransactions.filter(transaction => {
    if (activeTab === 'income' && transaction.type !== 'income') return false;
    if (activeTab === 'expenses' && transaction.type !== 'expense') return false;
    if (selectedTeamMember !== 'all' && transaction.teamMember !== selectedTeamMember) return false;
    if (selectedClient !== 'all' && transaction.client !== selectedClient) return false;
    return true;
  });

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'income', label: 'Income' },
    { id: 'expenses', label: 'Expenses' }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Financials</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportData}>
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddTransaction}>
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Period</label>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">All Time</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2025-05">May 2025</SelectItem>
              <SelectItem value="2025-04">April 2025</SelectItem>
              <SelectItem value="2025-03">March 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Team Member</label>
          <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              {teamMembers.map(member => (
                <SelectItem key={member} value={member}>{member}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Client</label>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              {clients.map(client => (
                <SelectItem key={client} value={client}>{client}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Revenue</p>
                <p className="text-2xl font-bold text-green-700">
                  ${financialData.monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-xs text-green-600 mt-2">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Expenses</p>
                <p className="text-2xl font-bold text-red-700">
                  ${financialData.monthlyExpenses.toLocaleString()}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-xs text-red-600 mt-2">-5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Net Profit</p>
                <p className="text-2xl font-bold text-blue-700">
                  ${financialData.netProfit.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-xs text-blue-600 mt-2">+18% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-700">
                  ${financialData.pendingPayments.toLocaleString()}
                </p>
              </div>
              <Receipt className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-xs text-yellow-600 mt-2">{financialData.unpaidInvoices} unpaid invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            {activeTab === 'overview' ? 'Recent Transactions' : 
             activeTab === 'income' ? 'Income Transactions' : 'Expense Transactions'}
            <span className="text-sm font-normal text-gray-500">
              ({filteredTransactions.length} transactions)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' 
                    ? 'bg-green-100' 
                    : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <div className="text-sm text-gray-600">
                    <p>{transaction.date}</p>
                    {transaction.teamMember && <p>👤 {transaction.teamMember}</p>}
                    {transaction.client && <p>🏢 {transaction.client}</p>}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                </p>
                <p className={`text-xs ${
                  transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Financials;
