import React from 'react';
import { useNavigate } from 'react-router';
import { PlayCircle, Clock, Flame } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Recommendations() {
  const navigate = useNavigate();

  const mockPlans = [
    {
      id: 1,
      title: '靠墙静蹲',
      duration: '3分钟',
      difficulty: '初级',
      image: 'https://images.unsplash.com/photo-1658279366986-4f188712a3e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBkb2luZyUyMHdhbGwlMjBzaXQlMjBleGVyY2lzZXxlbnwxfHx8fDE3NzcyNzIxODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '增强大腿前侧肌肉力量，稳定膝关节。'
    },
    {
      id: 2,
      title: '单腿臀桥',
      duration: '5分钟',
      difficulty: '中级',
      image: 'https://images.unsplash.com/photo-1588271956031-bd2698e27dd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBkb2luZyUyMGdsdXRlJTIwYnJpZGdlJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzc3MjcyMTg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '激活臀大肌，改善下肢力线传导。'
    },
    {
      id: 3,
      title: '踝泵运动',
      duration: '2分钟',
      difficulty: '初级',
      image: 'https://images.unsplash.com/photo-1726354725017-d9d7b610a5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmtsZSUyMGZvb3QlMjBzdHJldGNoZXN8ZW58MXx8fHwxNzc3MjcyMTkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: '促进下肢血液循环，消肿止痛。'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20">
      <div className="bg-blue-600 text-white px-6 pt-12 pb-6">
        <h2 className="text-xl font-medium mb-2">专属康复计划</h2>
        <p className="text-blue-100 text-sm">基于您的最新评估报告生成</p>
      </div>

      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 mb-1">今日训练</p>
            <p className="font-bold text-lg text-gray-800">共 3 个动作</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">预计耗时</p>
            <p className="font-bold text-lg text-blue-600">10 分钟</p>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-4 px-2">推荐动作</h3>
        <div className="space-y-4">
          {mockPlans.map(plan => (
            <div key={plan.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex p-3 gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative bg-gray-100">
                <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <PlayCircle className="text-white opacity-80" size={24} />
                </div>
              </div>
              <div className="flex-1 py-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-gray-800">{plan.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{plan.description}</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium">
                  <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    <Clock size={12} /> {plan.duration}
                  </span>
                  <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                    <Flame size={12} /> {plan.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button 
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-xl mt-8 shadow-md shadow-blue-200"
        >
          开始跟练
        </Button>
      </div>
    </div>
  );
}
