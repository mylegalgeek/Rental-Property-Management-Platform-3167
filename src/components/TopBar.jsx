import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiSearch, FiBell, FiUser } = FiIcons;

const TopBar = ({ onMenuClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-sm border-b border-gray-200 px-4 py-2 flex items-center justify-between"
    >
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="mr-4 p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <SafeIcon icon={FiMenu} className="w-5 h-5" />
        </button>
        
        <div className="relative hidden sm:block">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative">
          <SafeIcon icon={FiBell} className="w-5 h-5" />
          <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-gray-100 rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700 hidden md:block">John Smith</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TopBar;