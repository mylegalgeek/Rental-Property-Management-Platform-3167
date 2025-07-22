import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDollarSign, FiTool, FiUser, FiHome } = FiIcons;

const activities = [
  {
    id: 1,
    type: 'payment',
    message: 'Rent payment received from John Doe - Unit 3A',
    amount: '$2,800',
    time: '2 hours ago',
    icon: FiDollarSign,
    color: 'text-success-600 bg-success-50'
  },
  {
    id: 2,
    type: 'maintenance',
    message: 'Maintenance request submitted - Leaky faucet in Unit 2B',
    time: '4 hours ago',
    icon: FiTool,
    color: 'text-warning-600 bg-warning-50'
  },
  {
    id: 3,
    type: 'tenant',
    message: 'New tenant application received for Unit 1C',
    time: '1 day ago',
    icon: FiUser,
    color: 'text-primary-600 bg-primary-50'
  },
  {
    id: 4,
    type: 'property',
    message: 'Property inspection completed for Building A',
    time: '2 days ago',
    icon: FiHome,
    color: 'text-gray-600 bg-gray-50'
  }
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${activity.color}`}>
              <SafeIcon icon={activity.icon} className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
            {activity.amount && (
              <span className="text-sm font-semibold text-success-600">{activity.amount}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;