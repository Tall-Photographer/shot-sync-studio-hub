
import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, Eye, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EditTeamMemberDialog from './EditTeamMemberDialog';
import AddTeamMemberDialog from './AddTeamMemberDialog';
import { useToast } from '@/hooks/use-toast';

const Team = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Alex Thompson',
      role: 'Senior Photographer',
      email: 'alex@tallphotographer.com',
      phone: '+971 50 123 4567',
      status: 'active',
      hourlyRate: 150,
      totalEarnings: '$12,500',
      activeBookings: 3,
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Emma Wilson',
      role: 'Portrait Specialist',
      email: 'emma@tallphotographer.com',
      phone: '+971 50 234 5678',
      status: 'active',
      hourlyRate: 125,
      totalEarnings: '$8,200',
      activeBookings: 2,
      joinDate: '2024-03-01'
    }
  ]);

  const handleMemberAdded = (newMember: any) => {
    const memberWithInactiveStatus = {
      ...newMember,
      status: 'inactive',
      totalEarnings: '$0',
      activeBookings: 0
    };
    setTeamMembers(prev => [...prev, memberWithInactiveStatus]);
  };

  const handleMemberUpdated = (updatedMember: any) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
  };

  const handleViewSchedule = (member: any) => {
    console.log('Viewing schedule for:', member.name);
    toast({
      title: "Schedule View",
      description: `Opening ${member.name}'s schedule`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Team</h1>
        <AddTeamMemberDialog
          trigger={
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          }
          onMemberAdded={handleMemberAdded}
        />
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-blue-600">{teamMembers.length}</p>
            <p className="text-xs text-blue-600">Team Members</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-green-600">
              {teamMembers.filter(m => m.status === 'active').length}
            </p>
            <p className="text-xs text-green-600">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-yellow-600">
              {teamMembers.reduce((sum, member) => sum + member.activeBookings, 0)}
            </p>
            <p className="text-xs text-yellow-600">Active Jobs</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                  {member.status === 'inactive' && (
                    <span className="text-xs text-gray-500">Pending invite</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-gray-600">Hourly Rate</p>
                    <p className="font-semibold">${member.hourlyRate || 0}/hr</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-gray-600">Total Earnings</p>
                    <p className="font-semibold text-green-600">{member.totalEarnings}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <p className="text-gray-600">Active Bookings</p>
                  <p className="font-semibold">{member.activeBookings}</p>
                </div>
                <div>
                  <p className="text-gray-600">Join Date</p>
                  <p className="font-semibold">{member.joinDate}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewSchedule(member)}
                    disabled={member.status === 'inactive'}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View Schedule
                  </Button>
                  <EditTeamMemberDialog
                    member={member}
                    onMemberUpdated={handleMemberUpdated}
                    trigger={
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit Profile
                      </Button>
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Team;
