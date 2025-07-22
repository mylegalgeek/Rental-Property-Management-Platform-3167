import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import KPICard from '../components/KPICard';
import RevenueChart from '../components/RevenueChart';
import OccupancyChart from '../components/OccupancyChart';
import RecentActivity from '../components/RecentActivity';

const { FiDollarSign, FiHome, FiUsers, FiAlertTriangle } = FiIcons;

const Dashboard = () => {
  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$24,560',
      change: '+12.5%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'success'
    },
    {
      title: 'Occupied Units',
      value: '18/20',
      change: '+2 units',
      trend: 'up',
      icon: FiHome,
      color: 'primary'
    },
    {
      title: 'Active Tenants',
      value: '18',
      change: '+3 this month',
      trend: 'up',
      icon: FiUsers,
      color: 'primary'
    },
    {
      title: 'Maintenance Requests',
      value: '4',
      change: '-2 from last week',
      trend: 'down',
      icon: FiAlertTriangle,
      color: 'warning'
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your properties.</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RevenueChart />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <OccupancyChart />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <RecentActivity />
      </motion.div>
    </div>
  );
};

export default Dashboard;