import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertCircle, ArrowRight } from 'lucide-react';

export function Disclaimer() {
  const navigate = useNavigate();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAgree = () => {
    navigate('/condition');
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F7FA] relative w-full mx-auto font-sans">
      <div className="flex-1 px-6 pt-16 pb-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        
        <h1 className="text-[22px] font-bold text-[#1A1A1A] mb-2">免责声明</h1>
        <p className="text-[14px] text-[#6B7280] mb-8">请仔细阅读以下内容</p>

        <div 
          className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-5 overflow-y-auto mb-8 relative text-[14px] leading-relaxed text-[#4B5563]"
          onScroll={handleScroll}
        >
          <div className="space-y-4">
            <p className="font-bold text-[#1A1A1A]">1. 康养平台性质</p>
            <p>本平台提供的动作评估、建议及相关功能仅供健康管理与康养参考，不构成任何医疗诊断或治疗依据。如您有急性损伤、严重疼痛或确诊的医疗状况，请立即寻求专业医疗机构的帮助。</p>

            <p className="font-bold text-[#1A1A1A] pt-2">2. 动作风险提示</p>
            <p>本应用提供的测试动作可能包含下蹲等可能增加膝关节压力的动作。在执行任何动作前，请确保您在安全的环境中进行。如果您在进行动作时感到任何不适、疼痛加剧或有摔倒风险，请立即停止动作。</p>

            <p className="font-bold text-[#1A1A1A] pt-2">3. 数据隐私</p>
            <p>我们承诺将严格保护您的个人信息与健康数据，所收集的数据仅用于生成康养建议及改善服务质量，不会未经您授权分享给第三方。</p>
            
            <p className="font-bold text-[#1A1A1A] pt-2">4. 技术局限性</p>
            <p>实时动作评估（包括基于摄像头的视觉识别技术）存在技术局限性，其结果可能受到环境光线、穿着、摄像头质量等因素影响，结果仅供参考。</p>

            <p className="font-bold text-[#1A1A1A] pt-2">5. 最终解释权</p>
            <p>本平台保留对上述声明及服务内容的最终解释权及修改权。</p>
            
            <div className="h-4"></div>
          </div>
          
          {/* Fading indicator to show there's more content */}
          {!hasScrolledToBottom && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none flex items-end justify-center pb-2">
              <span className="text-[12px] text-blue-500 font-medium">请滑动至底部</span>
            </div>
          )}
        </div>

        <button 
          onClick={handleAgree}
          disabled={!hasScrolledToBottom}
          className="w-full h-[50px] bg-[#2C7CFF] active:bg-[#256EE6] disabled:opacity-50 disabled:bg-gray-400 disabled:active:bg-gray-400 text-white font-medium text-[16px] rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
        >
          同意并继续
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}