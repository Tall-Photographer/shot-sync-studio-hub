
import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, Eye } from 'lucide-react';
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
      email: 'alex.thompson@studio.com',
      phone: '+1 (555) 234-5678',
      status: 'active',
      activeBookings: 3,
      totalEarnings: '$8,450',
      specialties: ['Wedding', 'Portrait'],
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Emma Wilson',
      role: 'Portrait Specialist',
      email: 'emma.wilson@studio.com',
      phone: '+1 (555) 345-6789',
      status: 'active',
      activeBookings: 2,
      totalEarnings: '$5,200',
      specialties: ['Corporate', 'Headshots'],
      joinDate: '2024-03-20'
    },
    {
      id: 3,
      name: 'James Rodriguez',
      role: 'Event Photographer',
      email: 'james.rodriguez@studio.com',
      phone: '+1 (555) 456-7890',
      status: 'busy',
      activeBookings: 5,
      totalEarnings: '$12,300',
      specialties: ['Events', 'Corporate'],
      joinDate: '2023-08-10'
    }
  ]);

  const handleMemberAdded = (newMember: any) => {
    setTeamMembers(prev => [...prev, newMember]);
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
      case 'offline': return 'bg-gray-100 text-gray-800';
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
            <p className="text-xs text-green-600">Available</p>
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
                <Badge className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-gray-600">Active Bookings</p>
                    <p className="font-semibold">{member.activeBookings}</p>
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

              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">Specialties:</p>
                <div className="flex space-x-2">
                  {member.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">
                  Joined: {new Date(member.joinDate).toLocaleDateString()}
                </p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewSchedule(member)}
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
