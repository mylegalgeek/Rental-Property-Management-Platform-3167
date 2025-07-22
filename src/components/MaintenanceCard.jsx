import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';

const { FiUser, FiHome, FiCalendar, FiDollarSign, FiTool, FiAlertCircle, FiCheckCircle, FiClock } = FiIcons;

const MaintenanceCard = ({ request, index }) => {
  const statusColors = {
    pending: 'bg-warning-100 text-warning-800',
    'in-progress': 'bg-primary-100 text-primary-800',
    completed: 'bg-success-100 text-success-800'
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-warning-100 text-warning-800',
    high: 'bg-danger-100 text-danger-800'
  };

  const statusIcons = {
    pending: FiClock,
    'in-progress': FiTool,
    completed: FiCheckCircle
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
              <SafeIcon icon={statusIcons[request.status]} className="w-3 h-3 inline mr-1" />
              {request.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[request.priority]}`}>
              {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
            </span>
          </div>
          
          <p className="text-gray-600 mb-3">{request.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
              <span>{request.tenant}</span>
            </div>
            
            <div className="flex items-center">
              <SafeIcon icon={FiHome} className="w-4 h-4 mr-2" />
              <span>{request.unit}</span>
            </div>
            
            <div className="flex items-center">
              <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
              <span>Created: {format(new Date(request.createdDate), 'MMM dd, yyyy')}</span>
            </div>
            
            <div className="flex items-center">
              <SafeIcon icon={FiDollarSign} className="w-4 h-4 mr-2" />
              <span>Est. Cost: ${request.estimatedCost}</span>
            </div>
          </div>
          
          {request.assignedTo && (
            <div className="mt-3 flex items-center text-sm text-gray-600">
              <SafeIcon icon={FiTool} className="w-4 h-4 mr-2" />
              <span>Assigned to: {request.assignedTo}</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 ml-4">
          {request.status === 'pending' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
            >
              Assign
            </motion.button>
          )}
          
          {request.status === 'in-progress' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-success-600 text-white text-sm rounded-lg hover:bg-success-700 transition-colors"
            >
              Complete
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
          >
            Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MaintenanceCard;