import { createBrowserRouter, Navigate } from 'react-router';
import { AppLayout } from './layout/AppLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ProfileForm } from './pages/ProfileForm';
import { ConditionForm } from './pages/ConditionForm';
import { PostAssessment } from './pages/PostAssessment';
import { MotionAssessment } from './pages/MotionAssessment';
import { Report } from './pages/Report';
import { Training } from './pages/Training';
import { Device } from './pages/Device';
import { Education } from './pages/Education';
import { DeviceQuestionnaire } from './pages/DeviceQuestionnaire';

import { TrainingPlayback } from './pages/TrainingPlayback';
import { PlanSettings } from './pages/PlanSettings';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Home },
      { path: 'training', Component: Training },
      { path: 'education', Component: Education },
      { path: 'report', Component: Report },
      { path: 'profile', Component: ProfileForm },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/condition',
    Component: ConditionForm,
  },
  {
    path: '/post-assessment',
    Component: PostAssessment,
  },
  {
    path: '/assessment',
    Component: MotionAssessment,
  },
  {
    path: '/training/playback',
    Component: TrainingPlayback,
  },
  {
    path: '/plan-settings',
    Component: PlanSettings,
  },
  {
    path: '/device',
    Component: Device,
  },
  {
    path: '/device-questionnaire',
    Component: DeviceQuestionnaire,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);