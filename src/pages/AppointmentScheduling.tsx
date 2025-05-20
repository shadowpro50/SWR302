import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Check } from 'lucide-react';
import { useAppContext, DonationCenter } from '../context/AppContext';

const AppointmentScheduling: React.FC = () => {
  const { donationCenters, currentUser, scheduleAppointment } = useAppContext();
  const [selectedCenter, setSelectedCenter] = useState<DonationCenter | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleSelectCenter = (center: DonationCenter) => {
    setSelectedCenter(center);
    setSelectedDate(null);
    setSelectedSlot(null);
  };
  
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };
  
  const handleSelectSlot = (slot: string) => {
    setSelectedSlot(slot);
  };
  
  const handleSubmit = async () => {
    if (selectedCenter && selectedDate && selectedSlot && currentUser) {
      try {
        await scheduleAppointment({
          userId: currentUser.id,
          centerId: selectedCenter.id,
          date: selectedDate,
          slot: selectedSlot
        });
        
        setShowConfirmation(true);
      } catch (error) {
        console.error('Error scheduling appointment:', error);
      }
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long', 
      day: 'numeric'
    });
  };
  
  // Find available dates for the selected center
  const availableDates = selectedCenter
    ? selectedCenter.availableSlots.map(slot => slot.date)
    : [];
    
  // Find available slots for the selected date
  const availableSlots = selectedCenter && selectedDate
    ? selectedCenter.availableSlots
        .find(slot => new Date(slot.date).toDateString() === new Date(selectedDate).toDateString())
        ?.slots || []
    : [];
    
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Schedule a Blood Donation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a donation center, date, and time that works for you.
          </p>
        </div>
        
        {showConfirmation ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-xl mx-auto">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Your blood donation appointment has been scheduled for:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="font-semibold">{selectedCenter?.name}</p>
                <p className="text-gray-600">{selectedCenter?.address}</p>
                <p className="mt-2">
                  <span className="font-medium">{formatDate(selectedDate!)}</span> at <span className="font-medium">{selectedSlot}</span>
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                We'll send a confirmation email with these details and reminders before your appointment.
              </p>
              <button
                onClick={() => setShowConfirmation(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Schedule Another Donation
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Donation Centers</h2>
                  <div className="space-y-4">
                    {donationCenters.map(center => (
                      <div 
                        key={center.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedCenter?.id === center.id 
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                        }`}
                        onClick={() => handleSelectCenter(center)}
                      >
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div className="ml-3">
                            <h3 className="font-medium text-gray-900">{center.name}</h3>
                            <p className="text-sm text-gray-600">{center.address}</p>
                            <p className="text-sm text-gray-600 mt-1">{center.phone}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  {!selectedCenter ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Donation Center</h3>
                      <p className="text-gray-600">
                        Please choose a donation center from the list to see available dates and times.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Date & Time</h2>
                        <p className="text-gray-600">
                          Showing available slots for <span className="font-medium">{selectedCenter.name}</span>
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Available Dates</h3>
                          <div className="space-y-3">
                            {availableDates.map((date, index) => (
                              <div 
                                key={index}
                                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                  selectedDate && selectedDate.toDateString() === new Date(date).toDateString()
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                                }`}
                                onClick={() => handleSelectDate(date)}
                              >
                                <div className="flex items-center">
                                  <Calendar className="h-5 w-5 text-red-500" />
                                  <span className="ml-3 text-gray-900">{formatDate(date)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            {selectedDate ? 'Available Times' : 'Select a Date First'}
                          </h3>
                          
                          {selectedDate ? (
                            <div className="grid grid-cols-2 gap-3">
                              {availableSlots.map((slot, index) => (
                                <div 
                                  key={index}
                                  className={`border rounded-lg p-3 cursor-pointer text-center transition-all ${
                                    selectedSlot === slot
                                      ? 'border-red-500 bg-red-50'
                                      : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                                  }`}
                                  onClick={() => handleSelectSlot(slot)}
                                >
                                  <div className="flex items-center justify-center">
                                    <Clock className="h-4 w-4 text-red-500" />
                                    <span className="ml-2 text-gray-900">{slot}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="border border-gray-200 rounded-lg p-6 text-center bg-gray-50">
                              <p className="text-gray-500">Please select a date first to see available time slots.</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <button
                          onClick={handleSubmit}
                          disabled={!selectedCenter || !selectedDate || !selectedSlot}
                          className={`w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                            selectedCenter && selectedDate && selectedSlot
                              ? 'bg-red-600 hover:bg-red-700'
                              : 'bg-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Schedule Appointment
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Donation information/reminders */}
              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Preparing for Your Donation</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 mr-2 flex-shrink-0">1</span>
                    Get a good night's sleep before your donation.
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 mr-2 flex-shrink-0">2</span>
                    Eat a healthy meal before donating and avoid fatty foods.
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 mr-2 flex-shrink-0">3</span>
                    Drink plenty of water before and after donating.
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 mr-2 flex-shrink-0">4</span>
                    Bring a valid ID (driver's license, passport, etc.).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentScheduling;