
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
      className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-4 relative overflow-hidden"
    >
      {/* Beautiful Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ 
            y: [-15, 15, -15],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-40 left-10 w-32 h-32 bg-gradient-to-r from-pink-200 to-red-200 rounded-full opacity-20 blur-xl"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center mb-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mr-4"
          >
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="p-3 rounded-xl hover:bg-purple-100"
            >
              <ArrowLeft className="h-6 w-6 text-purple-600" />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center space-x-4"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Search className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('Complaint History & Track')}
              </h1>
              <p className="text-gray-600 mt-1 text-lg">{t('Monitor and track all your grievances')}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Search */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute left-4 top-4 z-10"
                >
                  <Search className="h-5 w-5 text-purple-500" />
                </motion.div>
                <Input
                  placeholder={t('Search by complaint ID, description, or category...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-purple-100 focus:border-purple-400 rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { count: stats.total, label: 'Total Complaints', gradient: 'from-blue-500 to-purple-500', icon: '📊' },
            { count: stats.pending, label: 'Pending', gradient: 'from-red-500 to-pink-500', icon: '⏳' },
            { count: stats.inProgress, label: 'In Progress', gradient: 'from-yellow-500 to-orange-500', icon: '🔄' },
            { count: stats.resolved, label: 'Resolved', gradient: 'from-green-500 to-teal-500', icon: '✅' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className={`shadow-xl border-0 bg-gradient-to-r ${stat.gradient} text-white cursor-pointer overflow-hidden relative group`}>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-6 text-center relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="text-3xl mb-2"
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-3xl font-bold mb-1"
                    animate={{ textShadow: ["0 0 0px rgba(255,255,255,0.5)", "0 0 20px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0.5)"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {stat.count}
                  </motion.h3>
                  <p className="text-sm opacity-90 font-medium">{t(stat.label)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.map((complaint, index) => (
            <motion.div
              key={complaint.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-sm overflow-hidden group">
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
