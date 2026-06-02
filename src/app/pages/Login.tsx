import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';
import { Mail, Smartphone, MessageCircle, X, Phone, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import companyLogo from '../../imports/棰勮鍥綺鐢绘澘_1.jpg';
import clsx from 'clsx';

export function Login() {
  const navigate = useNavigate();
  const { login, updateProfile } = useStore();
  
  const [agreed, setAgreed] = useState(false);
  const [phone, setPhone] = useState('13800138000');
  const [code, setCode] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);

  const isFormValid = phone.length > 0 && code.length > 0;

  const handleSubmit = () => {
    if (!agreed) {
      setShowTerms(true);
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
      navigate('/disclaimer');
    } else {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F7FA] relative w-full mx-auto overflow-y-auto font-sans">
      <div className="flex-1 px-6 pt-24 pb-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-12 mt-10">
          <div className="w-24 h-24 mb-6 rounded-3xl overflow-hidden bg-white shadow-sm p-1">
            <ImageWithFallback src={companyLogo} alt="Company Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-[24px] font-bold text-[#1A1A1A] tracking-wide">康养评估平台</h1>
          <p className="text-[14px] text-[#6B7280] mt-3">科学的数字康养服务</p>
        </div>

        {!showPhoneLogin ? (
          <div className="w-full mt-auto space-y-4 max-w-[300px]">
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleSubmit} 
                className="w-full h-[50px] bg-[#00C853] active:bg-[#00B248] text-white font-medium text-[16px] rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
              >
                <MessageCircle size={20} />
                微信登录
              </button>
              <button 
                onClick={() => setShowPhoneLogin(true)} 
                className="w-full h-[50px] bg-[#2C7CFF] active:bg-[#256EE6] text-white font-medium text-[16px] rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Smartphone size={20} />
                手机号登录
              </button>
              <button 
                onClick={handleSubmit} 
                className="w-full h-[50px] bg-[#25D366] active:bg-[#128C7E] text-white font-medium text-[16px] rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
              >
                <MessageSquare size={20} />
                WhatsApp 登录
              </button>
            </div>
            
            <div className="pt-2 text-center">
              <button 
                onClick={() => setShowPhoneLogin(true)}
                className="text-[13px] text-[#6B7280] active:text-[#1A1A1A]"
              >
                其他方式登录 &gt;
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[320px] bg-white p-6 rounded-2xl shadow-sm mt-4">
            <div className="space-y-5">
              <div className="border-b border-[#E5E7EB] flex items-center py-2">
                <span className="text-[16px] text-[#1A1A1A] font-medium mr-3">+86</span>
                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 h-8 bg-transparent text-[16px] focus:outline-none placeholder-[#9CA3AF]" 
                  placeholder="请输入手机号" 
                />
              </div>
              
              <div className="border-b border-[#E5E7EB] flex items-center py-2">
                <input 
                  type="text" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 h-8 bg-transparent text-[16px] focus:outline-none placeholder-[#9CA3AF]" 
                  placeholder="请输入验证码" 
                />
                <button className="text-[#2C7CFF] text-[14px] font-medium pl-4 border-l border-[#E5E7EB] active:opacity-70">
                  获取验证码
                </button>
              </div>

              <button 
                onClick={handleSubmit} 
                disabled={!isFormValid}
                className="w-full h-[48px] bg-[#2C7CFF] active:bg-[#256EE6] disabled:opacity-40 disabled:active:bg-[#2C7CFF] text-white font-medium text-[16px] mt-6 rounded-full transition-all"
              >
                登录
              </button>
              
              <div className="text-center mt-4">
                <button 
                  onClick={() => setShowPhoneLogin(false)}
                  className="text-[13px] text-[#6B7280]"
                >
                  返回
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start justify-center space-x-2 mt-8 mb-4 text-[12px]">
          <button 
            onClick={() => setAgreed(!agreed)}
            className={clsx(
              "w-[16px] h-[16px] rounded-full flex items-center justify-center border transition-colors shrink-0 mt-0.5",
              agreed ? "bg-[#2C7CFF] border-[#2C7CFF]" : "bg-white border-[#9CA3AF]"
            )}
          >
            {agreed && <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] text-white fill-current"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>}
          </button>
          <span className="text-[#6B7280] font-normal leading-tight max-w-[260px]">
            我已阅读并同意 
            <span onClick={(e) => { e.stopPropagation(); setShowTerms(true); }} className="text-[#2C7CFF] cursor-pointer active:opacity-70">《免责声明》</span>、 
            <span onClick={(e) => { e.stopPropagation(); setShowTerms(true); }} className="text-[#2C7CFF] cursor-pointer active:opacity-70">《隐私协议》</span> 和 
            <span onClick={(e) => { e.stopPropagation(); setShowTerms(true); }} className="text-[#2C7CFF] cursor-pointer active:opacity-70">《服务协议》</span>
          </span>
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-5 backdrop-blur-sm">
          <div className="bg-[#FFFFFF] w-full max-w-[340px] rounded-[16px] p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-center mb-4 gap-2 text-[#2C7CFF]">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <span className="font-bold text-lg">ℹ</span>
              </div>
              <h3 className="text-[18px] font-bold text-[#1A1A1A] shrink-0">用户服务与隐私协议</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto text-[13px] text-gray-600 mb-6 pr-3 space-y-4 custom-scrollbar">
              <div>
                <h4 className="text-center font-bold text-gray-900 mb-2 text-[15px]">用户服务协议</h4>
                <p className="font-bold mb-2">协议编号：HEC-USER-2024-01 | 最后更新：2026年6月</p>
                
                <h5 className="font-bold text-gray-800 mt-4 mb-1">一、协议范围与接受</h5>
                <p className="mb-1">1.1 本协议是您（下称“用户”）与【光年康复】（下称“我们”或“平台”）之间关于使用“光年康复”App及关联硬件设备（下称“本产品”）的法律协议。</p>
                <p className="mb-1">1.2 您在注册、使用本产品任何功能前应仔细阅读并同意本协议、《运动康复免责声明》及《隐私政策》。若您不同意任一文件，请立即停止使用。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">二、用户资格与注册</h5>
                <p className="mb-1">2.1 您应具有完全民事行为能力。未满18周岁的用户仅在特定功能下（见《免责声明》）经监护人同意并全程陪同方可使用。</p>
                <p className="mb-1">2.2 您保证注册信息真实、准确，并在变更后及时更新。如因信息不实导致任何后果，由您自行承担。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">三、服务内容与使用规则</h5>
                <p className="mb-1"><strong className="text-gray-800">3.1 服务性质：</strong>我们提供运动动作捕捉分析、AI训练方案推荐、运动数据记录及远程康复指导信息撮合等技术服务。<strong className="text-red-500">本产品不提供任何医疗诊断、治疗或处方，不建立医患关系。</strong></p>
                <p className="mb-1 mt-2"><strong className="text-gray-800">3.2 AI推荐与方案调整：</strong></p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>AI算法根据您输入的评估数据及传感器采集信息生成训练推荐，该推荐仅为技术辅助，不构成个体化医疗意见。您应在专业人士指导下结合自身感受决定是否执行。</li>
                  <li>开启“智能适应”模式后，系统可自动微调训练参数。由于传感器及算法局限，调整可能存在误差，<strong className="text-red-500">若您感到不适须立即停止并切换手动模式或暂停训练。</strong></li>
                  <li>您始终有权手动设定所有参数，或授权平台认证的持牌康复师远程为您调整。康复师的临床判断责任由其独立承担，平台仅提供技术通道。</li>
                </ul>
                <p className="mb-1 mt-2"><strong className="text-gray-800">3.3 第三方服务：</strong>您通过平台预约的康复指导、问诊等服务，由持有相应执业资质的独立专业人士提供。平台仅是信息撮合与技术连接方，不参与医疗决策，不对此类服务的质量或结果负责。相关纠纷由您与服务方自行解决。</p>
                <p className="mb-1 mt-2"><strong className="text-gray-800">3.4 地域限制：</strong>本产品仅供中国大陆地区（不含港澳台）用户使用。远程医疗类服务严格限制于中国大陆境内，您需确保使用该服务时您与提供方均处于境内。平台有权校验地理位置，若不符合规定可中止服务。</p>
                <p className="mb-1 mt-2">3.5 您不得利用本产品从事违法活动、干扰系统运行或侵犯他人权益。我们保留中止服务的权利。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">四、知识产权</h5>
                <p className="mb-1">4.1 本产品的所有内容（包括但不限于文字、图像、视频、软件、算法、训练方案）的知识产权归我们或授权方所有，未经许可禁止任何形式的复制或商用。</p>
                <p className="mb-1">4.2 您提供的训练反馈、评价等在匿名化处理后可用于产品改进。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">五、免责与责任限制</h5>
                <p className="mb-1">5.1 您确认已阅读并同意《运动康复免责声明》。在医疗健康方面，您须承诺已咨询专业医生并获准使用。除非因我们故意或重大过失，否则因您未遵守禁忌、自行训练或延误就医造成的损害，我们不承担责任。</p>
                <p className="mb-1">5.2 由于技术条件、网络环境等不可控因素，服务可能发生中断或错误，我们将尽力修复，但不对由此产生的间接损失承担责任。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">六、协议修改与终止</h5>
                <p className="mb-1">6.1 我们可根据法律法规或服务变化更新本协议，将以推送通知等合理方式告知。重大变更需取得您的单独同意。</p>
                <p className="mb-1">6.2 您可随时注销账户终止使用，我们也可在您违规时中止服务。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">七、管辖</h5>
                <p className="mb-1">本协议适用中华人民共和国法律。争议协商不成时，可向被告住所地人民法院提起诉讼。</p>
                <p className="mb-2 mt-2"><strong className="text-gray-800">联系方式：</strong> 如对本协议有疑问，可通过App内“意见反馈”或邮件至 legal@xxxx.com。</p>
              </div>

              <div className="border-t border-gray-200 my-6 pt-6">
                <h4 className="text-center font-bold text-gray-900 mb-2 text-[15px]">隐私政策</h4>
                <p className="font-bold mb-2">最后更新：2026年6月</p>
                <p className="mb-2 font-medium text-blue-600">特别提示： 我们严格遵循《个人信息保护法》等法律，保护您的个人信息。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">一、我们收集的信息</h5>
                <p className="mb-1"><strong className="text-gray-800">（一）您主动提供的：</strong> 账号信息（手机号等）；健康档案（手术史、疼痛评分、关节活动度自评等）——属于<strong className="text-red-500">个人敏感信息</strong>。</p>
                <p className="mb-1 mt-2"><strong className="text-gray-800">（二）设备权限与传感器数据：</strong></p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong className="text-gray-800">蓝牙</strong>：连接光年·环膝硬件，获取关节角度、加速度。仅配对使用，不扫描周边设备，数据加密传输。</li>
                  <li><strong className="text-gray-800">摄像头</strong>：动作评估时采集人体运动画面，实时提取骨架点。原始视频<strong className="text-blue-600">不存储、不上传</strong>，仅上传脱敏的骨架坐标序列。</li>
                  <li><strong className="text-gray-800">麦克风</strong>：语音反馈、AI客服。仅主动触发时开启，不后台录音，处理完即删除。</li>
                  <li><strong className="text-gray-800">大致位置</strong>：线下康复点推荐、远程服务地域校验。仅获取城市级位置，不用于追踪或画像。</li>
                </ul>
                <p className="mb-1 mt-2"><strong className="text-gray-800">（三）第三方SDK：</strong> 我们集成经安全评估的SDK（如语音识别、支付、崩溃统计），可能收集非敏感的设备标识、操作日志等，不获取健康信息。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">二、个人敏感信息的保护</h5>
                <p className="mb-2">您提供的健康生理信息（关节活动度、加速度、疼痛评分、病史）被列为个人敏感信息。我们仅用于生成训练方案、评估动作质量及算法优化；采用AES-256加密传输与存储，境内保存。收集时将弹窗取得您的单独同意。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">三、自动化决策</h5>
                <p className="mb-2">实时动作纠错与自动调整功能系基于传感器数据的自动化决策，仅用于即时反馈，不进行用户画像，亦不对您产生法律重大影响。您可在设置中关闭“智能适应”以停止自动决策。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">四、信息的共享与使用</h5>
                <ul className="list-disc pl-4 space-y-1">
                  <li>未经您单独同意，我们不会将敏感信息共享第三方，除非是向为您提供远程服务的持牌康复师传输必要数据，或法律要求；</li>
                  <li>匿名化统计信息可能用于科研，无法识别您的身份。</li>
                </ul>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">五、您的权利</h5>
                <p className="mb-2">您可查阅、更正、删除个人信息，管理设备权限，或注销账户。我们将在15个工作日内响应您的请求。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">六、未成年人保护</h5>
                <p className="mb-2">原则上不为14岁以下儿童提供服务。14-18岁用户在监护人同意下使用轻度动作功能，监护人可联系我们行使相关权利。</p>

                <h5 className="font-bold text-gray-800 mt-4 mb-1">七、更新与联系方式</h5>
                <p className="mb-2">重大变更将再次取得您的同意。如有问题，请联系隐私保护邮箱：privacy@xxxx.com。</p>
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