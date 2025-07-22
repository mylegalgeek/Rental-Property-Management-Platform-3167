import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';

const { FiMail, FiPhone, FiHome, FiCalendar } = FiIcons;

const TenantCard = ({ tenant, index }) => {
  const statusColors = {
    active: 'bg-success-100 text-success-800',
    pending: 'bg-warning-100 text-warning-800',
    expired: 'bg-danger-100 text-danger-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={tenant.avatar}
          alt={tenant.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[tenant.status]}`}>
            {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <SafeIcon icon={FiMail} className="w-4 h-4 mr-3" />
          <span className="text-sm">{tenant.email}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <SafeIcon icon={FiPhone} className="w-4 h-4 mr-3" />
          <span className="text-sm">{tenant.phone}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <SafeIcon icon={FiHome} className="w-4 h-4 mr-3" />
          <span className="text-sm">{tenant.unit}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-3" />
          <span className="text-sm">
            {format(new Date(tenant.leaseStart), 'MMM dd')} - {format(new Date(tenant.leaseEnd), 'MMM dd, yyyy')}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-600">Monthly Rent</p>
          <p className="text-lg font-semibold text-gray-900">${tenant.rentAmount.toLocaleString()}</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TenantCard;