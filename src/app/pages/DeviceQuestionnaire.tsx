import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Slider } from '../components/ui/slider';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import image16 from '../../imports/image-16.png';
import image17 from '../../imports/image-17.png';

export function DeviceQuestionnaire() {
  const navigate = useNavigate();
  const { setPreAssessment } = useStore();
  const [step, setStep] = useState(1);

  // Step 1: Red flags
  const [redFlags, setRedFlags] = useState<string[]>([]);
  const redFlagOptions = ["最近2周内有明显受伤", "膝盖明显肿胀", "有伤口或皮肤问题", "医生建议避免使用类似设备", "以上都没有"];

  // Step 2: Device Check
  // Just a confirmation button

  // Step 3: Stiffness
  const [stiffness, setStiffness] = useState<number | null>(null);

  // Step 4: Squat Pain
  const [squatPain, setSquatPain] = useState<number>(0);
  const [painTriggers, setPainTriggers] = useState<string[]>([]);
  const painTriggerOptions = ["上下楼梯", "久坐后站起", "跑步/运动", "没有明显诱因"];

  // Step 5: Body Type
  const [bodyType, setBodyType] = useState<number | null>(null);

  // Step 6: First Time
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  const toggleRedFlag = (flag: string) => {
    if (flag === "以上都没有") {
      setRedFlags(["以上都没有"]);
    } else {
      const newFlags = redFlags.includes(flag) 
        ? redFlags.filter(f => f !== flag) 
        : [...redFlags.filter(f => f !== "以上都没有"), flag];
      setRedFlags(newFlags);
    }
  };

  const toggleTrigger = (trigger: string) => {
    if (trigger === "没有明显诱因") {
      setPainTriggers(["没有明显诱因"]);
    } else {
      const newTriggers = painTriggers.includes(trigger)
        ? painTriggers.filter(t => t !== trigger)
        : [...painTriggers.filter(t => t !== "没有明显诱因"), trigger];
      setPainTriggers(newTriggers);
    }
  };

  const calculateLevel = () => {
    let level = 2;
    // Step 3
    if (stiffness === 1) level = 3;
    if (stiffness === 2) level = 4;

    // Step 4
    if (squatPain >= 7) level = Math.max(1, level - 1);
    else if (squatPain < 4) level = Math.min(6, level + 1);

    // Step 5
    if (bodyType === -1) level = Math.max(1, level - 1);
    else if (bodyType === 1) level = Math.min(6, level + 1);

    // Step 6
    if (isFirstTime) level = Math.min(level, 2);

    return level;
  };

  const handleNext = () => {
    if (step === 1) {
      if (redFlags.length === 0) return;
      if (redFlags.includes("以上都没有")) {
        setStep(2);
      } else {
        alert("存在红旗征，暂时不推荐使用PAD，建议咨询专业人员。");
        navigate('/');
      }
      return;
    }

    if (step === 6) {
      if (isFirstTime === null) return;
      const level = calculateLevel();
      setPreAssessment({ computedLevel: level });
      navigate('/device');
      return;
    }

    setStep(s => s + 1);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 px-4 h-14 flex items-center justify-between shadow-sm">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="p-2 -ml-2 text-gray-700 active:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">配置问卷</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-6 py-4 bg-white mb-2">
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${(step / 6) * 100}%` }}></div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-2">步骤 {step} / 6</div>
      </div>

      <div className="p-5 flex-1">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">安全筛查（红旗征）</h2>
            <p className="text-gray-600 mb-4">以下情况是否符合你？（可多选）</p>
            <div className="space-y-3">
              {redFlagOptions.map(option => (
                <button
                  key={option}
                  onClick={() => toggleRedFlag(option)}
                  className={`w-full flex items-center p-4 rounded-xl border text-left ${redFlags.includes(option) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700'}`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${redFlags.includes(option) ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                    {redFlags.includes(option) && <CheckCircle2 size={16} className="text-white" />}
                  </div>
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={handleNext}
              disabled={redFlags.length === 0}
              className="w-full mt-8 bg-blue-600 disabled:opacity-50 text-white rounded-xl py-3.5 font-bold shadow-sm"
            >
              提交
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col items-center justify-center py-10">
            <div className="w-32 h-32 mb-6">
              <ImageWithFallback src={image16} alt="Device check" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">设备佩戴确认</h2>
            <p className="text-gray-600 text-center mb-10">请确保设备已正确佩戴在膝盖上。</p>
            <div className="flex flex-col gap-3 w-full">
              <button onClick={handleNext} className="w-full bg-blue-600 text-white rounded-xl py-3.5 font-bold shadow-sm">
                已戴好，继续
              </button>
              <button onClick={() => navigate('/')} className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl py-3.5 font-bold shadow-sm">
                未戴好，退出
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">僵硬/紧张程度评估</h2>
            <p className="text-gray-600 mb-6">你是否感觉膝盖有点紧或活动不开？</p>
            <div className="space-y-3">
              {[
                { text: "没有 (0)", value: 0 },
                { text: "有一点 (1)", value: 1 },
                { text: "明显 (2)", value: 2 },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setStiffness(option.value)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left ${stiffness === option.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700'}`}
                >
                  <span className="font-medium">{option.text}</span>
                  {stiffness === option.value && <CheckCircle2 size={20} className="text-blue-600" />}
                </button>
              ))}
            </div>
            <button 
              onClick={handleNext}
              disabled={stiffness === null}
              className="w-full mt-8 bg-blue-600 disabled:opacity-50 text-white rounded-xl py-3.5 font-bold shadow-sm"
            >
              下一步
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">下蹲疼痛评分</h2>
            <p className="text-gray-600 mb-6">当你下蹲时，膝盖不适程度是？（0-10分）</p>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center mb-8">
              <span className="text-5xl font-bold text-blue-600 mb-2">{squatPain}</span>
              <Slider 
                value={[squatPain]} 
                max={10} 
                step={1} 
                onValueChange={(val) => setSquatPain(val[0])} 
                className="w-full mt-4"
              />
              <div className="w-full flex justify-between mt-3 text-xs text-gray-400">
                <span>0 (无痛)</span>
                <span>10 (剧痛)</span>
              </div>
            </div>

            <p className="text-gray-600 mb-4 text-sm">以下哪些动作会让你膝盖不舒服？（可多选）</p>
            <div className="space-y-3">
              {painTriggerOptions.map(option => (
                <button
                  key={option}
                  onClick={() => toggleTrigger(option)}
                  className={`w-full flex items-center p-3 rounded-xl border text-left text-sm ${painTriggers.includes(option) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700'}`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${painTriggers.includes(option) ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                    {painTriggers.includes(option) && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="w-full mt-8 bg-blue-600 text-white rounded-xl py-3.5 font-bold shadow-sm"
            >
              下一步
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">体型评估</h2>
            <div className="w-32 h-32 mx-auto mb-6">
              <ImageWithFallback src={image17} alt="Body type" className="w-full h-full object-contain" />
            </div>
            <p className="text-gray-600 mb-6 text-center text-sm">请选择最符合你的体型<br/>(软组织厚度影响负压传导)</p>
            <div className="space-y-3">
              {[
                { text: "偏瘦", value: -1 },
                { text: "标准（中等）", value: 0 },
                { text: "偏厚", value: 1 },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setBodyType(option.value)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left ${bodyType === option.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700'}`}
                >
                  <span className="font-medium">{option.text}</span>
                  {bodyType === option.value && <CheckCircle2 size={20} className="text-blue-600" />}
                </button>
              ))}
            </div>
            <button 
              onClick={handleNext}
              disabled={bodyType === null}
              className="w-full mt-8 bg-blue-600 disabled:opacity-50 text-white rounded-xl py-3.5 font-bold shadow-sm"
            >
              下一步
            </button>
          </div>
        )}

        {step === 6 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">初次使用限制</h2>
            <p className="text-gray-600 mb-6">你是第一次使用这个设备吗？</p>
            <div className="space-y-3">
              <button
                onClick={() => setIsFirstTime(true)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left ${isFirstTime === true ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700'}`}
              >
                <span className="font-medium">是，我是第一次使用</span>
                {isFirstTime === true && <CheckCircle2 size={20} className="text-blue-600" />}
              </button>
              <button
                onClick={() => setIsFirstTime(false)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left ${isFirstTime === false ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700'}`}
              >
                <span className="font-medium">不是，我以前用过</span>
                {isFirstTime === false && <CheckCircle2 size={20} className="text-blue-600" />}
              </button>
            </div>
            
            {isFirstTime === true && (
              <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-start gap-2">
                <Info size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <span className="text-sm text-blue-800">首次使用为了安全起见，您的推荐强度将被限制在最高中等偏低强度(L2)以内。</span>
              </div>
            )}

            <button 
              onClick={handleNext}
              disabled={isFirstTime === null}
              className="w-full mt-8 bg-blue-600 disabled:opacity-50 text-white rounded-xl py-3.5 font-bold shadow-sm"
            >
              获取推荐模式
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
