import { useState } from 'react';
import { X, History, RefreshCcw, ChevronLeft } from 'lucide-react';
import jointDeviceImg from '../../imports/image-19.png';
import ledDeviceImg from '../../imports/image-20.png';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface DeviceSelectionModalProps {
  onSelect: (deviceId: string) => void;
  onClose?: () => void;
  actionText?: string;
}

export function DeviceSelectionModal({ onSelect, onClose }: DeviceSelectionModalProps) {
  const [step, setStep] = useState<'select_device' | 'select_action'>('select_device');
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const handleDeviceClick = (deviceId: string) => {
    if (deviceId === 'joint') {
      setStep('select_action');
      setSelectedDevice(deviceId);
    } else {
      onSelect(deviceId);
    }
  };

  const handleActionClick = (action: string) => {
    onSelect(`joint_${action}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-300 backdrop-blur-sm">
      <div className="w-full max-w-sm flex flex-col p-6 bg-gray-50 rounded-3xl relative overflow-hidden shadow-2xl">
        
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 bg-gray-200/50 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <X size={20} />
          </button>
        )}

        {step === 'select_action' && (
          <button 
            onClick={() => setStep('select_device')} 
            className="absolute top-4 left-4 z-20 w-8 h-8 bg-gray-200/50 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div className="mb-6 text-center mt-2 relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 'select_device' ? '请选择使用设备' : '选择测试方式'}
          </h2>
          <p className="text-sm text-gray-500">
            {step === 'select_device' ? '我们将为您适配对应的训练方案' : '重新评估或继续使用推荐配置'}
          </p>
        </div>

        {step === 'select_device' ? (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto hide-scrollbar relative z-10 animate-in slide-in-from-left-4 fade-in duration-300">
            {/* Card 1 */}
            <button 
              onClick={() => handleDeviceClick('joint')}
              className="w-full relative rounded-2xl overflow-hidden transition-all active:scale-[0.98] focus:outline-none"
            >
              <ImageWithFallback src={jointDeviceImg} alt="关节自动松动仪" className="w-full h-auto object-cover" />
            </button>

            {/* Card 2 */}
            <div className="w-full relative rounded-2xl overflow-hidden opacity-70">
              <ImageWithFallback src={ledDeviceImg} alt="LED康养仪" className="w-full h-auto object-cover" />
            </div>

            <button 
              onClick={() => onClose ? onClose() : onSelect('skip')}
              className="w-full h-10 mt-2 bg-transparent text-gray-400 font-medium text-[13px] flex items-center justify-center transition-all active:text-gray-600"
            >
              暂无设备，跳过
            </button>
          </div>
        ) : (
          <div className="space-y-4 relative z-10 animate-in slide-in-from-right-4 fade-in duration-300">
             <button 
               onClick={() => handleActionClick('history')} 
               className="w-full flex items-center justify-between p-4 bg-white border border-blue-100 shadow-sm rounded-2xl active:scale-[0.98] transition-transform"
             >
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                   <History size={20} />
                 </div>
                 <div className="text-left">
                   <h3 className="font-bold text-gray-900 text-[16px]">历史推荐</h3>
                   <p className="text-[12px] text-gray-500 mt-0.5">直接进入设备页面调整与使用</p>
                 </div>
               </div>
             </button>
             
             <button 
               onClick={() => handleActionClick('retest')} 
               className="w-full flex items-center justify-between p-4 bg-white border border-green-100 shadow-sm rounded-2xl active:scale-[0.98] transition-transform"
             >
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                   <RefreshCcw size={20} />
                 </div>
                 <div className="text-left">
                   <h3 className="font-bold text-gray-900 text-[16px]">重新测试</h3>
                   <p className="text-[12px] text-gray-500 mt-0.5">完成问卷表单并生成新方案</p>
                 </div>
               </div>
             </button>
          </div>
        )}

      </div>
    </div>
  );
}