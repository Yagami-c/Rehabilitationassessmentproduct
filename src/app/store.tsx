import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  goals: string[];
}

interface AssessmentData {
  symptoms: string[];
  painLevel: number;
  history: string[];
}

interface AppState {
  isLoggedIn: boolean;
  profile: UserProfile;
  assessment: AssessmentData;
  setLoggedIn: (val: boolean) => void;
  setProfile: (val: UserProfile) => void;
  setAssessment: (val: AssessmentData) => void;
}

const defaultProfile: UserProfile = {
  name: '张三',
  age: '28',
  gender: 'male',
  height: '175',
  weight: '70',
  goals: ['疼痛缓解', '体态改善'],
};

const defaultAssessment: AssessmentData = {
  symptoms: [],
  painLevel: 0,
  history: [],
};

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [assessment, setAssessment] = useState<AssessmentData>(defaultAssessment);

  return (
    <AppContext.Provider value={{ isLoggedIn, profile, assessment, setLoggedIn, setProfile, setAssessment }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
