import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Slider } from '../components/ui/slider';
import clsx from 'clsx';

export function SevenDayEval() {
  const navigate = useNavigate();
  const { assessments, preAssessment, addAssessment } = useStore();
  
  const [step, setStep] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(0); // Q1
  const [worstActionNow, setWorstActionNow] = useState(''); // Q2
  const [q3Level, setQ3Level] = useState(0); // Q3
  const [stiffnessNow, setStiffnessNow] = useState(''); // Q4
  const [intensityFeel, setIntensityFeel] = useState(''); // Q5
  const [adverseFlags, setAdverseFlags] = useState<string[]>([]); // Q6
  
  const getCycleBaseline = () => {
    if (assessments.length === 0) {
      return {
        action: preAssessment?.worstAction || '下蹲',
        level: preAssessment?.worstActionLevel || 3
      };
    }
    const last = assessments[assessments.length - 1];
    return {
      action: last.worstActionNow,
      level: last.currentLevel
    };
  };

  const baseline = getCycleBaseline();

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2 && worstActionNow) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4 && stiffnessNow) {
      setStep(5);
    } else if (step === 5 && intensityFeel) {
      setStep(6);
    } else if (step === 6 && adverseFlags.length > 0) {
      // Calculate improvement
      const delta = currentLevel - baseline.level;
      let improvement = '';
      if (delta <= -2) {
        improvement = '明显改善';
      } else if (delta === -1) {
        improvement = '轻度改善';
      } else if (delta === 0) {
        improvement = '基本稳定';
      } else {
        improvement = '状态下降';
      }

      // Save assessment
      addAssessment({
        date: new Date().toISOString(),
        baselineAction: baseline.action,
        baselineLevel: baseline.level,
        currentLevel,
        worstActionNow,
        q3Level,
        stiffnessNow,
        intensityFeel,
        adverseFlags,
        improvement
      });
      setStep(7);
    }
  };

  const toggleAdverse = (opt: string) => {
    setAdverseFlags(prev => {
      if (opt === '没有以上情况') {
        return prev.includes(opt) ? [] : [opt];
      }
      const newArr = prev.includes(opt) 
        ? prev.filter(i => i !== opt) 
        : [...prev.filter(i => i !== '没有以上情况'), opt];
      return newArr;
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Q1: 周期进度对比</h2>
            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <p className="text-sm text-blue-800 font-medium">本次评估周期基准：</p>
              <p className="text-sm text-blue-900 mt-1">最困扰动作“<strong>{baseline.action}</strong>”，之前不适程度 <strong>{baseline.level}</strong>/4。</p>
            </div>
            <p className="text-gray-700 font-bold mb-8">现在，再次做这个动作时，不适程度是多少？（0-4）</p>
            <div className="flex-1">
              <div className="text-center mb-6 text-[48px] font-black text-blue-600">{currentLevel}</div>
              <Slider value={[currentLevel]} max={4} step={1} onValueChange={(val) => setCurrentLevel(val[0])} className="mb-4" />
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>0 无痛</span>
                <span>4 严重</span>
              </div>
            </div>
            <button onClick={handleNext} className="w-full py-4 bg-[#2C7CFF] text-white rounded-xl font-bold mt-8 shadow-sm">确认</button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Q2: 当前困扰动作</h2>
            <p className="text-gray-700 mb-4">目前最易让膝盖不舒服的动作是？</p>
            <div className="flex-1 space-y-3">
              {['下楼梯', '上楼梯', '下蹲', '久坐后站起', '跑步/运动', '已没有明显诱因'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setWorstActionNow(opt)}
                  className={clsx("w-full p-4 rounded-xl border text-left", worstActionNow === opt ? "border-blue-600 bg-blue-50 text-blue-700 font-bold" : "border-gray-200 bg-white text-gray-700")}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button onClick={handleNext} disabled={!worstActionNow} className="w-full py-4 bg-[#2C7CFF] disabled:opacity-50 text-white rounded-xl font-bold mt-8 shadow-sm">下一步</button>
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Q3: 当前困扰动作程度</h2>
            <p className="text-gray-700 font-bold mb-8">做“<strong>{worstActionNow}</strong>”时，你的不适程度是？（0-4）</p>
            <div className="flex-1">
              <div className="text-center mb-6 text-[48px] font-black text-blue-600">{q3Level}</div>
              <Slider value={[q3Level]} max={4} step={1} onValueChange={(val) => setQ3Level(val[0])} className="mb-4" />
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>0 无痛</span>
                <span>4 严重</span>
              </div>
            </div>
            <button onClick={handleNext} className="w-full py-4 bg-[#2C7CFF] text-white rounded-xl font-bold mt-8 shadow-sm">确认</button>
          </motion.div>
        );

      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Q4: 紧张感评估</h2>
            <p className="text-gray-700 mb-4">你现在是否仍感觉膝盖有点紧或活动不开？</p>
            <div className="flex-1 space-y-3">
              {['没有', '有一点', '明显'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setStiffnessNow(opt)}
                  className={clsx("w-full p-4 rounded-xl border text-left", stiffnessNow === opt ? "border-blue-600 bg-blue-50 text-blue-700 font-bold" : "border-gray-200 bg-white text-gray-700")}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button onClick={handleNext} disabled={!stiffnessNow} className="w-full py-4 bg-[#2C7CFF] disabled:opacity-50 text-white rounded-xl font-bold mt-8 shadow-sm">确认</button>
          </motion.div>
        );

      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Q5: 强度匹配度</h2>
            <p className="text-gray-700 mb-4">当前模式强度感觉如何？（针对最近一次使用的强度）</p>
            <div className="flex-1 space-y-3">
              {['太轻', '合适', '偏强'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setIntensityFeel(opt)}
                  className={clsx("w-full p-4 rounded-xl border text-left", intensityFeel === opt ? "border-blue-600 bg-blue-50 text-blue-700 font-bold" : "border-gray-200 bg-white text-gray-700")}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button onClick={handleNext} disabled={!intensityFeel} className="w-full py-4 bg-[#2C7CFF] disabled:opacity-50 text-white rounded-xl font-bold mt-8 shadow-sm">确认</button>
          </motion.div>
        );

      case 6:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Q6: 异常排查</h2>
            <p className="text-gray-700 mb-4">最近是否出现以下情况？（可多选）</p>
            <div className="flex-1 space-y-3">
              {['明显疼痛增加', '皮肤明显不适', '膝盖肿胀或发热', '没有以上情况'].map(opt => (
                <button
                  key={opt}
                  onClick={() => toggleAdverse(opt)}
                  className={clsx("w-full p-4 flex justify-between items-center rounded-xl border text-left", adverseFlags.includes(opt) ? "border-blue-600 bg-blue-50 text-blue-700 font-bold" : "border-gray-200 bg-white text-gray-700")}
                >
                  <span>{opt}</span>
                  <div className={clsx("w-5 h-5 rounded-md border flex items-center justify-center", adverseFlags.includes(opt) ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300")}>
                    {adverseFlags.includes(opt) && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={handleNext} disabled={adverseFlags.length === 0} className="w-full py-4 bg-[#2C7CFF] disabled:opacity-50 text-white rounded-xl font-bold mt-8 shadow-sm">提交评估</button>
          </motion.div>
        );

      case 7: {
        const delta = currentLevel - baseline.level;
        let improvement = '';
        let improvementColor = '';
        let improvementBg = '';
        let improvementText = '';

        if (delta <= -2) {
          improvement = '明显改善';
          improvementColor = 'text-green-700';
          improvementBg = 'bg-green-50';
          improvementText = '明显改善！不适明显减轻，说明当前方案正在发挥积极作用。';
        } else if (delta === -1) {
          improvement = '轻度改善';
          improvementColor = 'text-blue-700';
          improvementBg = 'bg-blue-50';
          improvementText = '轻度改善，不适较周期开始有所减轻，建议继续坚持。';
        } else if (delta === 0) {
          improvement = '基本稳定';
          improvementColor = 'text-gray-700';
          improvementBg = 'bg-gray-100';
          improvementText = '目前尚未观察到明显变化，建议继续坚持使用。';
        } else {
          improvement = '状态下降';
          improvementColor = 'text-orange-700';
          improvementBg = 'bg-orange-50';
          improvementText = '状态下降，系统将根据你的反馈进一步调整方案。';
        }

        const actionChanged = worstActionNow !== baseline.action;

        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="text-[#00C853]" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">综合评估报告</h2>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">周期变化对比</h3>
                <span className={clsx("text-sm font-bold px-2 py-1 rounded-md", improvementBg, improvementColor)}>{improvement}</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">做"{baseline.action}"不适感</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800 font-medium">{baseline.level}/4</span>
                    <span className="text-gray-400">→</span>
                    <span className={clsx("font-bold", delta < 0 ? "text-green-600" : delta === 0 ? "text-gray-800" : "text-orange-600")}>{currentLevel}/4</span>
                  </div>
                </div>
              </div>
              
              <div className={clsx("mt-6 p-4 rounded-xl text-sm", improvementBg, improvementColor)}>
                <p>{improvementText}</p>
                {actionChanged && (
                  <p className="mt-2 pt-2 border-t border-black/10">相比上一个周期，主要困扰点从“{baseline.action}”转移到了“{worstActionNow}”。</p>
                )}
                <p className="mt-2 text-xs opacity-80">下一阶段将继续根据你的每日反馈微调强度。</p>
              </div>
            </div>

            <button onClick={() => navigate('/')} className="w-full mt-auto py-4 bg-[#2C7CFF] text-white rounded-xl font-bold shadow-sm active:scale-95 transition-transform">
              完成评估并进入下一天
            </button>
          </motion.div>
        );
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F7FA] font-sans">
      <div className="h-14 flex items-center px-4 bg-white sticky top-0 z-20 shadow-sm shrink-0">
        <button onClick={() => step > 1 && step < 7 ? setStep(s => s - 1) : navigate(-1)} className="p-2 -ml-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h1 className="flex-1 text-center font-bold text-[17px] text-[#1A1A1A] pr-8">阶段综合评估</h1>
      </div>

      <div className="flex-1 p-5 overflow-y-auto">
        {renderStep()}
      </div>
    </div>
  );
}
