import React from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import LoginPage from './pages/LoginPage';
import TeacherDashboard from './pages/TeacherDashboard';
import SmartCareerApp from './SmartCareerApp';

function AppRouter() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="flex gap-2 justify-center mb-4">
            <span className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></span>
            <span className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay:'75ms'}}></span>
            <span className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}></span>
          </div>
          <p className="text-indigo-300 font-bold text-sm">Dang tai he thong...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return <LoginPage />;
  if (currentUser.role === 'teacher') return <TeacherDashboard />;
  return <SmartCareerApp />;
}

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
