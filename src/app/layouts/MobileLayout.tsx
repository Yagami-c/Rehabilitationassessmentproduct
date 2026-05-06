import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Home, User, ClipboardList } from 'lucide-react';
import { useAppStore } from '../store';

export function MobileLayout() {
  const { isLoggedIn } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === '/';

  return (
    <div className="flex justify-center bg-[#F7F7F8] min-h-screen font-sans">
      <div className="w-full max-w-[430px] bg-[#F7F7F8] h-screen flex flex-col relative overflow-hidden">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-safe">
          <Outlet />
        </div>

        {/* Bottom Navigation (WeChat Mini Program Style) */}
        {isLoggedIn && !isAuthPage && (
          <div className="flex-none h-[83px] bg-[#FFFFFF] border-t border-[rgba(0,0,0,0.1)] flex items-start justify-around z-50 px-2 pt-2 pb-safe-bottom">
            <button 
              onClick={() => navigate('/home')}
              className={`flex flex-col items-center flex-1 transition-colors ${location.pathname.startsWith('/home') ? 'text-blue-600' : 'text-[#999999]'}`}
            >
              <Home size={26} strokeWidth={location.pathname.startsWith('/home') ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium">首页</span>
            </button>
            <button 
              onClick={() => navigate('/recommendations')}
              className={`flex flex-col items-center flex-1 transition-colors ${location.pathname.startsWith('/recommendations') ? 'text-blue-600' : 'text-[#999999]'}`}
            >
              <ClipboardList size={26} strokeWidth={location.pathname.startsWith('/recommendations') ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium">计划</span>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className={`flex flex-col items-center flex-1 transition-colors ${location.pathname.startsWith('/profile') ? 'text-blue-600' : 'text-[#999999]'}`}
            >
              <User size={26} strokeWidth={location.pathname.startsWith('/profile') ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium">我的</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
