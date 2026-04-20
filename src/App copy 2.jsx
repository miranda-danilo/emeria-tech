import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, increment, setDoc } from 'firebase/firestore';

import { auth, db, appId, isConfigured } from './firebase/config';
import LandingPage from './pages/LandingPage';
import AuthScreen from './pages/AuthScreen';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('landing');

  useEffect(() => {
    if (!isConfigured) { setLoadingAuth(false); return; }
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Validación para evitar el cambio brusco de pantalla:
        // Si el usuario no ha verificado su correo, detenemos el flujo aquí.
        if (!currentUser.emailVerified) {
          setLoadingAuth(false);
          return;
        }

        setUser(currentUser);
        const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', currentUser.uid);
        try {
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
            const newP = { 
              uid: currentUser.uid, 
              name: currentUser.displayName || 'Estudiante', 
              email: currentUser.email, 
              role: 'estudiante', 
              totalScore: 0 
            };
            await setDoc(userRef, newP); 
            setProfile(newP);
          } else { 
            setProfile(snap.data()); 
          }
          setCurrentScreen('dashboard');
        } catch (error) { 
          console.error(error); 
        }
      } else {
        setUser(null);
        setProfile(null); 
        if (currentScreen === 'dashboard') setCurrentScreen('landing');
      }
      setLoadingAuth(false);
    });
    
    return () => unsubscribe();
  }, [currentScreen]);

  const addExperience = async (points) => {
    if (!isConfigured || !user) return;
    const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', user.uid);
    await updateDoc(userRef, { totalScore: increment(points) });
    setProfile(p => ({ ...p, totalScore: p.totalScore + points }));
  };

  const handleLogout = () => { 
    if (isConfigured) signOut(auth); 
    setCurrentScreen('landing'); 
  };

  if (loadingAuth) return <div className="min-h-screen bg-[#050B14] flex items-center justify-center text-white"><Cpu className="w-12 h-12 animate-spin text-blue-500" /></div>;

  if (currentScreen === 'dashboard' && profile) {
    if (profile.role === 'admin' || profile.role === 'docente') {
      return <TeacherDashboard profile={profile} onLogout={handleLogout} />;
    } else {
      return <StudentDashboard user={user} profile={profile} onLogout={handleLogout} addExperience={addExperience} />;
    }
  }
  
  if (currentScreen === 'auth') return <AuthScreen onBack={() => setCurrentScreen('landing')} />;
  return <LandingPage onNavigateToAuth={() => setCurrentScreen('auth')} />;
}