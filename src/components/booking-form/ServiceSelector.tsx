
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface ServiceSelectorProps {
  selectedServices: string[];
  onServiceChange: (services: string[]) => void;
  error?: string;
}

const ServiceSelector = ({ selectedServices, onServiceChange, error }: ServiceSelectorProps) => {
  const [serviceTypes, setServiceTypes] = useState([
    'Wedding Photography',
    'Portrait Session',
    'Family Photography',
    'Corporate Photography',
    'Event Photography'
  ]);
  const [showNewServiceInput, setShowNewServiceInput] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');

  const handleServiceToggle = (service: string, checked: boolean) => {
    const updatedServices = checked 
      ? [...selectedServices, service]
      : selectedServices.filter(s => s !== service);
    onServiceChange(updatedServices);
  };

  const handleAddNewService = () => {
    if (newServiceName.trim() && !serviceTypes.includes(newServiceName.trim())) {
      const newService = newServiceName.trim();
      setServiceTypes(prev => [...prev, newService]);
      onServiceChange([...selectedServices, newService]);
      setNewServiceName('');
      setShowNewServiceInput(false);
    }
  };

  return (
    <div>
      <Label>Service Types *</Label>
      <div className="space-y-2 mt-2 max-h-32 overflow-y-auto border rounded-md p-2">
        {serviceTypes.map((service) => (
          <div key={service} className="flex items-center space-x-2">
            <Checkbox
              id={service}
              checked={selectedServices.includes(service)}
              onCheckedChange={(checked) => handleServiceToggle(service, checked as boolean)}
            />
            <Label htmlFor={service} className="text-sm">{service}</Label>
          </div>
        ))}
      </div>
      
      {!showNewServiceInput ? (
        <Button
          type="button"
          onClick={() => setShowNewServiceInput(true)}
          variant="outline"
          size="sm"
          className="mt-2 w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Service Type
        </Button>
      ) : (
        <div className="flex space-x-2 mt-2">
          <Input
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
            placeholder="Enter new service type"
            className="flex-1"
          />
          <Button type="button" onClick={handleAddNewService} size="sm">
            Add
          </Button>
          <Button type="button" onClick={() => setShowNewServiceInput(false)} variant="outline" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      {selectedServices.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-gray-600">Selected: {selectedServices.join(', ')}</p>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default ServiceSelector;
