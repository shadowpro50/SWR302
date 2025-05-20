import React, { useState } from 'react';
import { User, Settings, Calendar, Bell, Shield, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const { currentUser, logout } = useAppContext();
  const [activeTab, setActiveTab] = useState('profile');
  
  if (!currentUser) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Not Logged In</h2>
            <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Register or Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-red-600 text-white p-6">
              <div className="flex items-center">
                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
                  <User className="h-12 w-12 text-red-600" />
                </div>
                <div className="ml-6">
                  <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                  <p className="text-red-100">Blood Type: {currentUser.bloodType}</p>
                  <p className="text-red-100">Donor ID: {currentUser.id}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-6 inline-flex items-center ${
                    activeTab === 'profile'
                      ? 'border-b-2 border-red-500 text-red-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </button>
                
                <button
                  onClick={() => setActiveTab('donations')}
                  className={`py-4 px-6 inline-flex items-center ${
                    activeTab === 'donations'
                      ? 'border-b-2 border-red-500 text-red-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Donations
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-4 px-6 inline-flex items-center ${
                    activeTab === 'settings'
                      ? 'border-b-2 border-red-500 text-red-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </button>
              </nav>
            </div>
            
            {/* Content Sections */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <p className="mt-1 text-gray-900">{currentUser.name}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-gray-900">{currentUser.email}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                      <p className="mt-1 text-gray-900">{currentUser.bloodType}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-gray-900">{currentUser.phone || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Donation</label>
                      <p className="mt-1 text-gray-900">
                        {currentUser.lastDonation
                          ? new Date(currentUser.lastDonation).toLocaleDateString()
                          : 'No donations yet'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Donor Status</label>
                      <p className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active Donor
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Donation History Overview</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-red-600">5</p>
                          <p className="text-sm text-gray-600">Total Donations</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-red-600">15</p>
                          <p className="text-sm text-gray-600">Lives Impacted</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-red-600">2.5L</p>
                          <p className="text-sm text-gray-600">Blood Donated</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'donations' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Donation History</h2>
                    <Link
                      to="/appointments"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                      Schedule New Donation
                    </Link>
                  </div>
                  
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      <li className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <Calendar className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">Whole Blood Donation</p>
                              <p className="text-sm text-gray-500">Central Blood Bank</p>
                            </div>
                          </div>
                          <div className="ml-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="text-sm text-gray-500">March 15, 2025</p>
                          </div>
                        </div>
                      </li>
                      
                      <li className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <Calendar className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">Plasma Donation</p>
                              <p className="text-sm text-gray-500">Regional Medical Center</p>
                            </div>
                          </div>
                          <div className="ml-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Scheduled
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="text-sm text-gray-500">April 1, 2025</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 px-4 py-5 sm:rounded-lg sm:p-6">
                      <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Decide which communications you'd like to receive.
                          </p>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="appointments"
                                  name="appointments"
                                  type="checkbox"
                                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                  defaultChecked
                                />
                              </div>
                              <div className="ml-3">
                                <label htmlFor="appointments" className="font-medium text-gray-700">
                                  Appointment Reminders
                                </label>
                                <p className="text-gray-500">Get notified about upcoming donations.</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="emergency"
                                  name="emergency"
                                  type="checkbox"
                                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                  defaultChecked
                                />
                              </div>
                              <div className="ml-3">
                                <label htmlFor="emergency" className="font-medium text-gray-700">
                                  Emergency Requests
                                </label>
                                <p className="text-gray-500">
                                  Receive alerts when your blood type is urgently needed.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="newsletter"
                                  name="newsletter"
                                  type="checkbox"
                                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3">
                                <label htmlFor="newsletter" className="font-medium text-gray-700">
                                  Newsletter
                                </label>
                                <p className="text-gray-500">
                                  Monthly updates about blood donation news and events.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 px-4 py-5 sm:rounded-lg sm:p-6">
                      <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Privacy</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Manage your privacy settings and data sharing preferences.
                          </p>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="public-profile"
                                  name="public-profile"
                                  type="checkbox"
                                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3">
                                <label htmlFor="public-profile" className="font-medium text-gray-700">
                                  Public Profile
                                </label>
                                <p className="text-gray-500">
                                  Make your profile visible to other donors and recipients.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="share-stats"
                                  name="share-stats"
                                  type="checkbox"
                                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                  defaultChecked
                                />
                              </div>
                              <div className="ml-3">
                                <label htmlFor="share-stats" className="font-medium text-gray-700">
                                  Share Statistics
                                </label>
                                <p className="text-gray-500">
                                  Include your donations in anonymous statistics.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 px-4 py-5 sm:rounded-lg sm:p-6">
                      <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Security</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Manage your account security settings.
                          </p>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                          <div className="space-y-4">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              <Shield className="h-5 w-5 mr-2 text-gray-500" />
                              Change Password
                            </button>
                            
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              <Bell className="h-5 w-5 mr-2 text-gray-500" />
                              Two-Factor Authentication
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;