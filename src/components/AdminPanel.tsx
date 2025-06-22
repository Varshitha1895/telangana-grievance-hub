import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { useGrievance } from '../contexts/GrievanceContext';
import { ArrowLeft, Users, FileText, TrendingUp, Download, Filter, FileSpreadsheet, FileDown } from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const { grievances, updateGrievanceStatus } = useGrievance();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const getCategoryName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'road': 'Roads & Infrastructure',
      'water': 'Water Supply',
      'power': 'Electricity',
      'health': 'Health Services',
      'pensions': 'Pensions',
      'ration': 'Ration & PDS'
    };
    return categoryMap[category] || category;
  };

  const getStats = () => {
    const total = grievances.length;
    const pending = grievances.filter(g => g.status === 'pending').length;
    const inProgress = grievances.filter(g => g.status === 'in-progress').length;
    const resolved = grievances.filter(g => g.status === 'resolved').length;
    
    return { total, pending, inProgress, resolved };
  };

  const stats = getStats();

  // Show ALL complaints for admin panel, not filtered by current user
  const filteredComplaints = grievances.filter(complaint => {
    const statusMatch = filterStatus === 'all' || complaint.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || complaint.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  const exportToCSV = () => {
    const headers = ['ID', 'Category', 'Description', 'Status', 'Priority', 'Location', 'Date', 'User ID'];
    const csvContent = [
      headers.join(','),
      ...filteredComplaints.map(complaint => [
        complaint.id,
        getCategoryName(complaint.category),
        `"${complaint.description || 'No description'}"`,
        complaint.status,
        complaint.priority,
        complaint.location,
        complaint.dateSubmitted,
        complaint.userId
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `mee_saaradhi_complaints_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Mee Saaradhi - Complaints Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Mee Saaradhi - Complaints Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <p>Total Complaints: ${filteredComplaints.length}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Location</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${filteredComplaints.map(complaint => `
                <tr>
                  <td>${complaint.id}</td>
                  <td>${getCategoryName(complaint.category)}</td>
                  <td>${complaint.description || 'No description'}</td>
                  <td>${complaint.status}</td>
                  <td>${complaint.priority}</td>
                  <td>${complaint.location}</td>
                  <td>${complaint.dateSubmitted}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

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

  const handleStatusUpdate = (complaintId: string, newStatus: string) => {
    console.log(`Updating complaint ${complaintId} to status: ${newStatus}`);
    updateGrievanceStatus(complaintId, newStatus);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4 relative overflow-hidden"
    >
      {/* Beautiful Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -30, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1551838147-6ac1cbc10fca?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <motion.div
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 40, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-60 right-20 w-32 h-32 rounded-full opacity-15"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
              <p className="text-gray-600">{t('Manage all user grievances and monitor performance')}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={exportToCSV}
              className="bg-gradient-to-r from-green-500 to-blue-500"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              {t('Export CSV')}
            </Button>
            <Button 
              onClick={exportToPDF}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <FileDown className="mr-2 h-4 w-4" />
              {t('Export PDF')}
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{stats.total}</h3>
                <p className="text-sm opacity-90">{t('Total Complaints')}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="shadow-lg border-0 bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{stats.pending}</h3>
                <p className="text-sm opacity-90">{t('Pending')}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="shadow-lg border-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{stats.inProgress}</h3>
                <p className="text-sm opacity-90">{t('In Progress')}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{stats.resolved}</h3>
                <p className="text-sm opacity-90">{t('Resolved')}</p>
              </CardContent>
            </Card>
          </motion.div>
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
                  <SelectItem value="road">{t('Roads & Infrastructure')}</SelectItem>
                  <SelectItem value="water">{t('Water Supply')}</SelectItem>
                  <SelectItem value="power">{t('Electricity')}</SelectItem>
                  <SelectItem value="health">{t('Health Services')}</SelectItem>
                  <SelectItem value="pensions">{t('Pensions')}</SelectItem>
                  <SelectItem value="ration">{t('Ration & PDS')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Complaints Management */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t('All User Complaints')} ({filteredComplaints.length})</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-600">
                {t('Admin View - All Users')}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredComplaints.map((complaint, index) => (
                <motion.div
                  key={complaint.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white to-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">#{complaint.id}</h3>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}  
                        </Badge>
                        <Badge className={getPriorityColor(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                        <Badge variant="outline" className="bg-purple-50 text-purple-600">
                          {t('User')}: {complaint.userId}
                        </Badge>
                      </div>
                      <p className="text-gray-800 mb-2 text-base">{complaint.description || 'No description provided'}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4 flex-wrap">
                        <span className="bg-blue-50 px-2 py-1 rounded">{t('Category')}: {getCategoryName(complaint.category)}</span>
                        <span className="bg-green-50 px-2 py-1 rounded">{t('Location')}: {complaint.location}</span>
                        <span className="bg-orange-50 px-2 py-1 rounded">{t('Date')}: {complaint.dateSubmitted}</span>
                      </div>
                      
                      {/* Enhanced Media Information */}
                      {complaint.media && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {complaint.media.images && complaint.media.images.length > 0 && (
                            <Badge variant="outline" className="bg-green-50 text-green-600">
                              📷 {complaint.media.images.length} image(s)
                            </Badge>
                          )}
                          {complaint.media.audio && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-600">
                              🎵 Audio recording
                            </Badge>
                          )}
                          {complaint.media.video && (
                            <Badge variant="outline" className="bg-purple-50 text-purple-600">
                              🎥 Video recording
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <Select 
                        defaultValue={complaint.status}
                        onValueChange={(value) => handleStatusUpdate(complaint.id, value)}
                      >
                        <SelectTrigger className="w-32 bg-white">
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
            
            {filteredComplaints.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">{t('No complaints found matching the selected filters.')}</p>
                <p className="text-sm mt-2">{t('All user complaints will appear here when available.')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AdminPanel;
