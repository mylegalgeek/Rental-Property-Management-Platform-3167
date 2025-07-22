import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import InvoiceCard from '../components/InvoiceCard';
import CreateInvoiceModal from '../components/CreateInvoiceModal';

const { FiPlus, FiSearch, FiFilter, FiDownload } = FiIcons;

const Invoices = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const invoices = [
    {
      id: 'INV-001',
      tenant: 'John Doe',
      unit: '3A - Sunset Apartments',
      amount: 2800,
      dueDate: '2024-02-01',
      status: 'paid',
      type: 'rent',
      createdDate: '2024-01-15'
    },
    {
      id: 'INV-002',
      tenant: 'Sarah Johnson',
      unit: '2B - Oak Hill Residences',
      amount: 3200,
      dueDate: '2024-02-01',
      status: 'pending',
      type: 'rent',
      createdDate: '2024-01-15'
    },
    {
      id: 'INV-003',
      tenant: 'Mike Chen',
      unit: '1C - Garden View Complex',
      amount: 150,
      dueDate: '2024-02-05',
      status: 'overdue',
      type: 'utilities',
      createdDate: '2024-01-20'
    },
    {
      id: 'INV-004',
      tenant: 'John Doe',
      unit: '3A - Sunset Apartments',
      amount: 200,
      dueDate: '2024-02-10',
      status: 'draft',
      type: 'maintenance',
      createdDate: '2024-01-25'
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-2">Create and manage tenant invoices</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Create Invoice</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex space-x-4"
      >
        <div className="flex-1 relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search invoices..."
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
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </motion.div>

      {/* Invoices List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredInvoices.map((invoice, index) => (
          <InvoiceCard key={invoice.id} invoice={invoice} index={index} />
        ))}
      </motion.div>

      {/* Create Invoice Modal */}
      <CreateInvoiceModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
};

export default Invoices;