
import React from 'react';
import { Filter, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClients } from '@/hooks/useClients';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import { BookingFilters as BookingFiltersType } from '@/hooks/useBookings';

interface BookingFiltersProps {
  filters: BookingFiltersType;
  onFiltersChange: (filters: BookingFiltersType) => void;
  onClearFilters: () => void;
}

const BookingFilters = ({ filters, onFiltersChange, onClearFilters }: BookingFiltersProps) => {
  const { clients } = useClients();
  const { teamMembers } = useTeamMembers();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const statuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const updateFilter = (key: keyof BookingFiltersType, value: string | undefined) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(value => value);

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="ml-auto"
            >
              <X className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {/* Client Filter */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Client</label>
            <Select value={filters.client_id || ''} onValueChange={(value) => updateFilter('client_id', value || undefined)}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="All clients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All clients</SelectItem>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Status</label>
            <Select value={filters.status || ''} onValueChange={(value) => updateFilter('status', value || undefined)}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All statuses</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Team Member Filter */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Team Member</label>
            <Select value={filters.team_member_id || ''} onValueChange={(value) => updateFilter('team_member_id', value || undefined)}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="All members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All members</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Year</label>
            <Select value={filters.year || ''} onValueChange={(value) => updateFilter('year', value || undefined)}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="All years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Month Filter */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Month</label>
            <Select value={filters.month || ''} onValueChange={(value) => updateFilter('month', value || undefined)}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="All months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All months</SelectItem>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingFilters;
