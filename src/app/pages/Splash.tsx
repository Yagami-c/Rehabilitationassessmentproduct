import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Splash() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [showLoading, setShowLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check dark mode preference
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Show loading text if it takes more than 5 seconds (simulated here at 4s for UX)
    const loadingTimer = setTimeout(() => {
      setShowLoading(true);
    }, 4000);

    const finishTimer = setTimeout(() => {
      setIsLoading(false);
      // Determine destination
      if (user) {
        navigate('/');
      } else {
        navigate('/login');
      }
    }, 2500); // 2.5s for normal animation flow

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(finishTimer);
    };
  }, [navigate, user]);

  const skipLoading = () => {
    navigate('/login');
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={isDark ? {
            backgroundColor: '#121212',
            backgroundImage: `radial-gradient(rgba(123, 97, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          } : {
            backgroundColor: '#F2F9F2',
            backgroundImage: `radial-gradient(#C8E6C9 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        >
          <div className="relative flex flex-col items-center justify-center flex-1">
            {/* Logo Graphic */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              {/* Ring */}
              <motion.div
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-[4px] border-transparent border-t-[#7B61FF] border-r-[#7B61FF] border-b-[#7B61FF]"
                style={{ borderRadius: '50%' }}
              />
              
              {/* Neural Nodes / Points on ring */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5] }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute w-3 h-3 bg-[#7B61FF] rounded-full shadow-[0_0_10px_#7B61FF] -left-1 top-1/2 transform -translate-y-1/2"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5] }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute w-2 h-2 bg-[#7B61FF] rounded-full shadow-[0_0_10px_#7B61FF] right-2 bottom-4"
              />

              {/* Squat Silhouette - using a path to represent a human figure */}
              <motion.svg
                viewBox="0 0 100 100"
                className={`w-20 h-20 drop-shadow-lg ${isDark ? 'text-white' : 'text-[#2C7CFF]'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Head */}
                <circle cx="50" cy="20" r="8" fill="currentColor" />
                {/* Body and Squatting Animation via path morphing */}
                <motion.path
                  initial={{ d: "M50,28 L50,55 L50,85 L50,95 M50,55 L70,85" }} // Standing
                  animate={{ d: "M55,30 L45,60 L60,85 L55,95 M45,60 L75,70" }} // Squatting
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                />
                <motion.path
                  initial={{ d: "M50,35 L30,50" }} // Arms standing
                  animate={{ d: "M50,38 L75,45" }} // Arms squatting
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                />
              </motion.svg>
            </div>

            {/* Text & Slogan */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="text-center"
            >
              <h1 className={`text-3xl font-bold tracking-wider mb-2 ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>光年动评</h1>
              <p className="text-[#7B61FF] font-medium tracking-widest text-sm">AI精准康养，守护每一步</p>
            </motion.div>
          </div>

          {/* Bottom Info / Loading */}
          <div className="absolute bottom-12 w-full flex flex-col items-center justify-center space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.3 }}
              className={`flex items-center gap-1.5 text-xs text-[#00C853] ${isDark ? 'bg-white/10' : 'bg-white/60'} backdrop-blur-sm px-3 py-1.5 rounded-full`}
            >
              <CheckCircle2 size={14} />
              <span>已连接光年·环膝</span>
            </motion.div>

            {showLoading && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={skipLoading}
                className="text-xs text-gray-500 underline underline-offset-2"
              >
                努力加载中...跳过
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}