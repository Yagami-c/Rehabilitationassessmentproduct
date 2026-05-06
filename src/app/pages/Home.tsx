import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';
import { ListTodo, Activity, Sparkles, ChevronRight, Play } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { toast } from 'sonner';
import { DeviceSelectionModal } from '../components/DeviceSelectionModal';

export function Home() {
  const navigate = useNavigate();
  const { profile } = useStore();
  const [showDeviceModal, setShowDeviceModal] = useState(false);

  useEffect(() => {
    // Check if this is the first login by checking a local storage flag
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (!hasCompletedOnboarding && profile) {
      // If not completed, redirect to the unified condition form
      navigate('/condition');
    }
  }, [profile, navigate]);

  return (
    <div className="flex flex-col h-full relative bg-[#F7F7F8]">
      {/* Top Greeting Block */}
      <div className="bg-white px-5 pt-6 pb-6 rounded-b-[24px]">
        <div>
          <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">你好，{profile?.name || '朋友'}</h2>
          <p className="text-[14px] text-gray-500 mt-1">今天的康复计划已为你准备好</p>
        </div>

        {/* Smart Recommendation Card */}
        <div className="mt-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-[16px] p-5 text-white relative overflow-hidden shadow-[0_8px_20px_rgba(37,99,235,0.15)]">
          {/* Decorative rings */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
              <Sparkles size={16} className="text-blue-100" />
            </div>
            <span className="font-bold text-[15px] tracking-wide">智能理疗推荐</span>
          </div>
          
          <p className="text-[13px] text-blue-50 leading-relaxed mb-5 relative z-10">
            你的膝盖有明显紧张感，建议从中等强度开始，适当延长作用时间。
          </p>
          
          <div className="grid grid-cols-2 gap-2 mb-5 relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="text-[10px] text-blue-100 mb-1">负压强度</div>
              <div className="font-bold text-sm">125 <span className="text-[10px] font-normal opacity-80">mmHg</span></div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="text-[10px] text-blue-100 mb-1">单次作用</div>
              <div className="font-bold text-sm">30 <span className="text-[10px] font-normal opacity-80">s</span></div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="text-[10px] text-blue-100 mb-1">间歇时长</div>
              <div className="font-bold text-sm">10 <span className="text-[10px] font-normal opacity-80">s</span></div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="text-[10px] text-blue-100 mb-1">循环组数</div>
              <div className="font-bold text-sm">5 <span className="text-[10px] font-normal opacity-80">x</span></div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowDeviceModal(true)}
            className="w-full bg-white text-blue-600 rounded-xl py-3 font-bold text-[15px] shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all relative z-10"
          >
            <Play size={16} className="fill-blue-600" /> 开始训练
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4 pb-8">
        
        {/* Today's Tasks */}
        <div className="bg-white rounded-[16px] p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[16px] font-bold text-gray-900 flex items-center gap-2">
              今日待办
            </h3>
            <span className="text-[12px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-center">进度 1/3</span>
          </div>
          
          <div className="flex flex-col">
            {/* Task 1 (Active) */}
            <div 
              onClick={() => navigate('/training')}
              className="flex items-center gap-3 py-4 border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <div className="text-[15px] font-medium text-gray-900">膝关节屈伸训练</div>
                <div className="text-[12px] text-gray-400 mt-1">10:00 AM · 约15分钟</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-blue-600 font-medium">进行中</span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>

            {/* Task 2 */}
            <div 
              onClick={() => navigate('/assessment')}
              className="flex items-center gap-3 py-4 border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <div className="text-[15px] font-medium text-gray-900">步态动作捕捉评估</div>
                <div className="text-[12px] text-gray-400 mt-1">14:30 PM · 约10分钟</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-400 font-medium">待开始</span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>

            {/* Task 3 */}
            <div 
              onClick={() => navigate('/condition')}
              className="flex items-center gap-3 py-4 active:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <div className="text-[15px] font-medium text-gray-900">疼痛症状记录</div>
                <div className="text-[12px] text-gray-400 mt-1">20:00 PM · 约3分钟</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-400 font-medium">待去完成</span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="bg-white rounded-[16px] p-4 shadow-sm">
          <h3 className="text-[16px] font-bold text-gray-900 mb-4">周活动趋势</h3>
          <div className="h-36 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { day: '一', duration: 15 },
                { day: '二', duration: 30 },
                { day: '三', duration: 20 },
                { day: '四', duration: 45 },
                { day: '五', duration: 25 },
                { day: '六', duration: 0 },
                { day: '日', duration: 0 },
              ]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis key="home-xaxis" dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#999999' }} dy={10} />
                <YAxis key="home-yaxis" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#999999' }} />
                <Tooltip 
                  key="home-tooltip"
                  cursor={{ fill: '#F7F7F8' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px', color: '#2563EB' }}
                />
                <Bar key="home-bar" dataKey="duration" fill="#E1E1E1" radius={[4, 4, 4, 4]} barSize={14} name="时长(分钟)">
                  {
                    [15, 30, 20, 45, 25, 0, 0].map((val, i) => (
                      <Cell key={`home-bar-cell-${i}`} fill={val > 30 ? '#2563EB' : '#93C5FD'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
    </div>
  );
}