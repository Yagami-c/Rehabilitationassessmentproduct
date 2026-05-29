import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Bluetooth, Battery, CheckCircle2, RefreshCw, Activity, AlertCircle, PlayCircle, SmartphoneNfc, Zap, Download, Trash2, Edit2, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useStore } from '../store/useStore';
import { toast } from 'sonner';

export function Device() {
  const navigate = useNavigate();
  const { isDeviceConnected, connectedDeviceName, connectDevice, disconnectDevice } = useStore();

  const [currentView, setCurrentView] = useState<'management' | 'scanning' | 'details'>(
    isDeviceConnected ? 'details' : 'management'
  );

  const [isScanning, setIsScanning] = useState(false);
  const [scannedDevices, setScannedDevices] = useState<{ id: string, name: string, signal: number, battery: number }[]>([]);

  const [deviceName, setDeviceName] = useState(connectedDeviceName || '智能膝关节康养仪 PAD');
  const [isEditingName, setIsEditingName] = useState(false);
  const [hasNewVersion] = useState(true);
  const [otaStatus, setOtaStatus] = useState<'idle' | 'updating' | 'success'>('idle');
  const [otaProgress, setOtaProgress] = useState(0);

  useEffect(() => {
    if (isDeviceConnected && connectedDeviceName) {
      setDeviceName(connectedDeviceName);
    }
  }, [isDeviceConnected, connectedDeviceName]);

  const handleStartScan = () => {
    setCurrentView('scanning');
    setIsScanning(true);
    setScannedDevices([]);

    setTimeout(() => {
      setScannedDevices([
        { id: 'PAD-Smart-Knee', name: '智能膝关节康养仪 PAD', signal: -45, battery: 85 }
      ]);
      setIsScanning(false);
    }, 2500);
  };

  const handleConnect = (name: string) => {
    toast.success('连接成功');
    connectDevice(name);
    navigate(-1);
  };

  const handleUnbind = () => {
    if (window.confirm('确定要解除绑定吗？')) {
      disconnectDevice();
      setCurrentView('management');
      toast.success('已解除绑定');
    }
  };

  const handleOtaUpdate = () => {
    if (otaStatus !== 'idle') return;
    setOtaStatus('updating');
    setOtaProgress(0);

    const interval = setInterval(() => {
      setOtaProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setOtaStatus('success');
          setTimeout(() => {
            setOtaStatus('idle');
            toast.success('升级完成');
          }, 2000);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const renderHeader = (title: string, onBack: () => void) => (
    <div className="dark:bg-[#1E1E1E] bg-white sticky top-0 z-50 px-4 h-14 flex items-center justify-between shadow-sm transition-colors">
      <button onClick={onBack} className="p-2 -ml-2 dark:text-[#F5F5F5] text-gray-700 active:bg-gray-100 dark:active:bg-gray-800 rounded-full">
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-lg font-bold dark:text-[#F5F5F5] text-gray-900">{title}</h1>
      <div className="w-10"></div>
    </div>
  );

  if (currentView === 'management') {
    return (
      <div className="flex flex-col h-full dark:bg-[#121212] bg-[#F5F7FA] overflow-y-auto pb-24 transition-colors">
        {renderHeader('添加设备', () => navigate(-1))}
        <div className="p-5 space-y-4">
          <p className="text-[14px] dark:text-[#9CA3AF] text-gray-500 font-medium mb-2">请选择要连接的设备类型</p>
          
          <div 
            onClick={handleStartScan}
            className="dark:bg-[#1E1E1E] bg-white rounded-[20px] p-5 shadow-sm border border-[#2C7CFF] cursor-pointer active:scale-[0.98] transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2C7CFF]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#2C7CFF]/10 flex items-center justify-center text-[#2C7CFF]">
                <SmartphoneNfc size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-[17px] font-bold dark:text-[#F5F5F5] text-gray-900">PAD 康养设备</h3>
                <p className="text-[12px] dark:text-[#9CA3AF] text-gray-500 mt-1">智能膝关节康养仪</p>
              </div>
              <ChevronRight size={20} className="text-[#2C7CFF]" />
            </div>
          </div>

          <div 
            className="dark:bg-[#1E1E1E] bg-white rounded-[20px] p-5 shadow-sm border dark:border-gray-800 border-gray-100 opacity-60 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-[10px] font-bold dark:text-gray-400 text-gray-500">
              即将支持
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                <Zap size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-[17px] font-bold dark:text-[#F5F5F5] text-gray-900">LED 治疗仪</h3>
                <p className="text-[12px] dark:text-[#9CA3AF] text-gray-500 mt-1">红光/红外线消炎镇痛</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'scanning') {
    return (
      <div className="flex flex-col h-full dark:bg-[#121212] bg-[#F5F7FA] overflow-y-auto pb-24 transition-colors">
        {renderHeader('扫描设备', () => setCurrentView('management'))}
        
        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-center items-center py-12 relative">
            <div className="relative w-32 h-32 flex items-center justify-center">
              {isScanning && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-[#2C7CFF]/30 animate-ping" style={{ animationDuration: '2s' }}></div>
                  <div className="absolute inset-0 rounded-full border-2 border-[#2C7CFF]/20 animate-ping delay-75" style={{ animationDuration: '2.5s' }}></div>
                </>
              )}
              <div className="w-20 h-20 bg-[#2C7CFF]/10 rounded-full flex items-center justify-center text-[#2C7CFF] z-10">
                <Bluetooth size={36} className={isScanning ? "animate-pulse" : ""} />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[15px] font-bold dark:text-[#F5F5F5] text-gray-900">附近设备</h2>
            <button 
              onClick={handleStartScan}
              disabled={isScanning}
              className="text-[13px] text-[#2C7CFF] flex items-center gap-1 active:opacity-70"
            >
              <RefreshCw size={14} className={isScanning ? "animate-spin" : ""} />
              {isScanning ? '扫描中...' : '重新扫描'}
            </button>
          </div>

          {!isScanning && scannedDevices.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 py-10 opacity-70">
              <div className="w-24 h-24 mb-4 text-gray-300 dark:text-gray-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <p className="text-[15px] dark:text-[#9CA3AF] text-gray-500 text-center">
                未发现设备<br/><span className="text-[13px]">请确保设备已开机并靠近PAD</span>
              </p>
            </div>
          )}

          <div className="space-y-3">
            {scannedDevices.map(device => (
              <div 
                key={device.id}
                onClick={() => handleConnect(device.name)}
                className="dark:bg-[#1E1E1E] bg-white rounded-[16px] p-4 flex items-center justify-between shadow-sm active:bg-gray-50 dark:active:bg-gray-800 transition-colors cursor-pointer border border-transparent dark:border-gray-800 hover:border-[#2C7CFF]/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2C7CFF]/10 text-[#2C7CFF] flex items-center justify-center">
                    <SmartphoneNfc size={20} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold dark:text-[#F5F5F5] text-gray-900">{device.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] dark:text-gray-400 text-gray-500">信号 {device.signal} dBm</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 text-[#00C853]">
                    <Battery size={16} />
                    <span className="text-[12px] font-bold">{device.battery}%</span>
                  </div>
                  <span className="text-[11px] text-[#2C7CFF] bg-[#2C7CFF]/10 px-2 py-0.5 rounded">点击连接</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full dark:bg-[#121212] bg-[#F5F7FA] overflow-y-auto pb-24 transition-colors">
      {renderHeader('设备详情', () => navigate(-1))}
      
      <div className="p-5 space-y-6">
        <div className="dark:bg-[#1E1E1E] bg-white rounded-[24px] p-6 shadow-sm border dark:border-[#2C2C2C] border-gray-100 flex flex-col items-center relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2C7CFF]/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2C7CFF]/20 to-[#2C7CFF]/5 flex items-center justify-center text-[#2C7CFF] mb-4">
            <SmartphoneNfc size={48} />
          </div>
          
          <div className="flex items-center gap-2 mb-1 w-full justify-center px-4">
            {isEditingName ? (
              <input 
                autoFocus
                type="text"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                onBlur={() => {
                  setIsEditingName(false);
                  connectDevice(deviceName);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditingName(false);
                    connectDevice(deviceName);
                  }
                }}
                className="text-[20px] font-bold dark:text-[#F5F5F5] text-gray-900 dark:bg-[#121212] bg-gray-50 border border-[#2C7CFF] rounded px-2 py-1 outline-none text-center w-full max-w-[200px]"
              />
            ) : (
              <>
                <h2 className="text-[20px] font-bold dark:text-[#F5F5F5] text-gray-900 text-center truncate">{deviceName}</h2>
                <button onClick={() => setIsEditingName(true)} className="text-[#9CA3AF] active:text-[#2C7CFF]">
                  <Edit2 size={16} />
                </button>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 mt-2 bg-[#00C853]/10 text-[#00C853] px-3 py-1 rounded-full border border-[#00C853]/20">
            <div className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse"></div>
            <span className="text-[12px] font-medium">已连接</span>
          </div>
        </div>

        <div className="dark:bg-[#1E1E1E] bg-white rounded-[20px] shadow-sm border dark:border-[#2C2C2C] border-gray-100 overflow-hidden transition-colors divide-y dark:divide-[#2C2C2C] divide-gray-50">
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                <Battery size={18} />
              </div>
              <span className="text-[15px] font-medium dark:text-[#F5F5F5] text-gray-900">剩余电量</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[100px] h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#00C853] w-[85%] rounded-full"></div>
              </div>
              <span className="text-[14px] font-bold dark:text-[#F5F5F5] text-gray-900">85%</span>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                <AlertCircle size={18} />
              </div>
              <span className="text-[15px] font-medium dark:text-[#F5F5F5] text-gray-900">固件版本</span>
            </div>
            <span className="text-[14px] dark:text-[#9CA3AF] text-gray-500 font-mono">v1.2.4</span>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 relative">
                  <Download size={18} />
                  {hasNewVersion && otaStatus === 'idle' && (
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF3B30] rounded-full border-2 border-white dark:border-[#1E1E1E]"></div>
                  )}
                </div>
                <span className="text-[15px] font-medium dark:text-[#F5F5F5] text-gray-900">固件升级</span>
              </div>
              {otaStatus === 'idle' && (
                <button 
                  onClick={handleOtaUpdate}
                  className="bg-[#2C7CFF] text-white px-4 py-1.5 rounded-full text-[13px] font-bold shadow-sm active:scale-95 transition-transform"
                >
                  去升级
                </button>
              )}
            </div>
            
            {otaStatus === 'updating' && (
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[12px] text-[#2C7CFF] font-bold">正在更新中...请勿操作设备</span>
                  <span className="text-[12px] text-[#2C7CFF] font-mono font-bold">{otaProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-[#2C7CFF] rounded-full transition-all duration-200"
                    style={{ width: `${otaProgress}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-[#FF9100] flex items-center gap-1">
                  <AlertCircle size={12} /> 升级期间请勿操作设备或关闭蓝牙
                </p>
              </div>
            )}

            {otaStatus === 'success' && (
              <div className="mt-2 bg-green-50 dark:bg-green-900/20 rounded-xl p-3 flex items-center gap-2 text-[#00C853]">
                <CheckCircle2 size={16} />
                <span className="text-[12px] font-bold">升级成功，当前为最新版本</span>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={handleUnbind}
          disabled={otaStatus === 'updating'}
          className="w-full bg-white dark:bg-[#1E1E1E] border dark:border-[#2C2C2C] border-gray-100 text-[#FF3B30] rounded-[16px] p-4 font-bold text-[16px] shadow-sm flex items-center justify-center gap-2 active:bg-red-50 dark:active:bg-red-900/10 transition-colors disabled:opacity-50"
        >
          <Trash2 size={18} /> 解除绑定
        </button>

      </div>
    </div>
  );
}
