
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AppLayout } from './shell/AppLayout'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import CVScanner from './pages/CVScanner'
import CVBuilder from './pages/CVBuilder'
import Jobs from './pages/jobs/Jobs'
import JobDetail from './pages/jobs/JobDetail'
import Chatbot from './pages/Chatbot'
import Interview from './pages/Interview'
import Profile from './pages/Profile'
import Recharge from './pages/Recharge'
import { ProtectedRoute } from './shell/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'cv-scanner', element: <ProtectedRoute><CVScanner /></ProtectedRoute> },
      { path: 'cv-builder', element: <ProtectedRoute><CVBuilder /></ProtectedRoute> },
      { path: 'chatbot', element: <ProtectedRoute><Chatbot /></ProtectedRoute> },
      { path: 'jobs', element: <ProtectedRoute><Jobs /></ProtectedRoute> },
      { path: 'jobs/:id', element: <ProtectedRoute><JobDetail /></ProtectedRoute> },
      { path: 'interview', element: <ProtectedRoute><Interview /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'recharge', element: <ProtectedRoute><Recharge /></ProtectedRoute> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
