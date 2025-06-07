
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useClients } from '@/hooks/useClients';

interface ClientSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const ClientSelector = ({ value, onChange, error }: ClientSelectorProps) => {
  const [showNewClientInput, setShowNewClientInput] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const { clients, addClient } = useClients();

  const handleAddNewClient = async () => {
    if (newClientName.trim()) {
      const newClient = await addClient({
        name: newClientName.trim(),
        email: '',
        phone: '',
        last_booked: '',
        notes: ''
      });
      
      if (newClient) {
        onChange(newClient.id);
        setNewClientName('');
        setShowNewClientInput(false);
      }
    }
  };

  return (
    <div>
      <Label htmlFor="client">Client *</Label>
      {!showNewClientInput ? (
        <div className="space-y-2">
          <Select onValueChange={(val) => {
            if (val === 'new-client') {
              setShowNewClientInput(true);
            } else {
              onChange(val);
            }
          }} value={value}>
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select client or create new" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
              ))}
              <SelectItem value="new-client">
                <div className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Client
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="flex space-x-2">
          <Input
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            placeholder="Enter new client name"
            className="flex-1"
          />
          <Button type="button" onClick={handleAddNewClient} size="sm">
            Add
          </Button>
          <Button type="button" onClick={() => setShowNewClientInput(false)} variant="outline" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default ClientSelector;
