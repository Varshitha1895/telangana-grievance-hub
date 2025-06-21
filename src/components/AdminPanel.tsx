
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Users, FileText, TrendingUp, Download, Filter } from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const mockStats = {
    totalComplaints: 156,
    pendingComplaints: 45,
    resolvedComplaints: 98,
    inProgressComplaints: 13
  };

  const mockComplaints = [
    {
      id: 'GRV001',
      category: 'Roads',
      description: 'Pothole repair needed on NH-44',
      status: 'pending',
      priority: 'high',
      location: 'Hyderabad',
      date: '2024-01-15',
      citizen: 'Rajesh Kumar'
    },
    {
      id: 'GRV002',
      category: 'Water',
      description: 'Water supply interruption in Sector 5',
      status: 'in-progress',
      priority: 'medium',
      location: 'Kukatpally',
      date: '2024-01-14',
      citizen: 'Priya Sharma'
    },
    {
      id: 'GRV003',
      category: 'Electricity',
      description: 'Street lights not working',
      status: 'resolved',
      priority: 'low',
      location: 'Jubilee Hills',
      date: '2024-01-13',
      citizen: 'Mohammed Ali'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const updateComplaintStatus = (complaintId: string, newStatus: string) => {
    console.log(`Updating complaint ${complaintId} to status: ${newStatus}`);
    // In a real app, this would update the backend
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mr-4 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t('Admin Dashboard')}</h1>
              <p className="text-gray-600">{t('Manage grievances and monitor performance')}</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-blue-500">
            <Download className="mr-2 h-4 w-4" />
            {t('Export Data')}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{mockStats.totalComplaints}</h3>
              <p className="text-sm opacity-90">{t('Total Complaints')}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-gradient-to-r from-red-500 to-orange-500 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{mockStats.pendingComplaints}</h3>
              <p className="text-sm opacity-90">{t('Pending')}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{mockStats.inProgressComplaints}</h3>
              <p className="text-sm opacity-90">{t('In Progress')}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-teal-500 text-white">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{mockStats.resolvedComplaints}</h3>
              <p className="text-sm opacity-90">{t('Resolved')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              {t('Filters')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={t('Filter by Status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('All Status')}</SelectItem>
                  <SelectItem value="pending">{t('Pending')}</SelectItem>
                  <SelectItem value="in-progress">{t('In Progress')}</SelectItem>
                  <SelectItem value="resolved">{t('Resolved')}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={t('Filter by Category')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('All Categories')}</SelectItem>
                  <SelectItem value="roads">{t('Roads')}</SelectItem>
                  <SelectItem value="water">{t('Water')}</SelectItem>
                  <SelectItem value="electricity">{t('Electricity')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Complaints Management */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>{t('Recent Complaints')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockComplaints.map((complaint, index) => (
                <motion.div
                  key={complaint.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">#{complaint.id}</h3>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                        <Badge className={getPriorityColor(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-800 mb-1">{complaint.description}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>{t('Category')}: {complaint.category}</span>
                        <span>{t('Location')}: {complaint.location}</span>
                        <span>{t('Date')}: {complaint.date}</span>
                        <span>{t('Citizen')}: {complaint.citizen}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Select 
                        defaultValue={complaint.status}
                        onValueChange={(value) => updateComplaintStatus(complaint.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">{t('Pending')}</SelectItem>
                          <SelectItem value="in-progress">{t('In Progress')}</SelectItem>
                          <SelectItem value="resolved">{t('Resolved')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AdminPanel;
