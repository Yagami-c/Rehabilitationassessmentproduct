import { X } from 'lucide-react';
import jointDeviceImg from '../../imports/image-19.png';
import ledDeviceImg from '../../imports/image-20.png';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface DeviceSelectionModalProps {
  onSelect: (deviceId: string) => void;
  onClose?: () => void;
  actionText?: string;
}

export function DeviceSelectionModal({ onSelect, onClose }: DeviceSelectionModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-300 backdrop-blur-sm">
      <div className="w-full max-w-sm flex flex-col p-6 bg-gray-50 rounded-3xl relative overflow-hidden shadow-2xl">
        
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 bg-gray-200/50 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <X size={20} />
          </button>
        )}

        <div className="mb-6 text-center mt-2 relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">请选择使用设备</h2>
          <p className="text-sm text-gray-500">我们将为您适配对应的训练方案</p>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto hide-scrollbar relative z-10">
          {/* Card 1 */}
          <button 
            onClick={() => onSelect('joint')}
            className="w-full relative rounded-2xl overflow-hidden transition-all active:scale-[0.98] focus:outline-none"
          >
            <ImageWithFallback src={jointDeviceImg} alt="关节自动松动仪" className="w-full h-auto object-cover" />
          </button>

          {/* Card 2 */}
          <div className="w-full relative rounded-2xl overflow-hidden opacity-70">
            <ImageWithFallback src={ledDeviceImg} alt="LED治疗仪" className="w-full h-auto object-cover" />
          </div>
        </div>

      </div>
    </div>
  );
}