import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, CheckCircle2, ChevronRight, Check, Play, Lock } from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';
import { useStore } from '../store/useStore';
import jointDeviceImg from '../../imports/image-19.png';
import ledDeviceImg from '../../imports/image-20.png';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// 提取疼痛滑动组件，以符合视觉规范
export function PainSlider({ value, onChange }: { value: number, onChange: (val: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons > 0 && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = Math.max(0, Math.min(rect.width, x));
      const percentage = x / rect.width;
      const newValue = Math.round(percentage * 10);
      onChange(newValue);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = Math.max(0, Math.min(rect.width, x));
      const percentage = x / rect.width;
      const newValue = Math.round(percentage * 10);
      onChange(newValue);
    }
  };

  const painLabels: Record<number, string> = {
    0: '无痛',
    2: '轻微疼痛',
    4: '轻度疼痛',
    6: '中度疼痛',
    8: '重度疼痛',
    10: '剧烈疼痛'
  };

  const painEmojis: Record<number, string> = {
    0: '😄',
    2: '😊',
    4: '🙂',
    6: '😐',
    8: '😟',
    10: '😣'
  };

  const getPainColor = (val: number) => {
    if (val === 0) return '#10B981'; // Green
    if (val <= 2) return '#84CC16'; // Light Green
    if (val <= 4) return '#EAB308'; // Yellow
    if (val <= 6) return '#F59E0B'; // Orange
    if (val <= 8) return '#EF4444'; // Red
    return '#991B1B'; // Dark Red
  };

  return (
    <div className="relative w-full pt-4 pb-20 px-2 touch-none select-none">
      {/* Current Score Display Header */}
      <div className="w-full flex justify-center mb-6">
        <div className="text-[64px] font-black tabular-nums tracking-tighter leading-none" style={{ color: getPainColor(value) }}>
          {value}
        </div>
      </div>

      {/* Track & Interaction Area */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="relative w-full h-8 flex items-center cursor-pointer mb-2"
      >
        {/* Gradient Track */}
        <div className="w-full h-2.5 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 shadow-inner"></div>
        
        {/* Custom Thumb */}
        <div 
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-150 ease-out z-10"
          style={{ left: `${(value / 10) * 100}%` }}
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-[5px] transition-colors" style={{ borderColor: getPainColor(value) }}></div>
        </div>
      </div>

      {/* Number Labels, Emojis & Text Below Track */}
      <div className="w-full relative mt-1">
        <div className="flex justify-between w-full relative">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <div key={num} className="flex flex-col items-center justify-start relative" style={{ width: '0px' }}>
              {/* Number */}
              <span className={clsx(
                "text-sm transition-colors mb-2 leading-none",
                value === num ? "font-bold text-gray-900 text-[16px] -mt-0.5" : "text-gray-400 font-medium"
              )}>
                {num}
              </span>
              
              {/* Key Milestones (Emoji + Text) */}
              {painLabels[num] && (
                <div className="absolute top-8 flex flex-col items-center w-16">
                  <span className="text-[24px] leading-none mb-1 opacity-90">{painEmojis[num]}</span>
                  <span 
                    className="text-[11px] whitespace-nowrap font-bold" 
                    style={{ color: getPainColor(num) }}
                  >
                    {painLabels[num]}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConditionForm() {
  const navigate = useNavigate();
  const { setPreAssessment, calculatePreAssessmentLevel, updateProfile } = useStore();
  const [step, setStep] = useState(1);
  
  // Step 1: Basic Info
  const [basicInfo, setBasicInfo] = useState({
    nickname: '',
    gender: 'Male',
    age: '28',
    height: '175',
    weight: '70'
  });

  // Step 2: Genetic History
  const [geneticHistory, setGeneticHistory] = useState<string[]>([]);
  const [otherGenetic, setOtherGenetic] = useState('');

  // Step 3: Past History
  const [pastHistory, setPastHistory] = useState<string[]>([]);
  const [otherPast, setOtherPast] = useState('');
  const [sportsInjury, setSportsInjury] = useState('');

  // Step 4: Device Selection
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const nextStep = () => {
    if (step === 1) {
      if (!basicInfo.nickname.trim()) return alert("请输入个人昵称");
      if (!basicInfo.age || !basicInfo.height || !basicInfo.weight) return alert("请填写完整的身体数据");
      setStep(2);
    } else if (step === 2) {
      if (geneticHistory.length === 0) return alert("请至少选择一项遗传病史");
      setStep(3);
    } else if (step === 3) {
      if (pastHistory.length === 0) return alert("请至少选择一项既往史");
      setStep(4);
    } else if (step === 4) {
      if (!selectedDevice) return alert("请选择设备，或点击下方跳过");
      submitForm();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

  const submitForm = () => {
    const numAge = parseInt(basicInfo.age) || 28;
    const numHeight = parseInt(basicInfo.height) || 175;
    const numWeight = parseInt(basicInfo.weight) || 70;
    const bmi = numWeight / ((numHeight / 100) * (numHeight / 100));

    updateProfile({
      name: basicInfo.nickname,
      gender: basicInfo.gender,
      age: numAge,
      height: numHeight,
      weight: numWeight,
      bmi: parseFloat(bmi.toFixed(2)),
    });

    setPreAssessment({
      redFlags: pastHistory, // Map past history to redFlags/conditions
      deviceWorn: true,
      stiffness: 1,
      squatPainBefore: 2,
      painTriggers: [],
      bodyType: 0,
      isFirstTime: true
    });
    
    calculatePreAssessmentLevel();
    localStorage.setItem('hasCompletedOnboarding', 'true');
    
    toast.success('基础评估完成，请配置您的设备', {
      style: { borderRadius: '12px', padding: '16px' }
    });
    
    if (selectedDevice === 'joint') {
      navigate('/device-questionnaire');
    } else {
      navigate('/');
    }
  };

  const toggleGenetic = (item: string) => {
    if (item === '无') {
      setGeneticHistory(['无']);
    } else {
      setGeneticHistory(prev => {
        const arr = prev.filter(i => i !== '无');
        if (arr.includes(item)) return arr.filter(i => i !== item);
        return [...arr, item];
      });
    }
  };

  const togglePast = (item: string) => {
    if (item === '无') {
      setPastHistory(['无']);
    } else {
      setPastHistory(prev => {
        const arr = prev.filter(i => i !== '无');
        if (arr.includes(item)) return arr.filter(i => i !== item);
        return [...arr, item];
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden relative max-w-md mx-auto shadow-2xl">
      <div className="bg-white px-4 h-14 flex items-center justify-between border-b border-gray-100 shrink-0 shadow-sm z-10">
        <button onClick={prevStep} className="p-2 -ml-2 text-gray-700 active:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">健康评估 ({step}/4)</h1>
        <div className="w-8"></div>
      </div>

      <div className="h-1 bg-gray-100 w-full shrink-0">
        <div className="h-full bg-blue-600 transition-all duration-300 ease-out" style={{ width: `${(step / 4) * 100}%` }} />
      </div>

      <div className="flex-1 overflow-y-auto p-6 scroll-smooth pb-24">
        
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">基本信息</h2>
            <p className="text-sm text-gray-500 mb-6">为了给您提供更准确的康养评估，我们需要了解您的基本情况</p>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">个人昵称</label>
                <input type="text" placeholder="请输入您的昵称" value={basicInfo.nickname} onChange={e => setBasicInfo({...basicInfo, nickname: e.target.value})} className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">性别</label>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setBasicInfo({...basicInfo, gender: 'Male'})}
                    className={clsx("flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all", basicInfo.gender === 'Male' ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-100 bg-white text-gray-600")}
                  >
                    男
                  </button>
                  <button 
                    onClick={() => setBasicInfo({...basicInfo, gender: 'Female'})}
                    className={clsx("flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all", basicInfo.gender === 'Female' ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-100 bg-white text-gray-600")}
                  >
                    女
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">年龄 (岁)</label>
                  <input type="number" value={basicInfo.age} onChange={e => setBasicInfo({...basicInfo, age: e.target.value})} className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-center" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">身高 (cm)</label>
                  <input type="number" value={basicInfo.height} onChange={e => setBasicInfo({...basicInfo, height: e.target.value})} className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-center" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">体重 (kg)</label>
                  <input type="number" value={basicInfo.weight} onChange={e => setBasicInfo({...basicInfo, weight: e.target.value})} className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-center" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Genetic History */}
        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">遗传病史</h2>
            <p className="text-sm text-gray-500 mb-6">为了安全，我们需要了解您的遗传病史（可多选）</p>

            <div className="flex flex-col gap-3">
              {[
                '无',
                '高血压相关遗传',
                '糖尿病相关遗传',
                '心脏病/冠心病',
                '脑卒中家族史',
                '癌症家族史',
                '强直性脊柱炎',
                '血友病',
              ].map(item => (
                <button 
                  key={item} 
                  onClick={() => toggleGenetic(item)} 
                  className={clsx(
                    "flex items-center p-4 rounded-xl border-2 transition-all text-left bg-white", 
                    geneticHistory.includes(item) ? "border-blue-500 bg-blue-50" : "border-transparent shadow-sm"
                  )}
                >
                  <div className={clsx("w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors", geneticHistory.includes(item) ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white")}>
                    {geneticHistory.includes(item) && <Check size={14} className="text-white" />}
                  </div>
                  <span className={clsx("font-medium text-sm flex-1", geneticHistory.includes(item) ? "text-blue-700" : "text-gray-700")}>{item}</span>
                </button>
              ))}
              
              <div className={clsx(
                "flex flex-col p-4 rounded-xl border-2 transition-all bg-white", 
                geneticHistory.includes('其他') ? "border-blue-500 bg-blue-50" : "border-transparent shadow-sm"
              )}>
                <button onClick={() => toggleGenetic('其他')} className="flex items-center text-left w-full">
                  <div className={clsx("w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors", geneticHistory.includes('其他') ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white")}>
                    {geneticHistory.includes('其他') && <Check size={14} className="text-white" />}
                  </div>
                  <span className={clsx("font-medium text-sm", geneticHistory.includes('其他') ? "text-blue-700" : "text-gray-700")}>其他（可填写）</span>
                </button>
                {geneticHistory.includes('其他') && (
                  <input 
                    type="text" 
                    value={otherGenetic}
                    onChange={(e) => setOtherGenetic(e.target.value)}
                    placeholder="请输入其他疾病..." 
                    className="mt-3 ml-8 h-10 border-b border-gray-300 bg-transparent text-sm focus:outline-none focus:border-blue-500"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Past History */}
        {step === 3 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">既往史</h2>
            <p className="text-sm text-gray-500 mb-6">侧重康养相关，请勾选您曾有过的状况（可多选）</p>

            <div className="flex flex-col gap-3">
              {[
                '无',
                '骨折/骨裂',
                '关节脱位/半脱位',
                '关节镜手术（如半月板、韧带修复）',
                '关节置换术（髋/膝/肩）',
                '椎间盘突出/腰椎手术',
                '脑卒中（中风）',
                '心肌梗死/心脏手术',
                '慢性疼痛综合征',
              ].map(item => (
                <button 
                  key={item} 
                  onClick={() => togglePast(item)} 
                  className={clsx(
                    "flex items-center p-4 rounded-xl border-2 transition-all text-left bg-white", 
                    pastHistory.includes(item) ? "border-blue-500 bg-blue-50" : "border-transparent shadow-sm"
                  )}
                >
                  <div className={clsx("w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors", pastHistory.includes(item) ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white")}>
                    {pastHistory.includes(item) && <Check size={14} className="text-white" />}
                  </div>
                  <span className={clsx("font-medium text-sm flex-1", pastHistory.includes(item) ? "text-blue-700" : "text-gray-700")}>{item}</span>
                </button>
              ))}

              <div className={clsx(
                "flex items-center p-4 rounded-xl border-2 transition-all bg-white text-left", 
                pastHistory.includes('运动损伤手术史') ? "border-blue-500 bg-blue-50" : "border-transparent shadow-sm"
              )}>
                <button onClick={() => togglePast('运动损伤手术史')} className="flex items-center text-left w-full">
                  <div className={clsx("w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors", pastHistory.includes('运动损伤手术史') ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white")}>
                    {pastHistory.includes('运动损伤手术史') && <Check size={14} className="text-white" />}
                  </div>
                  <span className={clsx("font-medium text-sm", pastHistory.includes('运动损伤手术史') ? "text-blue-700" : "text-gray-700")}>运动损伤手术史</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Device Selection */}
        {step === 4 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">选择您的设备</h2>
            <p className="text-sm text-gray-500 mb-8 text-center">我们将根据您选择的设备进行针对性康养评估</p>

            <div className="space-y-6">
              {/* Card 1: Joint Device */}
              <button 
                onClick={() => setSelectedDevice('joint')}
                className={clsx(
                  "w-full rounded-2xl relative overflow-hidden transition-all focus:outline-none",
                  selectedDevice === 'joint' ? "ring-2 ring-blue-600 ring-offset-2 scale-[0.98]" : "hover:scale-[0.99]"
                )}
              >
                <ImageWithFallback src={jointDeviceImg} alt="关节自动松动仪" className="w-full h-auto object-cover" />
                
                {selectedDevice === 'joint' && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-1 shadow-md">
                    <CheckCircle2 size={24} />
                  </div>
                )}
              </button>

              {/* Card 2: LED Device */}
              <div 
                className="w-full rounded-2xl relative overflow-hidden opacity-70 cursor-not-allowed"
              >
                <ImageWithFallback src={ledDeviceImg} alt="LED康养仪" className="w-full h-auto object-cover grayscale-[0.3]" />
                
                <div className="absolute top-4 right-4 py-1.5 px-3 bg-gray-900/60 backdrop-blur-sm text-white rounded-full text-xs font-medium flex items-center gap-1.5">
                  <Lock size={12} />
                  敬请期待
                </div>
              </div>

              <button 
                onClick={() => submitForm()}
                className="w-full h-10 mt-2 bg-transparent text-gray-400 font-medium text-[13px] flex items-center justify-center transition-all active:text-gray-600"
              >
                暂无设备，跳过
              </button>
            </div>
          </div>
        )}

      </div>

      <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-100 z-10 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] pb-safe flex flex-col gap-3">
        <button 
          onClick={nextStep} 
          className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold text-[16px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-200"
        >
          {step === 4 ? (
            <>
              <Play size={18} className="fill-current" /> 开始评估
            </>
          ) : (
            <>
              下一步 <ChevronRight size={18} />
            </>
          )}
        </button>
        {step < 4 && (
          <button 
            onClick={() => {
              const currentPoints = useStore.getState().points || 0;
              useStore.getState().setPoints(currentPoints + 50);
              
              if (step === 1) {
                updateProfile({
                  name: '匿名用户',
                  gender: 'Male',
                  age: 30,
                  height: 170,
                  weight: 65,
                  bmi: 22.5
                });
              }
              nextStep();
            }}
            className="w-full h-8 bg-transparent text-gray-400 font-medium text-[13px] flex items-center justify-center transition-all active:text-gray-600"
          >
            跳过此步 (送50积分)
          </button>
        )}
      </div>
    </div>
  );
}