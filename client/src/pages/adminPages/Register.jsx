import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/slices/userSlice';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
} from 'react-icons/fi';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  if (token) {
    return <Navigate to="/admin" />;
  }

  const registerUserHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (response?.data?.success) {
        const authToken = response?.data?.token;
        dispatch(setToken(authToken));
        localStorage.setItem('token', authToken);
        toast.success(response?.data?.message || 'User registered successfully');
        navigate('/admin');
      } else {
        toast.error(response?.data?.message || 'Registration failed');
      }
    } catch (error) {
      console.error('error in Register User:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      {/* Subtle Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-3xl"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-600 text-white shadow-lg shadow-indigo-600/25">
            <FiShield className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Create an account
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Enter your details to access the Portfolio Admin Panel.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={registerUserHandler} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="register-name"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Full Name
            </label>
            <div className="relative">
              <FiUser
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
              <input
                id="register-name"
                type="text"
                required
                autoComplete="name"
                placeholder="Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 py-2.5 pr-3.5 pl-10 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="register-email"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Email Address
            </label>
            <div className="relative">
              <FiMail
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
              <input
                id="register-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 py-2.5 pr-3.5 pl-10 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="register-password"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <div className="relative">
              <FiLock
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 py-2.5 pr-10 pl-10 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 focus:ring-2 focus:ring-indigo-500/40 focus:outline-none"
              >
                {showPassword ? (
                  <FiEyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <FiEye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/25 transition-all duration-150 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>{loading ? 'Creating account...' : 'Register Now'}</span>
            {!loading && <FiArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link
            to="/admin/login"
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;