
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Notification from './pages/Notification.jsx';
import Call from './pages/Call.jsx';
import Chat from './pages/Chat.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Register from './pages/Register.jsx';

import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './lib/axios.js';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await axiosInstance.get('/auth/me');
      return res.data;
    },
    retry: false,
  });

  const authUser = data?.user;

  if (isLoading) {
    return <p className="p-4 text-center">Loading user...</p>;
  }

  if (isError) {
    console.warn("User not logged in.");
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/notification" element={authUser ? <Notification /> : <Navigate to="/login" />} />
        <Route path="/call" element={authUser ? <Call /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={authUser ? <Onboarding /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
