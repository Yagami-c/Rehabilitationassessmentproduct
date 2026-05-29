import { useState } from 'react';
import { Info, InfoIcon, ExternalLink, Thermometer, Snowflake, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import image10 from '../../imports/image-10.png';
import image11 from '../../imports/image-11.png';
import image12 from '../../imports/image-12.png';
import image13 from '../../imports/image-13.png';
import image14 from '../../imports/image-14.png';
import image15 from '../../imports/image-15.png';
import image22 from '../../imports/image-22.png';

export function Education() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [showBmiTooltip, setShowBmiTooltip] = useState(false);

  const toggleExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full dark:bg-[#121212] bg-gray-50 pb-24 font-sans overflow-y-auto overflow-x-hidden transition-colors">
      
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-40 dark:bg-[#1E1E1E]/95 bg-white/95 backdrop-blur-md pt-5 pb-4 px-5 shadow-sm border-b dark:border-[#2C2C2C] border-gray-100 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-[20px] font-extrabold dark:text-blue-400 text-blue-900 tracking-tight">快乐生活，“膝膝”相关</h1>
            <p className="text-[12px] dark:text-gray-400 text-gray-500 font-medium mt-1">香港理工大学 傅少娥教授团队 研制</p>
          </div>
          <div className="dark:bg-amber-900/30 bg-amber-50 dark:text-amber-400 text-amber-600 border dark:border-amber-700/50 border-amber-200 px-2 py-1 rounded-md flex items-center gap-1 shrink-0">
            <Info size={12} />
            <span className="text-[10px] font-bold">温馨提示</span>
          </div>
        </div>
        
        <h2 className="text-[15px] font-bold dark:text-[#F5F5F5] text-gray-800 mt-4 mb-2">
          第二部分：养出“健康膝”<br/>
          <span className="text-[13px] dark:text-gray-400 text-gray-500 font-normal">——五大日常养护妙招</span>
        </h2>
      </div>

      <div className="px-5 pt-5 space-y-6">
        
        {/* Summary Text */}
        <div className="dark:bg-[#1E1E1E] bg-white rounded-[16px] p-4 shadow-sm border dark:border-blue-900/30 border-blue-50 relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 dark:bg-blue-900/20 bg-blue-50 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
          <p className="text-[13px] dark:text-gray-300 text-gray-600 leading-relaxed relative z-10">
            除了主动锻炼，聪明的日常养护同样关键。记住这五个妙招，让你的膝盖更<span className="font-bold dark:text-blue-400 text-blue-700">“耐用”</span>。
          </p>
        </div>

        {/* FIVE CARE TIPS */}
        <div className="space-y-[24px]">
          
          {/* Card 1: 减重 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => toggleExpand(1)}
            className="dark:bg-[#1E1E1E] bg-white rounded-[16px] overflow-hidden shadow-sm border dark:border-[#2C2C2C] border-gray-100 cursor-pointer transition-colors"
          >
            <div className="dark:bg-blue-900/20 bg-blue-50/50 px-4 py-3 flex justify-between items-center border-b dark:border-blue-900/30 border-blue-50">
              <span className="font-bold dark:text-blue-400 text-blue-800 text-[14px]">妙招① —— 减重</span>
              {expandedCard === 1 ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
            <div className="p-4">
              <div className="w-full h-40 dark:bg-blue-900/10 bg-blue-50 rounded-xl mb-4 overflow-hidden relative">
                <ImageWithFallback src={image10} alt="Scale weight" className="w-full h-full object-contain dark:opacity-80 mix-blend-multiply dark:mix-blend-normal" />
              </div>
              <p className="text-[14px] dark:text-gray-300 text-gray-700 leading-relaxed relative">
                世界卫生组织指出，身体质量指数BMI
                <span 
                  className="inline-flex items-center text-blue-600 mx-1 align-middle relative"
                  onClick={(e) => { e.stopPropagation(); setShowBmiTooltip(!showBmiTooltip); }}
                >
                  <InfoIcon size={14} className="mr-0.5"/>
                  {showBmiTooltip && (
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-lg z-50 pointer-events-none text-center">
                      BMI = 体重(kg) / 身高(m)的平方。例如：65kg / (1.7m * 1.7m) = 22.5
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </span>
                  )}
                </span>
                （体重kg除以身高m的平方）达到23及以上即超重。<span className="font-bold dark:text-[#F5F5F5] text-gray-900">体重越重，膝盖越累。</span>定个小目标，先从减掉5%开始！
              </p>
              
              <AnimatePresence>
                {expandedCard === 1 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t dark:border-[#2C2C2C] border-gray-50 text-[13px] dark:text-[#9CA3AF] text-gray-500">
                      每减轻1公斤体重，你的膝关节在走路时就能减少约3-4公斤的压力。保持健康的体重是保护膝关节最有效的方法之一。
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Card 2: 冷热敷 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => toggleExpand(2)}
            className="dark:bg-[#1E1E1E] bg-white rounded-[16px] overflow-hidden shadow-sm border dark:border-[#2C2C2C] border-gray-100 cursor-pointer transition-colors"
          >
            <div className="dark:bg-purple-900/20 bg-purple-50/50 px-4 py-3 flex justify-between items-center border-b dark:border-purple-900/30 border-purple-50">
              <span className="font-bold dark:text-purple-400 text-purple-800 text-[14px]">妙招② —— 冷热敷</span>
              {expandedCard === 2 ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
            <div className="p-4">
              <div className="w-full h-40 mb-4 rounded-xl overflow-hidden shadow-sm dark:bg-[#1E1E1E] bg-white">
                <ImageWithFallback src={image11} alt="Hot and cold pack" className="w-full h-full object-contain dark:opacity-80" />
              </div>

              <div className="flex relative items-stretch">
                <div className="flex-1 flex flex-col items-center text-center px-2">
                  <p className="font-bold text-[15px] dark:text-red-400 text-red-600 mb-1">酸、紧、僵</p>
                  <div className="flex items-center gap-1 dark:bg-red-900/20 dark:text-red-400 bg-red-50 text-red-700 text-[11px] font-bold px-2 py-1 rounded-full mb-1">
                    <Thermometer size={12} /> 热敷 10-15分钟
                  </div>
                  <p className="text-[12px] dark:text-gray-400 text-gray-500 mt-1">促进循环</p>
                </div>
                
                <div className="w-[1px] dark:bg-[#2C2C2C] bg-gray-100 self-stretch my-1"></div>
                
                <div className="flex-1 flex flex-col items-center text-center px-2">
                  <p className="font-bold text-[15px] dark:text-blue-400 text-blue-600 mb-1">红、肿、热</p>
                  <div className="flex items-center gap-1 dark:bg-blue-900/20 dark:text-blue-400 bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-1 rounded-full mb-1">
                    <Snowflake size={12} /> 冷敷 10-15分钟
                  </div>
                  <p className="text-[12px] dark:text-gray-400 text-gray-500 mt-1">缓解炎症</p>
                </div>
              </div>

              <AnimatePresence>
                {expandedCard === 2 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-3 border-t dark:border-[#2C2C2C] border-gray-50 text-[13px] dark:text-gray-400 text-gray-500">
                      如果在运动后感觉肌肉酸痛，可以使用热敷来放松肌肉；但如果是急性扭伤或感觉关节发热红肿，请务必使用冷敷来消肿止痛。
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Card 3: 选对鞋子 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => toggleExpand(3)}
            className="dark:bg-[#1E1E1E] bg-white rounded-[16px] overflow-hidden shadow-sm border dark:border-[#2C2C2C] border-gray-100 cursor-pointer transition-colors"
          >
            <div className="dark:bg-emerald-900/20 bg-emerald-50/50 px-4 py-3 flex justify-between items-center border-b dark:border-emerald-900/30 border-emerald-50">
              <span className="font-bold dark:text-emerald-400 text-emerald-800 text-[14px]">妙招③ —— 选对鞋子</span>
              {expandedCard === 3 ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
            <div className="p-4">
              <div className="w-full h-40 dark:bg-[#1E1E1E] bg-white rounded-xl mb-4 overflow-hidden">
                <ImageWithFallback src={image12} alt="Supportive shoes" className="w-full h-full object-contain dark:opacity-80" />
              </div>
              <p className="text-[14px] dark:text-gray-300 text-gray-700 leading-relaxed mb-3">
                <span className="font-bold dark:text-[#F5F5F5] text-gray-900">鞋子是膝盖的第一道防线！</span>选一双有支撑、能缓震的鞋，少穿平底或磨损的旧鞋。
              </p>
              
              <AnimatePresence>
                {expandedCard === 3 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-3 pt-3 border-t dark:border-[#2C2C2C] border-gray-50 text-[13px] dark:text-gray-400 text-gray-500">
                      一双好鞋应该具备足弓支撑，鞋底有一定厚度，能够吸收走路时地面反弹的冲击力，从而保护膝盖不受损伤。
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button className="flex items-center gap-1 text-[13px] font-bold dark:text-emerald-400 text-emerald-600 hover:text-emerald-700 mt-2">
                了解更多 <ExternalLink size={14} />
              </button>
            </div>
          </motion.div>

          {/* Card 4: 注意姿势 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => toggleExpand(4)}
            className="dark:bg-[#1E1E1E] bg-white rounded-[16px] overflow-hidden shadow-sm border dark:border-[#2C2C2C] border-gray-100 cursor-pointer transition-colors"
          >
            <div className="dark:bg-amber-900/20 bg-amber-50/50 px-4 py-3 flex justify-between items-center border-b dark:border-amber-900/30 border-amber-50">
              <span className="font-bold dark:text-amber-400 text-amber-800 text-[14px]">妙招④ —— 注意姿势</span>
              {expandedCard === 4 ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
            <div className="p-4">
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex gap-2 h-24">
                  <div className="flex-1 rounded-lg dark:bg-gray-800 bg-white overflow-hidden relative">
                    <ImageWithFallback src={image13} alt="Posture 1" className="w-full h-full object-contain dark:opacity-80" />
                  </div>
                  <div className="flex-1 rounded-lg dark:bg-gray-800 bg-white overflow-hidden relative">
                    <ImageWithFallback src={image14} alt="Posture 2" className="w-full h-full object-contain dark:opacity-80" />
                  </div>
                </div>
                <div className="w-full h-24 rounded-lg dark:bg-gray-800 bg-white overflow-hidden relative">
                  <ImageWithFallback src={image15} alt="Posture 3" className="w-full h-full object-contain dark:opacity-80" />
                </div>
              </div>
              <p className="text-[14px] dark:text-gray-300 text-gray-700 leading-relaxed font-medium">
                少蹲少跪；提重物要左右平衡，别让一边膝盖太吃力。
              </p>

              <AnimatePresence>
                {expandedCard === 4 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t dark:border-[#2C2C2C] border-gray-50 text-[13px] dark:text-gray-400 text-gray-500">
                      下蹲时膝盖承受的重量往往是体重的几倍。尽量避免长时间处于下蹲或跪姿。提拿重物时，可以分成两份由双手分别提拿，保持身体平衡。
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Card 5: 听懂信号 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => toggleExpand(5)}
            className="dark:bg-[#1E1E1E] bg-white rounded-[16px] overflow-hidden shadow-sm border dark:border-[#2C2C2C] border-gray-100 cursor-pointer transition-colors"
          >
            <div className="dark:bg-rose-900/20 bg-rose-50/50 px-4 py-3 flex justify-between items-center border-b dark:border-rose-900/30 border-rose-50">
              <span className="font-bold dark:text-rose-400 text-rose-800 text-[14px]">妙招⑤ —— 听懂信号</span>
              {expandedCard === 5 ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
            <div className="p-4">
              <div className="w-full h-40 dark:bg-gray-800 bg-white rounded-xl mb-4 overflow-hidden">
                <ImageWithFallback src={image22} alt="Knee pain signal" className="w-full h-full object-contain dark:opacity-80" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2 dark:bg-green-900/20 bg-green-50/50 p-2.5 rounded-xl border dark:border-green-900/30 border-green-100">
                  <CheckCircle2 size={16} className="dark:text-green-400 text-green-500 mt-0.5 shrink-0" />
                  <p className="text-[13px] dark:text-gray-300 text-gray-700 leading-snug">
                    <span className="font-bold">膝盖偶尔响但不痛：</span><br/>
                    可多做拉伸运动
                  </p>
                </div>
                
                <div className="flex items-start gap-2 dark:bg-amber-900/20 bg-amber-50/50 p-2.5 rounded-xl border dark:border-amber-900/30 border-amber-200">
                  <AlertCircle size={16} className="dark:text-amber-400 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[13px] dark:text-gray-300 text-gray-700 leading-snug">
                    <span className="font-bold dark:text-amber-500 text-amber-900">持续疼痛或突然卡住：</span><br/>
                    应让膝盖充分休息，并及时咨询专业人士
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {expandedCard === 5 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t dark:border-[#2C2C2C] border-gray-50 text-[13px] dark:text-gray-400 text-gray-500">
                      不要忽视身体发出的求救信号。轻微的弹响通常是关节内气体释放或肌腱划过骨骼的声音，但疼痛则是组织受损的标志。
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}