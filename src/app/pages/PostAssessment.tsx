import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, Activity, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { useStore } from '../store/useStore';
import { PainSlider } from './ConditionForm';

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
    navigate('/education'); // Go to education before final summary
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
            <h2 className="text-xl font-bold text-gray-900 mb-2">重新测试下蹲</h2>
            <p className="text-sm text-gray-500 mb-8">现在再做一次下蹲，您的膝盖不适程度是多少？（0-10分）</p>
            <div className="mb-10">
              <PainSlider 
                value={formData.squatPainAfter} 
                onChange={(val) => setFormData({...formData, squatPainAfter: val})} 
              />
            </div>
            {preAssessment && (
              <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-700 text-center">
                理疗前分数为: <span className="font-bold">{preAssessment.squatPainBefore}</span> 分
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-2">整体感觉</h2>
            <p className="text-sm text-gray-500 mb-6">理疗结束后，您的整体感觉如何？</p>
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
            <p className="text-sm text-gray-500 mb-6">您觉得刚才的理疗强度怎么样？</p>
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
    </div>
  );
}