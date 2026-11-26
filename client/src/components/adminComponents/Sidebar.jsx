import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  FiGrid,
  FiUser,
  FiBriefcase,
  FiFolderPlus,
  FiCode,
  FiAward,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
} from 'react-icons/fi';

const navItems = [
  {
    label: 'Dashboard',
    to: '/admin',
    end: true,
    icon: FiGrid,
  },
  {
    label: 'Profile',
    to: '/admin/profile',
    end: false,
    icon: FiUser,
  },
  {
    label: 'Experience',
    to: '/admin/experience',
    end: false,
    icon: FiBriefcase,
  },
  {
    label: 'Project',
    to: '/admin/projects',
    end: false,
    icon: FiFolderPlus,
  },
  {
    label: 'Skills',
    to: '/admin/skills',
    end: false,
    icon: FiCode,
  },
  {
    label: 'Certifications',
    to: '/admin/certifications',
    end: false,
    icon: FiAward,
  },
];

const Sidebar = () => {
  // Desktop collapsible state (expanded vs icon rail)
  const [collapsed, setCollapsed] = useState(false);
  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkBaseClass =
    'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/50';

  const getLinkClass = ({ isActive }) =>
    isActive
      ? `${linkBaseClass} bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-950/50`
      : `${linkBaseClass} text-slate-400 hover:bg-slate-800/70 hover:text-slate-100 border border-transparent`;

  return (
    <>
      {/* Mobile Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-indigo-400/25 bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-transform active:scale-95 md:hidden"
      >
        <FiMenu className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Mobile Drawer + Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="relative z-10 flex h-full w-72 max-w-[82vw] flex-col border-r border-slate-800/90 bg-slate-900/95 px-3 py-4 text-slate-100 shadow-2xl"
            >
              {/* Mobile Sidebar Header */}
              <div className="mb-4 flex items-center justify-between px-2">
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Workspace Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  <FiX className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile NavLinks */}
              <nav aria-label="Mobile Sidebar Navigation" className="flex-1 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileOpen(false)}
                      className={getLinkClass}
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            className={`h-4 w-4 shrink-0 transition-colors ${
                              isActive
                                ? 'text-indigo-400'
                                : 'text-slate-400 group-hover:text-slate-200'
                            }`}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Collapsible Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 256 }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        className="sticky top-16 z-20 hidden h-[calc(100vh-4rem)] shrink-0 flex-col border-r border-slate-800/90 bg-slate-900/75 py-4 text-slate-100 backdrop-blur-md md:flex"
      >
        {/* Top Collapse Toggle */}
        <div
          className={`mb-4 flex items-center px-3 ${
            collapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="truncate px-1 text-xs font-semibold tracking-wider text-slate-400 uppercase"
              >
                Navigation
              </motion.span>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-800 bg-slate-950/70 text-slate-400 transition-colors hover:border-slate-700 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          >
            {collapsed ? (
              <FiChevronRight className="h-4 w-4" aria-hidden="true" />
            ) : (
              <FiChevronLeft className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop NavLinks */}
        <nav aria-label="Sidebar Navigation" className="flex-1 space-y-1.5 overflow-y-auto px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `${getLinkClass({ isActive })} ${
                    collapsed ? 'justify-center px-0' : ''
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-indigo-400'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                      aria-hidden="true"
                    />

                    <AnimatePresence initial={false}>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.16 }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Status Pill */}
        <div className="mt-4 border-t border-slate-800/80 px-3 pt-3">
          <div
            className={`flex items-center rounded-xl border border-slate-800/80 bg-slate-950/60 py-2 text-xs text-slate-400 ${
              collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'
            }`}
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            {!collapsed && <span className="truncate">Admin Session Active</span>}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;