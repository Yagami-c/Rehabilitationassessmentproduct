import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Camera, RefreshCw, Star, X, Check, Activity, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export function CameraEval() {
  const navigate = useNavigate();
  const { points, setPoints } = useStore();
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const currentActionName = "坐姿抬腿";

  // Mock progression
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isEvaluating) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsEvaluating(false);
            const finalScore = 85 + Math.floor(Math.random() * 10);
            setScore(finalScore); // 85-95 score
            
            // Add points on completion
            setPoints(points + 30);
            
            setShowResult(true);
            return 100;
          }
          return prev + 5;
        });
      }, 500);
    }
    
    return () => clearInterval(interval);
  }, [isEvaluating]);

  const handleStart = () => {
    setIsEvaluating(true);
    setProgress(0);
  };

  const handleExit = () => {
    navigate('/training');
  };

  if (showResult) {
    return (
      <div className="flex flex-col h-screen bg-[#F5F7FA] font-sans">
        <div className="px-5 pt-12 pb-4 flex items-center bg-white shadow-sm z-10">
          <button onClick={handleExit} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
            <X size={24} className="text-gray-900" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-gray-900 mr-8">评估完成</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
          <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check size={48} className="text-green-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">本次动作得分</h2>
            <div className="text-5xl font-black text-blue-600 mb-4">{score}<span className="text-2xl text-gray-500 ml-1">分</span></div>
            
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={24} 
                  className={star <= (score / 20) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} 
                />
              ))}
            </div>

            <div className="w-full space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 text-sm">获得积分</span>
                  <span className="font-bold text-[#FFD600] flex items-center gap-1">+30 <Star size={12} className="fill-current" /></span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-500 text-sm">完成动作</span>
                  <span className="font-bold text-gray-900">{currentActionName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">关节角度保持</span>
                  <span className="font-bold text-green-500">优秀 (165°)</span>
                </div>
              </div>
              
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-800 text-sm mb-2 flex items-center gap-1">
                  <Activity size={16} /> 康养建议
                </h3>
                <p className="text-sm text-blue-700/80 leading-relaxed">
                  您的动作标准度很高，腿部抬升角度已经达到康养预期标准。继续保持，建议每天完成3组练习。
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleExit}
            className="w-full max-w-sm h-12 mt-8 bg-blue-600 text-white rounded-xl font-bold text-[16px] flex items-center justify-center shadow-lg shadow-blue-200 active:scale-[0.98] transition-all"
          >
            返回训练主页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black font-sans relative overflow-hidden">
      {/* Mock Camera View */}
      <div className="absolute inset-0 z-0 opacity-60">
        <img 
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800&h=1200" 
          alt="Camera view background"
          className="w-full h-full object-cover"
        />
        {/* Fake MediaPipe Skeleton */}
        {isEvaluating && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-green-400 stroke-2 fill-green-500 opacity-80" preserveAspectRatio="xMidYMid slice">
              <circle cx="50" cy="20" r="2" />
              <line x1="50" y1="24" x2="50" y2="45" />
              <line x1="30" y1="30" x2="70" y2="30" />
              <line x1="50" y1="45" x2="40" y2="80" />
              <line x1="50" y1="45" x2="60" y2="80" />
              <circle cx="30" cy="30" r="1.5" />
              <circle cx="70" cy="30" r="1.5" />
              
              {/* Dynamic leg lift simulation */}
              <circle cx="40" cy={80 - (progress * 0.3)} r="2" fill="yellow" />
              <circle cx="60" cy="80" r="2" />
              
              <text x="35" y={80 - (progress * 0.3) - 5} fill="white" fontSize="4" stroke="none" className="font-mono">
                {180 - Math.floor(progress * 0.4)}°
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="relative z-10 px-5 pt-12 pb-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={handleExit} className="p-2 rounded-full bg-white/20 backdrop-blur-md">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isEvaluating ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-white text-sm font-medium">AI视觉评估</span>
        </div>
        <button className="p-2 rounded-full bg-white/20 backdrop-blur-md">
          <RefreshCw size={20} className="text-white" />
        </button>
      </div>

      {/* Instructional Overlay */}
      {!isEvaluating && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] p-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{currentActionName}</h2>
            <p className="text-gray-500 text-sm mb-6">请将手机放置在前方约1.5米处，确保全身或下半身完整入镜。</p>
            
            <div className="bg-blue-50 text-blue-700 p-3 rounded-xl text-sm text-left flex items-start gap-2 mb-8">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>动作要领：保持背部挺直，缓慢抬起单腿至最大角度，停留2秒后放下。</span>
            </div>

            <button 
              onClick={handleStart}
              className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all"
            >
              <Camera size={18} /> 我已准备好，开始评估
            </button>
          </div>
        </div>
      )}

      {/* Evaluating Overlay */}
      {isEvaluating && (
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pb-safe">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">当前动作</p>
              <p className="text-white font-bold text-xl">{currentActionName}</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">完成度</p>
              <p className="text-white font-bold text-3xl font-mono">{progress}%</p>
            </div>
          </div>
          
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <p className="text-white text-sm">
                {progress < 30 ? "保持平稳，慢慢抬起..." : 
                 progress < 70 ? "很好，保持这个高度！" : 
                 "慢慢放下，控制力度..."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}