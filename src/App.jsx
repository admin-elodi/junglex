import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
import Feed from '@/components/newsfeed/Feed';
import EmailVerification from '@/pages/EmailVerification';
import PrivateRoute from '@/routes/PrivateRoute';
import Dashboard from '@/pages/Dashboard';

<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>



const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/private-route" element={<PrivateRoute />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
