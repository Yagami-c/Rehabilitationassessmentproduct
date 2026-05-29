import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronLeft, Edit2, Download, Share, Wand2, EyeOff, Eye, Image as ImageIcon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Toaster, toast } from 'sonner';

export function ShareEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, userProfile } = useStore();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') || 'summary'; // summary, progress, badge
  
  const [template, setTemplate] = useState<'xhs' | 'moments'>('xhs');
  const [isSensitiveHidden, setIsSensitiveHidden] = useState(true);
  const [customText, setCustomText] = useState('今天也完成了膝关节康养训练，感觉关节轻松了不少！继续坚持，期待更好的自己💪 #康养打卡 #健康生活');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Mock data for display based on type
  const title = type === 'summary' ? '诊断摘要' : type === 'progress' ? '康养进展' : '训练勋章';
  const metrics = type === 'summary' 
    ? { score: 78, level: '中度风险', pain: 4 } 
    : type === 'progress' 
    ? { days: 14, completion: '92%', improvement: '+15%' }
    : { streak: 7, badges: 3, totalMinutes: 120 };

  const handleAIGenerate = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      setCustomText(
        type === 'summary' 
          ? '刚做完膝关节专业评估，目前处于康养关键期。虽然还有疼痛，但在科学指导下一定能早日康养！🌟'
          : type === 'progress'
          ? `坚持打卡第${metrics.days}天！改善度达到了${metrics.improvement}，每一次微小的进步都值得被记录✨`
          : `成功解锁连续${metrics.streak}天训练成就！汗水不会骗人，继续向着满血复活的目标前进🏃‍♂️`
      );
      setIsGeneratingAI(false);
      toast.success('已生成专属文案');
    }, 1000);
  };

  const handleShare = () => {
    toast.success('已准备好分享内容，正在唤起系统分享...');
  };

  const handleSaveImage = () => {
    toast.success('图片已保存至相册');
  };

  const maskName = (name: string) => {
    if (!name) return '某**';
    return name.charAt(0) + '*'.repeat(name.length > 1 ? 1 : 1);
  };

  return (
    <div className={`flex flex-col min-h-screen max-w-md mx-auto relative ${isDarkMode ? 'bg-[#121212] text-[#F5F5F5]' : 'bg-[#F5F7FA] text-gray-900'} overflow-y-auto pb-24 transition-colors`}>
      <Toaster position="top-center" theme={isDarkMode ? 'dark' : 'light'} />
      
      {/* Header */}
      <header className={`px-5 py-4 shrink-0 flex items-center justify-between sticky top-0 z-20 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} shadow-sm`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#2C2C2C] text-[#F5F5F5]' : 'bg-gray-100 text-gray-600'} active:scale-95 transition-transform`}
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-[18px] font-bold">分享与记录</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Template Selector */}
        <div className={`p-1.5 rounded-2xl flex ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white shadow-sm border border-gray-100'}`}>
          <button 
            onClick={() => setTemplate('xhs')}
            className={`flex-1 py-2.5 rounded-xl text-[14px] font-bold transition-colors ${template === 'xhs' ? 'bg-[#2C7CFF] text-white shadow-sm' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            小红书版式
          </button>
          <button 
            onClick={() => setTemplate('moments')}
            className={`flex-1 py-2.5 rounded-xl text-[14px] font-bold transition-colors ${template === 'moments' ? 'bg-[#2C7CFF] text-white shadow-sm' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            朋友圈卡片
          </button>
        </div>

        {/* Privacy Toggle */}
        <div className={`flex items-center justify-between p-4 rounded-[20px] ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white shadow-sm border border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-gray-50'}`}>
              {isSensitiveHidden ? <EyeOff size={18} className="text-[#2C7CFF]" /> : <Eye size={18} className="text-[#2C7CFF]" />}
            </div>
            <div>
              <h3 className="text-[15px] font-bold">隐私脱敏保护</h3>
              <p className="text-[12px] text-gray-500">自动隐藏真实姓名及敏感数值</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSensitiveHidden(!isSensitiveHidden)}
            className={`w-12 h-6 rounded-full transition-colors relative ${isSensitiveHidden ? 'bg-[#00C853]' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${isSensitiveHidden ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        {/* Preview Area */}
        <div className={`rounded-[24px] overflow-hidden ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white shadow-sm border-gray-100'} border`}>
          {/* Preview Content */}
          <div className={`p-6 ${template === 'xhs' ? 'pb-4' : 'pb-6'}`}>
            {/* Dynamic Card Content based on template and type */}
            <div className={`rounded-2xl p-5 ${template === 'xhs' ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 aspect-[3/4]' : 'bg-gradient-to-r from-[#2C7CFF]/10 to-[#00C853]/10 dark:from-[#2C7CFF]/20 dark:to-[#00C853]/20 aspect-video'} flex flex-col justify-between relative overflow-hidden shadow-inner`}>
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ImageIcon size={100} />
              </div>

              {/* User Info Bar */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center font-bold text-[#2C7CFF]">
                    {isSensitiveHidden ? '某' : (userProfile?.name?.charAt(0) || '用')}
                  </div>
                  <span className="font-bold text-[14px]">
                    {isSensitiveHidden ? maskName(userProfile?.name || '用户') : (userProfile?.name || '用户')}
                  </span>
                </div>
                <div className="text-[12px] px-2 py-1 rounded-full bg-white/50 backdrop-blur-sm font-medium">
                  {title}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="relative z-10 flex-1 flex flex-col justify-center my-4">
                {type === 'summary' && (
                  <div className="text-center">
                    <div className="text-[48px] font-bold font-mono text-[#2C7CFF]">
                      {isSensitiveHidden ? '**' : metrics.score}
                    </div>
                    <div className="text-[14px] font-medium mt-1">综合评估得分</div>
                    <div className="inline-block mt-3 px-3 py-1 rounded-full bg-white/60 text-[12px] font-bold text-gray-800">
                      疼痛指数: {isSensitiveHidden ? '*' : metrics.pain} / 10
                    </div>
                  </div>
                )}
                {type === 'progress' && (
                  <div className="text-center">
                    <div className="text-[40px] font-bold font-mono text-[#00C853]">
                      {metrics.improvement}
                    </div>
                    <div className="text-[14px] font-medium mt-1">关节活动度改善</div>
                    <div className="inline-block mt-3 px-3 py-1 rounded-full bg-white/60 text-[12px] font-bold text-gray-800">
                      打卡 {metrics.days} 天 · 完成度 {metrics.completion}
                    </div>
                  </div>
                )}
                {type === 'badge' && (
                  <div className="text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg mb-3">
                      <span className="text-[32px]">👑</span>
                    </div>
                    <div className="text-[18px] font-bold">解锁「自律达人」</div>
                    <div className="text-[13px] mt-1 opacity-80">连续坚持训练 {metrics.streak} 天</div>
                  </div>
                )}
              </div>

              {/* Branding Footer */}
              <div className="flex justify-between items-end relative z-10">
                <div className="text-[10px] opacity-60 font-medium">
                  # 科技推动寿而康
                </div>
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm p-1">
                  <div className="w-full h-full bg-black flex items-center justify-center text-white text-[8px]">QR</div>
                </div>
              </div>
            </div>
            
            {/* XHS Text Layout */}
            {template === 'xhs' && (
              <div className="mt-4 px-2">
                <p className={`text-[14px] leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {customText}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Text Section */}
        <div className={`rounded-[24px] p-5 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white shadow-sm border-gray-100'} border`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[15px] font-bold flex items-center gap-2">
              <Edit2 size={16} className="text-[#2C7CFF]" /> 
              编辑配文
            </h3>
            <button 
              onClick={handleAIGenerate}
              disabled={isGeneratingAI}
              className={`flex items-center gap-1.5 text-[13px] font-bold px-3 py-1.5 rounded-full transition-colors ${isDarkMode ? 'bg-[#2C7CFF]/20 text-[#2C7CFF]' : 'bg-blue-50 text-[#2C7CFF]'} ${isGeneratingAI ? 'opacity-50' : 'active:scale-95'}`}
            >
              <Wand2 size={14} className={isGeneratingAI ? 'animate-pulse' : ''} />
              {isGeneratingAI ? '生成中...' : 'AI 帮你写'}
            </button>
          </div>
          <textarea 
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className={`w-full h-24 p-3 rounded-xl text-[14px] resize-none outline-none focus:ring-2 focus:ring-[#2C7CFF]/50 transition-all ${isDarkMode ? 'bg-[#121212] text-gray-200 border-[#3C3C3C]' : 'bg-gray-50 text-gray-800 border-transparent'} border`}
            placeholder="写点什么记录下今天的康养打卡吧..."
          />
        </div>

      </div>

      {/* Bottom Actions */}
      <div className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 pb-8 flex gap-3 ${isDarkMode ? 'bg-[#1E1E1E]/90' : 'bg-white/90'} backdrop-blur-lg border-t ${isDarkMode ? 'border-[#2C2C2C]' : 'border-gray-100'} z-20`}>
        <button 
          onClick={handleSaveImage}
          className={`flex-1 py-3.5 rounded-[16px] font-bold text-[16px] flex items-center justify-center gap-2 border-2 transition-transform active:scale-[0.98] ${isDarkMode ? 'border-[#3C3C3C] text-[#F5F5F5]' : 'border-gray-200 text-gray-700'}`}
        >
          <Download size={18} /> 保存相册
        </button>
        <button 
          onClick={handleShare}
          className="flex-1 py-3.5 bg-[#2C7CFF] text-white rounded-[16px] font-bold text-[16px] shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
        >
          <Share size={18} /> 去分享
        </button>
      </div>
    </div>
  );
}