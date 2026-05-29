import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingDown, Activity, Share2, Sparkles, Image as ImageIcon, Copy, PenTool, CheckCircle2, AlertCircle, RefreshCw, X } from 'lucide-react';
import { toast } from 'sonner';

export function Report() {
  const navigate = useNavigate();
  const { isDarkMode } = useStore();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showShareEditor, setShowShareEditor] = useState(false);
  const [shareText, setShareText] = useState('今天完成了膝关节康养评估，疼痛感明显减轻！继续坚持，离完全康养又近了一步 💪 #膝盖康养 #健康打卡');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isPrivacyMode, setIsPrivacyMode] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('redbook'); // 'redbook' or 'moments'

  const painData = [
    { day: '周一', score: 6 },
    { day: '周二', score: 5 },
    { day: '周三', score: 4 },
    { day: '周四', score: 5 },
    { day: '周五', score: 3 },
    { day: '周六', score: 6 },
    { day: '周日', score: 4 },
  ];

  const generateAiText = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setShareText('🎉 康养打卡Day5！从一开始的下蹲痛到现在的轻松应对，膝关节的活动度也有了明显提升。智能设备的辅助真的很有用，期待彻底告别疼痛的那天！✨ #康养日常 #运动康养');
      setIsAiGenerating(false);
      toast.success('AI文案生成成功');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full dark:bg-[#121212] bg-[#F5F7FA] relative font-sans transition-colors">
      <div className="bg-white dark:bg-[#1E1E1E] px-4 pt-12 pb-4 shadow-sm sticky top-0 z-20 flex justify-between items-center transition-colors">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 dark:text-gray-300 active:scale-95">
          <X size={24} />
        </button>
        <span className="font-bold text-[18px] text-gray-900 dark:text-[#F5F5F5]">康养报告</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-32 space-y-6">
        
        {/* Overview Header */}
        <div className="bg-[#2C7CFF] rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h2 className="text-[20px] font-bold">综合康养评分</h2>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-[48px] font-bold leading-none font-mono">85</span>
                <span className="text-[14px] text-blue-100 mb-2">/ 100</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-inner">
              <span className="text-[32px] drop-shadow-md">😄</span>
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-[13px] text-blue-50 relative z-10 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
            <div><span className="opacity-80">下蹲痛感:</span> <strong className="text-white ml-1">2</strong> (↓1)</div>
            <div><span className="opacity-80">关节活动:</span> <strong className="text-white ml-1">95°</strong> (↑10°)</div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="dark:bg-[#D50000]/10 bg-[#FFF0F0] rounded-[16px] p-4 flex items-start gap-3 border dark:border-[#D50000]/30 border-[#FFCDD2] transition-colors shadow-sm">
          <AlertCircle size={18} className="dark:text-[#FF8A80] text-[#D50000] shrink-0 mt-0.5" />
          <p className="text-[13px] dark:text-[#FF8A80] text-[#D50000] leading-relaxed">
            免责提示：本报告由AI算法生成，仅供参考，不作为临床医疗诊断依据。如感不适请及时就医。
          </p>
        </div>
      
        {/* Pain Trend Chart */}
        <div>
          <h3 className="text-[18px] font-bold dark:text-[#F5F5F5] text-gray-900 mb-4 px-1 flex items-center justify-between">
            <span>疼痛趋势 <span className="text-[13px] font-normal dark:text-gray-400 text-gray-500 ml-2">近7天</span></span>
          </h3>
          
          <div className="dark:bg-[#1E1E1E] bg-white rounded-3xl p-6 shadow-sm border dark:border-[#2C2C2C] border-gray-100 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="dark:bg-green-900/20 bg-green-50 p-2.5 rounded-xl border border-green-100 dark:border-green-900/30">
                <TrendingDown size={24} className="dark:text-green-400 text-green-600" />
              </div>
              <div>
                <div className="text-[16px] font-bold dark:text-[#F5F5F5] text-gray-900">平均分 4.8</div>
                <div className="text-[13px] dark:text-gray-400 text-gray-500 mt-1">较上周下降 12%</div>
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
                    tick={{ fontSize: 12, fill: '#9CA3AF' }} 
                    dy={10}
                  />
                  <YAxis 
                    key="report-yaxis"
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                    domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]}
                  />
                  <Tooltip 
                    key="report-tooltip"
                    cursor={{ fill: '#F3F4F6', opacity: 0.5 }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                    labelStyle={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}
                    itemStyle={{ fontSize: '14px', color: '#3B82F6', fontWeight: 'bold' }}
                  />
                  <Bar key="report-bar" dataKey="score" radius={[6, 6, 6, 6]} barSize={20}>
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
          <h3 className="text-[18px] font-bold dark:text-[#F5F5F5] text-gray-900 mb-4 px-1">关节活动度</h3>
          
          <div className="dark:bg-[#1E1E1E] bg-white rounded-3xl p-8 shadow-sm border dark:border-[#2C2C2C] border-gray-100 flex flex-col items-center justify-center text-center transition-colors">
            <div className="w-24 h-24 dark:bg-blue-900/20 bg-blue-50 rounded-full flex items-center justify-center mb-5 relative shadow-inner">
              <Activity size={40} className="dark:text-blue-400 text-blue-500" />
              <div className="absolute -top-1 -right-1 w-8 h-8 dark:bg-[#2C2C2C] bg-white rounded-full flex items-center justify-center shadow-md">
                <PenTool size={16} className="dark:text-blue-400 text-blue-400" />
              </div>
            </div>
            
            <h4 className="text-[16px] font-bold dark:text-[#F5F5F5] text-gray-900 mb-3">完成首次功能评估，解锁此报告</h4>
            <p className="text-[13px] dark:text-gray-400 text-gray-500 mb-6 max-w-[240px] leading-relaxed">
              通过 3D 动作捕捉技术，我们将精准分析您的关节活动受限情况。
            </p>
            
            <button 
              onClick={() => navigate('/device-questionnaire')}
              className="px-8 py-3 bg-[#2C7CFF] text-white rounded-full font-bold text-[14px] shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              开始评估
            </button>
          </div>
        </div>
        
        {/* "For You" Recommendations */}
        <div>
          <h3 className="text-[18px] font-bold dark:text-[#F5F5F5] text-[#1A1A1A] mb-4 px-1">为你推荐</h3>
          <div className="dark:bg-[#1E1E1E] bg-white rounded-3xl p-5 shadow-sm border dark:border-[#2C2C2C] border-gray-100 flex gap-4 transition-colors">
            <div className="w-28 h-28 dark:bg-gray-800 bg-gray-100 rounded-2xl shrink-0 overflow-hidden relative flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <span className="dark:text-gray-500 text-gray-400 text-[12px]">视频封面</span>
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h4 className="font-bold text-[15px] dark:text-[#F5F5F5] text-[#1A1A1A] line-clamp-2 leading-snug">缓解膝盖弹响的3个居家拉伸动作</h4>
                <p className="text-[13px] dark:text-[#9CA3AF] text-[#6B7280] mt-1.5 flex items-center gap-1"><CheckCircle2 size={14} className="text-blue-500"/> 骨科专家示范</p>
              </div>
              <button 
                onClick={() => navigate('/education')}
                className="self-start text-[13px] dark:text-blue-400 text-[#2C7CFF] font-bold dark:bg-blue-900/20 bg-blue-50 px-4 py-1.5 rounded-full active:scale-95 transition-transform"
              >
                去观看
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Fixed Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto dark:bg-[#1E1E1E] bg-white/90 backdrop-blur-lg border-t dark:border-[#2C2C2C] border-gray-100 px-5 py-4 pb-safe flex gap-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] transition-colors z-30">
        <button 
          onClick={() => {
            if (window.confirm("重新评估将清空今日当前数据，确定继续吗？")) {
              navigate('/device-questionnaire');
            }
          }}
          className="flex-1 h-[52px] dark:bg-gray-800 bg-[#F5F7FA] dark:text-[#F5F5F5] text-[#1A1A1A] rounded-2xl font-bold text-[16px] active:scale-95 transition-all border border-gray-200 dark:border-gray-700"
        >
          重新评估
        </button>
        <button 
          onClick={() => setShowShareOptions(true)}
          className="flex-1 h-[52px] bg-[#2C7CFF] text-white rounded-2xl font-bold text-[16px] shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Share2 size={20} /> 分享报告
        </button>
      </div>

      {/* Share Template Selector Overlay */}
      {showShareOptions && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end max-w-md mx-auto">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowShareOptions(false)} />
          <div className="bg-[#F5F7FA] dark:bg-[#121212] rounded-t-[32px] w-full p-8 relative animate-in slide-in-from-bottom-full duration-300 pb-safe">
            <h3 className="text-[20px] font-bold text-[#1A1A1A] dark:text-white text-center mb-8">选择分享模板</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <button 
                onClick={() => { setSelectedTemplate('redbook'); setShowShareOptions(false); setShowShareEditor(true); }}
                className="flex flex-col items-center gap-3 active:scale-95 transition-transform"
              >
                <div className="w-full aspect-[3/4] bg-white dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-[#2C7CFF] shadow-md flex items-center justify-center relative overflow-hidden">
                  <div className="w-full h-1/2 bg-blue-50 dark:bg-blue-900/20 absolute top-0"></div>
                  <div className="w-[75%] h-[75%] bg-white dark:bg-gray-700 rounded-xl shadow-lg z-10 p-3 flex flex-col border border-gray-100 dark:border-gray-600">
                    <div className="w-full h-1/2 bg-blue-100 dark:bg-blue-800/50 rounded-lg mb-2"></div>
                    <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-600 rounded-full mb-1.5"></div>
                    <div className="w-2/3 h-2.5 bg-gray-100 dark:bg-gray-600 rounded-full"></div>
                  </div>
                </div>
                <span className="text-[13px] font-bold text-[#1A1A1A] dark:text-gray-200">图文日记</span>
              </button>

              <button 
                onClick={() => { setSelectedTemplate('moments'); setShowShareOptions(false); setShowShareEditor(true); }}
                className="flex flex-col items-center gap-3 active:scale-95 transition-transform"
              >
                <div className="w-full aspect-[3/4] bg-white dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-[#2C7CFF] shadow-md flex items-center justify-center p-4">
                  <div className="w-full h-full border-2 border-gray-100 dark:border-gray-700 rounded-xl flex flex-col p-2.5">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 mb-3 mx-auto"></div>
                    <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600"></div>
                  </div>
                </div>
                <span className="text-[13px] font-bold text-[#1A1A1A] dark:text-gray-200">数据卡片</span>
              </button>

              <button 
                className="flex flex-col items-center gap-3 opacity-40 cursor-not-allowed"
              >
                <div className="w-full aspect-[3/4] bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center p-4">
                  <div className="w-14 h-14 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-[24px]">🌟</div>
                </div>
                <span className="text-[13px] font-bold text-[#1A1A1A] dark:text-gray-200 whitespace-nowrap">成就勋章(期待)</span>
              </button>
            </div>
            
            <button 
              onClick={() => setShowShareOptions(false)}
              className="w-full py-4 bg-white dark:bg-gray-800 text-[#1A1A1A] dark:text-white rounded-2xl font-bold border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* Share Editor Full Screen Overlay */}
      {showShareEditor && (
        <div className="absolute inset-0 z-50 bg-[#F5F7FA] dark:bg-[#121212] flex flex-col animate-in slide-in-from-right-full duration-300 max-w-md mx-auto">
          <div className="flex justify-between items-center px-4 pt-12 pb-4 bg-white dark:bg-[#1E1E1E] shadow-sm">
            <button onClick={() => setShowShareEditor(false)} className="text-[#6B7280] dark:text-gray-300 font-medium px-2 py-1">取消</button>
            <span className="font-bold text-[#1A1A1A] dark:text-white text-[18px]">分享编辑</span>
            <button 
              className="px-5 py-2 bg-[#2C7CFF] text-white rounded-full text-[14px] font-bold active:scale-95 shadow-md shadow-blue-500/20"
              onClick={() => {
                toast.success('已保存到系统相册，去分享吧！');
                setTimeout(() => setShowShareEditor(false), 1000);
              }}
            >
              保存图片
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {/* Preview Card */}
            <div className={`w-full ${selectedTemplate === 'redbook' ? 'aspect-[3/4]' : 'aspect-square'} bg-white dark:bg-[#1E1E1E] rounded-[24px] shadow-lg mb-6 flex flex-col overflow-hidden border border-gray-100 dark:border-[#2C2C2C]`}>
              {selectedTemplate === 'redbook' ? (
                <>
                  {/* Photo area */}
                  <div className="flex-1 bg-[#F5F7FA] dark:bg-gray-800 flex items-center justify-center relative cursor-pointer group">
                    <ImageIcon className="text-[#9CA3AF] w-16 h-16 opacity-30 group-hover:scale-110 transition-transform" />
                    <div className="absolute bottom-5 right-5 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[12px] flex items-center gap-1.5 font-medium border border-white/20">
                      <ImageIcon size={14} /> 点击替换照片
                    </div>
                  </div>
                  {/* Data overlay */}
                  <div className="h-[140px] bg-white dark:bg-[#1E1E1E] p-6 flex flex-col justify-between border-t border-gray-100 dark:border-[#2C2C2C]">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] font-medium">今日康养评分</div>
                        <div className="text-[36px] font-black text-[#2C7CFF] leading-none mt-2">85<span className="text-[16px] ml-1">分</span></div>
                      </div>
                      <div className="bg-[#E8F5E9] dark:bg-green-900/20 text-[#00C853] dark:text-green-400 px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1 border border-green-100 dark:border-green-800">
                        <TrendingDown size={14} /> 疼痛下降
                      </div>
                    </div>
                    {/* Desensitized User Info */}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-[10px]">🤖</div>
                      <span className="text-[13px] text-[#9CA3AF] font-medium">{isPrivacyMode ? '匿名用户 (保密)' : '真实姓名'} · 智能康养助手打卡</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 flex flex-col h-full bg-gradient-to-br from-[#2C7CFF] to-blue-800 text-white relative">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                  
                  <div className="flex justify-between items-center mb-auto relative z-10">
                    <div className="text-white/90 text-[14px] font-medium">康养里程碑</div>
                    <div className="bg-white/20 px-3 py-1 rounded-lg text-[12px] font-bold backdrop-blur-md border border-white/20">Day 5</div>
                  </div>
                  
                  <div className="my-auto text-center relative z-10">
                    <div className="text-[80px] font-black leading-none font-mono tracking-tighter drop-shadow-lg">85</div>
                    <div className="text-[16px] opacity-90 mt-3 font-medium">今日综合状态校准得分</div>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-end border-t border-white/20 pt-5 relative z-10">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[12px] opacity-80">屈膝角度</span>
                      <span className="text-[20px] font-bold">95° (达标)</span>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[12px] opacity-80">设备记录</span>
                      <span className="text-[14px] font-bold">智能康养PAD</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Privacy Toggle */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 flex justify-between items-center mb-6 shadow-sm border border-gray-100 dark:border-[#2C2C2C]">
              <span className="text-[15px] text-[#1A1A1A] dark:text-white font-bold flex items-center gap-2">
                隐私保护模式 <span className="text-[12px] text-[#9CA3AF] font-normal ml-1">隐藏姓名等敏感信息</span>
              </span>
              <div 
                className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 ${isPrivacyMode ? "bg-[#00C853]" : "bg-gray-200 dark:bg-gray-700"}`}
                onClick={() => setIsPrivacyMode(!isPrivacyMode)}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${isPrivacyMode ? "translate-x-7" : "translate-x-0"}`} />
              </div>
            </div>

            {/* Text Editor */}
            {selectedTemplate === 'redbook' && (
              <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2C2C2C] overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100 dark:border-[#2C2C2C] flex justify-between items-center bg-[#F5F7FA] dark:bg-gray-800">
                  <span className="text-[14px] font-bold text-[#1A1A1A] dark:text-white">分享文案</span>
                  <button 
                    onClick={generateAiText}
                    disabled={isAiGenerating}
                    className="text-[13px] text-[#2C7CFF] font-bold flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg active:scale-95 disabled:opacity-50 transition-all border border-blue-100 dark:border-blue-800/50"
                  >
                    {isAiGenerating ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    AI帮你写
                  </button>
                </div>
                <textarea 
                  value={shareText}
                  onChange={(e) => setShareText(e.target.value)}
                  className="w-full h-32 p-4 text-[15px] text-[#1A1A1A] dark:text-[#F5F5F5] leading-relaxed resize-none focus:outline-none placeholder-[#9CA3AF] bg-transparent"
                  placeholder="说点什么吧..."
                />
                <div className="p-3 border-t border-gray-100 dark:border-[#2C2C2C] flex justify-end bg-white dark:bg-[#1E1E1E]">
                  <button className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] font-medium flex items-center gap-1.5 active:text-[#1A1A1A] dark:active:text-white px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Copy size={14} /> 复制文案
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
