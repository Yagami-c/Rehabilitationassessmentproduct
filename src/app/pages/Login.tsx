import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';
import { Mail, Smartphone, MessageCircle, X, Phone } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import companyLogo from '../../imports/棰勮鍥綺鐢绘澘_1.jpg';
import clsx from 'clsx';

export function Login() {
  const navigate = useNavigate();
  const { login, updateProfile } = useStore();
  
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [phone, setPhone] = useState('13800138000');
  const [code, setCode] = useState('');
  const [showTerms, setShowTerms] = useState(false);

  const isFormValid = phone.length > 0 && code.length > 0;

  const handleSubmit = () => {
    if (!agreed) {
      alert("请先同意隐私协议");
      return;
    }
    
    login();

    updateProfile({
      name: '用户' + Math.floor(Math.random() * 10000),
      gender: 'Male',
      age: 28,
      height: 175,
      weight: 70,
      bmi: 22.86
    });
    
    // For demo purposes, we randomly simulate new user (1 in 3 chance)
    if (Math.random() > 0.66) {
      localStorage.removeItem('hasCompletedOnboarding');
      navigate('/condition');
    } else {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white relative max-w-md mx-auto shadow-2xl overflow-y-auto">
      <div className="flex-1 px-6 pt-20 pb-8">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 mb-4 rounded-2xl overflow-hidden shadow-lg shadow-blue-100 flex items-center justify-center bg-white p-2">
            <ImageWithFallback src={companyLogo} alt="Company Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">康复评估平台</h1>
          <p className="text-sm text-gray-500 mt-2">科学的数字康复服务</p>
        </div>

        {/* Tabs for Login vs Register */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
          <button
            onClick={() => setIsLoginTab(true)}
            className={clsx(
              "flex-1 py-2.5 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all",
              isLoginTab ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
            )}
          >
            手机号登录
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={clsx(
              "flex-1 py-2.5 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all",
              !isLoginTab ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
            )}
          >
            邮箱登录
          </button>
        </div>

        {/* Forms */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-700 font-medium">{isLoginTab ? '手机号码' : '邮箱地址'}</label>
            <input 
              type={isLoginTab ? 'tel' : 'email'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all" 
              placeholder={isLoginTab ? '请输入手机号' : '请输入邮箱'} 
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm text-gray-700 font-medium">验证码</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all" 
                placeholder="任意验证码即可" 
              />
              <button className="h-12 px-4 rounded-xl text-blue-600 border border-blue-200 bg-blue-50 text-sm font-medium active:bg-blue-100 transition-colors whitespace-nowrap">
                获取验证码
              </button>
            </div>
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={!isFormValid || !agreed}
            className="w-full h-12 bg-blue-600 active:bg-blue-700 disabled:opacity-50 disabled:active:bg-blue-600 text-white font-medium text-[15px] mt-6 rounded-xl transition-all"
          >
            登录
          </button>

          <div className="flex items-center space-x-2 mt-4 text-sm">
            <button 
              onClick={() => setAgreed(!agreed)}
              className={clsx(
                "w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0",
                agreed ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
              )}
            >
              {agreed && <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white fill-current"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>}
            </button>
            <span className="text-gray-500 font-normal select-none text-[13px]">
              我已阅读并同意 <span onClick={(e) => { e.stopPropagation(); setShowTerms(true); }} className="text-blue-600 cursor-pointer active:opacity-70">《隐私协议》</span> 和 <span className="text-blue-600 cursor-pointer active:opacity-70">《服务协议》</span>
            </span>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs text-gray-400 mb-6 relative">
            <span className="bg-white px-2 relative z-10">其他方式</span>
            <span className="absolute left-0 top-1/2 w-full h-[1px] bg-gray-100"></span>
          </p>
          
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center">
              <button 
                onClick={handleSubmit}
                disabled={!agreed}
                className="w-12 h-12 rounded-full bg-[#07C160]/10 flex items-center justify-center text-[#07C160] hover:bg-[#07C160]/20 transition-colors disabled:opacity-50"
              >
                <MessageCircle size={24} />
              </button>
              <span className="block mt-2 text-[11px] text-gray-500">微信</span>
            </div>

            <div className="flex flex-col items-center">
              <button 
                onClick={handleSubmit}
                disabled={!agreed}
                className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-colors disabled:opacity-50"
              >
                <Phone size={24} />
              </button>
              <span className="block mt-2 text-[11px] text-gray-500">WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowTerms(false)}
              className="absolute right-4 top-4 text-gray-400 p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold mb-4 text-center">隐私政策与服务协议</h3>
            <div className="max-h-[60vh] overflow-y-auto text-sm text-gray-600 mb-6 pr-2 custom-scrollbar">
              <p className="mb-2">为模拟服务协议...</p>
              <p>请点击下方同意即可。</p>
            </div>
            <button 
              onClick={() => { setAgreed(true); setShowTerms(false); }}
              className="w-full h-11 bg-blue-600 text-white rounded-xl font-medium text-sm active:scale-95 transition-all"
            >
              同意并继续
            </button>
          </div>
        </div>
      )}
    </div>
  );
}