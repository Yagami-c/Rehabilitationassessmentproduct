import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Clock, Activity, Target, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import clsx from 'clsx';

export function TrainingSummary() {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<string | null>(null);

  const handleAccept = () => {
    // In a real app, API call here to update the plan
    navigate('/');
  };

  const handleReject = () => {
    setShowFeedback(true);
  };

  const submitFeedback = () => {
    // In a real app, send feedback to server
    setShowFeedback(false);
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F7FA] font-sans relative">
      <div className="h-14 flex items-center px-4 bg-white sticky top-0 z-20 shadow-sm shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h1 className="flex-1 text-center font-bold text-[17px] text-[#1A1A1A] pr-8">今日训练小结</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Top Summary Card */}
        <div className="bg-[#2C7CFF] px-5 pt-6 pb-8 text-white rounded-b-[2rem] shadow-md relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="text-center mb-6 relative z-10">
            <h2 className="text-3xl font-bold mb-1">85<span className="text-lg font-normal opacity-80">%</span></h2>
            <p className="text-sm opacity-90">今日动作总完成度</p>
          </div>

          <div className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-2xl p-4 relative z-10">
            <div className="flex flex-col items-center flex-1 border-r border-white/20">
              <Clock size={20} className="mb-2 opacity-80" />
              <span className="font-bold text-lg">15<span className="text-xs font-normal">m</span></span>
              <span className="text-[10px] opacity-80">训练时长</span>
            </div>
            <div className="flex flex-col items-center flex-1 border-r border-white/20">
              <Activity size={20} className="mb-2 opacity-80" />
              <span className="font-bold text-lg">82<span className="text-xs font-normal">°</span></span>
              <span className="text-[10px] opacity-80">最大屈膝</span>
            </div>
            <div className="flex flex-col items-center flex-1">
              <Target size={20} className="mb-2 opacity-80" />
              <span className="font-bold text-lg">5<span className="text-xs font-normal">分</span></span>
              <span className="text-[10px] opacity-80">当前VAS</span>
            </div>
          </div>
        </div>

        {/* Action Details */}
        <div className="px-5 mt-6">
          <h3 className="font-bold text-gray-900 mb-3 ml-1">分项指标</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">股四头肌等长收缩</span>
                <span className="text-sm font-bold text-green-500">100% (3组)</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-full"></div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-600">短弧膝屈伸</span>
                <span className="text-sm font-bold text-orange-500">60% (因疲劳未完)</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-[60%]"></div>
              </div>
            </div>
          </div>

          {/* AI Adjustment Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#F8F5FF] p-5 rounded-2xl border border-[#EBE4FF] relative overflow-hidden shadow-sm"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#7B61FF]/10 rounded-full blur-xl"></div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#7B61FF] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">AI建议</span>
              <h3 className="font-bold text-[#4B309A]">明日模式调整确认</h3>
            </div>
            
            <p className="text-sm text-[#5B44A3] leading-relaxed mb-5">
              今日“短弧膝屈伸”完成度受限，股四头肌表现出明显疲劳迹象。算法建议明日将训练模式从<strong className="text-gray-800 line-through mx-1">「标准」</strong>调整为<strong className="font-bold text-[#4B309A] mx-1">「轻柔修复」</strong>，以促进肌肉恢复。
            </p>

            <div className="flex gap-3">
              <button 
                onClick={handleReject}
                className="flex-1 h-11 bg-white text-[#7B61FF] border border-[#7B61FF]/30 rounded-xl font-medium text-[15px] active:bg-purple-50 transition-colors"
              >
                保持原计划
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 h-11 bg-[#7B61FF] text-white rounded-xl font-medium text-[15px] shadow-md shadow-purple-500/20 active:scale-95 transition-all"
              >
                接受调整
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feedback Modal for Rejection */}
      <AnimatePresence>
        {showFeedback && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={() => setShowFeedback(false)}
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 pb-safe"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">感谢您的反馈</h3>
                <button onClick={() => setShowFeedback(false)} className="p-2 bg-gray-100 rounded-full active:bg-gray-200">
                  <X size={18} className="text-gray-600" />
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">请告诉我们您不接受本次调整的原因，这有助于优化推荐算法：</p>
              
              <div className="space-y-3 mb-6">
                {['强度没问题，我可以坚持', '动作太难，不喜欢', '时间太紧，想快点结束', '其他原因'].map(reason => (
                  <button 
                    key={reason}
                    onClick={() => setFeedbackType(reason)}
                    className={clsx(
                      "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all",
                      feedbackType === reason ? "border-[#2C7CFF] bg-blue-50 text-[#2C7CFF] font-medium" : "border-gray-200 text-gray-700 bg-white"
                    )}
                  >
                    {reason}
                  </button>
                ))}
              </div>

              <button 
                onClick={submitFeedback}
                className="w-full h-12 bg-[#1A1A1A] text-white rounded-xl font-medium text-[16px] active:scale-95 transition-all"
              >
                提交并返回首页
              </button>
              
              <button 
                onClick={submitFeedback}
                className="w-full h-10 mt-2 text-gray-400 text-sm underline underline-offset-2"
              >
                跳过反馈
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
