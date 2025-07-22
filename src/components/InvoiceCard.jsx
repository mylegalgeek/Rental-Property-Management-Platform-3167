import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';

const { FiUser, FiHome, FiCalendar, FiDollarSign, FiEye, FiSend, FiEdit } = FiIcons;

const InvoiceCard = ({ invoice, index }) => {
  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    pending: 'bg-warning-100 text-warning-800',
    paid: 'bg-success-100 text-success-800',
    overdue: 'bg-danger-100 text-danger-800'
  };

  const typeColors = {
    rent: 'bg-primary-100 text-primary-800',
    utilities: 'bg-warning-100 text-warning-800',
    maintenance: 'bg-danger-100 text-danger-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-3">
            <h3 className="text-lg font-semibold text-gray-900">{invoice.id}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[invoice.type]}`}>
              {invoice.type.charAt(0).toUpperCase() + invoice.type.slice(1)}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
              <span>{invoice.tenant}</span>
            </div>
            
            <div className="flex items-center">
              <SafeIcon icon={FiHome} className="w-4 h-4 mr-2" />
              <span>{invoice.unit}</span>
            </div>
            
            <div className="flex items-center">
              <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
              <span>Due: {format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="flex items-center text-lg font-bold text-gray-900">
              <SafeIcon icon={FiDollarSign} className="w-5 h-5 mr-1" />
              {invoice.amount.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">
              Created: {format(new Date(invoice.createdDate), 'MMM dd')}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="View Invoice"
            >
              <SafeIcon icon={FiEye} className="w-4 h-4" />
            </motion.button>
            
            {invoice.status === 'draft' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-warning-600 hover:bg-warning-50 rounded-lg transition-colors"
                title="Edit Invoice"
              >
                <SafeIcon icon={FiEdit} className="w-4 h-4" />
              </motion.button>
            )}
            
            {(invoice.status === 'draft' || invoice.status === 'pending') && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-success-600 hover:bg-success-50 rounded-lg transition-colors"
                title="Send Invoice"
              >
                <SafeIcon icon={FiSend} className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceCard;