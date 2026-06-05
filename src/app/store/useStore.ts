import { create } from 'zustand';

export type UserProfile = {
  name: string;
  phone?: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  bmi: number;
  goals: string[];
  medicalHistory?: string;
};

export type PreAssessmentData = {
  redFlags: string[];
  deviceWorn: boolean;
  stiffness: number; // 0, 1, 2
  squatPainBefore: number; // 0-10
  painTriggers: string[];
  bodyType: number; // -1, 0, 1
  isFirstTime: boolean;
  computedLevel: number; // 1-6 mapping to L1-H3
};

export type PostAssessmentData = {
  squatPainAfter: number; // 0-10
  globalFeeling: '更舒服' | '没变化' | '更不适';
  intensityFeeling: '太轻' | '刚好' | '有点强';
  adverseReactions: string[];
  nextComputedLevel: number | string; // The next recommended level (1-6) or a string if paused
  nextAdvice: string;
};

export type DailyRecord = {
  date: string;
  mode: string;
  squatBefore?: number | null;
  squatAfter: number;
  globalEffect: '更舒服' | '没变化' | '更不适';
  intensityFeel: '太轻' | '刚好' | '有点强';
  adverseFlags: string[];
  completed?: boolean;
  notCompletedReason?: string;
};

export type AssessmentRecord = {
  date: string;
  baselineAction: string;
  baselineLevel: number;
  currentLevel: number; // Q1
  worstActionNow: string; // Q2
  q3Level: number; // Q3
  stiffnessNow: string; // Q4
  intensityFeel: string; // Q5
  adverseFlags: string[]; // Q6
  improvement: string;
};

export type AppState = {
  isLoggedIn: boolean;
  isDarkMode: boolean;
  isDeviceConnected: boolean;
  connectedDeviceName: string;
  deviceStatus: 'idle' | 'running' | 'paused' | 'sleep';
  points: number;
  isMediaPipeUnlocked: boolean;
  profile: UserProfile | null;
  preAssessment: PreAssessmentData | null;
  postAssessment: PostAssessmentData | null;
  dailyRecords: DailyRecord[];
  assessments: AssessmentRecord[];
  lastAssessmentDay: number;
  login: () => void;
  logout: () => void;
  toggleDarkMode: () => void;
  connectDevice: (name: string) => void;
  disconnectDevice: () => void;
  setDeviceStatus: (status: 'idle' | 'running' | 'paused' | 'sleep') => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  setPoints: (points: number) => void;
  unlockMediaPipe: () => boolean;
  setPreAssessment: (data: Partial<PreAssessmentData>) => void;
  setPostAssessment: (data: Partial<PostAssessmentData>) => void;
  calculatePreAssessmentLevel: () => number;
  calculatePostAssessmentLevel: () => { nextLevel: number | string, advice: string };
  addDailyRecord: (record: DailyRecord) => void;
  addAssessment: (assessment: AssessmentRecord) => void;
  needPeriodicAssessment: () => boolean;
};

export const useStore = create<AppState>((set, get) => ({
  isLoggedIn: false,
  isDarkMode: false,
  isDeviceConnected: false,
  connectedDeviceName: '',
  deviceStatus: 'idle',
  points: 250, // default test points
  isMediaPipeUnlocked: false,
  profile: {
    name: '张三',
    gender: 'Male',
    age: 28,
    height: 175,
    weight: 70,
    bmi: 22.86,
    goals: ['缓解疼痛', '恢复关节活动度']
  },
  preAssessment: null,
  postAssessment: null,
  dailyRecords: [],
  assessments: [],
  lastAssessmentDay: 0,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  connectDevice: (name) => set({ isDeviceConnected: true, connectedDeviceName: name, deviceStatus: 'idle' }),
  disconnectDevice: () => set({ isDeviceConnected: false, connectedDeviceName: '', deviceStatus: 'idle' }),
  setDeviceStatus: (status) => set({ deviceStatus: status }),
  setPoints: (points) => set({ points }),
  unlockMediaPipe: () => {
    const { points } = get();
    if (points >= 200) {
      set({ points: points - 200, isMediaPipeUnlocked: true });
      return true;
    }
    return false;
  },
  updateProfile: (newProfile) => 
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...newProfile } : null
    })),
  setPreAssessment: (data) =>
    set((state) => {
      const newPreAssessment = state.preAssessment 
        ? { ...state.preAssessment, ...data } 
        : { redFlags: [], deviceWorn: false, stiffness: 0, squatPainBefore: 0, painTriggers: [], bodyType: 0, isFirstTime: false, computedLevel: 2, ...data } as PreAssessmentData;
      return { preAssessment: newPreAssessment };
    }),
  setPostAssessment: (data) =>
    set((state) => {
      const newPostAssessment = state.postAssessment
        ? { ...state.postAssessment, ...data }
        : { squatPainAfter: 0, globalFeeling: '没变化', intensityFeeling: '刚好', adverseReactions: [], nextComputedLevel: 2, nextAdvice: '', ...data } as PostAssessmentData;
      return { postAssessment: newPostAssessment };
    }),
  calculatePreAssessmentLevel: () => {
    let finalLevel = 2;
    set((state) => {
      if (!state.preAssessment) return state;
      let level = 2;
      if (state.preAssessment.stiffness === 0) level = 2;
      else if (state.preAssessment.stiffness === 1) level = 3;
      else if (state.preAssessment.stiffness === 2) level = 4;

      if (state.preAssessment.squatPainBefore >= 7) {
        level = Math.max(1, level - 1);
      } else if (state.preAssessment.squatPainBefore < 4) {
        level = Math.min(6, level + 1);
      } else {
        level = level; // no change
      }

      level = Math.max(1, Math.min(6, level + state.preAssessment.bodyType));

      if (state.preAssessment.isFirstTime) {
        level = Math.min(level, 2);
      }
      
      finalLevel = level;
      return {
        preAssessment: { ...state.preAssessment, computedLevel: level }
      };
    });
    return finalLevel;
  },
  calculatePostAssessmentLevel: () => {
    let finalNextLevel: number | string = 2;
    let finalAdvice = '';

    set((state) => {
      if (!state.preAssessment || !state.postAssessment) return state;

      const currentLevel = state.preAssessment.computedLevel;
      const deltaPain = state.preAssessment.squatPainBefore - state.postAssessment.squatPainAfter;

      let nextLevel: number | string = currentLevel;
      let advice = '无特殊不适或反馈，维持当前强度';

      if (state.postAssessment.adverseReactions.length > 0 && !state.postAssessment.adverseReactions.includes('没有以上情况')) {
        const next = currentLevel - 1;
        if (next < 1) {
          nextLevel = '暂停使用';
          advice = '出现不良反应，建议暂停';
        } else {
          nextLevel = next;
          advice = '因出现不良反应，降低��级';
        }
      } else if (deltaPain < 0 || state.postAssessment.globalFeeling === '更不适') {
        const next = currentLevel - 1;
        if (next < 1) {
          nextLevel = '暂停使用';
          advice = '不适加重，建议暂停';
        } else {
          nextLevel = next;
          advice = '使用后不适感加重，降低一级';
        }
      } else if (state.postAssessment.intensityFeeling === '有点强') {
        const next = currentLevel - 1;
        if (next < 1) {
          nextLevel = '暂停使用';
          advice = '强度过强，建议���停';
        } else {
          nextLevel = next;
          advice = '您感觉强度偏强，应降低一级';
        }
      } else if (state.postAssessment.intensityFeeling === '太轻') {
        const next = currentLevel + 1;
        if (next > 6) {
          nextLevel = 'L6 (已达最高强度)';
          advice = '已达最高强度，请谨慎使用';
        } else {
          nextLevel = next;
          advice = '您感觉强度偏轻，可增加一级';
        }
      }

      finalNextLevel = nextLevel;
      finalAdvice = advice;

      return {
        postAssessment: { ...state.postAssessment, nextComputedLevel: nextLevel, nextAdvice: advice }
      };
    });

    return { nextLevel: finalNextLevel, advice: finalAdvice };
  },
  addDailyRecord: (record) => set((state) => ({ dailyRecords: [...state.dailyRecords, record] })),
  addAssessment: (assessment) => set((state) => {
    const newRecords = [...state.assessments, assessment];
    return {
      assessments: newRecords,
      lastAssessmentDay: state.dailyRecords.length
    };
  }),
  needPeriodicAssessment: () => {
    const { dailyRecords, lastAssessmentDay } = get();
    const completed = dailyRecords.length;
    return completed >= 7 && (completed - lastAssessmentDay >= 7 || lastAssessmentDay === 0);
  }
}));