import React, { useState } from 'react';
import { AlertTriangle, Clock, Check, Heart } from 'lucide-react';
import { useAppContext, BloodType, EmergencyRequest } from '../context/AppContext';

const EmergencyRequests: React.FC = () => {
  const { createEmergencyRequest, emergencyRequests, currentUser, bloodInventory } = useAppContext();
  const [isCreating, setIsCreating] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [formData, setFormData] = useState({
    bloodType: '' as BloodType | '',
    hospital: '',
    quantity: 1,
    requiredBy: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.bloodType) {
      newErrors.bloodType = 'Blood type is required';
    }
    
    if (!formData.hospital.trim()) {
      newErrors.hospital = 'Hospital name is required';
    }
    
    if (formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }
    
    if (!formData.requiredBy) {
      newErrors.requiredBy = 'Required by date is required';
    } else {
      const requiredByDate = new Date(formData.requiredBy);
      const today = new Date();
      
      if (requiredByDate < today) {
        newErrors.requiredBy = 'Required by date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && currentUser) {
      try {
        const requiredByDate = new Date(formData.requiredBy);
        
        await createEmergencyRequest({
          requesterId: currentUser.id,
          bloodType: formData.bloodType as BloodType,
          hospital: formData.hospital,
          quantity: formData.quantity,
          requiredBy: requiredByDate
        });
        
        setShowConfirmation(true);
        setIsCreating(false);
        
        // Reset form
        setFormData({
          bloodType: '',
          hospital: '',
          quantity: 1,
          requiredBy: '',
          notes: ''
        });
      } catch (error) {
        console.error('Error creating emergency request:', error);
      }
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getStatusBadge = (status: EmergencyRequest['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'fulfilled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Fulfilled
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Expired
          </span>
        );
      default:
        return null;
    }
  };
  
  const calcDaysRemaining = (requiredBy: Date) => {
    const today = new Date();
    const required = new Date(requiredBy);
    const diffTime = required.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Sort emergency requests by urgency (pending first, then by required date)
  const sortedRequests = [...emergencyRequests].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    if (a.status === 'pending' && b.status === 'pending') {
      return new Date(a.requiredBy).getTime() - new Date(b.requiredBy).getTime();
    }
    return 0;
  });
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Emergency Blood Requests</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit or respond to emergency blood requests for critical situations.
          </p>
        </div>
        
        {showConfirmation && (
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Request Submitted Successfully</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Your emergency blood request has been submitted. We will notify eligible donors in your area immediately.
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setShowConfirmation(false)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mb-8">
          <div className="bg-red-600 text-white rounded-lg shadow-lg overflow-hidden md:w-1/3">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-8 w-8 text-white opacity-80" />
                <h2 className="text-xl font-bold ml-2">Need Blood Urgently?</h2>
              </div>
              <p className="mb-6">
                If you or someone you know requires blood urgently, submit an emergency request. We'll notify eligible donors immediately.
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-red-600 bg-white hover:bg-gray-100"
              >
                Submit Emergency Request
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden md:w-2/3">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Current Blood Inventory</h2>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(bloodInventory).map(([type, amount]) => (
                  <div 
                    key={type}
                    className={`border rounded-lg p-4 text-center ${
                      amount < 5 ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <h3 className={`text-lg font-bold ${amount < 5 ? 'text-red-600' : 'text-gray-900'}`}>
                      {type}
                    </h3>
                    <p className={`text-sm ${amount < 5 ? 'text-red-600' : 'text-gray-600'}`}>
                      {amount} units
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {isCreating ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Submit Emergency Request</h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Type *
                    </label>
                    <select
                      id="bloodType"
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className={`block w-full rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                        errors.bloodType ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Blood Type</option>
                      {(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as BloodType[]).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.bloodType && <p className="mt-1 text-sm text-red-600">{errors.bloodType}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity Needed (units) *
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`block w-full rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                        errors.quantity ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">
                      Hospital/Medical Facility *
                    </label>
                    <input
                      type="text"
                      id="hospital"
                      name="hospital"
                      value={formData.hospital}
                      onChange={handleChange}
                      className={`block w-full rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                        errors.hospital ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g. City General Hospital"
                    />
                    {errors.hospital && <p className="mt-1 text-sm text-red-600">{errors.hospital}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="requiredBy" className="block text-sm font-medium text-gray-700 mb-1">
                      Required By (Date) *
                    </label>
                    <input
                      type="date"
                      id="requiredBy"
                      name="requiredBy"
                      value={formData.requiredBy}
                      onChange={handleChange}
                      className={`block w-full rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                        errors.requiredBy ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.requiredBy && <p className="mt-1 text-sm text-red-600">{errors.requiredBy}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      placeholder="Any additional information about this request"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Submit Emergency Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Active Emergency Requests</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {sortedRequests.length > 0 ? (
                sortedRequests.map(request => {
                  const daysRemaining = calcDaysRemaining(request.requiredBy);
                  const isUrgent = daysRemaining <= 2 && request.status === 'pending';
                  
                  return (
                    <div 
                      key={request.id} 
                      className={`p-6 ${isUrgent ? 'bg-red-50' : ''}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center mb-2">
                            <Droplet className={`h-5 w-5 ${isUrgent ? 'text-red-600' : 'text-gray-400'}`} />
                            <span className="ml-2 text-lg font-semibold text-gray-900">
                              {request.bloodType} Blood Needed
                            </span>
                            <span className="ml-3">
                              {getStatusBadge(request.status)}
                            </span>
                          </div>
                          
                          <p className="text-gray-600">
                            <span className="font-medium">{request.quantity} units</span> needed at <span className="font-medium">{request.hospital}</span>
                          </p>
                          
                          <p className="text-sm text-gray-500 mt-1">
                            Requested on {formatDate(request.createdAt)}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-end">
                          <div className={`text-sm font-medium ${isUrgent ? 'text-red-600' : 'text-gray-600'}`}>
                            {request.status === 'pending' ? (
                              <>
                                {daysRemaining > 0 ? (
                                  <>Needed in <span className="font-bold">{daysRemaining}</span> {daysRemaining === 1 ? 'day' : 'days'}</>
                                ) : (
                                  <>Needed <span className="font-bold">today</span></>
                                )}
                              </>
                            ) : (
                              <>Required by {formatDate(request.requiredBy)}</>
                            )}
                          </div>
                          
                          {request.status === 'pending' && (
                            <button
                              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                            >
                              <Heart className="h-4 w-4 mr-1" />
                              Respond to Request
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No emergency requests at this time.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyRequests;