import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import PaymentCard from '../components/PaymentCard';
import StripeSetup from '../components/StripeSetup';

const { FiCreditCard, FiSearch, FiFilter, FiDownload, FiSettings } = FiIcons;

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showStripeSetup, setShowStripeSetup] = useState(false);

  const payments = [
    {
      id: 'PAY-001',
      tenant: 'John Doe',
      unit: '3A - Sunset Apartments',
      amount: 2800,
      type: 'rent',
      status: 'completed',
      paymentDate: '2024-01-28',
      paymentMethod: 'credit_card',
      stripeId: 'pi_1234567890',
      invoice: 'INV-001'
    },
    {
      id: 'PAY-002',
      tenant: 'Sarah Johnson',
      unit: '2B - Oak Hill Residences',
      amount: 3200,
      type: 'rent',
      status: 'pending',
      paymentDate: null,
      paymentMethod: 'bank_transfer',
      stripeId: null,
      invoice: 'INV-002'
    },
    {
      id: 'PAY-003',
      tenant: 'Mike Chen',
      unit: '1C - Garden View Complex',
      amount: 150,
      type: 'utilities',
      status: 'failed',
      paymentDate: '2024-01-26',
      paymentMethod: 'credit_card',
      stripeId: 'pi_0987654321',
      invoice: 'INV-003'
    },
    {
      id: 'PAY-004',
      tenant: 'John Doe',
      unit: '3A - Sunset Apartments',
      amount: 2500,
      type: 'security_deposit',
      status: 'completed',
      paymentDate: '2024-01-15',
      paymentMethod: 'bank_transfer',
      stripeId: 'pi_1122334455',
      invoice: null
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-2">Track rent payments and manage Stripe integration</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowStripeSetup(true)}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiSettings} className="w-4 h-4" />
            <span>Stripe Setup</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Payment Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-success-50 rounded-lg">
              <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">${pendingAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-warning-50 rounded-lg">
              <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">${(totalRevenue * 0.8).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex space-x-4"
      >
        <div className="flex-1 relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <SafeIcon icon={FiFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </motion.div>

      {/* Payments List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        {filteredPayments.map((payment, index) => (
          <PaymentCard key={payment.id} payment={payment} index={index} />
        ))}
      </motion.div>

      {/* Stripe Setup Modal */}
      <StripeSetup isOpen={showStripeSetup} onClose={() => setShowStripeSetup(false)} />
    </div>
  );
};

export default Payments;