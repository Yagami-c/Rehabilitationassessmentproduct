import { useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { Home as HomeIcon, Activity, BookOpen, FileText, User, Bluetooth, X, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Toaster } from 'sonner';
import clsx from 'clsx';

const PAGE_TITLES: Record<string, string> = {
  '/': '首页',
  '/training': '训练计划',
  '/education': '健康宣教',
  '/report': '评估报告',
  '/profile': '个人中心',
};

export function AppLayout() {
  const { isLoggedIn } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDeviceOverlayOpen, setIsDeviceOverlayOpen] = useState(false);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { path: '/', icon: HomeIcon, label: '首页' },
    { path: '/training', icon: Activity, label: '训练' },
    { path: '/education', icon: BookOpen, label: '宣教' },
    { path: '/report', icon: FileText, label: '报告' },
    { path: '/profile', icon: User, label: '我的' },
  ];

  const currentTitle = PAGE_TITLES[location.pathname] || '康复助手';

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden text-gray-900 w-full max-w-md mx-auto relative shadow-2xl font-sans">
      <Toaster position="top-center" />
      {/* Global Top Navigation Bar */}
      <header className="bg-white px-5 pt-12 pb-3 shrink-0 z-20 relative">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{currentTitle}</h1>
          <button 
            onClick={() => setIsDeviceOverlayOpen(true)}
            className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 active:scale-95 transition-transform"
          >
            <Bluetooth size={20} />
          </button>
        </div>
        
        {/* Slogan */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50/50 border border-blue-100">
          <span className="text-[11px] font-medium text-blue-600 tracking-widest">科技推动寿而康</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-6 py-2 pb-safe shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-40">
        <div className="flex justify-between items-center h-14">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center w-14 gap-1 transition-all active:scale-95"
              >
                <div
                  className={clsx(
                    'p-1.5 rounded-xl transition-colors',
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-400'
                  )}
                >
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span
                  className={clsx(
                    'text-[10px] font-medium transition-colors',
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Device Connection Overlay */}
      {isDeviceOverlayOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDeviceOverlayOpen(false)}
          />
          <div className="bg-white rounded-t-3xl w-full p-6 relative animate-in slide-in-from-bottom-full duration-300 ease-out pb-safe">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">设备连接</h2>
              <button onClick={() => setIsDeviceOverlayOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl mb-6">
              <div className="flex items-center gap-3">
                <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center", bluetoothEnabled ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-400")}>
                  <Bluetooth size={20} />
                </div>
                <div>
                  <div className="font-medium text-[15px]">蓝牙</div>
                  <div className="text-xs text-gray-500">{bluetoothEnabled ? '已开启' : '已关闭'}</div>
                </div>
              </div>
              <div 
                className={clsx("w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200", bluetoothEnabled ? "bg-blue-600" : "bg-gray-300")}
                onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
              >
                <div className={clsx("w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200", bluetoothEnabled ? "translate-x-6" : "translate-x-0")} />
              </div>
            </div>

            {bluetoothEnabled && (
              <div className="space-y-4 mb-6">
                <div className="text-sm font-medium text-gray-500 px-1">附近设备</div>
                
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div>
                      <div className="font-bold text-[15px]">智能膝关节理疗仪 PAD</div>
                      <div className="text-xs text-gray-400 mt-0.5">信号: -45dBm</div>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-blue-50 text-blue-600 font-medium text-sm rounded-full active:scale-95">连接</button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    <div>
                      <div className="font-bold text-[15px] text-gray-700">Led 治疗仪</div>
                      <div className="text-xs text-gray-400 mt-0.5">信号: -78dBm</div>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-gray-50 text-gray-600 font-medium text-sm rounded-full active:scale-95">连接</button>
                </div>
              </div>
            )}

            <button 
              onClick={handleScan}
              disabled={!bluetoothEnabled || isScanning}
              className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-2xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={clsx(isScanning && "animate-spin")} />
              {isScanning ? '正在扫描...' : '重新扫描'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
