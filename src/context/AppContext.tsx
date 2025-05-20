import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface User {
  id: string;
  name: string;
  email: string;
  bloodType: BloodType;
  isDonor: boolean;
  lastDonation?: Date;
  phone?: string;
}

export interface BloodUnit {
  id: string;
  bloodType: BloodType;
  donationDate: Date;
  expiryDate: Date;
  status: 'available' | 'reserved' | 'used';
}

export interface DonationCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  availableSlots: {
    date: Date;
    slots: string[];
  }[];
}

export interface Appointment {
  id: string;
  userId: string;
  centerId: string;
  date: Date;
  slot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface EmergencyRequest {
  id: string;
  requesterId: string;
  bloodType: BloodType;
  hospital: string;
  quantity: number;
  requiredBy: Date;
  status: 'pending' | 'fulfilled' | 'expired';
  createdAt: Date;
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  bloodInventory: Record<BloodType, number>;
  donations: Appointment[];
  emergencyRequests: EmergencyRequest[];
  donationCenters: DonationCenter[];
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerDonor: (userData: Omit<User, 'id' | 'isDonor'>) => Promise<void>;
  scheduleAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => Promise<void>;
  createEmergencyRequest: (request: Omit<EmergencyRequest, 'id' | 'status' | 'createdAt'>) => Promise<void>;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  bloodInventory: {
    'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0
  },
  donations: [],
  emergencyRequests: [],
  donationCenters: [],
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
  registerDonor: async () => {},
  scheduleAppointment: async () => {},
  createEmergencyRequest: async () => {},
});

// Provider component
export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mock data for demo purposes
  const [bloodInventory, setBloodInventory] = useState<Record<BloodType, number>>({
    'A+': 15, 'A-': 8, 'B+': 12, 'B-': 5, 'AB+': 3, 'AB-': 2, 'O+': 25, 'O-': 10
  });
  
  const [donations, setDonations] = useState<Appointment[]>([]);
  const [emergencyRequests, setEmergencyRequests] = useState<EmergencyRequest[]>([]);
  const [donationCenters, setDonationCenters] = useState<DonationCenter[]>([
    {
      id: '1',
      name: 'Central Blood Bank',
      address: '123 Main St, City Center',
      phone: '(123) 456-7890',
      coordinates: { lat: 40.7128, lng: -74.006 },
      availableSlots: [
        {
          date: new Date(new Date().setDate(new Date().getDate() + 1)),
          slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM']
        },
        {
          date: new Date(new Date().setDate(new Date().getDate() + 2)),
          slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM']
        }
      ]
    },
    {
      id: '2',
      name: 'Regional Medical Center',
      address: '456 Oak Ave, Westside',
      phone: '(987) 654-3210',
      coordinates: { lat: 40.7328, lng: -74.026 },
      availableSlots: [
        {
          date: new Date(new Date().setDate(new Date().getDate() + 1)),
          slots: ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM']
        },
        {
          date: new Date(new Date().setDate(new Date().getDate() + 3)),
          slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM']
        }
      ]
    }
  ]);

  // Auth functions
  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would verify credentials with a backend
    const mockUser: User = {
      id: '123',
      name: 'John Donor',
      email: email,
      bloodType: 'O+',
      isDonor: true,
      lastDonation: new Date(new Date().setMonth(new Date().getMonth() - 3)),
      phone: '(555) 123-4567'
    };
    
    setCurrentUser(mockUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const registerDonor = async (userData: Omit<User, 'id' | 'isDonor'>) => {
    // Mock registration - would send data to backend in real app
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      isDonor: true
    };
    
    setCurrentUser(newUser);
    setIsLoggedIn(true);
  };

  const scheduleAppointment = async (appointmentData: Omit<Appointment, 'id' | 'status'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'scheduled'
    };
    
    setDonations(prev => [...prev, newAppointment]);
  };

  const createEmergencyRequest = async (requestData: Omit<EmergencyRequest, 'id' | 'status' | 'createdAt'>) => {
    const newRequest: EmergencyRequest = {
      ...requestData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date()
    };
    
    setEmergencyRequests(prev => [...prev, newRequest]);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      bloodInventory,
      donations,
      emergencyRequests,
      donationCenters,
      isLoggedIn,
      login,
      logout,
      registerDonor,
      scheduleAppointment,
      createEmergencyRequest
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier context use
export const useAppContext = () => useContext(AppContext);