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

export type AppState = {
  isLoggedIn: boolean;
  profile: UserProfile | null;
  preAssessment: PreAssessmentData | null;
  postAssessment: PostAssessmentData | null;
  login: () => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  setPreAssessment: (data: Partial<PreAssessmentData>) => void;
  setPostAssessment: (data: Partial<PostAssessmentData>) => void;
  calculatePreAssessmentLevel: () => number;
  calculatePostAssessmentLevel: () => { nextLevel: number | string, advice: string };
};

export const useStore = create<AppState>((set) => ({
  isLoggedIn: false,
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
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
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
          advice = '强度过强，建议暂停';
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
  }
}));