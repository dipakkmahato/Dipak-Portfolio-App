import React from 'react';
import Navbar from '../../components/adminComponents/Navbar';
import Footer from '../../components/adminComponents/Footer';
import useFetchUserData from '../../../hooks/useFetchUserData';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AdminLoader from '../../../utils/AdminLoader';
import Sidebar from '../../components/adminComponents/Sidebar';

const Home = () => {
  useFetchUserData();
  const { userData, loading, token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  if (loading) {
    return <AdminLoader />;
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;