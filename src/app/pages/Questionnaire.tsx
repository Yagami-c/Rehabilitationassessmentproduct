import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppStore } from '../store';
import { Button } from '../components/ui/button';
import { ChevronLeft, ArrowRight, Check } from 'lucide-react';
import { Slider } from '../components/ui/slider';

const symptomsOptions = ['颈部疼痛', '肩部受限', '腰部酸痛', '膝关节疼痛', '踝关节扭伤'];
const historyOptions = ['无既往病史', '有关节手术史', '有长期劳损史', '有高血压等慢病'];

export function Questionnaire() {
  const navigate = useNavigate();
  const { assessment, setAssessment } = useAppStore();
  
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState<string[]>(assessment.symptoms);
  const [painLevel, setPainLevel] = useState(assessment.painLevel || 0);
  const [history, setHistory] = useState<string[]>(assessment.history);

  const toggleSymptom = (sym: string) => {
    setSymptoms(prev => prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]);
  };

  const toggleHistory = (h: string) => {
    setHistory(prev => prev.includes(h) ? prev.filter(i => i !== h) : [...prev, h]);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setAssessment({ symptoms, painLevel, history });
      navigate('/assessment/motion');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center px-4 h-14 border-b border-gray-100">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h2 className="flex-1 text-center font-medium text-lg">健康评估</h2>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Progress */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600">步骤 {step} / 3</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-bold mb-6 text-gray-800">请选择您的症状部位</h3>
            <div className="space-y-3">
              {symptomsOptions.map(option => {
                const isSelected = symptoms.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => toggleSymptom(option)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border ${isSelected ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700'} transition-colors`}
                  >
                    <span className="font-medium">{option}</span>
                    {isSelected && <Check size={20} className="text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-bold mb-6 text-gray-800">当前疼痛评分 (VAS)</h3>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center">
              <span className="text-5xl font-bold text-blue-600 mb-2">{painLevel}</span>
              <span className="text-sm text-gray-500 mb-8">
                {painLevel === 0 ? '无痛' : painLevel < 4 ? '轻度疼痛' : painLevel < 7 ? '中度疼痛' : '重度疼痛'}
              </span>
              <Slider 
                value={[painLevel]} 
                max={10} 
                step={1} 
                onValueChange={(val) => setPainLevel(val[0])} 
                className="w-full"
              />
              <div className="w-full flex justify-between mt-3 text-xs text-gray-400">
                <span>0 (无痛)</span>
                <span>10 (剧痛)</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-bold mb-6 text-gray-800">既往病史采集</h3>
            <div className="space-y-3">
              {historyOptions.map(option => {
                const isSelected = history.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => toggleHistory(option)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border ${isSelected ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700'} transition-colors`}
                  >
                    <span className="font-medium">{option}</span>
                    {isSelected && <Check size={20} className="text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100 bg-white">
        <Button 
          onClick={handleNext} 
          disabled={step === 1 && symptoms.length === 0}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-xl flex items-center justify-center gap-2"
        >
          {step === 3 ? '完成并进入评估' : '下一步'}
          {step !== 3 && <ArrowRight size={20} />}
        </Button>
      </div>
    </div>
  );
}
