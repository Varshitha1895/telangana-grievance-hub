
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { useGrievance } from '../contexts/GrievanceContext';
import { ArrowLeft, Search, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface TrackComplaintsProps {
  onBack: () => void;
}

const TrackComplaints: React.FC<TrackComplaintsProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const { grievances } = useGrievance();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
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

  const filteredComplaints = grievances.filter(complaint =>
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCategoryName(complaint.category).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStats = () => {
    const total = grievances.length;
    const pending = grievances.filter(g => g.status === 'pending').length;
    const inProgress = grievances.filter(g => g.status === 'in-progress').length;
    const resolved = grievances.filter(g => g.status === 'resolved').length;
    
    return { total, pending, inProgress, resolved };
  };

  const stats = getStats();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('Complaint History & Track')}</h1>
            <p className="text-gray-600">{t('Monitor and track all your grievances')}</p>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('Search by complaint ID, description, or category...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold">{stats.total}</h3>
              <p className="text-sm opacity-90">{t('Total Complaints')}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-gradient-to-r from-red-500 to-pink-500 text-white">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold">{stats.pending}</h3>
              <p className="text-sm opacity-90">{t('Pending')}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold">{stats.inProgress}</h3>
              <p className="text-sm opacity-90">{t('In Progress')}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-teal-500 text-white">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold">{stats.resolved}</h3>
              <p className="text-sm opacity-90">{t('Resolved')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.map((complaint, index) => (
            <motion.div
              key={complaint.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">#{complaint.id}</h3>
                        <Badge className={getStatusColor(complaint.status)}>
                          {getStatusIcon(complaint.status)}
                          <span className="ml-1">
                            {complaint.status === 'resolved' && t('Resolved')}
                            {complaint.status === 'in-progress' && t('In Progress')}
                            {complaint.status === 'pending' && t('Pending')}
                          </span>
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {complaint.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{getCategoryName(complaint.category)}</p>
                      <p className="text-gray-800 mb-2">{complaint.description || 'No description provided'}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>{t('Date')}: {complaint.dateSubmitted}</span>
                        <span>{t('Location')}: {complaint.location}</span>
                      </div>
                      
                      {/* Media Information */}
                      {complaint.media && (
                        <div className="mt-2 text-xs text-gray-500">
                          {complaint.media.images && complaint.media.images.length > 0 && (
                            <span className="mr-4">📷 {complaint.media.images.length} image(s)</span>
                          )}
                          {complaint.media.audio && (
                            <span className="mr-4">🎵 Audio recording</span>
                          )}
                          {complaint.media.video && (
                            <span className="mr-4">🎥 Video recording</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">{t('Progress Timeline')}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>{t('Complaint Submitted')} - {complaint.dateSubmitted}</span>
                      </div>
                      {complaint.status !== 'pending' && (
                        <div className="flex items-center text-xs text-gray-600">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                          <span>{t('Under Review')} - {complaint.dateSubmitted}</span>
                        </div>
                      )}
                      {complaint.status === 'resolved' && (
                        <div className="flex items-center text-xs text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span>{t('Issue Resolved')} - {complaint.dateSubmitted}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredComplaints.length === 0 && (
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {t('No complaints found')}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? t('Try adjusting your search terms') : t('You haven\'t filed any complaints yet')}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default TrackComplaints;
