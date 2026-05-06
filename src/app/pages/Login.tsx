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
    <div className="flex flex-col h-screen bg-white relative w-full mx-auto overflow-y-auto font-sans">
      <div className="flex-1 px-6 pt-24 pb-8">
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 mb-5 rounded-2xl overflow-hidden bg-white p-1">
            <ImageWithFallback src={companyLogo} alt="Company Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-[24px] font-bold text-gray-900 tracking-wide">康复评估平台</h1>
          <p className="text-[14px] text-gray-500 mt-2">科学的数字康复服务</p>
        </div>

        {/* Tabs for Login vs Register */}
        <div className="flex bg-[#F7F7F8] p-1 rounded-xl mb-10 w-[240px] mx-auto">
          <button
            onClick={() => setIsLoginTab(true)}
            className={clsx(
              "flex-1 py-2 text-[14px] font-medium rounded-lg flex items-center justify-center transition-all",
              isLoginTab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            )}
          >
            手机号
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={clsx(
              "flex-1 py-2 text-[14px] font-medium rounded-lg flex items-center justify-center transition-all",
              !isLoginTab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            )}
          >
            邮箱
          </button>
        </div>

        {/* Forms */}
        <div className="space-y-6">
          <div className="border-b border-gray-100 flex items-center py-3">
            <label className="text-[16px] text-gray-900 font-medium w-20">{isLoginTab ? '手机号' : '邮箱'}</label>
            <input 
              type={isLoginTab ? 'tel' : 'email'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 h-8 bg-transparent text-[16px] focus:outline-none placeholder-gray-300" 
              placeholder={isLoginTab ? '请输入手机号' : '请输入邮箱'} 
            />
          </div>
          
          <div className="border-b border-gray-100 flex items-center py-3">
            <label className="text-[16px] text-gray-900 font-medium w-20">验证码</label>
            <input 
              type="text" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 h-8 bg-transparent text-[16px] focus:outline-none placeholder-gray-300" 
              placeholder="请输入验证码" 
            />
            <button className="text-[#2563EB] text-[14px] font-medium pl-4 border-l border-gray-200 active:opacity-70">
              获取验证码
            </button>
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={!isFormValid || !agreed}
            className="w-full h-12 bg-[#2563EB] active:bg-blue-700 disabled:opacity-40 disabled:active:bg-[#2563EB] text-white font-bold text-[16px] mt-8 rounded-[8px] transition-all"
          >
            登录
          </button>

          <div className="flex items-start space-x-2 mt-4 text-[12px]">
            <button 
              onClick={() => setAgreed(!agreed)}
              className={clsx(
                "w-4 h-4 rounded-full flex items-center justify-center border transition-colors shrink-0 mt-0.5",
                agreed ? "bg-[#2563EB] border-[#2563EB]" : "bg-white border-gray-300"
              )}
            >
              {agreed && <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-current"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>}
            </button>
            <span className="text-gray-500 font-normal leading-tight">
              我已阅读并同意 
              <span onClick={(e) => { e.stopPropagation(); setShowTerms(true); }} className="text-[#2563EB] cursor-pointer active:opacity-70">《隐私协议》</span> 和 
              <span onClick={(e) => { e.stopPropagation(); setShowTerms(true); }} className="text-[#2563EB] cursor-pointer active:opacity-70">《服务协议》</span>
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
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[340px] rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            <button 
              onClick={() => setShowTerms(false)}
              className="absolute right-4 top-4 text-gray-400 p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
            <h3 className="text-[17px] font-bold mb-4 text-center text-gray-900 shrink-0">服务与隐私协议</h3>
            
            <div className="flex-1 overflow-y-auto text-[13px] text-gray-600 mb-6 pr-3 space-y-4 custom-scrollbar">
              <div>
                <h4 className="text-center font-bold text-gray-900 mb-2 text-[15px]">康复AI服务协议</h4>
                <p className="font-bold mb-2">生效日期：____年__月__日</p>
                <p className="mb-2">欢迎使用康复AI服务。请您务必审慎阅读、充分理解本协议各条款内容。<strong className="text-gray-800">一旦您勾选“同意”并登录，即视为您已充分理解并接受本协议全部条款，本协议立即生效。</strong></p>
                
                <h5 className="font-bold text-gray-800 mt-4 mb-1">一、服务说明</h5>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>本服务是由【公司名称】提供的基于人工智能技术的康复辅助指导工具，包括但不限于康复动作评估、训练计划生成、进展追踪等功能。</li>
                  <li>本服务<strong className="text-gray-800">不构成医疗诊断、处方或治疗</strong>，所有内容仅供参考，不能替代专业医师、康复治疗师的面诊与指导。</li>
                </ol>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">二、用户义务</h5>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>您应提供真实、准确的健康信息，并在身体状况发生变化时及时更新。</li>
                  <li>您确认在使用本服务前，已咨询专业医疗人员，明确自身适合进行相关康复活动。若在训练中出现疼痛、不适等异常反应，请立即停止，并及时就医。</li>
                  <li>您不得将本服务用于任何非法目的，或向他人输出可能误导为医疗建议的内容。</li>
                </ol>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">三、风险提示与免责</h5>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>康复训练存在固有风险，包括但不限于肌肉酸痛、关节损伤、跌伤等。您自愿承担使用本服务可能产生的一切风险。</li>
                  <li>本服务AI模型基于通用数据训练，不针对个体特殊病情，其输出可能存在偏差。<strong className="text-gray-800">我方不对服务的准确性、完整性、时效性做任何明示或默示保证。</strong></li>
                  <li>在法律允许的最大范围内，我方及其关联方对因使用或无法使用本服务所导致的任何直接或间接损失（包括人身伤害、病情加重等）不承担责任，除非该损失由我方的重大过失或故意行为直接导致。</li>
                </ol>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">四、知识产权</h5>
                <p className="mb-2">本服务包含的软件、算法、图文、界面设计等知识产权均归我方所有，未经许可，您不得复制、修改、逆向工程或用于商业用途。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">五、服务变更与终止</h5>
                <p className="mb-2">我方有权根据业务需要，随时修改、暂停或终止全部或部分服务，并在合理范围内通知您。协议条款更新后，继续使用即视为同意修改后的协议。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">六、法律适用</h5>
                <p className="mb-2">本协议适用【中国】法律，因本协议引起的争议，双方协商不成的，提交我方所在地有管辖权的人民法院诉讼解决。</p>

                <p className="mt-4 text-gray-500"><strong className="text-gray-800">如有疑问，请联系：</strong> [客服邮箱/电话]</p>
              </div>

              <div className="border-t border-gray-200 my-6 pt-6">
                <h4 className="text-center font-bold text-gray-900 mb-2 text-[15px]">隐私协议</h4>
                <p className="font-bold mb-2">更新日期：____年__月__日</p>
                <p className="mb-2">我们深知健康信息、个人信息对您的重要性，并会尽全力保护您的隐私安全。<strong className="text-gray-800">勾选同意即表示您已阅读并同意我们按照本协议收集、使用和存储您的信息。</strong></p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">一、我们收集的信息</h5>
                <p className="mb-1">为提供AI康复评估与训练指导服务，我们会收集以下必要信息：</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong className="text-gray-800">账户信息</strong>：手机号、用户名、头像等登录凭证。</li>
                  <li><strong className="text-gray-800">健康数据</strong>：您主动填写的年龄、身高、体重、病史、损伤部位、疼痛程度、康复目标等。</li>
                  <li><strong className="text-gray-800">运动数据</strong>：经您授权后，通过摄像头/可穿戴设备采集的关节角度、姿态视频片段、运动时长等，仅用于实时动作分析与反馈。</li>
                  <li><strong className="text-gray-800">设备与日志</strong>：设备型号、操作系统、IP地址、服务使用日志，用于优化服务与安全保障。</li>
                </ul>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">二、信息如何使用</h5>
                <ul className="list-disc pl-4 space-y-1">
                  <li>用于提供、维护和改进AI康复算法，生成个性化训练方案；</li>
                  <li>用于与您沟通，如发送训练提醒、服务更新通知；</li>
                  <li>用于数据分析与模型训练（<strong className="text-gray-800">经匿名化或去标识化处理后</strong>，无法关联到您个人）；</li>
                  <li>依法用于安全保障、预防欺诈及合规目的。</li>
                </ul>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">三、敏感信息特别提示</h5>
                <p className="mb-2">您提供的<strong className="text-gray-800">健康数据、运动影像属于个人敏感信息</strong>，一旦泄露可能导致对您的歧视或人身安全隐患。我们会采取严格措施保护，仅用于为您提供AI康复服务，未经您的单独同意，不会用于其他商业目的。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">四、信息共享与转让</h5>
                <p className="mb-1">我们不会出售您的个人信息。仅在以下情形共享：</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>经您明确授权；</li>
                  <li>向我们的技术服务商、云存储服务商共享，并要求其严格遵循保密义务；</li>
                  <li>法律、政府机关强制要求；</li>
                  <li>公司合并、收购、资产转让时，我们会要求接收方继续受本协议约束。</li>
                </ul>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">五、信息存储与安全</h5>
                <p className="mb-2">您的信息存储于中国境内的安全服务器，我们将采取加密、访问控制等技术手段保护数据安全。存储期限为实现服务目的所必需的时间，法律另有规定的除外。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">六、您的权利</h5>
                <p className="mb-2">您可以随时登录账户查阅、更正、删除您的个人信息，或撤回同意并注销账户。撤回同意不影响此前已进行的处理的合法性。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">七、未成年人保护</h5>
                <p className="mb-2">本服务不面向未满18周岁的未成年人。若您为监护人，发现被监护人未经您同意使用本服务，请联系我们删除相关信息。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">八、协议更新</h5>
                <p className="mb-2">隐私政策更新将通过站内信或弹窗等显著方式通知，您继续使用即视为同意更新后的条款。</p>

                <p className="mt-4 text-gray-500"><strong className="text-gray-800">联系方式：</strong> 如对本隐私协议有任何疑问或行使权利，请通过[隐私保护邮箱/地址]联系我们。</p>
              </div>
            </div>
            
            <div className="shrink-0 pt-2 border-t border-gray-100">
              <button 
                onClick={() => { setAgreed(true); setShowTerms(false); }}
                className="w-full h-11 bg-blue-600 text-white rounded-xl font-medium text-sm active:scale-95 transition-all"
              >
                同意并继续
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}