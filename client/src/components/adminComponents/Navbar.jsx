import React from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/slices/userSlice';
import { FiLayers, FiLogOut, FiShield } from 'react-icons/fi';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setToken(null));
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-slate-800/90 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Admin Badge */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-600 text-white shadow-lg shadow-indigo-600/25">
            <FiLayers className="h-5 w-5" aria-hidden="true" />
          </div>

          <div className="flex items-center gap-2.5">
            <h1 className="text-base font-semibold tracking-tight text-white sm:text-lg">
              Portfolio
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
              <FiShield className="h-3 w-3" aria-hidden="true" />
              Admin Panel
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLogout}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm font-medium text-slate-300 shadow-sm transition-all duration-150 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400 focus:ring-2 focus:ring-rose-500/40 focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none active:scale-[0.98]"
          >
            <FiLogOut
              className="h-4 w-4 text-slate-400 transition-colors duration-150 group-hover:text-rose-400"
              aria-hidden="true"
            />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;