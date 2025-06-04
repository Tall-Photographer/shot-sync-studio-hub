
import React from 'react';
import { Calendar, Users, DollarSign, Camera, LogOut, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import AddClientDialog from './AddClientDialog';
import NewBookingDialog from './NewBookingDialog';

interface DashboardProps {
  onNavigate: (tab: string, bookingId?: number) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const { signOut, user } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();

  return (
    <div className="p-4 space-y-6">
      {/* Header with Logout */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            {!roleLoading && isAdmin && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Admin
              </Badge>
            )}
          </div>
          <p className="text-gray-600">Welcome back, {user?.email}</p>
        </div>
        <Button variant="outline" onClick={signOut} className="flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-sm text-blue-600">Bookings This Month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">$8,450</p>
            <p className="text-sm text-green-600">Revenue This Month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">34</p>
            <p className="text-sm text-purple-600">Total Clients</p>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Camera className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">8</p>
            <p className="text-sm text-orange-600">Active Projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Sarah & John Wedding</p>
                <p className="text-sm text-gray-600">Booking confirmed</p>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Emma Wilson Portrait</p>
                <p className="text-sm text-gray-600">Payment received</p>
              </div>
              <span className="text-xs text-gray-500">4 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Corporate Event</p>
                <p className="text-sm text-gray-600">Photos delivered</p>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <NewBookingDialog
          trigger={
            <Button className="h-16 bg-blue-600 hover:bg-blue-700 w-full">
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-1" />
                <span className="text-sm">New Booking</span>
              </div>
            </Button>
          }
          onBookingAdded={() => {}}
        />
        
        <AddClientDialog
          trigger={
            <Button variant="outline" className="h-16 w-full">
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-1" />
                <span className="text-sm">Add Client</span>
              </div>
            </Button>
          }
        />
      </div>

      {isAdmin && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-900">Admin Panel</h3>
            </div>
            <p className="text-sm text-red-700 mb-3">
              You have admin access to all data, users, bookings, and settings.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="border-red-300 text-red-700 hover:bg-red-100"
                onClick={() => onNavigate('settings')}
              >
                Admin Settings
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-red-300 text-red-700 hover:bg-red-100"
                onClick={() => onNavigate('financials')}
              >
                All Financials
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
