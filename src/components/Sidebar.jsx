import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiBuilding, FiUsers, FiFileText, FiTool, FiCreditCard, FiSettings, FiBarChart3, FiChevronLeft, FiChevronRight, FiMenu } = FiIcons;

const navigation = [
  { name: 'Dashboard', href: '/', icon: FiBarChart3 },
  { name: 'Properties', href: '/properties', icon: FiBuilding },
  { name: 'Tenants', href: '/tenants', icon: FiUsers },
  { name: 'Invoices', href: '/invoices', icon: FiFileText },
  { name: 'Maintenance', href: '/maintenance', icon: FiTool },
  { name: 'Payments', href: '/payments', icon: FiCreditCard },
  { name: 'Settings', href: '/settings', icon: FiSettings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mobile menu toggle - visible on small screens */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-white shadow-md text-gray-600 hover:text-primary-600 focus:outline-none"
        >
          <SafeIcon icon={FiMenu} className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ x: collapsed ? -250 : 0 }}
          animate={{ x: collapsed ? -250 : 0, width: collapsed ? '0px' : '250px' }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-y-0 left-0 bg-white shadow-lg z-40 ${collapsed ? 'w-0' : 'w-64'}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              {!collapsed && (
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiHome} className="w-8 h-8 text-primary-600" />
                  <span className="text-xl font-bold text-gray-900">RentalPro</span>
                </div>
              )}
            </div>
            
            <nav className="flex-1 mt-8 overflow-y-auto">
              <div className="px-4 space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <SafeIcon
                          icon={item.icon}
                          className={`w-5 h-5 ${
                            isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                        />
                        {!collapsed && <span className="ml-3">{item.name}</span>}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </nav>
            
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-full p-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <SafeIcon
                  icon={collapsed ? FiChevronRight : FiChevronLeft}
                  className="w-5 h-5"
                />
                {!collapsed && <span className="ml-2">Collapse</span>}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Toggle button - visible on right edge when collapsed */}
      {collapsed && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="fixed top-4 left-0 z-40 p-2 bg-primary-600 text-white rounded-r-lg shadow-md hover:bg-primary-700 focus:outline-none"
        >
          <SafeIcon icon={FiChevronRight} className="w-5 h-5" />
        </motion.button>
      )}
    </>
  );
};

export default Sidebar;