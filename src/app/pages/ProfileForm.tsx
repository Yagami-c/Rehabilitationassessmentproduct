import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';
import { ChevronRight, Settings, Bell, Bluetooth, RefreshCw, Activity, User, LogOut } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ProfileForm() {
  const { profile, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 px-5 pt-8 space-y-6">
      
      {/* User Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            {profile?.avatar ? (
              <ImageWithFallback src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={32} className="text-blue-500" />
            )}
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-gray-900">{profile?.name || '朋友'}</h2>
            <div className="text-[12px] text-gray-500 mt-1 flex items-center gap-1.5">
              <span>会员 ID: 88472910</span>
            </div>
          </div>
        </div>
        <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full text-[12px] font-medium active:scale-95 transition-all">
          编辑资料
        </button>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
        
        <div className="flex items-center justify-between p-4 active:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
              <RefreshCw size={16} className="text-green-600" />
            </div>
            <span className="text-[15px] font-medium text-gray-900">健康数据同步</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>

        <div className="flex items-center justify-between p-4 active:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <Bluetooth size={16} className="text-blue-600" />
            </div>
            <span className="text-[15px] font-medium text-gray-900">设备管理</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>

        <div 
          onClick={() => navigate('/plan-settings')}
          className="flex items-center justify-between p-4 active:bg-gray-50 rounded-2xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
              <Activity size={16} className="text-purple-600" />
            </div>
            <span className="text-[15px] font-medium text-gray-900">康复计划设置</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>

        <div className="flex items-center justify-between p-4 active:bg-gray-50 rounded-2xl transition-colors cursor-pointer relative">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center relative">
              <Bell size={16} className="text-orange-600" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-[15px] font-medium text-gray-900">消息中心</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>

        <div className="flex items-center justify-between p-4 active:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Settings size={16} className="text-gray-600" />
            </div>
            <span className="text-[15px] font-medium text-gray-900">设置</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>

      </div>

      <div className="flex-1"></div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-4 bg-white text-red-500 rounded-2xl shadow-sm border border-gray-100 font-bold active:bg-gray-50 transition-colors"
      >
        <LogOut size={18} /> 退出登录
      </button>

    </div>
  );
}