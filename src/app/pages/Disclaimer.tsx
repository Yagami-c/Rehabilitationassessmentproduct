import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertCircle, ArrowRight } from 'lucide-react';

export function Disclaimer() {
  const navigate = useNavigate();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current;
      if (scrollHeight <= clientHeight + 10) {
        setHasScrolledToBottom(true);
      }
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (Math.abs(scrollHeight - clientHeight - scrollTop) <= 50) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAgree = () => {
    navigate('/condition');
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F7FA] relative w-full mx-auto font-sans">
      <div className="flex-1 px-6 pt-16 pb-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        
        <h1 className="text-[22px] font-bold text-[#1A1A1A] mb-2">运动康养免责声明</h1>
        <p className="text-[14px] text-red-500 font-medium mb-8 text-center px-4">⚠️ 请务必在使用任何训练内容前阅读。点击“已知晓并同意”即视为您接受全部条款。</p>

        <div 
          ref={contentRef}
          className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-5 overflow-y-auto mb-8 relative text-[14px] leading-relaxed text-[#4B5563]"
          onScroll={handleScroll}
        >
          <div className="space-y-5">
            <div>
              <p className="font-bold text-[#1A1A1A] text-[15px] mb-1">一、产品定位</p>
              <p>本产品为运动康养辅助技术工具，通过硬件传感器与AI算法提供动作引导、评估及方案推荐。<strong className="text-red-500">我们不是医疗机构，不提供医疗服务，不与您形成医患关系。</strong>如您通过平台预约独立康养师或医生，其服务责任完全由该专业人士承担。</p>
            </div>

            <div>
              <p className="font-bold text-[#1A1A1A] text-[15px] mb-1">二、AI推荐与自动调整风险提示</p>
              <p>AI推荐的康养动作及自动参数微调依赖于传感器数据和算法，无法感知您的全部身体状态（如疲劳、代偿）。因此：</p>
              <ul className="list-disc pl-4 space-y-1 mt-1 text-[#6B7280]">
                <li><strong className="text-[#4B5563]">AI推荐效果无任何明示或默示保证</strong>，康养结果因人而异；</li>
                <li><strong className="text-[#4B5563]">自动调整可能不适合诊断未明或症状波动的用户</strong>，您应优先遵从线下专业医嘱；</li>
                <li>因过度依赖AI建议、忽视身体警告、未及时切换至手动安全模式而导致的伤害，由您自行承担。</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-[#1A1A1A] text-[15px] mb-1">三、运动禁忌与术后禁忌</p>
              <p className="font-medium text-[#4B5563] mt-2 mb-1">（一）绝对禁忌症</p>
              <p>存在以下任一状况，<strong className="text-red-500">禁止使用任何训练模块</strong>，除非有医生书面许可：</p>
              <ul className="list-disc pl-4 space-y-1 mt-1 text-[#6B7280]">
                <li>严重心脏病（不稳定心绞痛、未控心衰、6个月内的心梗）；</li>
                <li>未受控高血压（≥180/110mmHg）；</li>
                <li>急性血栓（如深静脉血栓、肺栓塞）；</li>
                <li>不稳定性骨折/韧带撕裂、术后未愈合、感染；</li>
                <li>急性感染伴发热；</li>
                <li>医生明确禁止运动的其他情况。</li>
              </ul>
              <p className="font-medium text-[#4B5563] mt-3 mb-1">（二）术后禁忌</p>
              <p>关节、脊柱等术后用户须满足：切口愈合无感染、已过医生规定制动期、经医生评估允许目标活动度训练。<strong className="text-red-500">首次进入术后模块必须上传康养运动许可并签署知情同意书。</strong>平台仅提供通用禁忌库，不评估个体情况。</p>
            </div>
            
            <div>
              <p className="font-bold text-[#1A1A1A] text-[15px] mb-1">四、年龄与特殊人群限制</p>
              <ul className="list-disc pl-4 space-y-1 mt-1 text-[#6B7280]">
                <li><strong className="text-[#4B5563]">较重训练</strong>（含抗阻、跳跃、快速变向等）限<strong className="text-blue-600">18～65周岁</strong>人群；</li>
                <li><strong className="text-[#4B5563]">轻度康养动作</strong>（坐位活动、静力收缩等）放宽至<strong className="text-blue-600">14周岁</strong>，14～18周岁须监护人全程陪同并完成可验证的电子知情同意；</li>
                <li><strong className="text-[#4B5563]">65岁以上不建议使用自主训练</strong>，若坚持使用须上传医学评估证明，风险自担；</li>
                <li><strong className="text-[#4B5563]">孕妇、产后6周内</strong>禁止使用；<strong className="text-[#4B5563]">残疾人</strong>需凭康养医师功能评估方可使用部分功能。</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-[#1A1A1A] text-[15px] mb-1">五、特定疾病急性期限制</p>
              <p>关节炎（如膝关节炎、肩周炎）等慢性疾病，<strong className="text-red-500">急性发作期</strong>（关节红、肿、热、痛、活动明显受限）严禁使用对应关节的训练。缓解期可在医生指导下使用，平台将弹窗进行风险告知，您需确认已知晓。</p>
            </div>

            <div>
              <p className="font-bold text-[#1A1A1A] text-[15px] mb-1">六、医疗服务关系与地域声明</p>
              <p>平台仅为技术提供方，不参与医疗活动。您通过平台预约的康养师/医生均为独立执业者，临床责任由其自负。远程服务严格限于中国大陆境内，您与提供服务方须确保物理位置均在中国大陆，否则请勿使用。</p>
            </div>

            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <p className="font-bold text-red-600 text-[15px] mb-1 flex items-center gap-1">七、强制紧急处理（请立即行动）</p>
              <p className="text-red-700 font-medium">⚠️ 训练中如突发剧烈疼痛、关节异常肿胀、胸闷、呼吸困难、头晕、肢体无力或感觉丧失等，请立即停止使用并拨打120或前往最近医院急诊。切勿因本产品任何提示而延误救治。</p>
            </div>

            <div>
              <p className="font-bold text-[#1A1A1A] text-[15px] mb-1">八、责任免除</p>
              <p>您已充分知悉运动康养风险。因隐瞒病史、忽视禁忌、未咨询医生、未遵守年龄/特殊人群限制、延误紧急就医或违反监护人要求而导致的任何伤害，我们不承担责任。本声明未尽事项以《用户服务协议》为准。</p>
            </div>
            
            <div className="h-4"></div>
          </div>
          
          {/* Fading indicator to show there's more content */}
          {!hasScrolledToBottom && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none flex items-end justify-center pb-2">
              <span className="text-[12px] text-blue-500 font-medium">请滑动至底部阅读完毕</span>
            </div>
          )}
        </div>

        <button 
          onClick={handleAgree}
          disabled={!hasScrolledToBottom}
          className="w-full h-[50px] bg-[#2C7CFF] active:bg-[#256EE6] disabled:opacity-50 disabled:bg-gray-400 disabled:active:bg-gray-400 text-white font-medium text-[16px] rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
        >
          已知晓并同意
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}