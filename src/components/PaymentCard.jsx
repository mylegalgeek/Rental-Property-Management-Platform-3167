import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';

const { FiUser, FiHome, FiCalendar, FiDollarSign, FiCreditCard, FiRefreshCw, FiExternalLink } = FiIcons;

const PaymentCard = ({ payment, index }) => {
  const statusColors = {
    completed: 'bg-success-100 text-success-800',
    pending: 'bg-warning-100 text-warning-800',
    failed: 'bg-danger-100 text-danger-800'
  };

  const typeLabels = {
    rent: 'Rent',
    utilities: 'Utilities',
    security_deposit: 'Security Deposit',
    maintenance: 'Maintenance'
  };

  const paymentMethodLabels = {
    credit_card: 'Credit Card',
    bank_transfer: 'Bank Transfer',
    ach: 'ACH Transfer'
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
            <h3 className="text-lg font-semibold text-gray-900">{payment.id}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[payment.status]}`}>
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {typeLabels[payment.type]}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
              <span>{payment.tenant}</span>
            </div>
            
            <div className="flex items-center">
              <SafeIcon icon={FiHome} className="w-4 h-4 mr-2" />
              <span>{payment.unit}</span>
            </div>
            
            <div className="flex items-center">
              <SafeIcon icon={FiCreditCard} className="w-4 h-4 mr-2" />
              <span>{paymentMethodLabels[payment.paymentMethod]}</span>
            </div>
            
            {payment.paymentDate && (
              <div className="flex items-center">
                <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                <span>{format(new Date(payment.paymentDate), 'MMM dd, yyyy')}</span>
              </div>
            )}
          </div>

          {payment.invoice && (
            <div className="mt-2 text-sm text-gray-600">
              Related Invoice: <span className="font-medium">{payment.invoice}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="flex items-center text-lg font-bold text-gray-900">
              <SafeIcon icon={FiDollarSign} className="w-5 h-5 mr-1" />
              {payment.amount.toLocaleString()}
            </div>
            {payment.stripeId && (
              <p className="text-xs text-gray-500 mt-1">Stripe ID: {payment.stripeId}</p>
            )}
          </div>
          
          <div className="flex space-x-2">
            {payment.status === 'failed' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-warning-600 hover:bg-warning-50 rounded-lg transition-colors"
                title="Retry Payment"
              >
                <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
              </motion.button>
            )}
            
            {payment.stripeId && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                title="View in Stripe"
              >
                <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentCard;