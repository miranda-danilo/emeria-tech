import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, MessageSquare, Award, Settings, LogOut, 
  User, Zap, ShieldCheck, PlayCircle,
  Cpu, Rocket, BrainCircuit, Mail, Lock, 
  ArrowLeft, Globe, Lightbulb, GraduationCap, ChevronRight
} from 'lucide-react';

// ============================================================================
// --- CONFIGURACIÓN DE FIREBASE ---
// ============================================================================
import { initializeApp } from 'firebase/app';
import { 
  getAuth, onAuthStateChanged, signOut,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } from 'firebase/firestore';

// ⚠️ REEMPLAZA CON TUS CREDENCIALES REALES
const firebaseConfig = {
  apiKey: "AIzaSyDabe6Kmg8-uylWkqL7XiRyxcN57g4MdPw",
  authDomain: "emeria-tech.firebaseapp.com",
  projectId: "emeria-tech",
  storageBucket: "emeria-tech.firebasestorage.app",
  messagingSenderId: "831464365204",
  appId: "1:831464365204:web:0db27221dad9da01f2a881",
  measurementId: "G-H02F81SHYT"
};

// Evitamos inicializar si no hay llave real para modo de prueba en el Canvas
const isConfigured = firebaseConfig.apiKey !== "TU_API_KEY";
let app, auth, db;
if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

const appId = 'emeria-tech-unesum';

// ============================================================================
// --- SERVICIO DE IA (Gemini) ---
// ============================================================================
const API_KEY = ""; // En Vercel irá en variables de entorno
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

const geminiService = {
  async askQuestion(question) {
    if (!API_KEY && typeof window === 'undefined') return "Error: API Key no configurada.";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
    const systemPrompt = "Eres EMERIA AI, asistente experto en Tecnologías Emergentes de la UNESUM (Carrera TI). Ayuda a estudiantes de 8vo semestre con IA, Sistemas Basados en Conocimiento y Machine Learning.";
    
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
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "EMERIA TECH: Error de respuesta.";
    } catch (e) { return "Error de conexión con el núcleo de IA."; }
  }
};

// ============================================================================
// --- COMPONENTE 1: LANDING PAGE (PÁGINA DE INICIO) ---
// ============================================================================
function LandingPage({ onNavigateToAuth }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans overflow-x-hidden selection:bg-blue-500/30">
      
      {/* Navbar Simple */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="text-blue-500 w-8 h-8" />
            <span className="text-white font-black text-xl tracking-tighter">EMERIA TECH</span>
          </div>
          <button 
            onClick={onNavigateToAuth}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            Acceder a la Plataforma
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest mb-8">
            <GraduationCap className="w-4 h-4" /> Proyecto de Titulación UNESUM
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-8">
            Gamificación para las <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Tecnologías Emergentes
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Plataforma interactiva diseñada para estudiantes de 8vo semestre de la carrera de Tecnologías de la Información. Desarrolla tus competencias digitales a través del juego.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onNavigateToAuth}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105"
            >
              Comenzar Aventura <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Contexto y Propuesta (About) */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">Innovando en el Sur de Manabí</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                El contexto de esta propuesta se desarrolla en la <strong>Universidad Estatal del Sur de Manabí (UNESUM)</strong>, en Jipijapa. La carrera de Tecnologías de la Información se caracteriza por su constante innovación, adaptándose a las necesidades de la comunidad.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Actualmente, fomentamos la modernización educativa proyectándonos hacia la implementación de <strong>Aulas Inteligentes</strong>. EMERIA TECH es un paso fundamental para la enseñanza-aprendizaje adaptativa de estudiantes, docentes y la institución.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-white/5">
                <Globe className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Comunidad</h3>
                <p className="text-sm text-slate-500">Impacto directo en la zona Sur de Manabí y el Ecuador.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-white/5 translate-y-8">
                <Lightbulb className="w-10 h-10 text-indigo-400 mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Aulas IA</h3>
                <p className="text-sm text-slate-500">Preparando el terreno para el futuro de la educación.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Módulos de Estudio */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">Sílabo Gamificado</h2>
            <p className="text-slate-400 text-lg">Cuatro Unidades Temáticas (UT) estructuradas para dominar el panorama actual de la Inteligencia Artificial.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 1, title: "Introducción a Tecnologías Emergentes e IA", desc: "Fundamentos generales del ecosistema tecnológico y bases de la Inteligencia Artificial." },
              { id: 2, title: "Gestión de Conocimientos y Avances", desc: "Administración de la información y evolución de los avances tecnológicos actuales." },
              { id: 3, title: "Sistemas Basados en Conocimiento", desc: "Resolución de problemas mediante algoritmos de búsqueda y sistemas expertos." },
              { id: 4, title: "Machine Learning e Incertidumbre", desc: "Aprendizaje automático basado en tecnologías y manejo de la incertidumbre en IA." }
            ].map(ut => (
              <div key={ut.id} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 transition-colors group">
                <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-xl flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 transition-transform">
                  {ut.id}
                </div>
                <h3 className="text-white font-bold text-lg leading-tight mb-4">{ut.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{ut.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center">
        <Cpu className="w-8 h-8 text-slate-700 mx-auto mb-4" />
        <p className="text-slate-500 font-medium">EMERIA TECH © 2026 - Proyecto de Titulación</p>
        <p className="text-slate-600 text-sm mt-2">Universidad Estatal del Sur de Manabí (UNESUM) - Carrera TI</p>
      </footer>
    </div>
  );
}

// ============================================================================
// --- COMPONENTE 2: PANTALLA DE AUTENTICACIÓN ---
// ============================================================================
function AuthScreen({ onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!isConfigured) return setError("Firebase no configurado. Modo Demo activo.");
    setError(''); setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', userCredential.user.uid), {
          uid: userCredential.user.uid,
          name: name || `Estudiante_${userCredential.user.uid.substring(0,4)}`,
          email: email,
          role: 'estudiante',
          totalScore: 0,
          createdAt: new Date().toISOString()
        });
      }
    } catch (err) {
      if (err.code === 'auth/invalid-credential') setError('Correo o contraseña incorrectos.');
      else if (err.code === 'auth/email-already-in-use') setError('Este correo ya está registrado.');
      else if (err.code === 'auth/weak-password') setError('La contraseña debe tener al menos 6 caracteres.');
      else setError('Error de autenticación. Verifica tus datos.');
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    if (!isConfigured) return setError("Firebase no configurado. Modo Demo activo.");
    setError(''); setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) { setError('Operación cancelada.'); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors z-20"
      >
        <ArrowLeft className="w-5 h-5" /> Volver al Inicio
      </button>

      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 mb-4">
            <Cpu className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">EMERIA TECH</h1>
          <p className="text-slate-400 text-sm mt-1">Acceso Estudiantil UNESUM</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">{error}</div>}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 focus:border-blue-500 outline-none"
                placeholder="Nombre Completo"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 focus:border-blue-500 outline-none"
              placeholder="estudiante@unesum.edu.ec"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 focus:border-blue-500 outline-none"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold mt-6 transition-all">
            {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

        <button onClick={handleGoogleAuth} disabled={loading} className="w-full mt-4 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-3">
          Continuar con Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-400">
          {isLogin ? '¿Estudiante nuevo? ' : '¿Ya tienes cuenta? '}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-blue-400 font-bold hover:underline">
            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// --- COMPONENTE 3: DASHBOARD PRINCIPAL (APP GAMIFICADA) ---
// ============================================================================
function Dashboard({ user, profile, onLogout, addExperience }) {
  const [view, setView] = useState('unidades');
  const nivelActual = Math.floor(profile.totalScore / 100) + 1;

  // Los 4 módulos oficiales de tu sílabo
  const modulos = [
    { id: 1, t: "Introducción a Tecnologías Emergentes e IA", d: "Conceptos generales de Inteligencia Artificial.", xp: 25 },
    { id: 2, t: "Gestión de Conocimientos y Avances", d: "Evolución tecnológica y administración de datos.", xp: 30 },
    { id: 3, t: "Sistemas Basados en Conocimiento", d: "Resolución de problemas mediante algoritmos de búsqueda.", xp: 35 },
    { id: 4, t: "Machine Learning e Incertidumbre", d: "Aprendizaje automático y manejo de incertidumbre en IA.", xp: 40 }
  ];

  return (
    <div className="flex h-screen bg-[#fafafa] font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 text-white flex flex-col hidden lg:flex border-r border-slate-800">
        <div className="p-8 border-b border-slate-800 flex items-center gap-3">
          <Cpu className="text-blue-500 w-8 h-8" />
          <div>
            <h1 className="font-black text-lg tracking-tighter leading-none">EMERIA</h1>
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Tech System</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-blue-400 uppercase">Nivel {nivelActual}</span>
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-3xl font-black text-white">{profile.totalScore} <span className="text-xs text-slate-500 font-normal">XP</span></p>
            <div className="mt-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${profile.totalScore % 100}%` }}></div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <button onClick={() => setView('unidades')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-sm transition-all ${view === 'unidades' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><BookOpen className="w-5 h-5"/> Unidades</button>
          <button onClick={() => setView('chat')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-sm transition-all ${view === 'chat' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><BrainCircuit className="w-5 h-5"/> Emeria AI</button>
        </nav>

        <div className="p-6 border-t border-slate-900">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black">{profile.name.charAt(0)}</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">{profile.name}</p>
              <p className="text-[9px] text-slate-500 uppercase font-black">{profile.role}</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-slate-400 hover:text-red-400 rounded-xl text-xs font-bold transition-colors">
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {view === 'unidades' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Sílabo Gamificado</h2>
              <p className="text-slate-500 mt-1">Asignatura: Tecnologías Emergentes (8vo Semestre)</p>
            </header>
            <div className="grid md:grid-cols-2 gap-6">
              {modulos.map(u => (
                <div key={u.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                  <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-2 block">UT {u.id}</span>
                  <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">{u.t}</h3>
                  <p className="text-slate-500 text-sm mb-6">{u.d}</p>
                  <button onClick={() => addExperience(u.xp)} className="w-full py-3 bg-slate-950 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-95">
                    <PlayCircle className="w-5 h-5" /> Estudiar (+{u.xp} XP)
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {view === 'chat' && <ChatComponent />}
      </main>
    </div>
  );
}

// Sub-componente de Chat
function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    const q = input; setInput('');
    setMessages(p => [...p, { r: 'user', t: q }]);
    setLoading(true);
    const res = await geminiService.askQuestion(q);
    setMessages(p => [...p, { r: 'ai', t: res }]);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="bg-slate-950 p-6 flex items-center gap-3 text-white">
        <BrainCircuit className="text-blue-500" /> <h3 className="font-bold">EMERIA AI - Tutor UNESUM</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.r === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${m.r === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'}`}>
              {m.t}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-blue-500 font-bold animate-pulse">Analizando...</div>}
      </div>
      <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSend()} placeholder="Escribe tu duda técnica..." className="flex-1 bg-slate-100 rounded-xl px-4 py-2 outline-none focus:ring-2 ring-blue-500" />
        <button onClick={handleSend} className="bg-slate-950 text-white p-3 rounded-xl hover:bg-blue-600"><Rocket className="w-5 h-5" /></button>
      </div>
    </div>
  );
}

// ============================================================================
// --- CONTROLADOR PRINCIPAL (ENRUTADOR DE ESTADO) ---
// ============================================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('landing'); // 'landing', 'auth', 'dashboard'

  useEffect(() => {
    if (!isConfigured) {
      setLoadingAuth(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', currentUser.uid);
        try {
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
            const newP = { uid: currentUser.uid, name: currentUser.displayName || 'Estudiante', email: currentUser.email, role: 'estudiante', totalScore: 0 };
            await setDoc(userRef, newP);
            setProfile(newP);
          } else {
            setProfile(snap.data());
          }
          setCurrentScreen('dashboard');
        } catch (error) { console.error(error); }
      } else {
        setProfile(null);
        // Si no hay usuario, mantenemos la pantalla en la que estaba (landing o auth)
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

  if (loadingAuth) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white"><Cpu className="w-12 h-12 animate-spin text-blue-500" /></div>;

  // Lógica de "Enrutamiento"
  if (currentScreen === 'dashboard' && profile) {
    return <Dashboard user={user} profile={profile} onLogout={handleLogout} addExperience={addExperience} />;
  }
  
  if (currentScreen === 'auth') {
    return <AuthScreen onBack={() => setCurrentScreen('landing')} />;
  }

  // Por defecto, muestra la Landing Page
  return <LandingPage onNavigateToAuth={() => setCurrentScreen('auth')} />;
}