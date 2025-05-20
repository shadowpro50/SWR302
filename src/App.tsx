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
import Layout from './components/Layout';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<DonorRegistration />} />
            <Route path="/appointments" element={<AppointmentScheduling />} />
            <Route path="/inventory" element={<BloodInventory />} />
            <Route path="/emergency" element={<EmergencyRequests />} />
            <Route path="/centers" element={<DonationCenters />} />
            <Route path="/resources" element={<EducationalResources />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;