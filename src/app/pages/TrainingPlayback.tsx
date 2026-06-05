import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { X, Pause, Play, SkipForward, SkipBack, Info } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import clsx from 'clsx';

export function TrainingPlayback() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentStep, setCurrentStep] = useState(0);

  const playlist = [
    { name: '转身摸臀', duration: 30, img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80', description: '保持核心收紧，自然呼吸', type: 'reps', count: '10次' },
    { name: '后踢臀部', duration: 30, img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80', description: '脚跟尽量触碰臀部', type: 'reps', count: '10次' },
    { name: '提膝碰肘', duration: 45, img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80', description: '躯干微卷，感受腹部发力', type: 'reps', count: '左右各8次' },
  ];

  const currentExercise = playlist[currentStep];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            handleNext();
            return 0;
          }
          // Increment based on duration to reach 100%
          return p + (100 / (currentExercise.duration * 10)); // runs every 100ms
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, currentExercise.duration]);

  const handleNext = () => {
    if (currentStep < playlist.length - 1) {
      setCurrentStep(s => s + 1);
      setProgress(0);
    } else {
      setIsPlaying(false);
      navigate('/training-summary');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
      setProgress(0);
    } else {
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 text-white flex flex-col h-full max-w-md mx-auto shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="absolute top-0 w-full px-5 pt-12 pb-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center active:scale-95 transition-all">
          <X size={20} />
        </button>
        <div className="flex gap-1.5">
          {playlist.map((_, idx) => (
            <div key={idx} className="h-1.5 w-6 rounded-full bg-white/20 overflow-hidden">
              <div 
                className={clsx("h-full bg-white transition-all duration-100", 
                  idx < currentStep ? "w-full" : idx === currentStep ? "w-full" : "w-0"
                )}
                style={idx === currentStep ? { width: `${progress}%` } : {}}
              />
            </div>
          ))}
        </div>
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center active:scale-95 transition-all">
          <Info size={20} />
        </button>
      </div>

      {/* Main Visual */}
      <div className="flex-1 relative">
        <ImageWithFallback 
          src={currentExercise.img} 
          alt={currentExercise.name} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
      </div>

      {/* Controls & Info */}
      <div className="absolute bottom-0 w-full p-6 pt-10 pb-safe">
        <div className="mb-8">
          <div className="flex items-end justify-between mb-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight mb-1">{currentExercise.name}</h2>
              <p className="text-gray-400 text-sm">{currentExercise.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-blue-400">{currentExercise.count}</div>
              <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">{currentExercise.type}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mb-6">
          <button onClick={handlePrev} className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition-all">
            <SkipBack size={24} className="fill-current" />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/50 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause size={32} className="fill-current" /> : <Play size={32} className="fill-current ml-1" />}
          </button>

          <button onClick={handleNext} className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition-all">
            <SkipForward size={24} className="fill-current" />
          </button>
        </div>

        {/* Next Up */}
        {currentStep < playlist.length - 1 && (
          <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-md flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-3">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Next</div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
              <div className="text-sm font-bold">{playlist[currentStep + 1].name}</div>
            </div>
            <div className="text-xs text-gray-400">{playlist[currentStep + 1].count}</div>
          </div>
        )}
      </div>

    </div>
  );
}