Create a mobile rehabilitation app design with a warm, clean, and professional healthcare aesthetic. Use a soft color palette with calming blues and whites. Use 375x812px iPhone mobile frames.

GLOBAL FRAMEWORK:
- Top Navigation Bar: Page title on the left and a Bluetooth device icon on the right (links to a "Device Connection" overlay that slides up from the bottom).
- Bottom Tab Bar: Fixed at the very bottom, 5 tabs with both icon and text labels: Home (首页), Training (训练), Education (宣教), Report (报告), Profile (我的). The active tab is highlighted in blue.
- Slogan on Home page: A soft pill badge below the top navigation bar with the text "科技推动寿而康" in elegant Chinese typography.

PAGE 1: Home
- Greeting: "你好，[用户名]" and subtitle "今天的康复计划已为你准备好".
- Smart Recommendation Card: Rounded card with soft blue gradient, title "智能理疗推荐", text "你的膝盖有明显紧张感，建议从中等强度开始，适当延长作用时间。", parameters (Negative Pressure 125 mmHg, Duration 30s, Rest 10s, Cycles 5x), and a "开始训练" button.
- Today's Tasks: Header "完成度 1/3". Task 1 "膝关节屈伸训练" time "10:00 AM · 约15分钟" with green "进行中" button. Task 2 "步态动作捕捉评估" time "14:30 PM · 约10分钟" with blue "开始" button. Task 3 "疼痛症状记录" time "20:00 PM · 约3分钟" with grey outlined "去完成" button.
- Bottom Placeholder Card: A clean card titled "周活动趋势" and note "内容区域待更新".

PAGE 2: Training (训练中心 - 练出强壮膝)
- Top Banner Card: A motivational header card with title "练出强壮膝" and subtitle "你的五维主动防护体系". Below the subtitle, display five dimension tags in a horizontal scroll or wrapped row with soft colored badges: "稳定之基", "激活之钥", "支撑之力", "推进之能", "调节之方". Brief description: "稳定、激活、支撑、推进、调节，系统强化膝关节的每一环。"
- "今日推荐课程" Section: A featured course card "五维主动防护体系 · 每日训练", with a "开始训练" button. Brief text: "每天跟练，用主动运动，换取长久灵活。约15分钟".
- "课程内容预览" Section (expandable or scrollable list showing the training structure):
  - Section 1 "热身" with items: "转身摸臀 10次", "后踢臀部 10次". Each item shows a small GIF placeholder (indicated with a play icon overlay on a rounded square).
  - Section 2 "强化运动 3组" with items: "提膝碰肘 左右各8次", "螃蟹步 左右各4步×2组", "臀部找椅 8次", "站立提踵 8次". Each item with GIF placeholder.
  - Section 3 "调整" with items: "快走100步", "拉伸臀部 左右各20秒×2组", "拉伸大腿后侧 左右各20秒×2组", "拉伸躯干 左右各20秒×2组". Each item with GIF placeholder.
- "我的课程" grid (2 columns) below:
  - "五维主动防护", 15分钟 · 低强度, progress 0%.
  - "膝关节恢复训练I", 12个动作 · 低强度, progress 60%.
  - "全身拉伸", 8个动作 · 中等强度, progress 40%.
  - "姿态纠正", 5个动作 · 高强度, "新课" badge.

PAGE 3: Education (宣教中心 - 养出健康膝)
- Top Banner: "养出健康膝" with subtitle "五大日常养护妙招" in a clean, friendly header.
- Horizontal scrolling "妙招" cards, each with an illustration placeholder and title:
  - Card 1: Illustration of a scale/body, title "妙招① 减重", tap to expand. Content preview: "BMI达23即超重，从减掉5%开始！"
  - Card 2: Illustration of hot/cold packs, title "妙招② 冷热敷", tap to expand. Content preview: "酸紧绷：热敷；红肿热：冷敷，各10-15分钟。"
  - Card 3: Illustration of supportive shoes, title "妙招③ 选对鞋子", tap to expand. Content preview: "选有支撑、能缓震的鞋，少穿平底鞋。"
  - Card 4: Illustration of posture tips, title "妙招④ 注意姿势", tap to expand. Content preview: "少蹲少跪，提重物要左右平衡。"
  - Card 5: Illustration of a knee with signal waves, title "妙招⑤ 听懂信号", tap to expand. Content preview: "响但不痛可拉伸；持续疼痛及时咨询。"
- Article feed list below the horizontal cards:
  - Article 1: thumbnail, title "了解你的膝盖疼痛", tag "精选".
  - Article 2: thumbnail, title "康复期营养指南", tag "饮食".
  - Article 3: thumbnail, title "疼痛管理技巧", tag "自我护理".
  - Article 4: thumbnail, title "日常姿势与膝盖保护", tag "生活习惯".

PAGE 4: Report
- "疼痛趋势" bar chart (7 days), annotation "平均分 4.8，较上周下降 12%".
- "关节活动度" empty state: friendly illustration, text "完成首次功能评估，解锁此报告", "开始评估" button.

PAGE 5: Profile
- User card (avatar, name, ID), "编辑资料" button.
- Menu: 健康数据同步, 设备管理 (Bluetooth icon), 康复计划设置, 消息中心 (red badge), 设置.
- "退出登录" button.

OVERLAYS:
- Device Connection overlay (triggered by top-right Bluetooth icon): bottom sheet with title "设备连接", Bluetooth toggle, device list:
  - Device 1: "关节松动仪", signal -45dBm, "连接" button.
  - Device 2: "低频脉冲治疗仪", signal -78dBm, "连接" button.
  - "重新扫描" button at the bottom.
- Task completion toast: "疼痛记录已保存" with checkmark animation.

NEW USER ONBOARDING FLOW (after registration):
Step 1: Basic Information Entry
- A clean form page titled "基本信息录入".
- Fields: Name, Age, Gender (selector), Height, Weight.
- Bottom button: "下一步".

Step 2: Genetic Medical History (遗传病史)
- Title "遗传病史" with subtitle "多选".
- A scrollable list of checkbox items:
  - 无 (selecting this deselects all others)
  - 高血压相关遗传
  - 糖尿病相关遗传
  - 心脏病/冠心病
  - 脑卒中家族史
  - 癌症（乳腺、结直肠、肺等）家族史
  - 强直性脊柱炎
  - 血友病
  - 地中海贫血
  - 其他遗传性疾病（如有，可填写） — with text input field next to it.
- Bottom buttons "上一步" and "下一步".

Step 3: Past Medical History (既往史)
- Title "既往史" with subtitle "多选，侧重康复相关".
- A scrollable list of checkbox items:
  - 无 (selecting this deselects all others)
  - 骨折/骨裂
  - 关节脱位/半脱位
  - 关节镜手术（如半月板、韧带修复）
  - 关节置换术（髋/膝/肩）
  - 椎间盘突出/腰椎手术
  - 脑卒中（中风）
  - 心肌梗死/心脏手术
  - 慢性疼痛综合征（纤维肌痛等）
  - 运动损伤手术史（注明部位） — with text input field.
  - 其他（可填写） — with text input field.
- Bottom buttons "上一步" and "完成".

Step 4: Health Assessment Device Selection (triggered for first-time registrants)
- After completing the medical history form, a full-screen modal or new page appears with the title "请选择您使用的设备" and a brief subtitle explaining the assessment.
- Two device cards presented vertically with generous spacing:
  - Card 1 (Available): "关节自动松动仪". A clean medical device illustration or icon. Tagline "智能松动，轻松活动". A prominent blue "开始评估" button below the tagline. The card has a soft white background with subtle rounded corners and a light shadow.
  - Card 2 (Locked/Coming Soon): "LED治疗仪". A clean medical device illustration or icon with a slightly dimmed/greyed-out appearance. Tagline "光疗舒缓，减轻不适". A grey "敬请期待" badge or locked indicator instead of a button. The card is visually muted to indicate it is not yet available.
- Tapping "开始评估" on Card 1 starts the joint mobilization assessment process.
- Tapping Card 2 does nothing (no interaction).

Completion:
- After the assessment, a success message appears: "评估完成，康复计划已更新" with a checkmark animation, then navigates to the Home screen.