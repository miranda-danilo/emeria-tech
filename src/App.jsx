import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, MessageSquare, Award, Settings, LogOut, 
  Menu, User, Zap, ChevronRight, ShieldCheck, PlayCircle,
  Cpu, Rocket, BrainCircuit, Mail, Lock, Chrome
} from 'lucide-react';

// ============================================================================
// --- CONFIGURACIÓN DE FIREBASE ---
// ============================================================================
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } from 'firebase/firestore';

// ⚠️ IMPORTANTE: Pon tus credenciales reales aquí

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

// ============================================================================
// --- SERVICIO DE IA (Gemini) ---
// ============================================================================
const API_KEY = ""; // En Vercel, configurarás esto en Variables de Entorno
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

const geminiService = {
  async askQuestion(question) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
    const systemPrompt = "Eres EMERIA AI, el asistente experto en Tecnologías Emergentes de la UNESUM. Tu misión es guiar a los estudiantes en IA, IoT y Cloud Computing.";
    
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
// --- COMPONENTE 1: PANTALLA DE AUTENTICACIÓN (LOGIN / REGISTRO) ---
// ============================================================================
function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Solo para registro
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Guardamos el nombre temporalmente en Firebase Auth (opcional)
        // Pero principalmente lo usaremos para crear el perfil en Firestore luego
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
      console.error(err);
      if (err.code === 'auth/invalid-credential') setError('Correo o contraseña incorrectos.');
      else if (err.code === 'auth/email-already-in-use') setError('Este correo ya está registrado.');
      else if (err.code === 'auth/weak-password') setError('La contraseña debe tener al menos 6 caracteres.');
      else setError('Error de autenticación. Verifica tus datos.');
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // El perfil se creará automáticamente en el useEffect de App.jsx si es la primera vez
    } catch (err) {
      console.error(err);
      setError('Operación con Google cancelada o fallida.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 mb-4">
            <Cpu className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">EMERIA TECH</h1>
          <p className="text-slate-400 text-sm mt-1">Plataforma Gamificada - UNESUM</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="Ej: Danilo Miranda"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="estudiante@unesum.edu.ec"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold mt-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-800"></div>
          <span className="text-xs text-slate-500 font-medium">O CONTINUAR CON</span>
          <div className="flex-1 h-px bg-slate-800"></div>
        </div>

        <button 
          onClick={handleGoogleAuth} disabled={loading}
          className="w-full mt-6 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-3 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-400">
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-blue-400 font-bold hover:underline">
            {isLogin ? 'Regístrate aquí' : 'Inicia Sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// --- COMPONENTE PRINCIPAL (RUTEO Y ESTADO GLOBAL) ---
// ============================================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Vistas del Dashboard
  const [view, setView] = useState('unidades');
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Obtenemos o creamos el perfil en la Base de Datos
        const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', currentUser.uid);
        try {
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
            // Si el usuario entró con Google y no tiene perfil, lo creamos aquí
            const newProfile = { 
              uid: currentUser.uid, 
              name: currentUser.displayName || `Estudiante_${currentUser.uid.substring(0,4)}`, 
              email: currentUser.email,
              role: 'estudiante', 
              totalScore: 0,
              createdAt: new Date().toISOString()
            };
            await setDoc(userRef, newProfile);
            setProfile(newProfile);
          } else {
            setProfile(snap.data());
          }
        } catch (error) {
          console.error("Error al obtener perfil:", error);
        }
      } else {
        setProfile(null);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const addExperience = async (points) => {
    if (!user) return;
    setLoadingAction(true);
    const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', user.uid);
    try {
      await updateDoc(userRef, { totalScore: increment(points) });
      setProfile(prev => ({ ...prev, totalScore: prev.totalScore + points }));
    } catch (e) {
      console.error("Error al actualizar XP:", e);
    }
    setLoadingAction(false);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  // 1. PANTALLA DE CARGA INICIAL
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Cpu className="text-blue-500 w-16 h-16 animate-spin mb-6" />
        <h1 className="text-2xl font-black tracking-[0.3em] uppercase">Iniciando EMERIA</h1>
      </div>
    );
  }

  // 2. SI NO ESTÁ LOGUEADO -> MUESTRA LA PANTALLA DE LOGIN
  if (!user || !profile) {
    return <AuthScreen />;
  }

  // 3. SI ESTÁ LOGUEADO -> MUESTRA EL DASHBOARD PRINCIPAL
  const nivelActual = Math.floor(profile.totalScore / 100) + 1;

  return (
    <div className="flex h-screen bg-[#fafafa] font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Profesional */}
      <aside className="w-72 bg-slate-950 text-white flex flex-col hidden lg:flex border-r border-white/5">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tighter leading-none">EMERIA</h1>
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Tech System</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 rounded-[2rem] border border-white/10 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md uppercase tracking-wider">Nivel {nivelActual}</span>
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-3xl font-black text-white">{profile.totalScore} <span className="text-xs text-slate-500 font-normal">XP</span></p>
            <div className="mt-4 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" 
                style={{ width: `${profile.totalScore % 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<BookOpen />} label="Unidades" active={view === 'unidades'} onClick={() => setView('unidades')} />
          <NavItem icon={<BrainCircuit />} label="Emeria AI" active={view === 'chat'} onClick={() => setView('chat')} />
          <NavItem icon={<Award />} label="Ranking UNESUM" active={view === 'ranking'} onClick={() => setView('ranking')} />
        </nav>

        <div className="p-6 mt-auto border-t border-slate-900">
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 mb-4">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Perfil" className="w-10 h-10 rounded-full border border-slate-700" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black text-sm">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">{profile.name}</p>
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">{profile.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-xl text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto relative">
        {loadingAction && (
          <div className="absolute top-10 right-10 animate-bounce">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">Actualizando nube...</span>
          </div>
        )}

        {view === 'unidades' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <header className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Módulos Académicos</h2>
                <p className="text-slate-500 font-medium mt-1">Ingeniería en Tecnologías de la Información</p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { id: 1, t: "Inteligencia Artificial", d: "Sistemas expertos y redes neuronales.", xp: 25 },
                { id: 2, t: "Internet de las Cosas", d: "Protocolos de comunicación y sensores.", xp: 30 },
                { id: 3, t: "Blockchain & Seg.", d: "Descentralización y criptografía.", xp: 35 },
                { id: 4, t: "Cloud Computing", d: "Arquitecturas en la nube y AWS.", xp: 40 }
              ].map(u => (
                <div key={u.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Rocket className="w-20 h-20 text-slate-900" />
                  </div>
                  <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4 block">Unidad {u.id}</span>
                  <h3 className="text-2xl font-black text-slate-800 leading-tight mb-2">{u.t}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-[80%]">{u.d}</p>
                  <button 
                    onClick={() => addExperience(u.xp)}
                    className="w-full py-4 bg-slate-950 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
                  >
                    <PlayCircle className="w-5 h-5" /> Iniciar Aprendizaje (+{u.xp} XP)
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'chat' && <ChatComponent />}
        
        {view === 'ranking' && (
           <div className="flex flex-col items-center justify-center h-full text-center">
              <Award className="w-24 h-24 text-slate-200 mb-6" />
              <h2 className="text-2xl font-bold text-slate-800">Ranking en Construcción</h2>
              <p className="text-slate-500 mt-2">Pronto podrás competir con tus compañeros de la UNESUM.</p>
           </div>
        )}
      </main>
    </div>
  );
}

// ============================================================================
// --- COMPONENTE SECUNDARIO: CHAT DE IA ---
// ============================================================================
function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    const aiResponse = await geminiService.askQuestion(userText);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsTyping(false);
  };

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className="h-full flex flex-col bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
      <div className="bg-slate-950 p-6 flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm">EMERIA AI Core</h3>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Sincronizado</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <div className="p-8 bg-slate-100 rounded-full mb-6">
              <MessageSquare className="w-12 h-12 text-slate-400" />
            </div>
            <p className="max-w-[200px] text-sm font-medium">¿En qué área técnica de las Tecnologías Emergentes te puedo asistir hoy?</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-5 rounded-3xl text-sm leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none whitespace-pre-wrap'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-[10px] font-bold text-blue-600 animate-pulse">EMERIA está procesando...</div>}
        <div ref={scrollRef} />
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex gap-4 p-2 bg-slate-100 rounded-3xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ej: Explícame el consenso en Blockchain..."
            className="flex-1 bg-transparent px-4 py-2 outline-none text-sm"
          />
          <button onClick={handleSend} className="bg-slate-950 text-white p-3 rounded-2xl hover:bg-blue-600 transition-all">
            <Rocket className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 translate-x-1' 
          : 'text-slate-500 hover:text-white hover:bg-white/5'
      }`}
    >
      {React.cloneElement(icon, { className: "w-5 h-5" })}
      {label}
    </button>
  );
}