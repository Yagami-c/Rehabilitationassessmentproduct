import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { X, Activity, Play, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PainSlider } from './ConditionForm';

export function MotionAssessment() {
  const navigate = useNavigate();
  const { setPostAssessment, calculatePostAssessmentLevel, preAssessment } = useStore();
  
  // 0: Video playing, 1: VAS assessment
  const [assessmentStep, setAssessmentStep] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false);
  
  // VAS States
  const [vasScore, setVasScore] = useState(preAssessment?.squatPainBefore || 5);
  const [globalFeeling, setGlobalFeeling] = useState<'更舒服' | '没变化' | '更不适'>('没变化');
  const [intensityFeeling, setIntensityFeeling] = useState<'太轻' | '刚好' | '有点强'>('刚好');
  const [adverseReactions, setAdverseReactions] = useState<string[]>([]);
  const adverseOptions = ["明显疼痛加重", "皮肤明显不适", "膝盖更肿/更胀", "没有以上情况"];

  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleAdverse = (opt: string) => {
    const arr = adverseReactions;
    if (opt === '没有以上情况') {
      setAdverseReactions(arr.includes(opt) ? [] : [opt]);
      return;
    }
    const newArr = arr.includes(opt) 
      ? arr.filter(i => i !== opt) 
      : [...arr.filter(i => i !== '没有以上情况'), opt];
    setAdverseReactions(newArr);
  };

  const handleFinishVideo = () => {
    setAssessmentStep(1); // Proceed to VAS
  };

  const submitVas = () => {
    setPostAssessment({
      squatPainAfter: vasScore,
      globalFeeling,
      intensityFeeling,
      adverseReactions
    });
    calculatePostAssessmentLevel();
    navigate('/report'); // Redirect to report after submitting VAS
  };

  if (assessmentStep === 0) {
    return (
      <div className="flex flex-col h-full bg-black text-white relative">
        <div className="absolute top-12 left-4 right-4 z-20 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-all">
            <X size={20} />
          </button>
          <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium border border-white/10 flex items-center gap-2 shadow-sm">
            <Activity size={16} className="text-blue-400" />
            <span>标准下蹲演示</span>
          </div>
          <div className="w-10" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Mock video container */}
          <div className="w-full aspect-[9/16] bg-gray-900 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
            
            <video 
              ref={videoRef}
              className="w-full h-full object-cover opacity-80"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              playsInline
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
                className="absolute z-20 w-20 h-20 bg-blue-600/80 rounded-full flex items-center justify-center backdrop-blur-md text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-95 transition-all"
              >
                <Play size={40} className="ml-2" />
              </button>
            )}

            {/* Instruction Overlay */}
            <div className="absolute bottom-32 left-0 right-0 z-20 px-8 text-center">
              <h2 className="text-2xl font-bold mb-3 drop-shadow-md">请观看并模仿下蹲动作</h2>
              <p className="text-gray-300 text-sm leading-relaxed drop-shadow">
                双脚与肩同宽，背部挺直<br />
                下蹲至膝盖弯曲约90度，不要超过脚尖
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-4 right-4 z-20">
          <button 
            onClick={handleFinishVideo}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] active:scale-95 transition-transform flex justify-center items-center gap-2 text-[16px]"
          >
            我已完成动作 <CheckCircle2 size={20} />
          </button>
        </div>
      </div>
    );
  }

  // VAS Assessment Step (AssessmentStep 1)
  return (
    <div className="flex flex-col h-full bg-[#F5F7FA] dark:bg-[#121212] overflow-y-auto pb-24 transition-colors">
      <div className="bg-white dark:bg-[#1E1E1E] px-5 pt-12 pb-4 shadow-sm sticky top-0 z-20">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setAssessmentStep(0)} className="p-2 -ml-2 text-gray-600 dark:text-gray-300 active:scale-95">
            <X size={24} />
          </button>
          <div className="font-bold text-[16px] dark:text-[#F5F5F5]">康养后评估 (VAS)</div>
          <div className="w-10"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 bg-blue-500 rounded-full"></div>
          <div className="h-1 flex-1 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      <div className="p-5 space-y-8 animate-in slide-in-from-right-8 duration-500">
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 dark:text-[#F5F5F5] mb-2">现在的疼痛程度？</h2>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-8">请根据刚才的动作体验，拖动滑块选择当前的疼痛指数</p>
          <PainSlider value={vasScore} onChange={setVasScore} />
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-[#2C2C2C]">
          <h3 className="font-bold text-gray-900 dark:text-[#F5F5F5] mb-4">整体感觉如何？</h3>
          <div className="grid grid-cols-3 gap-3">
            {['更舒服', '没变化', '更不适'].map(opt => (
              <button
                key={opt}
                onClick={() => setGlobalFeeling(opt as any)}
                className={`py-3 rounded-xl text-sm font-medium transition-all ${
                  globalFeeling === opt 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#2C2C2C]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-[#F5F5F5] mb-4">运动强度感觉？</h3>
          <div className="grid grid-cols-3 gap-3">
            {['太轻', '刚好', '有点强'].map(opt => (
              <button
                key={opt}
                onClick={() => setIntensityFeeling(opt as any)}
                className={`py-3 rounded-xl text-sm font-medium transition-all ${
                  intensityFeeling === opt 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#2C2C2C]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-[#F5F5F5] mb-4">有不良反应吗？（多选）</h3>
          <div className="grid grid-cols-2 gap-3">
            {adverseOptions.map(opt => (
              <button
                key={opt}
                onClick={() => toggleAdverse(opt)}
                className={`py-3 rounded-xl text-sm font-medium transition-all ${
                  adverseReactions.includes(opt)
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#2C2C2C]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-lg border-t border-gray-100 dark:border-[#2C2C2C] max-w-md mx-auto">
        <button 
          onClick={submitVas}
          className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-[16px] shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
        >
          查看康养报告
        </button>
      </div>
    </div>
  );
}