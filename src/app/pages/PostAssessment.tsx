import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, Activity, CheckCircle2, Smile, Meh, Frown, Annoyed, Angry, Play } from 'lucide-react';
import clsx from 'clsx';
import { useStore } from '../store/useStore';
import { Slider } from '../components/ui/slider';

export function PostAssessment() {
  const navigate = useNavigate();
  const { setPostAssessment, calculatePostAssessmentLevel, preAssessment } = useStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    squatPainAfter: preAssessment?.squatPainBefore || 0,
    globalFeeling: '没变化' as '更舒服' | '没变化' | '更不适',
    intensityFeeling: '刚好' as '太轻' | '刚好' | '有点强',
    adverseReactions: [] as string[]
  });
  const [showNextActionModal, setShowNextActionModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const adverseOptions = ["明显疼痛加重", "皮肤明显不适", "膝盖更肿/更胀", "没有以上情况"];

  const toggleAdverse = (opt: string) => {
    setFormData(prev => {
      const arr = prev.adverseReactions;
      if (opt === '没有以上情况') {
        return { ...prev, adverseReactions: arr.includes(opt) ? [] : [opt] };
      }
      const newArr = arr.includes(opt) 
        ? arr.filter(i => i !== opt) 
        : [...arr.filter(i => i !== '没有以上情况'), opt];
      return { ...prev, adverseReactions: newArr };
    });
  };

  const submit = () => {
    setPostAssessment(formData);
    calculatePostAssessmentLevel();
    setShowNextActionModal(true); // Show action modal instead of navigating right away
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden relative max-w-md mx-auto shadow-2xl">
      <div className="bg-white px-4 h-14 flex items-center justify-between border-b border-gray-100 shrink-0 shadow-sm z-10">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="p-2 -ml-2 text-gray-700 active:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">使用后评估 ({step}/4)</h1>
        <div className="w-10"></div>
      </div>

      <div className="h-1 bg-gray-100 w-full shrink-0">
        <div className="h-full bg-green-500 transition-all duration-300 ease-out" style={{ width: `${(step / 4) * 100}%` }} />
      </div>

      <div className="flex-1 overflow-y-auto p-6 scroll-smooth pb-24">
        {step === 1 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">下蹲疼痛评分</h2>
            
            <div className="bg-blue-50/50 rounded-2xl p-5 mb-8 border border-blue-100 flex flex-col items-center relative overflow-hidden">
              <div className="text-center mb-4 relative z-10">
                <p className="text-[13px] text-blue-600 font-medium mb-1">为了对比康养效果，请再次...</p>
                <h3 className="text-[18px] font-bold text-gray-900">试着做一次标准的下蹲</h3>
              </div>

              {/* Circular Video Player */}
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg z-10 bg-gray-100 flex items-center justify-center">
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  playsInline
                  muted
                  loop
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                {!isPlaying && (
                  <button 
                    onClick={() => {
                      if (videoRef.current) {
                        const playPromise = videoRef.current.play();
                        if (playPromise !== undefined) {
                          playPromise.catch(error => {
                            console.log("Playback prevented:", error);
                          });
                        }
                      }
                      setIsPlaying(true);
                    }}
                    className="absolute inset-0 m-auto w-14 h-14 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-transform active:scale-95"
                  >
                    <Play size={28} className="ml-1 fill-current" />
                  </button>
                )}
              </div>
              
              {/* Background decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-blue-200/40 to-blue-100/40 rounded-full blur-2xl z-0 pointer-events-none" />
            </div>

            <p className="text-gray-900 font-bold mb-4 text-[16px]">再次下蹲时，膝盖不适程度是？（0-10分）</p>
            
            <div className="bg-white pt-8 pb-6 px-5 rounded-2xl border border-gray-100 flex flex-col items-center mb-8 shadow-sm">
              {(() => {
                const pain = formData.squatPainAfter;
                let icon = Smile;
                let color = "text-green-500";
                let bg = "bg-green-50";
                let label = "无痛";
                
                if (pain >= 9) {
                  icon = Angry; color = "text-red-600"; bg = "bg-red-50"; label = "剧烈疼痛";
                } else if (pain >= 7) {
                  icon = Angry; color = "text-orange-500"; bg = "bg-orange-50"; label = "重度疼痛";
                } else if (pain >= 5) {
                  icon = Annoyed; color = "text-amber-500"; bg = "bg-amber-50"; label = "中度疼痛";
                } else if (pain >= 3) {
                  icon = Frown; color = "text-yellow-500"; bg = "bg-yellow-50"; label = "轻度疼痛";
                } else if (pain >= 1) {
                  icon = Meh; color = "text-lime-500"; bg = "bg-lime-50"; label = "轻微疼痛";
                }

                const Icon = icon;

                return (
                  <div className="flex flex-col items-center w-full mb-8 relative">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${bg}`}>
                      <Icon size={48} className={`${color} transition-transform duration-300 ${pain > 0 ? 'scale-110' : ''}`} strokeWidth={1.5} />
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <span className={`text-5xl font-black tabular-nums tracking-tighter ${color}`}>{pain}</span>
                      <span className="text-gray-500 font-bold mb-1.5 text-lg">{label}</span>
                    </div>
                  </div>
                );
              })()}

              <Slider 
                value={[formData.squatPainAfter]} 
                max={10} 
                step={1} 
                onValueChange={(val) => setFormData({...formData, squatPainAfter: val[0]})} 
                className="w-full mb-6"
              />
              
              <div className="w-full flex justify-between px-0.5 text-[11px] text-gray-400 font-medium">
                {[
                  { val: 0, text: "无痛", color: "text-green-600" },
                  { val: 2, text: "轻微", color: "text-lime-600" },
                  { val: 4, text: "轻度", color: "text-yellow-600" },
                  { val: 6, text: "中度", color: "text-amber-600" },
                  { val: 8, text: "重度", color: "text-orange-600" },
                  { val: 10, text: "剧烈", color: "text-red-600" },
                ].map((item) => (
                  <div key={item.val} className="flex flex-col items-center w-8 cursor-pointer" onClick={() => setFormData({...formData, squatPainAfter: item.val})}>
                    <span className={`mb-1 transition-colors ${formData.squatPainAfter === item.val ? item.color + " font-bold text-[13px]" : ""}`}>{item.val}</span>
                    <span className={`whitespace-nowrap transition-all ${formData.squatPainAfter === item.val ? item.color + " font-bold" : "scale-90"}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {preAssessment && (
              <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-700 text-center shadow-sm border border-blue-100">
                康养前痛感为: <span className="font-bold text-lg mx-1">{preAssessment.squatPainBefore}</span> 分，
                {formData.squatPainAfter < preAssessment.squatPainBefore ? '有所缓解！🎉' : '请注意休息。'}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-2">整体感觉</h2>
            <p className="text-sm text-gray-500 mb-6">康养结束后，您的整体感觉如何？</p>
            <div className="flex flex-col gap-3">
              {(['更舒服', '没变化', '更不适'] as const).map(opt => (
                <button key={opt} onClick={() => setFormData({...formData, globalFeeling: opt})} className={clsx("p-4 rounded-xl text-left border-2 transition-all", formData.globalFeeling === opt ? "border-green-500 bg-green-50 text-green-700 font-bold" : "border-transparent bg-white shadow-sm text-gray-700")}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-2">强度感受</h2>
            <p className="text-sm text-gray-500 mb-6">您觉得刚才的康养强度怎么样？</p>
            <div className="flex flex-col gap-3">
              {(['太轻', '刚好', '有点强'] as const).map(opt => (
                <button key={opt} onClick={() => setFormData({...formData, intensityFeeling: opt})} className={clsx("p-4 rounded-xl text-left border-2 transition-all", formData.intensityFeeling === opt ? "border-green-500 bg-green-50 text-green-700 font-bold" : "border-transparent bg-white shadow-sm text-gray-700")}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-2">不良反应排查</h2>
            <p className="text-sm text-gray-500 mb-6">使用后有没有出现以下情况？（可多选）</p>
            <div className="flex flex-col gap-3">
              {adverseOptions.map(opt => (
                <button key={opt} onClick={() => toggleAdverse(opt)} className={clsx("p-4 rounded-xl flex items-center justify-between border-2 transition-all", formData.adverseReactions.includes(opt) ? "border-green-500 bg-green-50" : "border-transparent bg-white shadow-sm")}>
                  <span className={clsx("font-medium text-sm", formData.adverseReactions.includes(opt) ? "text-green-700" : "text-gray-700")}>{opt}</span>
                  <div className={clsx("w-5 h-5 rounded-md flex items-center justify-center border", formData.adverseReactions.includes(opt) ? "bg-green-500 border-green-500" : "bg-white border-gray-300")}>
                    {formData.adverseReactions.includes(opt) && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-100 z-10 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] pb-safe">
        <button onClick={() => step < 4 ? setStep(step + 1) : submit()} className="w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium text-[16px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-green-200">
          {step === 4 ? '提交反馈并查看总结' : '下一步'}
          {step < 4 && <ChevronRight size={18} />}
        </button>
      </div>

      {/* Next Action Modal */}
      {showNextActionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-5 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">反馈已记录</h2>
            <p className="text-[13px] text-gray-500 mb-6">设备使用已完成，您可以选择接下来的安排：</p>
            
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/training')}
                className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-sm shadow-blue-200 active:scale-95 transition-transform"
              >
                推荐训练
              </button>
              <button 
                onClick={() => navigate('/education')}
                className="w-full py-3.5 bg-purple-50 text-purple-700 rounded-xl font-bold border border-purple-100 active:scale-95 transition-transform"
              >
                宣传教育
              </button>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-3.5 bg-gray-50 text-gray-600 rounded-xl font-bold active:scale-95 transition-transform"
              >
                跳过
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}