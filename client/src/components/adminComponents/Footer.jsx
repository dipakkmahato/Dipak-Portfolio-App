import React from 'react';
import { FiShield } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800/90 bg-slate-950/85 px-4 py-3.5 text-slate-400 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
            <FiShield className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="font-medium text-slate-300">Portfolio Admin</span>
          <span className="text-slate-300">•</span>
          <span className='text-slate-300'>Workspace Console</span>
        </div>

        <p className="text-slate-300">
          © {year} Portfolio Admin. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;