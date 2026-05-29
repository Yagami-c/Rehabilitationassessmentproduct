import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { useStore } from '../store/useStore';
import bodyTypeThin from '../../imports/image-4.png';
import bodyTypeMedium from '../../imports/image-6.png';
import bodyTypeThick from '../../imports/image-7.png';

export function ConditionModal({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [bodyType, setBodyType] = useState<number | null>(null);
  const [geneticHistory, setGeneticHistory] = useState<string[]>([]);
  const [pastHistory, setPastHistory] = useState<string[]>([]);
  const [otherGenetic, setOtherGenetic] = useState('');
  const [otherPast, setOtherPast] = useState('');
  const [sportsInjury, setSportsInjury] = useState('');

  const handleNext = () => {
    if (step === 1 && bodyType === null) return alert("请选择体型");
    if (step === 2 && geneticHistory.length === 0) return alert("请至少选择一项遗传病史");
    if (step === 3 && pastHistory.length === 0) return alert("请至少选择一项既往史");
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleGenetic = (item: string) => {
    if (item === '无') {
      setGeneticHistory(['无']);
    } else {
      setGeneticHistory(prev => {
        const arr = prev.filter(i => i !== '无');
        if (arr.includes(item)) {
          return arr.filter(i => i !== item);
        }
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
        if (arr.includes(item)) {
          return arr.filter(i => i !== item);
        }
        return [...arr, item];
      });
    }
  };

  const variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <button onClick={handlePrev} className={clsx("p-2 -ml-2 text-gray-500 rounded-full", step === 1 && "invisible")}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold text-gray-900">健康评估 ({step}/3)</h2>
          <div className="w-10"></div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100 w-full shrink-0">
          <div className="h-full bg-blue-600 transition-all duration-300 ease-out" style={{ width: `${(step / 3) * 100}%` }} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto relative bg-gray-50/50">
          <AnimatePresence custom={1} mode="wait">
            
            {step === 1 && (
              <motion.div
                key="step1"
                custom={1}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-6 flex flex-col"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">请选择你的体型</h3>
                  <p className="text-sm text-gray-500">这有助于我们更精准地计算康养设备的负压传导参数</p>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { label: '偏瘦', value: -1, desc: '身材偏瘦，四肢较细，脂肪较少', img: bodyTypeThin },
                    { label: '中等', value: 0, desc: '身材匀称，肌肉和脂肪分布均衡', img: bodyTypeMedium },
                    { label: '偏厚', value: 1, desc: '身材偏厚，脂肪较多，线条偏圆润', img: bodyTypeThick }
                  ].map(opt => (
                    <button 
                      key={opt.value} 
                      onClick={() => setBodyType(opt.value)} 
                      className={clsx(
                        "flex items-center p-3 rounded-2xl border-2 transition-all text-left bg-white", 
                        bodyType === opt.value ? "border-blue-600 bg-blue-50/50 shadow-md shadow-blue-100" : "border-gray-100 shadow-sm"
                      )}
                    >
                      <div className="w-16 h-20 rounded-lg bg-gray-50 overflow-hidden shrink-0 mr-4 relative">
                        <img src={opt.img} alt={opt.label} className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className={clsx("text-lg font-bold mb-1", bodyType === opt.value ? "text-blue-600" : "text-gray-800")}>{opt.label}</h4>
                        <p className="text-[12px] text-gray-500">{opt.desc}</p>
                      </div>
                      <div className={clsx("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 transition-colors", bodyType === opt.value ? "border-blue-600 bg-blue-600" : "border-gray-300")}>
                        {bodyType === opt.value && <Check size={14} className="text-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={1}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-6 flex flex-col"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">遗传病史</h3>
                  <p className="text-sm text-gray-500">为了安全，我们需要了解您的遗传病史（多选）</p>
                </div>

                <div className="flex-1 overflow-y-auto pb-4 -mx-2 px-2 custom-scrollbar">
                  <div className="flex flex-col gap-3">
                    {[
                      '无',
                      '高血压相关遗传',
                      '糖尿病相关遗传',
                      '心脏病/冠心病',
                      '脑卒中家族史',
                      '癌症（乳腺、结直肠、肺等）家族史',
                      '强直性脊柱炎',
                      '血友病',
                      '地中海贫血',
                    ].map(item => (
                      <button 
                        key={item} 
                        onClick={() => toggleGenetic(item)} 
                        className={clsx(
                          "flex items-center p-4 rounded-xl border transition-all text-left bg-white", 
                          geneticHistory.includes(item) ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        )}
                      >
                        <div className={clsx("w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors", geneticHistory.includes(item) ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white")}>
                          {geneticHistory.includes(item) && <Check size={14} className="text-white" />}
                        </div>
                        <span className={clsx("font-medium text-sm flex-1", geneticHistory.includes(item) ? "text-blue-700" : "text-gray-700")}>{item}</span>
                      </button>
                    ))}
                    
                    {/* 其他项 */}
                    <div className={clsx(
                      "flex flex-col p-4 rounded-xl border transition-all bg-white", 
                      geneticHistory.includes('其他') ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    )}>
                      <button onClick={() => toggleGenetic('其他')} className="flex items-center text-left w-full">
                        <div className={clsx("w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors", geneticHistory.includes('其他') ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white")}>
                          {geneticHistory.includes('其他') && <Check size={14} className="text-white" />}
                        </div>
                        <span className={clsx("font-medium text-sm", geneticHistory.includes('其他') ? "text-blue-700" : "text-gray-700")}>其他遗传性疾病（如有，可填写）</span>
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
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={1}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-6 flex flex-col"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">既往史</h3>
                  <p className="text-sm text-gray-500">侧重康养相关，请勾选您曾有过的状况（多选）</p>
                </div>

                <div className="flex-1 overflow-y-auto pb-4 -mx-2 px-2 custom-scrollbar">
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
                      '慢性疼痛综合征（纤维肌痛等）',
                    ].map(item => (
                      <button 
                        key={item} 
                        onClick={() => togglePast(item)} 
                        className={clsx(
                          "flex items-center p-4 rounded-xl border transition-all text-left bg-white", 
                          pastHistory.includes(item) ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        )}
                      >
                        <div className={clsx("w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors", pastHistory.includes(item) ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white")}>
                          {pastHistory.includes(item) && <Check size={14} className="text-white" />}
                        </div>
                        <span className={clsx("font-medium text-sm flex-1", pastHistory.includes(item) ? "text-blue-700" : "text-gray-700")}>{item}</span>
                      </button>
                    ))}

                    <div className={clsx(
                      "flex flex-col p-4 rounded-xl border transition-all bg-white", 
                      pastHistory.includes('运动损伤手术史') ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    )}>
                      <button onClick={() => togglePast('运动损伤手术史')} className="flex items-center text-left w-full">
                        <div className={clsx("w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors", pastHistory.includes('运动损伤手术史') ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white")}>
                          {pastHistory.includes('运动损伤手术史') && <Check size={14} className="text-white" />}
                        </div>
                        <span className={clsx("font-medium text-sm", pastHistory.includes('运动损伤手术史') ? "text-blue-700" : "text-gray-700")}>运动损伤手术史（注明部位）</span>
                      </button>
                      {pastHistory.includes('运动损伤手术史') && (
                        <input 
                          type="text" 
                          value={sportsInjury}
                          onChange={(e) => setSportsInjury(e.target.value)}
                          placeholder="例如：左膝前交叉韧带重建..." 
                          className="mt-3 ml-8 h-10 border-b border-gray-300 bg-transparent text-sm focus:outline-none focus:border-blue-500"
                        />
                      )}
                    </div>

                    <div className={clsx(
                      "flex flex-col p-4 rounded-xl border transition-all bg-white", 
                      pastHistory.includes('其他') ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    )}>
                      <button onClick={() => togglePast('其他')} className="flex items-center text-left w-full">
                        <div className={clsx("w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors", pastHistory.includes('其他') ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white")}>
                          {pastHistory.includes('其他') && <Check size={14} className="text-white" />}
                        </div>
                        <span className={clsx("font-medium text-sm", pastHistory.includes('其他') ? "text-blue-700" : "text-gray-700")}>其他（可填写）</span>
                      </button>
                      {pastHistory.includes('其他') && (
                        <input 
                          type="text" 
                          value={otherPast}
                          onChange={(e) => setOtherPast(e.target.value)}
                          placeholder="请输入其他疾病..." 
                          className="mt-3 ml-8 h-10 border-b border-gray-300 bg-transparent text-sm focus:outline-none focus:border-blue-500"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
          <button 
            onClick={handleNext}
            className="w-full h-12 bg-blue-600 text-white rounded-xl font-medium text-[16px] shadow-lg shadow-blue-200 active:scale-[0.98] transition-transform"
          >
            {step === 3 ? '完成' : '下一步'}
          </button>
        </div>

      </div>
    </div>
  );
}