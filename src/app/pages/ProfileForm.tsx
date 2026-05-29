import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';
import { ChevronRight, Settings, Bell, Coins, Bluetooth, RefreshCw, Activity, User, LogOut, Sun, Moon } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';

export function ProfileForm() {
  const { profile, logout, isDarkMode, toggleDarkMode, points } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial dark mode state
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (!isDarkMode) {
        toggleDarkMode();
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-[#121212]' : 'bg-[#F5F7FA]'} px-5 pt-8 space-y-6 overflow-y-auto pb-24 font-sans transition-colors duration-300`}>
      
      {/* User Card */}
      <div className={`${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'} rounded-3xl p-5 shadow-sm border flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#2C7CFF]/10 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm relative">
            {profile?.avatar ? (
              <ImageWithFallback src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={32} className="text-[#2C7CFF]" />
            )}
            <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className={`text-[18px] font-bold ${isDarkMode ? 'text-[#F5F5F5]' : 'text-[#1A1A1A]'}`}>{profile?.name || '朋友'}</h2>
            <div className={`text-[12px] ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'} mt-1 flex items-center gap-1.5`}>
              <span>会员 ID: 88472910</span>
            </div>
          </div>
        </div>
        <button className={`px-3 py-1.5 ${isDarkMode ? 'bg-[#2C2C2C] text-[#F5F5F5]' : 'bg-[#F5F7FA] text-[#6B7280]'} rounded-full text-[12px] font-medium active:scale-95 transition-all`}>
          编辑资料
        </button>
      </div>

      {/* Assets Card */}
      <div className={`flex justify-around ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'} rounded-[16px] p-4 shadow-sm border`}>
        <div className="flex flex-col items-center">
          <div className="text-[20px] font-bold text-[#2C7CFF] font-mono">{points}</div>
          <div className={`text-[12px] ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>可用积分</div>
        </div>
        <div className={`w-[1px] ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`}></div>
        <div className="flex flex-col items-center">
          <div className={`text-[20px] font-bold ${isDarkMode ? 'text-[#F5F5F5]' : 'text-[#1A1A1A]'} font-mono`}>12</div>
          <div className={`text-[12px] ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>训练天数</div>
        </div>
        <div className={`w-[1px] ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`}></div>
        <div className="flex flex-col items-center">
          <div className={`text-[20px] font-bold ${isDarkMode ? 'text-[#F5F5F5]' : 'text-[#1A1A1A]'} font-mono`}>5</div>
          <div className={`text-[12px] ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>评估报告</div>
        </div>
      </div>

      {/* Menu List */}
      <div className={`${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'} rounded-3xl p-2 shadow-sm border`}>
        
        <div className="flex items-center justify-between p-4 active:bg-gray-50/10 rounded-2xl transition-colors cursor-pointer" onClick={() => navigate('/device')}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2C7CFF]/10 flex items-center justify-center">
              <Bluetooth size={16} className="text-[#2C7CFF]" />
            </div>
            <span className={`text-[15px] font-medium ${isDarkMode ? 'text-[#F5F5F5]' : 'text-[#1A1A1A]'}`}>设备管理</span>
          </div>
          <ChevronRight size={18} className={isDarkMode ? 'text-[#9CA3AF]' : 'text-gray-400'} />
        </div>

        <div 
          onClick={() => navigate('/plan-settings')}
          className="flex items-center justify-between p-4 active:bg-gray-50/10 rounded-2xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
              <Activity size={16} className="text-purple-600" />
            </div>
            <span className={`text-[15px] font-medium ${isDarkMode ? 'text-[#F5F5F5]' : 'text-[#1A1A1A]'}`}>康养计划设置</span>
          </div>
          <ChevronRight size={18} className={isDarkMode ? 'text-[#9CA3AF]' : 'text-gray-400'} />
        </div>

        <div 
          onClick={() => navigate('/points')}
          className="flex items-center justify-between p-4 active:bg-gray-50/10 rounded-2xl transition-colors cursor-pointer relative"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center relative">
              <Coins size={16} className="text-[#FFD600]" />
            </div>
            <span className={`text-[15px] font-medium ${isDarkMode ? 'text-[#F5F5F5]' : 'text-[#1A1A1A]'}`}>积分中心</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-[#FFD600]">{points}</span>
            <ChevronRight size={18} className={isDarkMode ? 'text-[#9CA3AF]' : 'text-gray-400'} />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 active:bg-gray-50/10 rounded-2xl transition-colors cursor-pointer" onClick={toggleDarkMode}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center`}>
              {isDarkMode ? <Moon size={16} className="text-gray-300" /> : <Sun size={16} className="text-[#FF9100]" />}
            </div>
            <span className={`text-[15px] font-medium ${isDarkMode ? 'text-[#F5F5F5]' : 'text-[#1A1A1A]'}`}>外观设置</span>
          </div>
          <div className={`text-[13px] ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
            {isDarkMode ? '深色模式' : '浅色模式'}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 active:bg-gray-50/10 rounded-2xl transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Settings size={16} className="text-gray-600" />
            </div>
            <span className={`text-[15px] font-medium ${isDarkMode ? 'text-[#F5F5F5]' : 'text-[#1A1A1A]'}`}>设置与关于</span>
          </div>
          <ChevronRight size={18} className={isDarkMode ? 'text-[#9CA3AF]' : 'text-gray-400'} />
        </div>

      </div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className={`w-full flex items-center justify-center gap-2 py-4 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'} text-[#D50000] rounded-2xl shadow-sm border font-bold active:bg-red-50/10 transition-colors mt-auto`}
      >
        <LogOut size={18} /> 退出登录
      </button>

    </div>
  );
}