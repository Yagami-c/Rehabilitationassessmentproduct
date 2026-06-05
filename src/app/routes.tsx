import { createBrowserRouter, Navigate } from 'react-router';
import { AppLayout } from './layout/AppLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Splash } from './pages/Splash';
import { ProfileForm } from './pages/ProfileForm';
import { Disclaimer } from './pages/Disclaimer';
import { ConditionForm } from './pages/ConditionForm';
import { PostAssessment } from './pages/PostAssessment';
import { MotionAssessment } from './pages/MotionAssessment';
import { Report } from './pages/Report';
import { Training } from './pages/Training';
import { Device } from './pages/Device';
import { Education } from './pages/Education';
import { DeviceQuestionnaire } from './pages/DeviceQuestionnaire';
import { ShareEdit } from './pages/ShareEdit';
import { CameraEval } from './pages/CameraEval';
import { Points } from './pages/Points';
import { SevenDayEval } from './pages/SevenDayEval';
import { TrainingSummary } from './pages/TrainingSummary';

import { TrainingPlayback } from './pages/TrainingPlayback';
import { PlanSettings } from './pages/PlanSettings';

export const router = createBrowserRouter([
  {
    path: '/splash',
    Component: Splash,
  },
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
    path: '/disclaimer',
    Component: Disclaimer,
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
    path: '/motion-assessment',
    Component: MotionAssessment,
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
    path: '/training/camera-eval',
    Component: CameraEval,
  },
  {
    path: '/points',
    Component: Points,
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
    path: '/share-edit',
    Component: ShareEdit,
  },
  {
    path: '/device-questionnaire',
    Component: DeviceQuestionnaire,
  },
  {
    path: '/seven-day-eval',
    Component: SevenDayEval,
  },
  {
    path: '/training-summary',
    Component: TrainingSummary,
  },
  {
    path: '*',
    element: <Navigate to="/splash" replace />,
  }
]);
