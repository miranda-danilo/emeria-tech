import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, MessageSquare, Award, Settings, LogOut, 
  Menu, User, Zap, ChevronRight, ShieldCheck, PlayCircle,
  Cpu, Rocket, BrainCircuit
} from 'lucide-react';

// --- CONFIGURACIÓN DE FIREBASE ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDabe6Kmg8-uylWkqL7XiRyxcN57g4MdPw",
  authDomain: "emeria-tech.firebaseapp.com",
  projectId: "emeria-tech",
  storageBucket: "emeria-tech.firebasestorage.app",
  messagingSenderId: "831464365204",
  appId: "1:831464365204:web:0db27221dad9da01f2a881",
  measurementId: "G-H02F81SHYT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = 'emeria-tech-unesum';

// --- SERVICIO DE IA ---
const API_KEY = ""; // Inyectada por el entorno
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

const geminiService = {
  async askQuestion(question) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
    const systemPrompt = "Eres EMERIA AI, el asistente experto en Tecnologías Emergentes de la UNESUM. Ayuda a los estudiantes con IA, IoT y Cloud.";
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: question }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Error en el núcleo de EMERIA.";
    } catch (e) { return "Error de conexión."; }
  }
};

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState('unidades');

  useEffect(() => {
    onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', u.uid);
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          const initP = { uid: u.uid, name: `User_${u.uid.substring(0,4)}`, role: 'user', totalScore: 0 };
          await setDoc(userRef, initP);
          setProfile(initP);
        } else { setProfile(snap.data()); }
      }
    });
    // Simular Login si no hay backend activo
    if (!user) signInAnonymously(auth);
  }, []);

  if (!profile) return <div className="h-screen bg-slate-900 flex items-center justify-center text-white">Cargando EMERIA TECH...</div>;

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col hidden lg:flex">
        <div className="p-8 border-b border-slate-800 flex items-center gap-3">
          <Cpu className="text-blue-500 w-8 h-8" />
          <h1 className="font-black text-xl tracking-tighter">EMERIA TECH</h1>
        </div>
        
        <div className="p-8">
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <p className="text-xs font-bold text-blue-400 mb-1 uppercase tracking-widest">Nivel Estudiante</p>
            <p className="text-lg font-black">{profile.totalScore} XP</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button onClick={() => setView('unidades')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${view === 'unidades' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            <BookOpen className="w-5 h-5" /> Unidades
          </button>
          <button onClick={() => setView('chat')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${view === 'chat' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            <BrainCircuit className="w-5 h-5" /> Emeria AI
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {view === 'unidades' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3,4].map(u => (
              <div key={u} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Módulo {u}</span>
                <h3 className="text-2xl font-bold text-slate-800 mt-2">Tecnologías Emergentes UT{u}</h3>
                <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" /> Empezar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-2xl">
            <div className="bg-slate-900 p-6 text-white font-bold">Consola EMERIA AI</div>
            <div className="flex-1 p-6 text-slate-400 italic">Bienvenido, estudiante. Realiza tu consulta técnica sobre la UT...</div>
            <div className="p-4 border-t border-slate-100 flex gap-4">
              <input className="flex-1 bg-slate-50 rounded-xl px-4 py-2 outline-none border border-transparent focus:border-blue-500" placeholder="Preguntar a la IA..." />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold"><Rocket /></button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}