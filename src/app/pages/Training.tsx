import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Play, Info, ShieldCheck, Zap, Activity, Flame, HeartPulse, X, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

import { DeviceSelectionModal } from '../components/DeviceSelectionModal';

export function Training() {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{name: string, img: string} | null>(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);

  const sectionRefs = {
    '稳定之基': useRef<HTMLDivElement>(null),
    '激活之钥': useRef<HTMLDivElement>(null),
    '支撑之力': useRef<HTMLDivElement>(null),
    '推进之能': useRef<HTMLDivElement>(null),
    '调节之方': useRef<HTMLDivElement>(null),
  };

  const dimensions = [
    { id: 1, label: '稳定之基', icon: ShieldCheck, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100', target: '热身' },
    { id: 2, label: '激活之钥', icon: Zap, color: 'bg-amber-50 text-amber-600', border: 'border-amber-100', target: '强化运动' },
    { id: 3, label: '支撑之力', icon: Activity, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100', target: '强化运动' },
    { id: 4, label: '推进之能', icon: Flame, color: 'bg-rose-50 text-rose-600', border: 'border-rose-100', target: '调整' },
    { id: 5, label: '调节之方', icon: HeartPulse, color: 'bg-purple-50 text-purple-600', border: 'border-purple-100', target: '调整' },
  ];

  const exercises = [
    {
      id: '热身',
      title: '一、热身',
      subtitle: '',
      items: [
        {
          id: 'ex-1',
          name: '转身摸臀',
          desc: '10次 · 双脚与肩同宽，上身挺直，向后转身，用手去摸对侧臀部，左右交替各10次。',
          note: '动作演示',
          img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80'
        },
        {
          id: 'ex-2',
          name: '后踢臀部',
          desc: '10次 · 双脚与肩同宽，双手叉腰，脚跟向后踢臀部，左右交替各10次。',
          note: '',
          img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80'
        }
      ]
    },
    {
      id: '强化运动',
      title: '二、强化运动',
      subtitle: '以下4个动作为一个循环，做3个循环',
      items: [
        {
          id: 'ex-3',
          name: '提膝碰肘',
          desc: '左右各8次 · 双脚与肩同宽，左手扶椅，右手搭左肩，吐气收腹提左膝碰右肘，保持身体面向正前方。',
          note: '',
          img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80'
        },
        {
          id: 'ex-4',
          name: '螃蟹步',
          desc: '左右各4步为一组，做2组 · 双脚与肩同宽，双手叉腰，微蹲，保持微蹲状态向左右侧移。',
          note: '',
          img: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&q=80'
        },
        {
          id: 'ex-5',
          name: '臀部找椅',
          desc: '8次 · 双脚与肩同宽，双手叉腰，站于椅前半步距离，臀部向后轻触椅子边缘后慢慢起身。',
          note: '',
          img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80'
        },
        {
          id: 'ex-6',
          name: '站立提踵',
          desc: '8次 · 双脚与肩同宽，身体直立，双手扶椅，脚尖踮到最高再缓慢放下。',
          note: '',
          img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80'
        }
      ]
    },
    {
      id: '调整',
      title: '三、调整',
      subtitle: '',
      items: [
        {
          id: 'ex-7',
          name: '快走100步',
          desc: '用最自然的状态快速走100步。',
          note: '',
          img: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=400&q=80'
        },
        {
          id: 'ex-8',
          name: '拉伸臀部',
          desc: '左右各维持20秒，做2组 · 坐位，身体挺直，右侧脚踝搭在左侧大腿上，身体慢慢向前倾。',
          note: '',
          img: 'https://images.unsplash.com/photo-1600026453194-11ae289732b8?w=400&q=80'
        },
        {
          id: 'ex-9',
          name: '拉伸大腿后侧',
          desc: '左右各维持20秒，做2组 · 坐位，伸直右腿，勾起脚尖，身体挺直慢慢向前倾。',
          note: '',
          img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&q=80'
        },
        {
          id: 'ex-10',
          name: '拉伸躯干',
          desc: '左右各维持20秒，做2组 · 坐位，身体直立，左腿搭在右腿上，身体向左转到最大范围。',
          note: '',
          img: 'https://images.unsplash.com/photo-1697274598105-a5a184da619b?w=400&q=80'
        }
      ]
    }
  ];

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const mainContainer = document.querySelector('main') || document.documentElement;
      const elRect = el.getBoundingClientRect();
      const mainRect = mainContainer.getBoundingClientRect();
      const scrollTop = mainContainer.scrollTop + elRect.top - mainRect.top - 180; // offset for sticky header
      mainContainer.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-28 font-sans">
      
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md pt-5 pb-4 px-5 shadow-sm border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-[20px] font-extrabold text-blue-900 tracking-tight">快乐生活，“膝膝”相关</h1>
            <p className="text-[12px] text-gray-500 font-medium mt-1">香港理工大学 傅少娥教授团队 研制</p>
          </div>
          <div className="bg-amber-50 text-amber-600 border border-amber-200 px-2 py-1 rounded-md flex items-center gap-1 shrink-0">
            <Info size={12} />
            <span className="text-[10px] font-bold">温馨提示</span>
          </div>
        </div>
        
        <h2 className="text-[15px] font-bold text-gray-800 mt-4 mb-3">
          第一部分：练出“强壮膝”<br/>
          <span className="text-[13px] text-gray-500 font-normal">——你的五维主动防护体系</span>
        </h2>
        
        {/* Dimension Tags */}
        <div className="flex gap-2 overflow-x-auto pb-1 snap-x hide-scrollbar -mx-5 px-5">
          {dimensions.map(dim => (
            <button 
              key={dim.id} 
              onClick={() => handleScrollTo(dim.target)}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border whitespace-nowrap snap-center shadow-sm active:scale-95 transition-transform", 
                dim.color, dim.border
              )}
            >
              <dim.icon size={12} strokeWidth={2.5} />
              <span className="text-[12px] font-bold">{dim.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5 space-y-6">
        
        {/* Summary Text */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
          <p className="text-[13px] text-gray-600 leading-relaxed relative z-10">
            膝盖的耐用，源于科学养护。我们为你构建了五个关键维度，通过<span className="font-bold text-blue-700">“稳定、激活、支撑、推进、调节”</span>，系统强化膝关节的每一环。每天跟练，用主动运动，换取长久灵活。
          </p>
        </div>

        {/* Exercises */}
        <div className="space-y-8">
          {exercises.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-48">
              <div className="mb-4">
                <h3 className="text-[18px] font-extrabold text-gray-900">{section.title}</h3>
                {section.subtitle && (
                  <p className="text-[13px] text-gray-500 mt-1 bg-gray-100/80 inline-block px-2 py-1 rounded-md">{section.subtitle}</p>
                )}
              </div>
              
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div 
                    key={item.id}
                    onClick={(e) => toggleExpand(item.id, e)}
                    className="bg-white rounded-[16px] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-blue-50 cursor-pointer active:scale-[0.99] transition-all"
                  >
                    <div className="flex gap-3">
                      {/* GIF Placeholder */}
                      <div 
                        className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden relative shrink-0 active:scale-95 transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVideo({ name: item.name, img: item.img });
                        }}
                      >
                        <ImageWithFallback src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play size={24} className="text-white fill-white opacity-90" />
                        </div>
                        {item.note && (
                          <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-[9px] text-center py-0.5 font-medium">
                            {item.note}
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-[15px] text-gray-900 truncate">{item.name}</h4>
                          <button className="text-gray-400 p-1 -mr-1">
                            {expandedCard === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                        
                        <div className="mt-1">
                          <p className={clsx(
                            "text-[13px] text-gray-500 leading-relaxed",
                            expandedCard === item.id ? "" : "line-clamp-2"
                          )}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 left-0 right-0 p-5 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent z-30 pointer-events-none flex justify-center">
        <button 
          onClick={() => setShowDeviceModal(true)}
          className="pointer-events-auto bg-blue-600 text-white w-full max-w-[300px] rounded-full py-3.5 font-bold text-[15px] shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Play size={18} className="fill-white" /> 开始训练
        </button>
      </div>

      {/* Device Selection Modal */}
      {showDeviceModal && (
        <DeviceSelectionModal 
          actionText="开始训练" 
          onClose={() => setShowDeviceModal(false)}
          onSelect={(deviceId) => {
            setShowDeviceModal(false);
            if (deviceId === 'joint') {
              navigate('/device-questionnaire');
            } else {
              navigate('/training/playback');
            }
          }} 
        />
      )}

      {/* Full-screen Video Viewer Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-center items-center backdrop-blur-sm"
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-5 text-white/70 hover:text-white bg-white/10 rounded-full p-2"
            >
              <X size={24} />
            </button>
            
            <div className="w-full px-5">
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full aspect-square bg-gray-900 rounded-3xl overflow-hidden relative border border-gray-800 shadow-2xl"
              >
                <ImageWithFallback src={selectedVideo.img} alt={selectedVideo.name} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Play size={64} className="text-white fill-white opacity-80 mb-4" />
                  <p className="text-white/80 text-[14px]">正在演示：{selectedVideo.name}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
