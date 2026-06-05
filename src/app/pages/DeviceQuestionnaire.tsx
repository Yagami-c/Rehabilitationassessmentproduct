import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, AlertCircle, CheckCircle2, Info, Smile, Meh, Frown, Annoyed, Angry, Play } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Slider } from '../components/ui/slider';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import image16 from '../../imports/image-16.png';
import image17 from '../../imports/image-17.png';
import image5 from '../../imports/image-5.png';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
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

    if (step === 5) {
      if (isFirstTime === null) return;
      setStep(6);
      return;
    }

    if (step === 6) {
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

        {step === 6 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col items-center justify-center py-10">
            <div className="w-32 h-32 mb-6">
              <ImageWithFallback src={image16} alt="Device check" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">设备佩戴确认</h2>
            <p className="text-gray-600 text-center mb-10">请确保设备已正确佩戴在膝盖上并开启电源。</p>
            <div className="flex flex-col gap-3 w-full">
              <button onClick={handleNext} className="w-full bg-blue-600 text-white rounded-xl py-3.5 font-bold shadow-sm">
                已戴好并开机，获取推荐模式
              </button>
              <button onClick={() => navigate('/')} className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl py-3.5 font-bold shadow-sm">
                未戴好，退出
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
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

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">下蹲疼痛评分</h2>
            
            <div className="bg-blue-50/50 rounded-2xl p-5 mb-8 border border-blue-100 flex flex-col items-center relative overflow-hidden">
              <div className="text-center mb-4 relative z-10">
                <p className="text-[13px] text-blue-600 font-medium mb-1">在开始正式评估前，请先...</p>
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

            <p className="text-gray-900 font-bold mb-4 text-[16px]">下蹲时，膝盖不适程度是？（0-10分）</p>
            
            <div className="bg-white pt-8 pb-6 px-5 rounded-2xl border border-gray-100 flex flex-col items-center mb-8 shadow-sm">
              {(() => {
                let icon = Smile;
                let color = "text-green-500";
                let bg = "bg-green-50";
                let label = "无痛";
                
                if (squatPain >= 9) {
                  icon = Angry; color = "text-red-600"; bg = "bg-red-50"; label = "剧烈疼痛";
                } else if (squatPain >= 7) {
                  icon = Angry; color = "text-orange-500"; bg = "bg-orange-50"; label = "重度疼痛";
                } else if (squatPain >= 5) {
                  icon = Annoyed; color = "text-amber-500"; bg = "bg-amber-50"; label = "中度疼痛";
                } else if (squatPain >= 3) {
                  icon = Frown; color = "text-yellow-500"; bg = "bg-yellow-50"; label = "轻度疼痛";
                } else if (squatPain >= 1) {
                  icon = Meh; color = "text-lime-500"; bg = "bg-lime-50"; label = "轻微疼痛";
                }

                const Icon = icon;

                return (
                  <div className="flex flex-col items-center w-full mb-8 relative">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${bg}`}>
                      <Icon size={48} className={`${color} transition-transform duration-300 ${squatPain > 0 ? 'scale-110' : ''}`} strokeWidth={1.5} />
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <span className={`text-5xl font-black tabular-nums tracking-tighter ${color}`}>{squatPain}</span>
                      <span className="text-gray-500 font-bold mb-1.5 text-lg">{label}</span>
                    </div>
                  </div>
                );
              })()}

              <Slider 
                value={[squatPain]} 
                max={10} 
                step={1} 
                onValueChange={(val) => setSquatPain(val[0])} 
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
                  <div key={item.val} className="flex flex-col items-center w-8 cursor-pointer" onClick={() => setSquatPain(item.val)}>
                    <span className={`mb-1 transition-colors ${squatPain === item.val ? item.color + " font-bold text-[13px]" : ""}`}>{item.val}</span>
                    <span className={`whitespace-nowrap transition-all ${squatPain === item.val ? item.color + " font-bold" : "scale-90"}`}>{item.text}</span>
                  </div>
                ))}
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
              className="w-full mt-8 bg-blue-600 text-white rounded-xl py-3.5 font-bold shadow-sm active:scale-[0.98] transition-transform"
            >
              下一步
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-8 mt-2">
              <h2 className="text-[22px] font-extrabold text-gray-900 mb-2">你更接近哪种体型？</h2>
              <p className="text-gray-500 text-[14px]">请选择最符合你的��型</p>
            </div>

            <div className="flex gap-2 justify-between">
              {[
                { 
                  text: "偏瘦", 
                  value: -1, 
                  desc: "身材偏瘦，四肢较细\n脂肪较少，肌肉不明显",
                },
                { 
                  text: "中等", 
                  value: 0, 
                  desc: "身材匀称，肌肉和脂肪\n分布均衡",
                },
                { 
                  text: "偏厚", 
                  value: 1, 
                  desc: "身材偏厚，脂肪较多\n肌肉不明显，线条偏圆润",
                },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setBodyType(option.value)}
                  className={`relative flex-1 flex flex-col items-center rounded-2xl border-2 transition-all bg-white pb-5 overflow-hidden ${bodyType === option.value ? 'border-blue-500 shadow-md ring-2 ring-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className="w-full aspect-[4/5] bg-[#f8f9fa] relative overflow-hidden mb-3 border-b border-gray-50">
                     <img 
                       src={image5} 
                       className="absolute pointer-events-none max-w-none" 
                       style={{ 
                         width: '320%',
                         height: 'auto',
                         left: option.value === -1 ? '0%' : option.value === 0 ? '-110%' : '-220%',
                         top: '-25%'
                       }} 
                       alt={option.text}
                     />
                  </div>
                  
                  <div className="px-2 flex flex-col items-center w-full">
                    <h3 className={`text-[16px] font-extrabold mb-1.5 ${bodyType === option.value ? 'text-blue-600' : 'text-gray-800'}`}>
                      {option.text}
                    </h3>
                    <p className="text-[10px] text-gray-500 text-center leading-relaxed h-12 flex items-center justify-center whitespace-pre-line mb-4">
                      {option.desc}
                    </p>
                    
                    <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${bodyType === option.value ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}>
                      {bodyType === option.value && <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-in zoom-in duration-200"></div>}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              <Info size={14} />
              <span>软组织厚度会影响负压传导效果，请如实选择</span>
            </div>

            <button 
              onClick={handleNext}
              disabled={bodyType === null}
              className="w-full mt-6 bg-blue-600 disabled:opacity-50 disabled:active:scale-100 text-white rounded-xl py-3.5 font-bold shadow-sm active:scale-[0.98] transition-transform"
            >
              下一步
            </button>
          </div>
        )}

        {step === 5 && (
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
              下一步
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
