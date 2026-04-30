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
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-[430px] bg-white h-screen flex flex-col relative shadow-xl overflow-hidden">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>

        {/* Bottom Navigation */}
        {isLoggedIn && !isAuthPage && (
          <div className="flex-none h-16 bg-white border-t border-gray-200 flex items-center justify-around z-50 px-2 pb-2">
            <button 
              onClick={() => navigate('/home')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${location.pathname.startsWith('/home') ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <Home size={24} />
              <span className="text-[10px] mt-1">首页</span>
            </button>
            <button 
              onClick={() => navigate('/recommendations')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${location.pathname.startsWith('/recommendations') ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <ClipboardList size={24} />
              <span className="text-[10px] mt-1">计划</span>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${location.pathname.startsWith('/profile') ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <User size={24} />
              <span className="text-[10px] mt-1">我的</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
