import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Target, Flame, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';

export function PlanSettings() {
  const navigate = useNavigate();
  const [intensity, setIntensity] = useState(1); // 0: Low, 1: Medium, 2: High
  const [frequency, setFrequency] = useState(5); // days per week
  const [reminders, setReminders] = useState([
    { id: 'morning', label: '早晨训练', time: '08:00', enabled: true },
    { id: 'afternoon', label: '午后放松', time: '14:30', enabled: false },
    { id: 'evening', label: '睡前拉伸', time: '21:00', enabled: true },
  ]);

  const handleSave = () => {
    toast.success('康复计划已更新', {
      style: { borderRadius: '12px', padding: '16px' }
    });
    navigate(-1);
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative shadow-2xl">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 shrink-0 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-700 active:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">康复计划设置</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-24">
        
        {/* Target */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} className="text-blue-600" />
            <h2 className="font-bold text-gray-900">当前康复目标</h2>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl flex justify-between items-center border border-blue-100">
            <div>
              <div className="font-bold text-blue-900 mb-1">膝关节术后恢复阶段 II</div>
              <div className="text-xs text-blue-600">距离下一阶段评估还有 14 天</div>
            </div>
            <button className="text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-full shadow-sm">更改</button>
          </div>
        </div>

        {/* Intensity */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Flame size={18} className="text-orange-500" />
            <h2 className="font-bold text-gray-900">训练强度</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['低强度', '中等强度', '高强度'].map((label, idx) => (
              <button 
                key={idx}
                onClick={() => setIntensity(idx)}
                className={clsx(
                  "py-3 rounded-2xl text-sm font-bold border transition-all",
                  intensity === idx 
                    ? "bg-orange-50 border-orange-500 text-orange-700 shadow-sm" 
                    : "bg-white border-gray-200 text-gray-500"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 bg-gray-50 p-3 rounded-xl">
            {intensity === 0 && '适合急性疼痛期，以缓解症状和维持基础活动度为主。'}
            {intensity === 1 && '适合恢复期，平衡力量建立与关节稳定性。'}
            {intensity === 2 && '适合强化期，侧重肌肉力量与动态平衡提升。'}
          </p>
        </div>

        {/* Frequency */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-emerald-500" />
            <h2 className="font-bold text-gray-900">每周训练天数</h2>
          </div>
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-2xl">
            <button 
              onClick={() => setFrequency(Math.max(1, frequency - 1))}
              className="w-10 h-10 bg-white rounded-xl shadow-sm font-bold text-gray-700 flex items-center justify-center text-xl"
            >-</button>
            <div className="font-bold text-lg text-gray-900">
              {frequency} <span className="text-sm text-gray-500 font-medium">天/周</span>
            </div>
            <button 
              onClick={() => setFrequency(Math.min(7, frequency + 1))}
              className="w-10 h-10 bg-white rounded-xl shadow-sm font-bold text-gray-700 flex items-center justify-center text-xl"
            >+</button>
          </div>
        </div>

        {/* Reminders */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-purple-500" />
            <h2 className="font-bold text-gray-900">日程提醒</h2>
          </div>
          <div className="space-y-3">
            {reminders.map(reminder => (
              <div 
                key={reminder.id} 
                onClick={() => toggleReminder(reminder.id)}
                className={clsx(
                  "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between",
                  reminder.enabled ? "border-purple-200 bg-purple-50/50" : "border-gray-100 bg-white"
                )}
              >
                <div>
                  <div className={clsx("font-bold text-sm mb-1", reminder.enabled ? "text-gray-900" : "text-gray-500")}>{reminder.label}</div>
                  <div className={clsx("text-xs", reminder.enabled ? "text-purple-600 font-bold" : "text-gray-400")}>{reminder.time}</div>
                </div>
                <div className={clsx("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors", reminder.enabled ? "border-purple-600 bg-purple-600" : "border-gray-300")}>
                  {reminder.enabled && <CheckCircle2 size={14} className="text-white" />}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-100 z-10 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] pb-safe">
        <button 
          onClick={handleSave} 
          className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold text-[16px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-200"
        >
          保存计划设置
        </button>
      </div>

    </div>
  );
}