import React from 'react';
import { Calendar, MapPin, Clock, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DonationEvent {
  id: string;
  title: string;
  date: Date;
  location: string;
  address: string;
  slotsAvailable: number;
  description: string;
  type: 'blood' | 'plasma' | 'platelets';
}

const DonationEvents: React.FC = () => {
  // Mock data for donation events
  const events: DonationEvent[] = [
    {
      id: '1',
      title: 'Community Blood Drive',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      location: 'Central Community Center',
      address: '123 Main St, Downtown',
      slotsAvailable: 15,
      description: 'Join our community blood drive and help save lives. All blood types needed.',
      type: 'blood'
    },
    {
      id: '2',
      title: 'Plasma Donation Campaign',
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      location: 'Regional Medical Center',
      address: '456 Health Ave, Westside',
      slotsAvailable: 8,
      description: 'Critical need for plasma donors. Your donation helps trauma and burn patients.',
      type: 'plasma'
    },
    {
      id: '3',
      title: 'Mobile Blood Drive',
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      location: 'City Park',
      address: '789 Park Road, Eastside',
      slotsAvailable: 20,
      description: 'Our mobile donation unit makes it convenient to donate. Walk-ins welcome.',
      type: 'blood'
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getEventTypeColor = (type: DonationEvent['type']) => {
    switch (type) {
      case 'plasma':
        return 'bg-blue-100 text-blue-800';
      case 'platelets':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Donation Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find and join blood donation events in your community. Every donation makes a difference.
          </p>
        </div>

        <div className="grid gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <Heart className="h-5 w-5 text-red-500 mr-2" />
                      <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>
                      <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(event.date)} at {formatTime(event.date)}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location} - {event.address}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.slotsAvailable} slots available</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Link
                      to={`/appointments?event=${event.id}`}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Link>
                    <button
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Learn More
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/centers"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Find More Donation Centers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationEvents;