import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Coins, TrendingUp, Gift, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Points() {
  const navigate = useNavigate();
  const { points } = useStore();

  const history = [
    { id: 1, title: '每日签到', time: '今天 08:30', amount: '+10', type: 'earn' },
    { id: 2, title: '完成一次下蹲评估', time: '昨天 19:45', amount: '+20', type: 'earn' },
    { id: 3, title: '完成一套康养训练', time: '昨天 15:20', amount: '+30', type: 'earn' },
    { id: 4, title: '解锁动作库', time: '前天 14:00', amount: '-50', type: 'spend' },
    { id: 5, title: '完善个人资料', time: '前天 10:15', amount: '+100', type: 'earn' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F5F7FA] font-sans">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center bg-white shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-gray-900 mr-8">积分中心</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Points Banner */}
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 scale-150 translate-x-4 -translate-y-4">
            <Coins size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium mb-2">当前可用积分</p>
            <div className="text-5xl font-black mb-1 font-mono tracking-tight">{points}</div>
            <p className="text-white/90 text-sm bg-black/10 inline-block px-3 py-1 rounded-full backdrop-blur-sm mt-3">
              100积分 = 1元
            </p>
          </div>
        </div>

        <div className="px-5 py-6">
          {/* Ways to Earn */}
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-orange-500" /> 赚取积分
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-50">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                <CalendarCheck size={20} className="text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-[15px] mb-1">每日签到</h3>
              <p className="text-xs text-gray-500 mb-2">连续签到奖励更多</p>
              <span className="text-sm font-bold text-orange-500">+10/天</span>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-50">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <CheckCircle2 size={20} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-[15px] mb-1">完成训练</h3>
              <p className="text-xs text-gray-500 mb-2">坚持康养打卡</p>
              <span className="text-sm font-bold text-blue-500">+30/次</span>
            </div>
          </div>

          {/* History List */}
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Gift size={20} className="text-gray-600" /> 积分明细
          </h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            {history.map((item, index) => (
              <div 
                key={item.id} 
                className={`p-4 flex items-center justify-between ${index !== history.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <div>
                  <h4 className="font-medium text-gray-900 text-[15px]">{item.title}</h4>
                  <span className="text-[12px] text-gray-500">{item.time}</span>
                </div>
                <div className={`font-bold font-mono text-[16px] ${item.type === 'earn' ? 'text-orange-500' : 'text-gray-900'}`}>
                  {item.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}