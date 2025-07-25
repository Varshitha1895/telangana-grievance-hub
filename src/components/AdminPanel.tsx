
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { useGrievance } from '../contexts/GrievanceContext';
import { useUserRole } from '../hooks/useUserRole';
import { ArrowLeft, Users, FileText, TrendingUp, Download, Filter, FileSpreadsheet, FileDown, Settings, Shield, AlertTriangle } from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const { grievances, updateGrievanceStatus } = useGrievance();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Redirect if not admin
  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      console.warn('Unauthorized access attempt to admin panel');
      onBack();
    }
  }, [isAdmin, roleLoading, onBack]);

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('Checking permissions...')}</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <Card className="max-w-md mx-auto shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('Access Denied')}</h2>
            <p className="text-gray-600 mb-6">{t('You do not have permission to access the admin panel.')}</p>
            <Button 
              onClick={onBack}
              className="bg-gradient-to-r from-blue-500 to-purple-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('Go Back')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        complaint.created_at,
        complaint.user_id
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
                  <td>${complaint.created_at}</td>
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4 relative overflow-hidden"
    >
      {/* Beautiful Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full opacity-20 blur-2xl"
        />
        <motion.div
          animate={{ 
            y: [-15, 15, -15],
            x: [10, -10, 10]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-32 left-20 w-36 h-36 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-2xl"
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-between mb-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30"
        >
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="mr-4"
            >
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="p-3 rounded-xl hover:bg-indigo-100"
              >
                <ArrowLeft className="h-6 w-6 text-indigo-600" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center space-x-4"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {t('Admin Dashboard')}
                </h1>
                <p className="text-gray-600 mt-1 text-lg">{t('Manage grievances and monitor performance')}</p>
              </div>
            </motion.div>
          </div>
          <div className="flex space-x-3">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={exportToCSV}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg px-6 py-3"
              >
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                {t('Export CSV')}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={exportToPDF}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg px-6 py-3"
              >
                <FileDown className="mr-2 h-5 w-5" />
                {t('Export PDF')}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{stats.total}</h3>
              <p className="text-sm opacity-90">{t('Total Complaints')}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-gradient-to-r from-red-500 to-orange-500 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{stats.pending}</h3>
              <p className="text-sm opacity-90">{t('Pending')}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{stats.inProgress}</h3>
              <p className="text-sm opacity-90">{t('In Progress')}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-teal-500 text-white">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{stats.resolved}</h3>
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

        {/* Complaints Management */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>{t('All Complaints')} ({filteredComplaints.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredComplaints.map((complaint, index) => (
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
                      <p className="text-gray-800 mb-1">{complaint.description || 'No description provided'}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>{t('Category')}: {getCategoryName(complaint.category)}</span>
                        <span>{t('Location')}: {complaint.location}</span>
                        <span>{t('Date')}: {new Date(complaint.created_at).toLocaleDateString()}</span>
                        <span>{t('User')}: {complaint.user_id}</span>
                      </div>
                      
                      {/* Media Information */}
                      {(complaint.media_images || complaint.media_audio || complaint.media_video) && (
                        <div className="mt-2 text-xs text-gray-500">
                          {complaint.media_images && complaint.media_images.length > 0 && (
                            <span className="mr-4">📷 {complaint.media_images.length} image(s)</span>
                          )}
                          {complaint.media_audio && (
                            <span className="mr-4">🎵 Audio recording</span>
                          )}
                          {complaint.media_video && (
                            <span className="mr-4">🎥 Video recording</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <Select 
                        defaultValue={complaint.status}
                        onValueChange={(value) => handleStatusUpdate(complaint.id, value)}
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
            
            {filteredComplaints.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>{t('No complaints found matching the selected filters.')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AdminPanel;
