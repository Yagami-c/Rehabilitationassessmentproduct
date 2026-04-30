import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { X, Activity, AlertCircle, Camera, CheckCircle2 } from 'lucide-react';
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';

// 忽略 MediaPipe 中的 WebGL 默认日志避免控制台报错提示
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

const suppressLog = (logFunction: any, ...args: any[]) => {
  if (typeof args[0] === 'string' && args[0].includes('gl_context.cc')) return;
  logFunction(...args);
};

console.log = (...args: any[]) => suppressLog(originalLog, ...args);
console.warn = (...args: any[]) => suppressLog(originalWarn, ...args);
console.error = (...args: any[]) => suppressLog(originalError, ...args);

// 绘制正面人体骨架的辅助函数
const drawFrontSkeleton = (
  ctx: CanvasRenderingContext2D, 
  actionId: string, 
  flex: number, 
  centerX: number, 
  centerY: number, 
  scale: number, 
  color: string,
  showAngle: boolean,
  angleValue: number
) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (actionId === 'squat') {
    const hipY = centerY - scale * 0.2 + flex * scale * 0.8;
    const shoulderY = hipY - scale * 1.2;
    const shoulderW = scale * 0.5;
    const hipW = scale * 0.4;
    
    const leftHip = {x: centerX - hipW, y: hipY};
    const rightHip = {x: centerX + hipW, y: hipY};
    const leftAnkle = {x: centerX - hipW * 1.2, y: centerY + scale * 1.8};
    const rightAnkle = {x: centerX + hipW * 1.2, y: centerY + scale * 1.8};
    
    const leftKnee = {
      x: leftHip.x - flex * scale * 0.6,
      y: leftHip.y + (leftAnkle.y - leftHip.y) * 0.5 + flex * scale * 0.3
    };
    const rightKnee = {
      x: rightHip.x + flex * scale * 0.6,
      y: rightHip.y + (rightAnkle.y - rightHip.y) * 0.5 + flex * scale * 0.3
    };

    const leftShoulder = {x: centerX - shoulderW, y: shoulderY};
    const rightShoulder = {x: centerX + shoulderW, y: shoulderY};
    const hands = {x: centerX, y: shoulderY + scale * 0.4};
    
    const leftElbow = {x: leftShoulder.x - scale*0.3, y: leftShoulder.y + scale*0.6};
    const rightElbow = {x: rightShoulder.x + scale*0.3, y: rightShoulder.y + scale*0.6};
    const headCenter = {x: centerX, y: shoulderY - scale * 0.6};

    ctx.beginPath();
    ctx.moveTo(leftShoulder.x, leftShoulder.y);
    ctx.lineTo(rightShoulder.x, rightShoulder.y);
    ctx.moveTo(leftHip.x, leftHip.y);
    ctx.lineTo(rightHip.x, rightHip.y);
    ctx.moveTo(centerX, shoulderY);
    ctx.lineTo(centerX, hipY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftHip.x, leftHip.y);
    ctx.lineTo(leftKnee.x, leftKnee.y);
    ctx.lineTo(leftAnkle.x, leftAnkle.y);
    ctx.moveTo(rightHip.x, rightHip.y);
    ctx.lineTo(rightKnee.x, rightKnee.y);
    ctx.lineTo(rightAnkle.x, rightAnkle.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftShoulder.x, leftShoulder.y);
    ctx.lineTo(leftElbow.x, leftElbow.y);
    ctx.lineTo(hands.x, hands.y);
    ctx.moveTo(rightShoulder.x, rightShoulder.y);
    ctx.lineTo(rightElbow.x, rightElbow.y);
    ctx.lineTo(hands.x, hands.y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX, shoulderY);
    ctx.lineTo(centerX, headCenter.y + scale*0.2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(headCenter.x, headCenter.y, scale * 0.35, 0, Math.PI * 2);
    ctx.stroke();

    const joints = [leftHip, rightHip, leftKnee, rightKnee, leftAnkle, rightAnkle, leftShoulder, rightShoulder, leftElbow, rightElbow, hands];
    joints.forEach(j => {
      ctx.beginPath();
      ctx.arc(j.x, j.y, 4, 0, Math.PI*2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.stroke();
    });

    if (showAngle) {
      ctx.fillStyle = color;
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(`${Math.round(angleValue)}°`, rightKnee.x + 15, rightKnee.y);
    }
  } else {
    // 肩外展
    const hipY = centerY + scale * 0.8;
    const shoulderY = centerY - scale * 0.4;
    const shoulderW = scale * 0.5;
    const hipW = scale * 0.4;
    
    const leftHip = {x: centerX - hipW, y: hipY};
    const rightHip = {x: centerX + hipW, y: hipY};
    const leftAnkle = {x: centerX - hipW, y: centerY + scale * 2.2};
    const rightAnkle = {x: centerX + hipW, y: centerY + scale * 2.2};
    const leftKnee = {x: centerX - hipW, y: hipY + (leftAnkle.y - hipY) * 0.5};
    const rightKnee = {x: centerX + hipW, y: hipY + (rightAnkle.y - hipY) * 0.5};

    const leftShoulder = {x: centerX - shoulderW, y: shoulderY};
    const rightShoulder = {x: centerX + shoulderW, y: shoulderY};
    const headCenter = {x: centerX, y: shoulderY - scale * 0.6};

    const armL = scale * 1.0;
    const leftArmAngle = Math.PI/2 - flex * Math.PI/2; 
    const leftElbow = {
      x: leftShoulder.x - armL * 0.5 * Math.cos(leftArmAngle),
      y: leftShoulder.y + armL * 0.5 * Math.sin(leftArmAngle)
    };
    const leftHand = {
      x: leftShoulder.x - armL * Math.cos(leftArmAngle),
      y: leftShoulder.y + armL * Math.sin(leftArmAngle)
    };
    
    const rightArmAngle = Math.PI/2 - flex * Math.PI/2;
    const rightElbow = {
      x: rightShoulder.x + armL * 0.5 * Math.cos(rightArmAngle),
      y: rightShoulder.y + armL * 0.5 * Math.sin(rightArmAngle)
    };
    const rightHand = {
      x: rightShoulder.x + armL * Math.cos(rightArmAngle),
      y: rightShoulder.y + armL * Math.sin(rightArmAngle)
    };

    ctx.beginPath();
    ctx.moveTo(leftShoulder.x, leftShoulder.y);
    ctx.lineTo(rightShoulder.x, rightShoulder.y);
    ctx.moveTo(leftHip.x, leftHip.y);
    ctx.lineTo(rightHip.x, rightHip.y);
    ctx.moveTo(centerX, shoulderY);
    ctx.lineTo(centerX, hipY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftHip.x, leftHip.y);
    ctx.lineTo(leftKnee.x, leftKnee.y);
    ctx.lineTo(leftAnkle.x, leftAnkle.y);
    ctx.moveTo(rightHip.x, rightHip.y);
    ctx.lineTo(rightKnee.x, rightKnee.y);
    ctx.lineTo(rightAnkle.x, rightAnkle.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftShoulder.x, leftShoulder.y);
    ctx.lineTo(leftElbow.x, leftElbow.y);
    ctx.lineTo(leftHand.x, leftHand.y);
    ctx.moveTo(rightShoulder.x, rightShoulder.y);
    ctx.lineTo(rightElbow.x, rightElbow.y);
    ctx.lineTo(rightHand.x, rightHand.y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX, shoulderY);
    ctx.lineTo(centerX, headCenter.y + scale*0.2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(headCenter.x, headCenter.y, scale * 0.35, 0, Math.PI * 2);
    ctx.stroke();

    const joints = [leftHip, rightHip, leftKnee, rightKnee, leftAnkle, rightAnkle, leftShoulder, rightShoulder, leftElbow, rightElbow, leftHand, rightHand];
    joints.forEach(j => {
      ctx.beginPath();
      ctx.arc(j.x, j.y, 4, 0, Math.PI*2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.stroke();
    });

    if (showAngle) {
      ctx.fillStyle = color;
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(`${Math.round(angleValue)}°`, rightShoulder.x + 20, rightShoulder.y - 20);
    }
  }
};

const ACTIONS = [
  { 
    id: 'squat', 
    name: '深蹲', 
    difficulty: 'Level 2',
    targetJoints: [23, 25, 27], // Hip, Knee, Ankle
    targetAngle: 90, 
    tolerance: 15,
    description: '膝盖弯曲至90度，背部挺直' 
  },
  { 
    id: 'abduction', 
    name: '肩外展', 
    difficulty: 'Level 1',
    targetJoints: [24, 12, 14], // Hip, Shoulder, Elbow
    targetAngle: 90, 
    tolerance: 10,
    description: '手臂伸直向两侧抬起至与��同高' 
  },
];

export function MotionAssessment() {
  const navigate = useNavigate();
  const [currentAction, setCurrentAction] = useState(ACTIONS[0]);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [feedback, setFeedback] = useState('正在加载 3D 姿态识别模型...');
  const [score, setScore] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [isDemoVideo, setIsDemoVideo] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const refCanvasRef = useRef<HTMLCanvasElement>(null);
  const poseLandmarkerRef = useRef<PoseLandmarker | null>(null);
  const requestRef = useRef<number>(0);
  const lastVideoTimeRef = useRef<number>(-1);

  // 初始化 MediaPipe 姿态识别模型
  useEffect(() => {
    let active = true;
    const initMediaPipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        const landmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numPoses: 1,
          outputSegmentationMasks: false,
        });
        if (active) {
          poseLandmarkerRef.current = landmarker;
          setIsModelLoaded(true);
          setFeedback('模型加载完成，点击下方按钮开启摄像头');
        }
      } catch (err) {
        console.error("Error loading mediapipe:", err);
        if (active) setFeedback('加载AI模型失败，请检查网络连接');
      }
    };
    initMediaPipe();

    return () => {
      active = false;
      if (poseLandmarkerRef.current) {
        poseLandmarkerRef.current.close();
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // 绘制标准动作（上半屏）
  useEffect(() => {
    let animationFrameId: number;
    const canvas = refCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    const drawReference = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.25;
      
      angle += 0.03;
      const flex = Math.sin(angle) * 0.5 + 0.5; // 0 to 1

      drawFrontSkeleton(ctx, currentAction.id, flex, centerX, centerY, scale, 'rgba(59, 130, 246, 0.8)', false, 0);

      animationFrameId = requestAnimationFrame(drawReference);
    };
    drawReference();

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentAction]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
          videoRef.current?.play();
          setFeedback('请站在屏幕前，全身入镜');
          predictWebcam();
        };
      }
    } catch (err: any) {
      // console.error(err); // 移除错误输出避免污染日志
      setFeedback('摄像头访问被拒绝，即将自动切换至模拟检测模式...');
      setTimeout(() => {
        startMockSimulation();
      }, 1500);
    }
  };

  const startMockSimulation = () => {
    setIsCameraReady(true);
    setFeedback('当前为模拟环境运行...');
    
    // 模拟检测得分和反馈
    let mockScore = 50;
    let mockAngle = 120;
    
    const simulateDetection = () => {
      if (showReport || requestRef.current === -1) return;
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = 640;
      canvas.height = 480;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      mockAngle -= 0.5; // 模拟逐渐达标
      if (mockAngle < currentAction.targetAngle) mockAngle = currentAction.targetAngle;
      
      const error = Math.abs(mockAngle - currentAction.targetAngle);
      const isCorrect = error <= currentAction.tolerance;
      const progress = Math.max(0, 100 - (error / currentAction.targetAngle) * 100);
      
      setScore(Math.round(progress));
      
      if (isCorrect) {
        setFeedback('动作标准，请保持！');
      } else {
        if (currentAction.id === 'squat') {
          setFeedback(mockAngle > currentAction.targetAngle ? '膝盖再弯曲一点' : '膝盖弯曲过度，请稍微起身');
        } else {
          setFeedback(mockAngle < currentAction.targetAngle ? '手臂再抬高一点' : '手臂太高，请放低');
        }
      }
      
      // 模拟画一个骨架
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.25;
      const color = isCorrect ? '#10b981' : '#ef4444';
      
      const flex = Math.max(0, Math.min(1, (180 - mockAngle) / 90));
      drawFrontSkeleton(ctx, currentAction.id, flex, centerX, centerY, scale, color, true, mockAngle);
      
      ctx.fillStyle = color;
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(`(模拟模式)`, centerX - 40, centerY - scale * 1.5);
      
      requestRef.current = requestAnimationFrame(simulateDetection);
    };
    
    simulateDetection();
  };

  // 空间 3D 角度计算 (通过点积)
  const calculate3DAngle = (a: any, b: any, c: any) => {
    const v1 = { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
    const v2 = { x: c.x - b.x, y: c.y - b.y, z: c.z - b.z };
    const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
    const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);
    const angle = Math.acos(dot / (mag1 * mag2));
    return (angle * 180.0) / Math.PI;
  };

  const predictWebcam = () => {
    if (!videoRef.current || !canvasRef.current || !poseLandmarkerRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 同步 Canvas 和 Video 尺寸
    if (canvas.width !== video.videoWidth) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;
      const startTimeMs = performance.now();
      
      poseLandmarkerRef.current.detectForVideo(video, startTimeMs, (result) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (result.worldLandmarks && result.worldLandmarks.length > 0 && result.landmarks && result.landmarks.length > 0) {
          const worldLms = result.worldLandmarks[0];
          const lms = result.landmarks[0];
          
          // 使用 DrawingUtils 绘制基础骨架
          const drawingUtils = new DrawingUtils(ctx);
          
          // 计算目标角度
          const [idA, idB, idC] = currentAction.targetJoints;
          // 我们优先使用左侧关节（如果是两侧对称动作）或根据动作定义
          // 这里简化处理，直接取指定的索引 (例如：23, 25, 27 是左侧髋膝踝)
          const angle = calculate3DAngle(worldLms[idA], worldLms[idB], worldLms[idC]);
          const error = Math.abs(angle - currentAction.targetAngle);
          
          const isCorrect = error <= currentAction.tolerance;
          const progress = Math.max(0, 100 - (error / currentAction.targetAngle) * 100);
          
          setScore(Math.round(progress));
          
          if (isCorrect) {
            setFeedback('动作标准，请保持！');
          } else {
            if (currentAction.id === 'squat') {
              setFeedback(angle > currentAction.targetAngle ? '膝盖再弯曲一点' : '膝盖弯曲过度，请稍微起身');
            } else {
              setFeedback(angle < currentAction.targetAngle ? '手臂再抬高一点' : '手臂太高，请放低');
            }
          }

          // 自定义绘制关键连接线，错误时变红
          ctx.save();
          ctx.lineWidth = 6;
          ctx.lineCap = 'round';
          
          // 绘制除目标关节外的大致骨架（灰色/半透明白色）
          drawingUtils.drawConnectors(lms, PoseLandmarker.POSE_CONNECTIONS, {
            color: 'rgba(255,255,255,0.4)',
            lineWidth: 3
          });
          
          // 绘制目标关节的线段，带有纠正颜色
          const color = isCorrect ? '#10b981' : '#ef4444';
          ctx.strokeStyle = color;
          
          ctx.beginPath();
          ctx.moveTo(lms[idA].x * canvas.width, lms[idA].y * canvas.height);
          ctx.lineTo(lms[idB].x * canvas.width, lms[idB].y * canvas.height);
          ctx.lineTo(lms[idC].x * canvas.width, lms[idC].y * canvas.height);
          ctx.stroke();
          
          // 画出目标关���圆点
          [idA, idB, idC].forEach((id) => {
            ctx.beginPath();
            ctx.arc(lms[id].x * canvas.width, lms[id].y * canvas.height, 8, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.stroke();
          });
          
          // 在中间关节处显示角度文本
          ctx.fillStyle = color;
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText(`${Math.round(angle)}°`, lms[idB].x * canvas.width + 15, lms[idB].y * canvas.height);
          
          ctx.restore();
        } else {
          setFeedback('未检测到人体，请确保全身在画面内');
          setScore(0);
        }
      });
    }
    
    if (!showReport) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  };

  const handleFinish = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
    setShowReport(true);
  };

  if (showReport) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative overflow-hidden">
        <div className="absolute top-0 w-full z-20 flex justify-between items-center p-5 pt-12 bg-white shadow-sm">
          <button onClick={() => navigate('/report')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-95">
            <X size={24} />
          </button>
          <div className="text-lg font-bold text-gray-900">
            训练简报
          </div>
          <div className="w-10"></div>
        </div>
        
        <div className="flex-1 p-6 pt-28 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-100/50 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="text-blue-600 w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">训练完成</h2>
            <p className="text-gray-500 mb-6">您已完成「{currentAction.name}」的 3D 姿态评估</p>
            
            <div className="w-full bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="text-sm text-gray-500 mb-1">综合动作准确度</div>
              <div className="text-5xl font-bold text-blue-600 tabular-nums">
                {score}<span className="text-xl text-blue-400 font-normal">%</span>
              </div>
            </div>
            
            <div className="w-full space-y-3 text-left">
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                <AlertCircle className="text-orange-500" size={18} />
                最需改善：<span className="font-bold">膝关节角度控制</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/report')}
            className="w-full bg-blue-600 text-white rounded-2xl py-4 font-bold text-lg shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
          >
            查看完整报告
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white relative max-w-md mx-auto overflow-hidden">
      {/* 顶部控制栏 */}
      <div className="absolute top-0 w-full z-30 flex justify-between items-center p-5 pt-12 bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-all">
          <X size={24} />
        </button>
        <div className="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-sm font-medium border border-white/20 flex gap-2">
          {ACTIONS.map(a => (
            <span 
              key={a.id} 
              onClick={() => !isCameraReady && setCurrentAction(a)}
              className={`cursor-pointer transition-colors ${currentAction.id === a.id ? 'text-blue-400 font-bold' : 'text-gray-400'}`}
            >
              {a.name}
            </span>
          ))}
        </div>
        <div className="w-10"></div>
      </div>

      {/* 上半屏：3D骨骼重建与标准对比 */}
      <div className="h-[50%] bg-slate-900 relative flex flex-col justify-end pb-4 items-center overflow-hidden border-b-2 border-blue-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-10 pt-20">
        {/* 标准动作幽灵骨骼 */}
        <canvas ref={refCanvasRef} width={640} height={480} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain pointer-events-none opacity-50 z-0" />
        
        {/* 将 MediaPipe 绘制层移至上半屏，与标准动作合并对比 */}
        <canvas 
          ref={canvasRef} 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain z-10 ${isDemoVideo ? '' : 'scale-x-[-1]'}`} 
        />

        <div className="absolute top-20 left-4 bg-black/40 backdrop-blur px-4 py-2 rounded-xl text-left z-20">
          <div className="text-sm font-bold text-blue-300">{currentAction.name} ({currentAction.difficulty})</div>
          <div className="text-xs text-gray-300 mt-1">{currentAction.description}</div>
        </div>

        {/* 实时状态浮层 (移至上半屏) */}
        {isCameraReady && (
          <div className="absolute top-20 right-4 z-20">
            <div className="bg-black/60 backdrop-blur-md rounded-2xl p-3 flex flex-col items-center min-w-[90px] border border-white/10 shadow-lg">
              <span className="text-xs text-gray-400 mb-1">完成度</span>
              <div className={`text-2xl font-bold font-mono ${score > 85 ? 'text-green-400' : score > 60 ? 'text-blue-400' : 'text-orange-400'}`}>
                {score}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 下半屏：摄像头原始画面 (纯净无叠加) */}
      <div className="flex-1 relative bg-gray-950 overflow-hidden">
        {!isCameraReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20 bg-gray-900/90 backdrop-blur">
            <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-6">
              <Camera className="text-blue-500 w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold mb-2">准备好开始了吗？</h3>
            <p className="text-sm text-gray-400 mb-8">{feedback}</p>
            <button 
              onClick={startCamera}
              disabled={!isModelLoaded}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:active:scale-100 text-white rounded-xl px-8 py-3.5 font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all w-full max-w-[240px]"
            >
              {isModelLoaded ? '开启摄像头开始检测' : '请等待模型加载...'}
            </button>
            <div className="mt-4 w-full max-w-[240px] relative">
              <input 
                type="file" 
                accept="video/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  if (videoRef.current) {
                    videoRef.current.srcObject = null;
                    videoRef.current.src = url;
                    videoRef.current.loop = true;
                    videoRef.current.onloadedmetadata = () => {
                      setIsCameraReady(true);
                      setIsDemoVideo(true);
                      videoRef.current?.play();
                      setFeedback('正在基于演示视频进行评估...');
                      predictWebcam();
                    };
                  }
                }}
                disabled={!isModelLoaded}
              />
              <button
                disabled={!isModelLoaded}
                className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl px-8 py-3 text-sm font-medium border border-gray-700 active:scale-95 transition-all disabled:opacity-50"
              >
                选择本地视频演示
              </button>
            </div>
            
            <button
              onClick={startMockSimulation}
              className="mt-4 text-gray-500 hover:text-gray-400 text-xs font-medium underline underline-offset-2 transition-all"
            >
              没视频？使用 2D 模拟模式
            </button>
          </div>
        )}
        
        {/* 视频容器 (纯净无叠加) */}
        <video 
          ref={videoRef} 
          className={`absolute inset-0 w-full h-full object-cover ${isDemoVideo ? '' : 'scale-x-[-1]'}`} 
          playsInline 
          muted 
        />

        {/* 人形辅助对齐框 */}
        {isCameraReady && !isDemoVideo && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10 pb-20">
            <div className="bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-white/90 text-xs tracking-wider mb-3 border border-white/10 shadow-sm">
              请将全身对准辅助框
            </div>
            <svg viewBox="0 0 100 200" className="h-[75%] max-w-[200px] opacity-40 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" preserveAspectRatio="xMidYMid meet">
              <g fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray="4 6" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="50" cy="24" rx="14" ry="18" />
                <path d="M 28 55 Q 50 48 72 55 L 64 110 Q 50 115 36 110 Z" />
                <path d="M 28 55 L 12 105" />
                <path d="M 72 55 L 88 105" />
                <path d="M 40 110 L 32 190" />
                <path d="M 60 110 L 68 190" />
              </g>
            </svg>
          </div>
        )}

        {/* 底部信息浮层与结束按钮 */}
        {isCameraReady && (
          <div className="absolute bottom-6 left-4 right-4 z-20 space-y-4">
            {/* 纠正提示框 */}
            <div className={`backdrop-blur-md rounded-2xl p-4 flex items-start gap-3 border shadow-xl transition-colors duration-300 ${
              score > 85 ? 'bg-green-900/80 border-green-500/50' : 'bg-red-900/80 border-red-500/50'
            }`}>
              {score > 85 ? (
                <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={22} />
              ) : (
                <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={22} />
              )}
              <div className="flex-1 text-base font-medium leading-relaxed drop-shadow-md text-white">
                {feedback}
              </div>
            </div>
            
            <button 
              onClick={handleFinish}
              className="w-full bg-white text-black font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform"
            >
              结束训练
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
