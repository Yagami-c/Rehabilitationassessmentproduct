import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';
import { Activity, Sparkles, ChevronRight, Play, BookOpen, MessageSquare, Heart, Image as ImageIcon, X, Send, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import clsx from 'clsx';
import { DeviceSelectionModal } from '../components/DeviceSelectionModal';
import { Carousel, CarouselContent, CarouselItem } from '../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export function Home() {
  const navigate = useNavigate();
  const { profile, isDeviceConnected } = useStore();
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  
  // Forum overlays
  const [showPostEditor, setShowPostEditor] = useState(false);
  const [showPostDetail, setShowPostDetail] = useState<number | null>(null);
  const [showWechatGroup, setShowWechatGroup] = useState(false);

  // Mock Forum Data
  const forumPosts = [
    {
      id: 1,
      user: { name: '膝盖要好好的', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100' },
      time: '2小时前',
      content: '今天做了第二阶段的下蹲动作，明显感觉比上周轻松了，疼痛感从5降到了2，继续坚持！大家也要加油呀💪',
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      user: { name: '健康生活家', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100' },
      time: '5小时前',
      content: '求问各位病友，每次用完设备后需要立刻冰敷吗？医生说可以缓解肿胀，但不知道要敷多久比较合适。',
      likes: 12,
      comments: 18,
    }
  ];

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (!hasCompletedOnboarding && profile) {
      navigate('/condition');
    }
  }, [profile, navigate]);

  return (
    <div className="flex flex-col h-full relative dark:bg-[#121212] bg-[#F5F7FA] transition-colors">
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Top Banner and Greeting Block */}
        <div className="dark:bg-[#1E1E1E] bg-white px-5 pt-6 pb-8 rounded-b-[24px] shadow-sm transition-colors">
          {/* Carousel Banner */}
          <div className="w-full mb-8">
            <Carousel 
              className="w-full" 
              plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="relative w-full h-[120px] rounded-[16px] overflow-hidden dark:bg-gradient-to-r dark:from-blue-900/40 dark:to-blue-800/40 bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-between px-5">
                    <div>
                      <div className="text-[12px] font-bold dark:text-blue-400 text-blue-600 mb-1 dark:bg-black/30 bg-white/50 inline-block px-2 py-0.5 rounded text-left">科学宣教</div>
                      <div className="text-[16px] font-bold dark:text-white text-gray-900 mt-1">膝盖疼如何正确下蹲？</div>
                      <div className="text-[12px] dark:text-gray-400 text-gray-500 mt-1">康养专家教你3个小妙招</div>
                    </div>
                    <div className="w-24 h-24 dark:bg-blue-500/20 bg-blue-200/50 rounded-full flex items-center justify-center -mr-2">
                      <BookOpen size={40} className="dark:text-blue-400 text-blue-500 opacity-80" />
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative w-full h-[120px] rounded-[16px] overflow-hidden dark:bg-gradient-to-r dark:from-green-900/40 dark:to-green-800/40 bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-between px-5">
                    <div>
                      <div className="text-[12px] font-bold dark:text-green-400 text-green-600 mb-1 dark:bg-black/30 bg-white/50 inline-block px-2 py-0.5 rounded text-left">新功能</div>
                      <div className="text-[16px] font-bold dark:text-white text-gray-900 mt-1">AI动作纠正升级</div>
                      <div className="text-[12px] dark:text-gray-400 text-gray-500 mt-1">支持更多家庭康养动作检测</div>
                    </div>
                    <div className="w-24 h-24 dark:bg-green-500/20 bg-green-200/50 rounded-full flex items-center justify-center -mr-2">
                      <Sparkles size={40} className="dark:text-green-400 text-green-500 opacity-80" />
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-[20px] font-bold dark:text-[#F5F5F5] text-[#1A1A1A] tracking-tight leading-none mb-2">你好，{profile?.name || '朋友'}</h2>
              <p className="text-[13px] dark:text-[#9CA3AF] text-[#6B7280] leading-none">今天的康养计划已为你准备好</p>
            </div>
            
            {/* Top Right Status Dot */}
            <div 
              onClick={() => navigate('/device')}
              className="flex items-center justify-center p-2.5 rounded-full dark:bg-[#121212] bg-gray-50 border dark:border-gray-800 border-gray-100 shadow-sm cursor-pointer active:scale-95 transition-transform"
            >
              <div className="relative flex items-center justify-center">
                <Activity size={20} className={isDeviceConnected ? "text-[#00C853]" : "text-gray-400"} />
                <div className={clsx(
                  "absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#1E1E1E] transition-colors duration-300",
                  isDeviceConnected ? "bg-[#00C853]" : "bg-gray-400"
                )} />
              </div>
            </div>
          </div>

          {/* Assessment Card */}
          <div className="bg-[#2C7CFF] rounded-[16px] p-5 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                <Activity size={18} className="text-blue-100" />
              </div>
              <span className="font-bold text-[18px] tracking-wide leading-none">今日状态校准</span>
            </div>
            
            <p className="text-[14px] text-blue-50 leading-relaxed mb-6 relative z-10">
              完成每日下蹲评估，获取更精准的康养方案。
            </p>
            
            <button 
              onClick={() => navigate('/device-questionnaire')}
              className="w-full bg-white text-[#2C7CFF] rounded-full py-3.5 font-bold text-[16px] shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all relative z-10 leading-none"
            >
              <Play size={18} className="fill-current" /> 开始评估
            </button>
          </div>
        </div>

        <div className="px-5 pt-6 space-y-6">
          
          {/* Wellness History */}
          <div className="dark:bg-[#1E1E1E] bg-white rounded-[16px] p-5 shadow-sm border dark:border-[#2C2C2C] border-transparent transition-colors">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[18px] font-bold dark:text-[#F5F5F5] text-[#1A1A1A] leading-none">
                康养历史
              </h3>
              <span 
                onClick={() => navigate('/report')}
                className="text-[14px] font-medium dark:text-blue-400 text-[#2C7CFF] flex items-center cursor-pointer active:opacity-70 leading-none"
              >
                查看全部 <ChevronRight size={16} className="ml-0.5" />
              </span>
            </div>
            
            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-[#F5F7FA] dark:bg-gray-800 rounded-[12px] p-4 flex flex-col items-center justify-center">
                <div className="text-[13px] text-[#6B7280] dark:text-gray-400 mb-2 leading-none">本周累计</div>
                <div className="text-[24px] font-bold text-[#1A1A1A] dark:text-gray-100 leading-none">
                  120 <span className="text-[13px] font-normal text-[#6B7280]">分钟</span>
                </div>
              </div>
              <div className="flex-1 bg-[#F5F7FA] dark:bg-gray-800 rounded-[12px] p-4 flex flex-col items-center justify-center">
                <div className="text-[13px] text-[#6B7280] dark:text-gray-400 mb-2 leading-none">完成次数</div>
                <div className="text-[24px] font-bold text-[#1A1A1A] dark:text-gray-100 leading-none">
                  4 <span className="text-[13px] font-normal text-[#6B7280]">次</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div 
                onClick={() => navigate('/report')}
                className="flex items-center gap-4 p-3 rounded-xl border dark:border-[#2C2C2C] border-gray-100 active:bg-gray-50 dark:active:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <Activity size={20} className="text-[#2C7CFF] dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="text-[16px] font-medium dark:text-[#F5F5F5] text-[#1A1A1A] leading-none mb-2">膝关节综合康养</div>
                  <div className="text-[13px] dark:text-[#9CA3AF] text-[#6B7280] leading-none">今天 10:00 AM · 25分钟</div>
                </div>
              </div>

              <div 
                onClick={() => navigate('/report')}
                className="flex items-center gap-4 p-3 rounded-xl border dark:border-[#2C2C2C] border-gray-100 active:bg-gray-50 dark:active:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <Activity size={20} className="text-[#2C7CFF] dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="text-[16px] font-medium dark:text-[#F5F5F5] text-[#1A1A1A] leading-none mb-2">PAD温和放松</div>
                  <div className="text-[13px] dark:text-[#9CA3AF] text-[#6B7280] leading-none">昨天 14:30 PM · 15分钟</div>
                </div>
              </div>
            </div>
          </div>

          {/* Wellness Forum */}
          <div className="dark:bg-[#1E1E1E] bg-white rounded-[16px] p-5 shadow-sm border dark:border-[#2C2C2C] border-transparent transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[18px] font-bold dark:text-[#F5F5F5] text-[#1A1A1A] leading-none">
                康养论坛
              </h3>
              <button 
                onClick={() => setShowPostEditor(true)}
                className="text-[14px] bg-[#2C7CFF] text-white px-4 py-2 rounded-full font-medium active:scale-95 transition-all shadow-sm leading-none"
              >
                发布帖子
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {forumPosts.map(post => (
                <div 
                  key={post.id} 
                  onClick={() => setShowPostDetail(post.id)}
                  className="bg-[#F5F7FA] dark:bg-gray-800 rounded-[16px] p-4 active:scale-[0.98] transition-transform cursor-pointer border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={post.user.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                    <div>
                      <div className="text-[14px] font-bold dark:text-[#F5F5F5] text-[#1A1A1A] leading-none mb-1.5">{post.user.name}</div>
                      <div className="text-[12px] dark:text-[#9CA3AF] text-[#6B7280] leading-none">{post.time}</div>
                    </div>
                  </div>
                  <p className="text-[15px] dark:text-gray-300 text-gray-700 leading-relaxed mb-4 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-5 text-[#6B7280] dark:text-[#9CA3AF]">
                    <div className="flex items-center gap-1.5 text-[13px]">
                      <Heart size={16} /> {post.likes}
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px]">
                      <MessageSquare size={16} /> {post.comments}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WeChat Group Banner */}
            <div 
              onClick={() => setShowWechatGroup(true)}
              className="bg-gradient-to-r from-[#07C160]/10 to-[#07C160]/5 dark:from-[#07C160]/20 dark:to-[#07C160]/10 border border-[#07C160]/20 rounded-[16px] p-5 flex items-center justify-between cursor-pointer active:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#07C160] rounded-full flex items-center justify-center text-white shrink-0 shadow-sm shadow-green-500/20">
                  <MessageSquare size={24} className="fill-current" />
                </div>
                <div>
                  <div className="text-[16px] font-bold text-[#07C160] dark:text-[#07C160] leading-none mb-2">加入康群微信群</div>
                  <div className="text-[13px] text-gray-600 dark:text-gray-300 leading-none">与病友交流康养经验</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#07C160]" />
            </div>
          </div>

        </div>
      </div>

      {showDeviceModal && (
        <DeviceSelectionModal 
          actionText="开始训练" 
          onClose={() => setShowDeviceModal(false)}
          onSelect={(deviceId) => {
            setShowDeviceModal(false);
            if (deviceId === 'joint_retest' || deviceId === 'joint') {
              navigate('/device-questionnaire');
            } else if (deviceId === 'joint_history') {
              navigate('/device');
            } else {
              navigate('/training/playback');
            }
          }} 
        />
      )}

      {/* Post Editor Overlay */}
      {showPostEditor && (
        <div className="absolute inset-0 z-50 bg-[#F5F7FA] dark:bg-[#121212] flex flex-col animate-in slide-in-from-bottom-full duration-300">
          <div className="flex justify-between items-center px-4 pt-12 pb-4 bg-white dark:bg-[#1E1E1E] shadow-sm">
            <button onClick={() => setShowPostEditor(false)} className="text-[#6B7280] dark:text-[#9CA3AF] text-[16px]">取消</button>
            <span className="font-bold text-[#1A1A1A] dark:text-[#F5F5F5] text-[18px]">发布新帖</span>
            <button 
              className="px-5 py-2 bg-[#2C7CFF] text-white rounded-full text-[14px] font-bold active:scale-95"
              onClick={() => {
                toast.success('发布成功！');
                setShowPostEditor(false);
              }}
            >
              发布
            </button>
          </div>
          <div className="flex-1 p-5">
            <textarea 
              className="w-full h-48 bg-transparent text-[16px] text-[#1A1A1A] dark:text-[#F5F5F5] placeholder-[#9CA3AF] resize-none focus:outline-none leading-relaxed"
              placeholder="分享你的康养经验或提出疑问..."
            />
            <div className="mt-4 flex gap-3">
              <button className="w-24 h-24 border-2 border-dashed border-[#E5E7EB] dark:border-[#2C2C2C] rounded-[16px] flex flex-col items-center justify-center text-[#9CA3AF] active:bg-gray-50 dark:active:bg-gray-800 transition-colors">
                <ImageIcon size={28} className="mb-2" />
                <span className="text-[13px]">添加图片</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Detail Overlay */}
      {showPostDetail && (
        <div className="absolute inset-0 z-50 bg-[#F5F7FA] dark:bg-[#121212] flex flex-col animate-in slide-in-from-right-full duration-300">
          <div className="flex justify-between items-center px-4 pt-12 pb-4 bg-white dark:bg-[#1E1E1E] shadow-sm">
            <button onClick={() => setShowPostDetail(null)} className="p-2 -ml-2 text-[#6B7280] dark:text-[#9CA3AF]">
              <ChevronRight size={24} className="rotate-180" />
            </button>
            <span className="font-bold text-[#1A1A1A] dark:text-[#F5F5F5] text-[18px]">帖子详情</span>
            <div className="w-8"></div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {forumPosts.filter(p => p.id === showPostDetail).map(post => (
              <div key={post.id} className="bg-white dark:bg-[#1E1E1E] p-6 mb-2">
                <div className="flex items-center gap-4 mb-6">
                  <img src={post.user.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover bg-gray-200" />
                  <div>
                    <div className="text-[16px] font-bold dark:text-[#F5F5F5] text-[#1A1A1A] leading-none mb-1.5">{post.user.name}</div>
                    <div className="text-[13px] dark:text-[#9CA3AF] text-[#6B7280] leading-none">{post.time}</div>
                  </div>
                </div>
                <p className="text-[16px] dark:text-[#E5E7EB] text-[#374151] leading-relaxed mb-8">
                  {post.content}
                </p>
                <div className="flex justify-around items-center border-t dark:border-[#2C2C2C] border-gray-100 pt-5">
                  <button className="flex items-center gap-2 text-[#6B7280] dark:text-[#9CA3AF] active:opacity-70">
                    <Heart size={22} /> <span className="text-[15px]">点赞 {post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#6B7280] dark:text-[#9CA3AF] active:opacity-70">
                    <MessageSquare size={22} /> <span className="text-[15px]">评论 {post.comments}</span>
                  </button>
                </div>
              </div>
            ))}
            <div className="p-6 text-center text-[14px] text-[#9CA3AF]">暂无更多评论</div>
          </div>
          <div className="p-4 bg-white dark:bg-[#1E1E1E] border-t border-gray-100 dark:border-[#2C2C2C] pb-safe flex items-center gap-3">
            <input type="text" placeholder="写评论..." className="flex-1 h-12 bg-[#F5F7FA] dark:bg-gray-800 rounded-full px-5 text-[15px] focus:outline-none border border-gray-200 dark:border-gray-700 focus:border-blue-500" />
            <button className="w-12 h-12 bg-[#2C7CFF] rounded-full flex items-center justify-center text-white active:scale-95 shadow-md shadow-blue-500/20">
              <Send size={20} className="ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* WeChat Group Modal */}
      {showWechatGroup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-8 animate-in fade-in">
          <div className="bg-white dark:bg-[#1E1E1E] w-full rounded-[24px] p-8 flex flex-col items-center relative shadow-2xl">
            <button onClick={() => setShowWechatGroup(false)} className="absolute top-5 right-5 p-2 text-gray-400 active:bg-gray-100 dark:active:bg-gray-800 rounded-full transition-colors">
              <X size={24} />
            </button>
            <div className="w-16 h-16 bg-[#07C160] rounded-full flex items-center justify-center text-white mb-5 shadow-lg shadow-green-500/20">
              <MessageSquare size={32} className="fill-current" />
            </div>
            <h3 className="text-[22px] font-bold text-[#1A1A1A] dark:text-[#F5F5F5] mb-3">康养交流群</h3>
            <p className="text-[15px] text-[#6B7280] dark:text-[#9CA3AF] text-center mb-8 leading-relaxed">扫描下方二维码，或保存图片在微信中识别，加入病友交流群。</p>
            <div className="w-56 h-56 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-8 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
              <QrCode size={120} className="text-gray-400 mb-3" />
              <span className="text-[13px] text-gray-500">二维码加载中</span>
            </div>
            <button 
              onClick={() => {
                toast.success('二维码已保存到相册，请前往微信扫码加入');
                setShowWechatGroup(false);
              }}
              className="w-full bg-[#07C160] text-white font-bold py-4 rounded-full shadow-lg shadow-green-500/20 active:scale-95 transition-transform text-[16px]"
            >
              保存二维码
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
