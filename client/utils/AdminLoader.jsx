import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiShield, FiCpu } from 'react-icons/fi';

const statusMessages = [
  'Syncing workspace state...',
  'Verifying admin permissions...',
  'Preparing dashboard modules...',
];

const AdminLoader = ({ isVisible = true, label = 'Loading Admin Panel' }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [boost, setBoost] = useState(false);

  // Lock body scroll while loader is visible and restore cleanly on cleanup
  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    // Prevent layout shift when scrollbar disappears
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isVisible]);

  // Cycle subtle status text for live feedback
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % statusMessages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Brief interactive pulse when user clicks the loader center
  const handleInteractivePulse = () => {
    setBoost(true);
    setTimeout(() => setBoost(false), 450);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
          className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-slate-950/90 px-4 text-white backdrop-blur-md select-none"
        >
          {/* Ambient Indigo Glow */}
          <motion.div
            aria-hidden="true"
            animate={{
              scale: boost ? [1, 1.35, 1] : [1, 1.15, 1],
              opacity: boost ? [0.45, 0.75, 0.45] : [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: boost ? 0.45 : 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl"
          />

          {/* Interactive Core */}
          <motion.button
            type="button"
            onClick={handleInteractivePulse}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            animate={{
              scale: boost ? 1.12 : 1,
            }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            className="group relative mb-6 flex h-24 w-24 cursor-pointer items-center justify-center rounded-2xl border border-indigo-400/30 bg-slate-900/90 shadow-2xl shadow-indigo-950/80 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            title="Click to pulse sync"
          >
            {/* Rotating Orbital Ring */}
            <motion.span
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{
                duration: boost ? 0.6 : 2.2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-1 rounded-xl border-2 border-transparent border-t-indigo-400 border-r-indigo-500/50"
            />

            {/* Counter-Rotating Inner Ring */}
            <motion.span
              aria-hidden="true"
              animate={{ rotate: -360 }}
              transition={{
                duration: boost ? 0.9 : 3.6,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-3 rounded-lg border border-dashed border-slate-600/80"
            />

            {/* Center Brand Icon */}
            <FiShield
              className="relative z-10 h-8 w-8 text-indigo-400 transition-colors group-hover:text-indigo-300"
              aria-hidden="true"
            />
          </motion.button>

          {/* Title & Interactive Hint */}
          <div className="relative z-10 text-center">
            <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5 text-xs font-medium text-indigo-300">
              <FiCpu className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{label}</span>
            </div>

            <div className="h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={statusMessages[stepIndex]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="text-sm font-medium text-slate-300"
                >
                  {statusMessages[stepIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Animated Progress Bar */}
            <div className="mx-auto mt-5 h-1.5 w-56 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: boost ? 0.65 : 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-500"
              />
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              Tap the badge to trigger an interactive pulse
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminLoader;