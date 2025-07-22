import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiDollarSign, FiUsers, FiMapPin } = FiIcons;

const PropertyCard = ({ property, index }) => {
  const occupancyRate = (property.occupiedUnits / property.units) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
    >
      <div className="relative h-48">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            occupancyRate === 100 ? 'bg-success-100 text-success-800' :
            occupancyRate >= 80 ? 'bg-warning-100 text-warning-800' :
            'bg-danger-100 text-danger-800'
          }`}>
            {occupancyRate.toFixed(0)}% Occupied
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
          <span className="text-sm">{property.address}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <SafeIcon icon={FiHome} className="w-4 h-4 text-primary-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Units</p>
              <p className="font-semibold">{property.occupiedUnits}/{property.units}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-success-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="font-semibold">${property.monthlyRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary-50 text-primary-700 py-2 rounded-lg font-medium hover:bg-primary-100 transition-colors"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PropertyCard;