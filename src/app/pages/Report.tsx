import { useNavigate } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingDown, Activity, ChevronRight, PenTool } from 'lucide-react';

export function Report() {
  const navigate = useNavigate();

  const painData = [
    { day: '周一', score: 6 },
    { day: '周二', score: 5 },
    { day: '周三', score: 4 },
    { day: '周四', score: 5 },
    { day: '周五', score: 3 },
    { day: '周六', score: 6 },
    { day: '周日', score: 4 },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 px-5 pt-4 space-y-6">
      
      {/* Pain Trend Chart */}
      <div>
        <h3 className="text-[16px] font-bold text-gray-900 mb-4 px-1 flex items-center justify-between">
          <span>疼痛趋势 <span className="text-[12px] font-normal text-gray-500 ml-2">近7天</span></span>
        </h3>
        
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-green-50 p-2 rounded-xl">
              <TrendingDown size={20} className="text-green-600" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-gray-900">平均分 4.8</div>
              <div className="text-[12px] text-gray-500 mt-0.5">较上周下降 12%</div>
            </div>
          </div>
          
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={painData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis 
                  key="report-xaxis"
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#9CA3AF' }} 
                  dy={10}
                />
                <YAxis 
                  key="report-yaxis"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  domain={[0, 10]}
                  ticks={[0, 2, 4, 6, 8, 10]}
                />
                <Tooltip 
                  key="report-tooltip"
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}
                  itemStyle={{ fontSize: '12px', color: '#3B82F6' }}
                />
                <Bar key="report-bar" dataKey="score" radius={[4, 4, 4, 4]} barSize={16}>
                  {painData.map((entry, index) => (
                    <Cell key={`bar-cell-${index}`} fill={entry.score > 5 ? '#FCA5A5' : entry.score > 3 ? '#FCD34D' : '#93C5FD'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Range of Motion Empty State */}
      <div>
        <h3 className="text-[16px] font-bold text-gray-900 mb-4 px-1">关节活动度</h3>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 relative">
            <Activity size={32} className="text-blue-500" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
              <PenTool size={12} className="text-blue-400" />
            </div>
          </div>
          
          <h4 className="text-[15px] font-bold text-gray-900 mb-2">完成首次功能评估，解锁此报告</h4>
          <p className="text-[12px] text-gray-500 mb-6 max-w-[200px] leading-relaxed">
            通过 3D 动作捕捉技术，我们将精准分析您的关节活动受限情况。
          </p>
          
          <button 
            onClick={() => navigate('/assessment')}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-[13px] shadow-lg shadow-blue-200 active:scale-95 transition-all"
          >
            开始评估
          </button>
        </div>
      </div>

    </div>
  );
}