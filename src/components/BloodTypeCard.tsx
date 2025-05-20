import React from 'react';
import { Droplet } from 'lucide-react';
import { BloodType } from '../context/AppContext';

interface BloodTypeCardProps {
  type: BloodType;
  amount: number;
  isCritical: boolean;
}

const BloodTypeCard: React.FC<BloodTypeCardProps> = ({ type, amount, isCritical }) => {
  // Helper function to determine status color
  const getStatusColor = () => {
    if (isCritical) return 'text-red-600';
    if (amount < 10) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusBackground = () => {
    if (isCritical) return 'bg-red-100';
    if (amount < 10) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  const getStatusLabel = () => {
    if (isCritical) return 'Critical';
    if (amount < 10) return 'Low';
    return 'Good';
  };

  return (
    <div 
      className={`border rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md ${
        isCritical ? 'border-red-300 pulse-animation' : 'border-gray-200'
      }`}
    >
      <div className="p-4 text-center">
        <div className="blood-drop-animation inline-flex items-center justify-center p-2 mb-2">
          <Droplet 
            className={`h-8 w-8 fill-current ${getStatusColor()}`} 
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{type}</h3>
        <div className={`mt-2 text-sm ${getStatusColor()}`}>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBackground()} ${getStatusColor()}`}>
            {getStatusLabel()}
          </span>
        </div>
        <p className="mt-2 text-lg font-semibold text-gray-900">{amount} units</p>
      </div>
    </div>
  );
};

export default BloodTypeCard;