import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import MaintenanceCard from '../components/MaintenanceCard';
import CreateMaintenanceModal from '../components/CreateMaintenanceModal';

const { FiPlus, FiSearch, FiFilter } = FiIcons;

const Maintenance = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const maintenanceRequests = [
    {
      id: 'MNT-001',
      title: 'Leaky Faucet in Kitchen',
      description: 'Kitchen faucet is dripping constantly, needs repair or replacement.',
      tenant: 'John Doe',
      unit: '3A - Sunset Apartments',
      priority: 'medium',
      status: 'in-progress',
      createdDate: '2024-01-25',
      assignedTo: 'Mike Johnson (Plumber)',
      estimatedCost: 150
    },
    {
      id: 'MNT-002',
      title: 'Broken Air Conditioning',
      description: 'AC unit not cooling properly, making strange noises.',
      tenant: 'Sarah Johnson',
      unit: '2B - Oak Hill Residences',
      priority: 'high',
      status: 'pending',
      createdDate: '2024-01-26',
      assignedTo: null,
      estimatedCost: 400
    },
    {
      id: 'MNT-003',
      title: 'Paint Touch-up Required',
      description: 'Walls in living room need paint touch-up after moving furniture.',
      tenant: 'Mike Chen',
      unit: '1C - Garden View Complex',
      priority: 'low',
      status: 'completed',
      createdDate: '2024-01-20',
      assignedTo: 'Tom Wilson (Painter)',
      estimatedCost: 80
    },
    {
      id: 'MNT-004',
      title: 'Clogged Bathroom Drain',
      description: 'Bathroom sink drain is completely blocked.',
      tenant: 'John Doe',
      unit: '3A - Sunset Apartments',
      priority: 'high',
      status: 'pending',
      createdDate: '2024-01-27',
      assignedTo: null,
      estimatedCost: 120
    }
  ];

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
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
          <h1 className="text-3xl font-bold text-gray-900">Maintenance</h1>
          <p className="text-gray-600 mt-2">Track and manage maintenance requests</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Create Request</span>
        </motion.button>
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
            placeholder="Search maintenance requests..."
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
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </motion.div>

      {/* Maintenance Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredRequests.map((request, index) => (
          <MaintenanceCard key={request.id} request={request} index={index} />
        ))}
      </motion.div>

      {/* Create Maintenance Modal */}
      <CreateMaintenanceModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
};

export default Maintenance;