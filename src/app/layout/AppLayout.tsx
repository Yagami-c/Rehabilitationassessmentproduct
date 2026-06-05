import { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { Home as HomeIcon, Activity, BookOpen, User, Bluetooth, X, RefreshCw, Settings, Play, Pause, Power, RotateCcw, MessageCircle, Edit2, ChevronLeft, ChevronRight, Send, Share } from 'lucide-react';
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
  const { isLoggedIn, isDarkMode, isDeviceConnected, deviceStatus, setDeviceStatus, dailyRecords, needPeriodicAssessment, preAssessment } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isConnectionOverlayOpen, setIsConnectionOverlayOpen] = useState(false);
  const [isRemoteOverlayOpen, setIsRemoteOverlayOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  
  // Remote Control States
  const [deviceName, setDeviceName] = useState('智能膝关节康养仪 PAD');
  const [isEditingName, setIsEditingName] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const totalRounds = 10;
  const [deviceMode, setDeviceMode] = useState('L2 温和放松模式');
  const [showModeSelect, setShowModeSelect] = useState(false);
  
  // Chat States
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: string, text: string}[]>([]);

  useEffect(() => {
    if (chatMessages.length === 0) {
      const isNewUser = !preAssessment;
      if (isNewUser) {
        setChatMessages([{ role: 'ai', text: '你好！我是你的康养智能助手。我们将首先进行初始评估，确定你的膝盖状况，并推荐第一天的使用模式。' }]);
      } else if (needPeriodicAssessment()) {
        const days = dailyRecords.length;
        setChatMessages([{ role: 'ai', text: `你已经完成了 ${days} 天的使用。现在需要进行7天综合评估，请前往评估页面完成打卡。` }]);
      } else {
        const days = dailyRecords.length + 1;
        setChatMessages([{ role: 'ai', text: `欢迎回来！这是你的第 ${days} 天使用。我们将根据你昨天的反馈，智能调整今天的模式。有什么问题都可以随时问我！` }]);
      }
    }
  }, [preAssessment, needPeriodicAssessment, dailyRecords.length, chatMessages.length]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { path: '/', icon: HomeIcon, label: '首页' },
    { path: '/training', icon: Activity, label: '训练' },
    { path: '/education', icon: BookOpen, label: '宣教' },
    { path: '/profile', icon: User, label: '我的' },
  ];

  const currentTitle = PAGE_TITLES[location.pathname] || '康养助手';

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const handleEndDevice = () => {
    if (window.confirm('确定要提前结束本次康养吗？')) {
      setIsRemoteOverlayOpen(false);
      setDeviceStatus('sleep');
      navigate('/post-assessment');
    }
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: 'user', text: chatInput }]);
    const input = chatInput;
    setChatInput('');
    
    // Mock AI response
    setTimeout(() => {
      let responseText = `我收到你的问题了：“${input}”。`;
      if (needPeriodicAssessment()) {
        responseText += "目前你需要完成7天综合评估，建议你先前往评估页面完成打卡。";
      } else if (!preAssessment) {
        responseText += "看起来你还是新用户，请先完成初始评估。";
      } else {
        responseText += "根据你最近的下蹲评估记录，建议今天保持较轻柔的活动。";
      }

      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        text: responseText
      }]);
    }, 1000);
  };

  const handleShareSelect = (type: string) => {
    setIsShareModalOpen(false);
    navigate(`/share-edit?type=${type}`);
  };

  return (
    <div className={clsx("flex flex-col h-screen overflow-hidden w-full max-w-md mx-auto relative shadow-2xl font-sans transition-colors", isDarkMode ? "dark bg-[#121212] text-gray-100" : "bg-gray-50 text-gray-900")}>
      <Toaster position="top-center" theme={isDarkMode ? 'dark' : 'light'} />
      {/* Global Top Navigation Bar */}
      <header className="px-5 pt-12 pb-3 shrink-0 z-20 relative dark:bg-[#1E1E1E] bg-white transition-colors">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold dark:text-[#F5F5F5] text-gray-900 tracking-tight">{currentTitle}</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="relative w-10 h-10 rounded-full dark:bg-[#2C2C2C] bg-white flex items-center justify-center dark:text-[#F5F5F5] text-gray-700 active:scale-95 transition-transform border dark:border-[#3C3C3C] border-gray-100 shadow-sm"
            >
              <Share size={18} />
            </button>
            <button 
              onClick={() => navigate('/device')}
              className="relative w-10 h-10 rounded-full dark:bg-[#2C7CFF]/10 bg-blue-50 flex items-center justify-center text-[#2C7CFF] active:scale-95 transition-transform"
            >
              <Settings size={20} />
              <div className={clsx("absolute top-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full", isDeviceConnected ? "bg-[#00C853]" : "bg-gray-400")}></div>
            </button>
          </div>
        </div>
        
        {/* Slogan */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50/50 border border-blue-100">
          <span className="text-[11px] font-medium text-blue-600 tracking-widest">科技推动寿而康</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        <Outlet />
      </main>

      {/* AI Customer Service FAB */}
      {!isChatOpen && (
        <button 
          className="absolute bottom-20 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 border border-gray-100 z-30 animate-pulse hover:scale-105 transition-transform"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* AI Chatbot Half-Screen Overlay */}
      {isChatOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsChatOpen(false)}
          />
          <div className="bg-[#F5F7FA] rounded-t-[24px] w-full relative animate-in slide-in-from-bottom-full duration-300 ease-out h-[60%] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between items-center px-6 py-4 bg-white rounded-t-[24px] shrink-0 shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <MessageCircle className="text-[#2C7CFF]" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A1A] text-[16px]">康养智能助手</h3>
                  <p className="text-[11px] text-[#00C853] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]"></span> 在线
                  </p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500 active:scale-95">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl p-3 text-[14px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#2C7CFF] text-white rounded-tr-sm' 
                      : 'bg-white text-[#1A1A1A] rounded-tl-sm border border-gray-100'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-gray-100 pb-safe shrink-0">
              <div className="flex items-center gap-2 bg-[#F5F7FA] rounded-full p-1 pl-4 border border-gray-200 focus-within:border-[#2C7CFF] focus-within:bg-white transition-colors">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="询问训练建议或操作..."
                  className="flex-1 bg-transparent text-[14px] h-10 outline-none text-[#1A1A1A] placeholder-[#9CA3AF]"
                />
                <button 
                  onClick={handleSendChat}
                  disabled={!chatInput.trim()}
                  className="w-10 h-10 rounded-full bg-[#2C7CFF] disabled:bg-[#9CA3AF] text-white flex items-center justify-center active:scale-95 transition-all"
                >
                  <Send size={18} className="-ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Tab Bar */}
      <nav className="absolute bottom-0 w-full dark:bg-[#1E1E1E] dark:border-[#2C2C2C] bg-white border-t border-gray-100 px-2 py-2 pb-safe shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-40 transition-colors">
        <div className="flex justify-between items-end h-14 relative">
          {navItems.slice(0, 2).map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex-1 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 pb-1"
              >
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[#2C7CFF]' : 'text-[#9CA3AF]'} />
                <span className={clsx('text-[11px] font-medium transition-colors', isActive ? 'text-[#2C7CFF]' : 'text-[#9CA3AF]')}>
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Center Device Icon */}
          <div className="flex-1 flex justify-center pb-2 z-50">
            <div className="relative -mt-6">
              {/* Dynamic Halo depending on states */}
              <div className={clsx(
                "absolute inset-0 rounded-full animate-ping opacity-20",
                !isDeviceConnected ? "bg-gray-400" :
                deviceStatus === 'running' ? "bg-[#2C7CFF]" :
                deviceStatus === 'paused' ? "bg-[#FFD600]" :
                deviceStatus === 'sleep' ? "bg-gray-400" :
                "bg-[#00C853]" // idle/connected
              )} style={{ animationDuration: '3s' }}></div>
              
              <button
                onClick={() => {
                  if (isDeviceConnected) {
                    if (deviceStatus === 'sleep') setDeviceStatus('idle');
                    setIsRemoteOverlayOpen(true);
                  } else {
                    navigate('/device');
                  }
                }}
                className={clsx(
                  "relative w-[56px] h-[56px] rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-all overflow-hidden",
                  !isDeviceConnected ? "bg-gray-300 text-white" :
                  deviceStatus === 'sleep' ? "bg-[#2C7CFF]/50 text-white/50 backdrop-blur-sm" :
                  "bg-[#2C7CFF] text-white"
                )}
              >
                <Settings 
                  size={28} 
                  className={clsx(
                    "transition-transform",
                    isDeviceConnected && deviceStatus === 'running' && "animate-[spin_3s_linear_infinite]"
                  )} 
                />
                
                {/* Overlay for Pause state */}
                {isDeviceConnected && deviceStatus === 'paused' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#2C7CFF]/40 rounded-full">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-4 bg-white rounded-full"></div>
                      <div className="w-1.5 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </button>
              
              {/* Overlay for Sleep state label */}
              {isDeviceConnected && deviceStatus === 'sleep' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-500 text-white text-[9px] px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                  休眠
                </div>
              )}
            </div>
          </div>

          {navItems.slice(2, 4).map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex-1 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 pb-1"
              >
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[#2C7CFF]' : 'text-[#9CA3AF]'} />
                <span className={clsx('text-[11px] font-medium transition-colors', isActive ? 'text-[#2C7CFF]' : 'text-[#9CA3AF]')}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Device Connection Overlay */}
      {isConnectionOverlayOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsConnectionOverlayOpen(false)}
          />
          <div className="bg-white rounded-t-3xl w-full p-6 relative animate-in slide-in-from-bottom-full duration-300 ease-out pb-safe">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">设备连接</h2>
              <button onClick={() => setIsConnectionOverlayOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500">
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
                      <div className="font-bold text-[15px]">智能膝关节康养仪 PAD</div>
                      <div className="text-xs text-gray-400 mt-0.5">信号: -45dBm</div>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-blue-50 text-blue-600 font-medium text-sm rounded-full active:scale-95">连接</button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    <div>
                      <div className="font-bold text-[15px] text-gray-700">Led 康养仪</div>
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

      {/* Device Remote Overlay */}
      {isRemoteOverlayOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsRemoteOverlayOpen(false)}
          />
          <div className="dark:bg-[#121212] bg-[#F5F7FA] rounded-t-[24px] w-full p-6 relative animate-in slide-in-from-bottom-full duration-300 ease-out pb-safe h-auto max-h-[85%] flex flex-col shadow-2xl transition-colors">
            {/* Header: Name and status */}
            <div className="flex justify-between items-start mb-6 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  {isEditingName ? (
                    <input 
                      autoFocus
                      type="text"
                      value={deviceName}
                      onChange={(e) => setDeviceName(e.target.value)}
                      onBlur={() => setIsEditingName(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                      className="text-[20px] font-bold dark:text-[#F5F5F5] text-[#1A1A1A] dark:bg-[#1E1E1E] bg-white border border-[#2C7CFF] rounded px-2 py-0.5 outline-none w-[200px]"
                    />
                  ) : (
                    <>
                      <h2 className="text-[20px] font-bold dark:text-[#F5F5F5] text-[#1A1A1A]">{deviceName}</h2>
                      <button onClick={() => setIsEditingName(true)} className="text-[#9CA3AF] active:text-[#2C7CFF]">
                        <Edit2 size={16} />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={clsx(
                    "px-2 py-0.5 rounded text-[11px] font-medium border transition-colors",
                    deviceStatus === 'running' ? "dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30 bg-green-50 text-[#00C853] border-green-100" :
                    deviceStatus === 'paused' ? "dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/30 bg-orange-50 text-[#FF9100] border-orange-100" :
                    "dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 bg-gray-100 text-[#6B7280] border-gray-200"
                  )}>
                    {deviceStatus === 'running' ? '运行中' : deviceStatus === 'paused' ? '已暂停' : '休眠中'}
                  </span>
                </div>
              </div>
              <button onClick={() => navigate('/device')} className="p-2 dark:bg-[#1E1E1E] bg-white shadow-sm rounded-full text-[#6B7280] active:scale-95 border dark:border-[#2C2C2C] border-gray-100 transition-colors">
                <Settings size={20} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-1">
              
              {/* Mode and Round Counters */}
              <div className="dark:bg-[#1E1E1E] bg-white rounded-[16px] p-4 shadow-sm border dark:border-[#2C2C2C] border-gray-50 flex flex-col gap-4 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-[14px] dark:text-[#9CA3AF] text-[#6B7280] font-medium">当前模式</div>
                  <button 
                    onClick={() => setShowModeSelect(true)}
                    className="flex items-center gap-1 text-[15px] font-bold dark:text-[#F5F5F5] text-[#1A1A1A] active:opacity-70 dark:bg-gray-800 bg-gray-50 px-3 py-1.5 rounded-lg border dark:border-gray-700 border-transparent transition-colors"
                  >
                    <span className="text-[#2C7CFF] mr-0.5">{deviceMode.split(' ')[0]}</span> {deviceMode.split(' ').slice(1).join(' ')} <ChevronRight size={16} className="text-[#9CA3AF]" />
                  </button>
                </div>
                
                {/* Parameters Box */}
                <div className="dark:bg-[#2C7CFF]/10 bg-blue-50/50 p-3.5 rounded-xl border dark:border-[#2C7CFF]/20 border-blue-100/50 transition-colors">
                  <p className="text-[13px] dark:text-blue-300 text-blue-800 leading-relaxed font-medium">
                    你的膝关节存在一定程度的紧张，建议从中等偏低强度开始。
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t dark:border-blue-900/30 border-blue-100/50">
                    <div>
                      <div className="text-[11px] dark:text-blue-400 text-blue-500 mb-0.5">负压强度</div>
                      <div className="text-[14px] font-bold dark:text-blue-100 text-blue-900">125 <span className="text-[10px] font-normal opacity-80">mmHg</span></div>
                    </div>
                    <div>
                      <div className="text-[11px] dark:text-blue-400 text-blue-500 mb-0.5">作用时间</div>
                      <div className="text-[14px] font-bold dark:text-blue-100 text-blue-900">15 <span className="text-[10px] font-normal opacity-80">秒</span></div>
                    </div>
                    <div>
                      <div className="text-[11px] dark:text-blue-400 text-blue-500 mb-0.5">休息间隔</div>
                      <div className="text-[14px] font-bold dark:text-blue-100 text-blue-900">10 <span className="text-[10px] font-normal opacity-80">秒</span></div>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full dark:bg-[#2C2C2C] bg-gray-100"></div>

                <div className="flex items-center justify-between">
                  <div className="text-[14px] dark:text-[#9CA3AF] text-[#6B7280] font-medium">循环轮数</div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setCurrentRound(Math.max(1, currentRound - 1))}
                      className="w-8 h-8 rounded-full dark:bg-gray-800 bg-gray-50 flex items-center justify-center dark:text-[#F5F5F5] text-[#1A1A1A] active:bg-gray-200 transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <div className="text-[18px] font-bold font-mono tracking-widest dark:text-[#F5F5F5] text-[#1A1A1A]">
                      {currentRound} <span className="text-[#9CA3AF] text-[14px]">/ {totalRounds}</span>
                    </div>
                    <button 
                      onClick={() => setCurrentRound(Math.min(totalRounds, currentRound + 1))}
                      className="w-8 h-8 rounded-full dark:bg-gray-800 bg-gray-50 flex items-center justify-center dark:text-[#F5F5F5] text-[#1A1A1A] active:bg-gray-200 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center mt-6 px-4 shrink-0 pb-2">
                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={() => setDeviceStatus('running')}
                    className="w-12 h-12 rounded-full dark:bg-[#1E1E1E] bg-white shadow-sm border dark:border-[#2C2C2C] border-gray-100 flex items-center justify-center dark:text-[#F5F5F5] text-[#1A1A1A] active:scale-95 transition-transform"
                  >
                    <RotateCcw size={20} />
                  </button>
                  <span className="text-[11px] font-medium dark:text-[#9CA3AF] text-[#6B7280]">重置</span>
                </div>

                <div className="relative flex flex-col items-center gap-2">
                  {/* Circular Progress surrounding Play/Pause */}
                  <div className={clsx(
                    "absolute -inset-3 rounded-full -z-10 transition-all duration-500",
                    deviceStatus === 'running' 
                      ? "bg-[conic-gradient(from_0deg,#2C7CFF_30%,transparent_30%)] animate-[spin_10s_linear_infinite] dark:opacity-50 opacity-100" 
                      : deviceStatus === 'paused'
                      ? "bg-[#FF9100]/20 animate-pulse scale-105"
                      : "bg-gray-200 dark:bg-[#2C2C2C] scale-95 opacity-50"
                  )} />
                  <div className="absolute -inset-2 dark:bg-[#121212] bg-white rounded-full -z-10" />
                  
                  <button 
                    onClick={() => setDeviceStatus(deviceStatus === 'running' ? 'paused' : 'running')}
                    className={clsx(
                      "w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-all duration-300",
                      deviceStatus === 'running' 
                        ? "bg-[#2C7CFF] shadow-blue-500/30" 
                        : deviceStatus === 'paused'
                        ? "bg-[#FF9100] shadow-orange-500/30"
                        : "bg-gray-400 dark:bg-gray-600 shadow-none"
                    )}
                  >
                    {deviceStatus === 'running' ? <Pause size={32} className="fill-current" /> : <Play size={32} className="fill-current ml-1" />}
                  </button>
                  <span className={clsx(
                    "text-[13px] font-bold font-mono tracking-wider mt-1 transition-colors",
                    deviceStatus === 'running' ? "text-[#2C7CFF]" : deviceStatus === 'paused' ? "text-[#FF9100]" : "text-gray-400"
                  )}>
                    02:00 <span className="text-[#9CA3AF] text-[11px] font-normal">/ 10:00</span>
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={handleEndDevice}
                    className="w-12 h-12 rounded-full dark:bg-[#D50000]/10 bg-[#FFF0F0] border dark:border-[#D50000]/30 border-[#FFCDD2] flex items-center justify-center dark:text-[#FF8A80] text-[#D50000] active:scale-95 transition-transform"
                  >
                    <Power size={20} />
                  </button>
                  <span className="text-[11px] font-medium dark:text-[#FF8A80] text-[#D50000]">结束</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode Selection Modal */}
      {showModeSelect && (
        <div className="absolute inset-0 z-[60] flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="absolute inset-0"
            onClick={() => setShowModeSelect(false)}
          />
          <div className="dark:bg-[#1E1E1E] bg-white rounded-t-[32px] w-full flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.12)] animate-in slide-in-from-bottom-full duration-300 relative z-10">
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-[#3C3C3C] rounded-full mx-auto my-3" />
            <div className="px-6 py-4 flex justify-between items-center border-b dark:border-[#2C2C2C] border-gray-100">
              <h2 className="text-[18px] font-bold dark:text-[#F5F5F5] text-[#1A1A1A]">选择康养模式</h2>
              <button 
                onClick={() => setShowModeSelect(false)}
                className="w-8 h-8 rounded-full dark:bg-[#2C2C2C] bg-gray-100 flex items-center justify-center dark:text-[#F5F5F5] text-gray-500 active:scale-95 transition-transform"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              {[
                { id: 'L1 轻柔唤醒模式', level: 'L1', name: '轻柔唤醒模式', desc: '适合初次使用或疼痛明显时，低负压温和作用。' },
                { id: 'L2 温和放松模式', level: 'L2', name: '温和放松模式', desc: '日常放松推荐，中低负压缓解关节紧张。' },
                { id: 'L3 深度松动模式', level: 'L3', name: '深度松动模式', desc: '针对较重僵硬，中高强度拉伸关节囊。' },
                { id: 'L4 强效牵引模式', level: 'L4', name: '强效牵引模式', desc: '适应度较高后使用，高负压强力松动。' },
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setDeviceMode(mode.id);
                    setShowModeSelect(false);
                  }}
                  className={clsx(
                    "w-full flex items-center justify-between p-4 rounded-xl border text-left active:scale-[0.98] transition-all",
                    deviceMode === mode.id 
                      ? "border-[#2C7CFF] bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-500/50" 
                      : "border-gray-100 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  )}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={clsx(
                        "text-[14px] font-bold",
                        deviceMode === mode.id ? "text-[#2C7CFF]" : "text-gray-900 dark:text-white"
                      )}>{mode.level}</span>
                      <span className={clsx(
                        "text-[16px] font-bold",
                        deviceMode === mode.id ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-white"
                      )}>{mode.name}</span>
                    </div>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400">{mode.desc}</p>
                  </div>
                  {deviceMode === mode.id && (
                    <div className="w-6 h-6 rounded-full bg-[#2C7CFF] text-white flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="dark:bg-[#1E1E1E] bg-white rounded-t-[32px] w-full flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.12)] max-h-[80vh] animate-in slide-in-from-bottom-full duration-300">
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-[#3C3C3C] rounded-full mx-auto my-3" />
            <div className="px-6 py-4 flex justify-between items-center border-b dark:border-[#2C2C2C] border-gray-100">
              <h2 className="text-[18px] font-bold dark:text-[#F5F5F5] text-[#1A1A1A]">选择分享模板</h2>
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="w-8 h-8 rounded-full dark:bg-[#2C2C2C] bg-gray-100 flex items-center justify-center dark:text-[#F5F5F5] text-gray-500 active:scale-95 transition-transform"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div 
                onClick={() => handleShareSelect('summary')}
                className="relative overflow-hidden rounded-2xl border dark:border-[#2C2C2C] border-gray-200 p-4 flex gap-4 items-center cursor-pointer active:scale-[0.98] transition-all bg-gradient-to-r from-blue-50/50 to-transparent dark:from-[#2C7CFF]/10 dark:to-transparent"
              >
                <div className="w-16 h-20 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                  <Activity size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] font-bold dark:text-[#F5F5F5] text-gray-900 mb-1">诊断摘要卡</h3>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400">分享专业评估结果与康养建议</p>
                </div>
              </div>

              <div 
                onClick={() => handleShareSelect('progress')}
                className="relative overflow-hidden rounded-2xl border dark:border-[#2C2C2C] border-gray-200 p-4 flex gap-4 items-center cursor-pointer active:scale-[0.98] transition-all bg-gradient-to-r from-green-50/50 to-transparent dark:from-[#00C853]/10 dark:to-transparent"
              >
                <div className="w-16 h-20 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500">
                  <RotateCcw size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] font-bold dark:text-[#F5F5F5] text-gray-900 mb-1">康养进展图</h3>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400">展示坚持训练的成果轨迹</p>
                </div>
              </div>

              <div 
                onClick={() => handleShareSelect('badge')}
                className="relative overflow-hidden rounded-2xl border dark:border-[#2C2C2C] border-gray-200 p-4 flex gap-4 items-center cursor-pointer active:scale-[0.98] transition-all bg-gradient-to-r from-orange-50/50 to-transparent dark:from-[#FF9100]/10 dark:to-transparent"
              >
                <div className="w-16 h-20 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500">
                  <Activity size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] font-bold dark:text-[#F5F5F5] text-gray-900 mb-1">训练勋章</h3>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400">达成里程碑成就并打卡</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
