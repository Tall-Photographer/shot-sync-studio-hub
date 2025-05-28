
import React, { useState } from 'react';
import { Search, Plus, Mail, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@email.com',
      totalBookings: 3,
      totalSpent: '$2,450',
      lastBooked: '2025-05-15',
      notes: 'Prefers outdoor shoots, allergic to cats'
    },
    {
      id: 2,
      name: 'Mike Davis',
      phone: '+1 (555) 987-6543',
      email: 'mike.davis@email.com',
      totalBookings: 1,
      totalSpent: '$650',
      lastBooked: '2025-04-22',
      notes: 'Corporate headshots specialist'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      phone: '+1 (555) 456-7890',
      email: 'emma.wilson@email.com',
      totalBookings: 5,
      totalSpent: '$4,200',
      lastBooked: '2025-05-20',
      notes: 'Regular client, family photography'
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search by client's name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-50 border-0"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{clients.length}</p>
            <p className="text-sm text-blue-600">Total Clients</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              ${clients.reduce((sum, client) => sum + parseInt(client.totalSpent.replace('$', '').replace(',', '')), 0).toLocaleString()}
            </p>
            <p className="text-sm text-green-600">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Client List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.phone}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="p-2">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Bookings</p>
                  <p className="font-semibold">{client.totalBookings}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Spent</p>
                  <p className="font-semibold text-green-600">{client.totalSpent}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Last booked: {client.lastBooked}</p>
                <p className="text-sm text-gray-700">{client.notes}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clients;
