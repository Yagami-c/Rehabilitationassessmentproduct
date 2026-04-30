import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Bluetooth, CheckCircle2, RefreshCw, Power, Activity, AlertCircle, PlayCircle } from 'lucide-react';
import clsx from 'clsx';
import { useStore } from '../store/useStore';

const PAD_MODES: Record<number, any> = {
  1: { name: 'L1', pressure: 100, application: 15, rest: 10, cycles: 10, explain: "你的膝关节不敏感，无紧张，建议从最低强度开始。" },
  2: { name: 'L2', pressure: 125, application: 15, rest: 10, cycles: 10, explain: "你的膝关节存在一定程度的紧张，建议从中等偏低强度开始。" },
  3: { name: 'L3', pressure: 125, application: 30, rest: 10, cycles: 5, explain: "你的膝盖有明显紧张感，建议从中等强度开始，适当延长作用时间。" },
  4: { name: 'H1', pressure: 150, application: 90, rest: 10, cycles: 3, explain: "你的僵硬程度较高，且下蹲疼痛评分不低，建议从高压短周期模式开始。" },
  5: { name: 'H2', pressure: 150, application: 180, rest: 10, cycles: 3, explain: "你的膝关节紧张明显且适应性较好，建议采用高压中长持续模式。" },
  6: { name: 'H3', pressure: 200, application: 180, rest: 10, cycles: 3, explain: "你的膝关节僵硬显著且需求较高，建议采用最强高压强化模式。" },
};

export function Device() {
  const navigate = useNavigate();
  const { preAssessment } = useStore();
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
  const [power, setPower] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  
  const devices = [
    { id: 'PAD-Smart-Knee', name: '智能膝关节理疗仪 PAD', signal: -45 },
    { id: 'TENS-Unit-102', name: '低频脉冲治疗仪', signal: -78 },
  ];

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  const handleConnect = (id: string) => {
    if (connectedDevice === id) {
      setConnectedDevice(null);
      setPower(false);
    } else {
      setScanning(true);
      setTimeout(() => {
        setConnectedDevice(id);
        setScanning(false);
      }, 1000);
    }
  };

  const level = preAssessment?.computedLevel || 2;
  const recommendedMode = PAD_MODES[level];

  // Simulate usage
  useEffect(() => {
    if (power) {
      const timer = setTimeout(() => {
        setPower(false);
        setSessionCompleted(true);
      }, 3000); // simulate 3 seconds of usage for demo
      return () => clearTimeout(timer);
    }
  }, [power]);

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 px-4 h-14 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-700 active:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">智能理疗推荐</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Recommended Mode Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <h2 className="text-[13px] font-bold text-blue-600 mb-1 flex items-center gap-1"><Activity size={14}/> 为您推荐的专属模式</h2>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-black text-gray-900">{recommendedMode.name}</span>
              <span className="text-sm font-medium text-gray-500">{recommendedMode.name.startsWith('H') ? '高压强化' : '温和放松'}模式</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{recommendedMode.explain}</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded-lg text-xs"><span className="text-gray-400 block mb-0.5">负压强度</span><span className="font-bold text-gray-800">{recommendedMode.pressure} mmHg</span></div>
              <div className="bg-gray-50 p-2 rounded-lg text-xs"><span className="text-gray-400 block mb-0.5">作用时间</span><span className="font-bold text-gray-800">{recommendedMode.application} 秒</span></div>
              <div className="bg-gray-50 p-2 rounded-lg text-xs"><span className="text-gray-400 block mb-0.5">休息间隔</span><span className="font-bold text-gray-800">{recommendedMode.rest} 秒</span></div>
              <div className="bg-gray-50 p-2 rounded-lg text-xs"><span className="text-gray-400 block mb-0.5">循环次数</span><span className="font-bold text-gray-800">{recommendedMode.cycles} 次</span></div>
            </div>
          </div>
        </div>

        {/* Bluetooth Toggle */}
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center transition-colors", bluetoothEnabled ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400")}>
              <Bluetooth size={20} />
            </div>
            <div>
              <div className="font-bold text-[15px] text-gray-900">设备连接</div>
              <div className="text-xs text-gray-500 mt-0.5">{bluetoothEnabled ? '蓝牙已开启' : '蓝牙已关闭'}</div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setBluetoothEnabled(!bluetoothEnabled);
              if (bluetoothEnabled) {
                setConnectedDevice(null);
                setPower(false);
              }
            }}
            className={clsx("w-12 h-6 rounded-full p-1 transition-colors duration-300 relative", bluetoothEnabled ? "bg-blue-600" : "bg-gray-300")}
          >
            <div className={clsx("w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300", bluetoothEnabled ? "translate-x-6" : "translate-x-0")} />
          </button>
        </div>

        {/* Device List */}
        {bluetoothEnabled && !connectedDevice && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-[14px] font-bold text-gray-700">发现附近设备</h2>
              <button onClick={handleScan} disabled={scanning} className="text-xs text-blue-600 font-medium flex items-center gap-1">
                <RefreshCw size={12} className={scanning ? "animate-spin" : ""} /> {scanning ? "扫描中..." : "重新扫描"}
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
              {devices.map(device => (
                <div key={device.id} className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors" onClick={() => handleConnect(device.id)}>
                  <div className="flex items-center gap-3">
                    <Activity size={24} className="text-gray-400" />
                    <div>
                      <div className="font-medium text-[15px] mb-0.5 text-gray-800">{device.name}</div>
                      <div className="text-[11px] text-gray-500">点击连接 · 信号 {device.signal}dBm</div>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Control Panel */}
        {connectedDevice && (
          <div className="animate-in slide-in-from-bottom-8 fade-in duration-500 fill-mode-forwards pt-2">
            
            <div className="bg-gray-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
              <div className={clsx("absolute top-0 left-0 w-full h-1 opacity-50 transition-colors duration-500", power ? "bg-gradient-to-r from-blue-600 via-purple-500 to-green-400" : "bg-gray-700")}></div>
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <div className="text-gray-400 text-xs mb-1">PAD 智能理疗仪</div>
                  <div className="text-2xl font-bold">{power ? '理疗进行中...' : '已连接，准备就绪'}</div>
                  {power && <div className="text-blue-400 text-xs mt-1 animate-pulse flex items-center gap-1"><Activity size={10}/> 正在执行 {recommendedMode.name} 模式</div>}
                </div>
              </div>

              {!power && !sessionCompleted && (
                <button onClick={() => setPower(true)} className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-4 flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-900/50 transition-all active:scale-95">
                  <PlayCircle size={20} /> 一键启动推荐模式
                </button>
              )}

              {power && (
                <div className="text-center py-4">
                  <div className="inline-block w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-sm text-gray-300">理疗正在运行，请保持静止...</p>
                  <button onClick={() => setPower(false)} className="mt-6 px-6 py-2 rounded-full border border-gray-600 text-gray-400 text-sm active:bg-gray-800">
                    停止理疗
                  </button>
                </div>
              )}

              {sessionCompleted && !power && (
                <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">理疗已完成</h3>
                  <p className="text-sm text-gray-400 mb-6">请进行理疗后评估，以便我们记录效果并为您调整下一次方案。</p>
                  <button onClick={() => navigate('/post-assessment')} className="w-full bg-green-500 text-white rounded-xl p-4 flex items-center justify-center font-bold shadow-lg shadow-green-900/50 transition-all active:scale-95">
                    进行使用后评估
                  </button>
                </div>
              )}
            </div>
            
            {!power && !sessionCompleted && (
              <button onClick={() => handleConnect(connectedDevice)} className="w-full mt-4 py-3 text-center text-sm font-medium text-gray-500 active:bg-gray-100 rounded-xl transition-colors">
                断开连接
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}