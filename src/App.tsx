import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DonorRegistration from './pages/DonorRegistration';
import AppointmentScheduling from './pages/AppointmentScheduling';
import BloodInventory from './pages/BloodInventory';
import EmergencyRequests from './pages/EmergencyRequests';
import DonationCenters from './pages/DonationCenters';
import EducationalResources from './pages/EducationalResources';
import UserProfile from './pages/UserProfile';
import DonationEvents from './pages/DonationEvents';
import StaffLayout from './components/StaffLayout';
import MemberLayout from './components/MemberLayout';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Staff Routes */}
          <Route path="/admin" element={<StaffLayout><BloodInventory /></StaffLayout>} />
          <Route path="/admin/emergency" element={<StaffLayout><EmergencyRequests /></StaffLayout>} />
          
          {/* Member Routes */}
          <Route path="/" element={<MemberLayout><DonationEvents /></MemberLayout>} />
          <Route path="/register" element={<MemberLayout><DonorRegistration /></MemberLayout>} />
          <Route path="/appointments" element={<MemberLayout><AppointmentScheduling /></MemberLayout>} />
          <Route path="/centers" element={<MemberLayout><DonationCenters /></MemberLayout>} />
          <Route path="/resources" element={<MemberLayout><EducationalResources /></MemberLayout>} />
          <Route path="/profile" element={<MemberLayout><UserProfile /></MemberLayout>} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;