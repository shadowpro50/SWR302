import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Filter, Download, ArrowDown, ArrowUp } from 'lucide-react';
import { useAppContext, BloodType } from '../context/AppContext';
import BloodTypeCard from '../components/BloodTypeCard';

const BloodInventory: React.FC = () => {
  const { bloodInventory } = useAppContext();
  const [sortBy, setSortBy] = useState<'type' | 'quantity'>('type');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterCritical, setFilterCritical] = useState(false);
  
  const sortedInventory = Object.entries(bloodInventory)
    .filter(([_, amount]) => !filterCritical || amount < 5)
    .sort((a, b) => {
      if (sortBy === 'type') {
        return sortDirection === 'asc' 
          ? a[0].localeCompare(b[0])
          : b[0].localeCompare(a[0]);
      } else {
        return sortDirection === 'asc'
          ? a[1] - b[1]
          : b[1] - a[1];
      }
    });
    
  const handleSort = (key: 'type' | 'quantity') => {
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };
  
  const handleFilterChange = () => {
    setFilterCritical(!filterCritical);
  };
  
  // Calculate total inventory
  const totalUnits = Object.values(bloodInventory).reduce((sum, amount) => sum + amount, 0);
  
  // Calculate critical blood types (less than 5 units)
  const criticalTypes = Object.entries(bloodInventory)
    .filter(([_, amount]) => amount < 5)
    .map(([type]) => type);
    
  const handleExportCSV = () => {
    const csvContent = [
      ["Blood Type", "Available Units"],
      ...Object.entries(bloodInventory).map(([type, amount]) => [type, amount.toString()])
    ]
      .map(row => row.join(","))
      .join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "blood_inventory.csv");
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blood Inventory</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Current blood supply levels and inventory management.
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Blood Units</h3>
                <p className="text-3xl font-bold text-red-600">{totalUnits}</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Critical Types</h3>
                <p className="text-3xl font-bold text-red-600">
                  {criticalTypes.length > 0 ? criticalTypes.join(', ') : 'None'}
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Donors</h3>
                <Link 
                  to="/appointments"
                  className="inline-flex items-center text-base font-medium text-red-600 hover:text-red-800"
                >
                  Schedule Donation
                  <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <button
                  onClick={handleFilterChange}
                  className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                    filterCritical 
                      ? 'bg-red-50 text-red-700 border-red-300' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {filterCritical ? 'Showing Critical Only' : 'Show All'}
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button
                    onClick={() => handleSort('type')}
                    className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                      sortBy === 'type' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-700'
                    }`}
                  >
                    Type
                    {sortBy === 'type' && (
                      sortDirection === 'asc' 
                        ? <ArrowUp className="ml-1 h-4 w-4" />
                        : <ArrowDown className="ml-1 h-4 w-4" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleSort('quantity')}
                    className={`ml-2 inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                      sortBy === 'quantity' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-700'
                    }`}
                  >
                    Quantity
                    {sortBy === 'quantity' && (
                      sortDirection === 'asc' 
                        ? <ArrowUp className="ml-1 h-4 w-4" />
                        : <ArrowDown className="ml-1 h-4 w-4" />
                    )}
                  </button>
                </div>
                
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedInventory.map(([type, amount]) => (
                    <tr key={type}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Droplet className={`h-5 w-5 ${amount < 5 ? 'text-red-500' : 'text-gray-400'}`} />
                          <span className="ml-2 text-sm font-medium text-gray-900">{type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{amount} units</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          amount < 5 
                            ? 'bg-red-100 text-red-800'
                            : amount < 10
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {amount < 5 ? 'Critical' : amount < 10 ? 'Low' : 'Good'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {Object.entries(bloodInventory).map(([type, amount]) => (
            <BloodTypeCard
              key={type}
              type={type as BloodType}
              amount={amount}
              isCritical={amount < 5}
            />
          ))}
        </div>
        
        <div className="mt-12 bg-red-50 border border-red-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Emergency Blood?</h2>
          <p className="text-lg text-gray-600 mb-6">
            If you or someone you know needs blood urgently, you can submit an emergency request.
          </p>
          <Link
            to="/emergency"
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Request Emergency Blood
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BloodInventory;