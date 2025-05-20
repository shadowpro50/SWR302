import React, { useState } from 'react';
import { MapPin, Phone, Clock, Calendar } from 'lucide-react';
import { useAppContext, DonationCenter } from '../context/AppContext';
import { Link } from 'react-router-dom';

const DonationCenters: React.FC = () => {
  const { donationCenters } = useAppContext();
  const [selectedCenter, setSelectedCenter] = useState<DonationCenter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCenters = donationCenters.filter(center =>
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCenterClick = (center: DonationCenter) => {
    setSelectedCenter(center);
  };
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blood Donation Centers</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find a donation center near you and schedule your next blood donation appointment.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by center name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <MapPin className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCenters.map((center) => (
                <div
                  key={center.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                    selectedCenter?.id === center.id ? 'ring-2 ring-red-500' : ''
                  }`}
                  onClick={() => handleCenterClick(center)}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{center.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                        <span className="ml-2 text-gray-600">{center.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-red-500" />
                        <span className="ml-2 text-gray-600">{center.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-red-500" />
                        <span className="ml-2 text-gray-600">Open 9:00 AM - 5:00 PM</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link
                        to="/appointments"
                        className="inline-flex items-center text-red-600 hover:text-red-800"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Center Information</h2>
              {selectedCenter ? (
                <div>
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900">{selectedCenter.name}</h3>
                    <p className="text-gray-600 mt-1">{selectedCenter.address}</p>
                    <p className="text-gray-600">{selectedCenter.phone}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Available Time Slots</h4>
                    <div className="space-y-4">
                      {selectedCenter.availableSlots.map((slot, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <p className="font-medium text-gray-900">
                            {new Date(slot.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            {slot.slots.map((time, timeIndex) => (
                              <span
                                key={timeIndex}
                                className="text-sm text-gray-600 bg-gray-100 rounded px-2 py-1 text-center"
                              >
                                {time}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    to="/appointments"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Schedule at This Center
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Select a donation center to view available time slots and schedule an appointment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCenters;