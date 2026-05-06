import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Play, Info, X, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

export function Training() {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{name: string, img: string} | null>(null);

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
      title: '二、强化运动：3组',
      subtitle: '',
      items: [
        {
          id: 'ex-3',
          name: '提膝碰肘',
          desc: '左右各8次 · 双脚与肩同宽，左手扶椅，右手搭左肩，吐气收腹提左膝碰右肘，保持身体面向正前方，8次后换另外一侧。',
          note: '',
          img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80'
        },
        {
          id: 'ex-4',
          name: '螃蟹步',
          desc: '左右各4步，做2组 · 双脚与肩同宽，双手叉腰，微蹲，保持微蹲状态向左侧移4小步，再向右侧移4步，做2组。',
          note: '',
          img: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&q=80'
        },
        {
          id: 'ex-5',
          name: '臀部找椅',
          desc: '8次 · 双脚与肩同宽，双手叉腰，站于椅前半步距离，臀部向后轻触椅子边缘后慢慢起身，做8次。',
          note: '',
          img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80'
        },
        {
          id: 'ex-6',
          name: '站立提踵',
          desc: '8次 · 双脚与肩同宽，身体直立，双手扶椅，脚尖踮到最高再缓慢放下，做8次。',
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
          desc: '100步 · 用最自然的状态快速走。',
          note: '',
          img: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=400&q=80'
        },
        {
          id: 'ex-8',
          name: '拉伸臀部',
          desc: '左右各维持20秒，做2组 · 坐位，身体挺直，右侧脚踝搭在左侧大腿上，身体挺直慢慢向前倾，同时轻轻下压右侧膝盖，感觉右侧臀部被拉紧，保持20秒后换另外一侧。',
          note: '',
          img: 'https://images.unsplash.com/photo-1600026453194-11ae289732b8?w=400&q=80'
        },
        {
          id: 'ex-9',
          name: '拉伸大腿后侧',
          desc: '左右各维持20秒，做2组 · 坐位，伸直右腿，勾起脚尖，身体挺直慢慢向前倾，保持膝盖伸直，感受到大腿后侧拉紧，20秒后换另外一侧。',
          note: '',
          img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&q=80'
        },
        {
          id: 'ex-10',
          name: '拉伸躯干',
          desc: '左右各维持20秒，做2组 · 坐位，身体直立，左腿搭在右腿上，身体向左转到最大范围，用左手轻扶椅背保持稳定，右手臂轻轻将大腿向后推，感受到左侧躯干有拉紧的感觉，保持20秒后换另外一侧。',
          note: '',
          img: 'https://images.unsplash.com/photo-1697274598105-a5a184da619b?w=400&q=80'
        }
      ]
    }
  ];

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F7F8] pb-28 font-sans overflow-y-auto">
      
      {/* Content Header Section */}
      <div className="px-[20px] pt-[20px] pb-[20px] flex flex-col gap-[16px] bg-white border-b border-gray-100 shadow-sm relative z-40">
        {/* 1. MAIN TITLE */}
        <h1 className="text-[22px] font-bold text-[#1A1A2E]">快乐生活，“膝膝”相关</h1>
        
        {/* 2. INTRODUCTION PARAGRAPH */}
        <p className="text-[14px] font-normal text-[#555555] leading-[1.6]">
          香港理工大学武汉研究院智慧康复与创新老龄健康转化研究中心副主任符少娥教授团队，深耕肌骨关节疼痛的科研与临床，特此分享膝关节保养要点，与您共筑健康。主动练，坚持养，拥抱“膝”悦人生！以下为一般性科普信息，供日常参考。
        </p>

        {/* 3. DISCLAIMER BANNER */}
        <div className="flex gap-2 bg-[#FFF8E1] border border-[#FFE082] rounded-[8px] p-[12px]">
          <div className="shrink-0 mt-0.5">
            <Info size={14} className="text-[#8D6E00]" />
          </div>
          <p className="text-[12px] font-normal text-[#8D6E00] leading-relaxed">
            温馨提示：内容仅用于产品体验与科普参考，不构成医疗建议或诊断依据；请根据自身情况选择合适方式，如有持续不适请咨询专业人士。
          </p>
        </div>

        {/* 4 & 5. SECTION TITLE AND SUBTITLE */}
        <div className="flex flex-col gap-[4px]">
          <h2 className="text-[20px] font-bold text-[#1A1A2E]">练出“强壮膝”</h2>
          <h3 className="text-[16px] font-medium text-[#3A7BD5]">五维主动防护体系</h3>
        </div>

        {/* 6. SUMMARY PARAGRAPH */}
        <p className="text-[14px] font-normal text-[#555555] leading-[1.6]">
          膝盖的耐用，源于科学养护。我们为你构建了五个关键维度，通过“稳定、激活、支撑、推进、调节”，系统强化膝关节的每一环。每天跟练，用主动运动，换取长久灵活。
        </p>

        {/* 7. FIVE DIMENSION LIST */}
        <ul className="text-[14px] font-normal text-[#333333] leading-[1.8] space-y-2 list-none">
          <li className="flex items-start"><span className="mr-1">·</span> <div><span className="font-bold">稳定之基</span>：建立动态核心稳定，提升运动中保护膝盖的抗旋转与协调能力。</div></li>
          <li className="flex items-start"><span className="mr-1">·</span> <div><span className="font-bold">激活之钥</span>：激活臀部肌肉，稳定骨盆，从根源改善力线，预防膝痛。</div></li>
          <li className="flex items-start"><span className="mr-1">·</span> <div><span className="font-bold">支撑之力</span>：强化日常功能性力量，直接提升坐下、站起、上下楼时的轻松与稳健。</div></li>
          <li className="flex items-start"><span className="mr-1">·</span> <div><span className="font-bold">推进之能</span>：打造踝关节稳定支点，强化小腿推进力，步履更轻盈，减震更有效。</div></li>
          <li className="flex items-start"><span className="mr-1">·</span> <div><span className="font-bold">调节之方</span>：促进恢复，缓解疲劳，维持肌肉弹性与关节灵活度。</div></li>
        </ul>
      </div>

      <div className="px-5 pt-5 space-y-6">
        {/* Exercises */}
        <div className="space-y-8">
          {exercises.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-8">
              <div className="mb-4">
                <h3 className="text-[18px] font-extrabold text-gray-900">{section.title}</h3>
                {section.subtitle && (
                  <div className="bg-gray-100/80 p-3 rounded-xl mt-2 mb-4">
                    <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                      {section.subtitle}
                    </p>
                  </div>
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
                          <p className="text-[13px] text-gray-500 leading-relaxed">
                            {item.desc.includes(' · ') ? (
                              <>
                                <span className="font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mr-1">
                                  {item.desc.split(' · ')[0]}
                                </span>
                                {item.desc.split(' · ')[1]}
                              </>
                            ) : (
                              item.desc
                            )}
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
              
              <div className="mt-6 text-center text-white/90">
                <p className="text-lg font-bold">{selectedVideo.name}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
