import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, MessageSquare, Award, Settings, LogOut, 
  User, Zap, ShieldCheck, PlayCircle,
  Cpu, Rocket, BrainCircuit, Mail, Lock, 
  ArrowLeft, Globe, Lightbulb, GraduationCap, ChevronRight,
  Send
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
const isConfigured = firebaseConfig.apiKey !== "TU_API_KEY";
let app, auth, db;
if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

const appId = 'emeria-tech-unesum';

// ============================================================================
// --- ESTILOS DE ANIMACIÓN OPTIMIZADOS (Inyectados en JS) ---
// ============================================================================
const cssAnimations = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  @keyframes float-reverse {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(20px) rotate(-5deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
  }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float-reverse 8s ease-in-out infinite; }
  .perspective-1000 { perspective: 1000px; }
  .transform-3d { transform-style: preserve-3d; }
  .rotate-y-12 { transform: rotateY(12deg) rotateX(5deg); }
  .rotate-y-minus-12 { transform: rotateY(-12deg) rotateX(5deg); }
`;

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
// --- COMPONENTE 1: LANDING PAGE ---
// ============================================================================
function LandingPage({ onNavigateToAuth }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Enviando...');
    setTimeout(() => {
      setFormStatus('¡Mensaje enviado con éxito! Nos contactaremos pronto.');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans overflow-x-hidden selection:bg-blue-500/30">
      <style>{cssAnimations}</style>
      
      {/* Navbar Simple */}
      <nav className="fixed w-full z-50 bg-[#050B14]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="text-blue-500 w-8 h-8" />
            <span className="text-white font-black text-xl tracking-tighter">EMERIA TECH</span>
          </div>
          <button 
            onClick={onNavigateToAuth}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:scale-105"
          >
            Acceder
          </button>
        </div>
      </nav>

      {/* Hero Section con Elementos "3D" Flotantes */}
      <section className="relative pt-40 pb-20 px-6 lg:pt-48 lg:pb-32 overflow-hidden perspective-1000">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        {/* Figuras Flotantes (Simulación 3D Optimizada) */}
        <div className="hidden lg:block absolute top-40 left-20 animate-float rotate-y-12 transform-3d z-0">
          <div className="w-32 h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl" style={{ animation: 'pulse-glow 4s infinite' }}>
            <BrainCircuit className="w-16 h-16 text-indigo-400" />
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-20 right-20 animate-float-delayed rotate-y-minus-12 transform-3d z-0">
          <div className="w-40 h-40 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-2xl" style={{ animation: 'pulse-glow 5s infinite 1s' }}>
            <Globe className="w-20 h-20 text-blue-400" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest mb-8 animate-bounce">
            <GraduationCap className="w-4 h-4" /> Proyecto de Titulación UNESUM
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-8 drop-shadow-2xl">
            Gamificación para las <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Tecnologías Emergentes
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Plataforma interactiva diseñada para estudiantes de 8vo semestre de la carrera de Tecnologías de la Información. Desarrolla tus competencias digitales a través del juego y la IA.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onNavigateToAuth}
              className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Iniciar Aventura <ChevronRight className="w-5 h-5" />
            </button>
            <a href="#contacto" className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center transition-all backdrop-blur-sm">
              Saber más
            </a>
          </div>
        </div>
      </section>

      {/* Propuesta y Contexto */}
      <section className="py-24 bg-slate-900/40 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-1 bg-blue-600 mb-8 rounded-full"></div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">Innovación en el Sur de Manabí</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                El contexto de esta propuesta se desarrolla en la <strong>Universidad Estatal del Sur de Manabí (UNESUM)</strong>, localizada en Jipijapa. La carrera de Tecnologías de la Información se caracteriza por su constante innovación tecnológica adaptada a las necesidades de la comunidad.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Actualmente fomentamos la modernización educativa, apuntando a la futura implementación de <strong>Aulas Inteligentes</strong>. Las aplicaciones de gamificación juegan un papel fundamental en el desarrollo de competencias digitales.
              </p>
            </div>
            
            {/* Grid 3D-ish de beneficios */}
            <div className="grid grid-cols-2 gap-4 perspective-1000">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-white/5 transform transition-all duration-500 hover:rotate-y-12 hover:scale-105 shadow-xl">
                <Lightbulb className="w-12 h-12 text-amber-400 mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Innovación</h3>
                <p className="text-sm text-slate-500">Nuevas metodologías para la enseñanza superior.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-white/5 transform transition-all duration-500 hover:rotate-y-minus-12 hover:scale-105 shadow-xl translate-y-8">
                <Rocket className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Aulas Inteligentes</h3>
                <p className="text-sm text-slate-500">Preparación para la educación del mañana en Ecuador.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Módulos de Estudio */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">El Sílabo, Gamificado</h2>
            <p className="text-slate-400 text-lg">Cuatro Unidades Temáticas (UT) diseñadas para llevarte del concepto a la práctica de la IA.</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { id: 1, title: "Introducción a la IA", desc: "Introducción general a las Tecnologías Emergentes y a la Inteligencia Artificial." },
              { id: 2, title: "Gestión y Avances", desc: "Gestión de Conocimientos y Avances Tecnológicos recientes." },
              { id: 3, title: "Sistemas Basados", desc: "Sistema basado en el Conocimiento y Resolución de problemas mediante búsqueda." },
              { id: 4, title: "Machine Learning", desc: "Aprendizaje automático basado en tecnologías e Incertidumbre en Inteligencia Artificial." }
            ].map(ut => (
              <div key={ut.id} className="bg-slate-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-slate-800 transition-all group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)]">
                <div className="w-14 h-14 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center font-black text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {ut.id}
                </div>
                <h3 className="text-white font-bold text-lg leading-tight mb-4">{ut.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{ut.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto & Footer Section */}
      <section id="contacto" className="py-24 bg-gradient-to-b from-[#050B14] to-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* Formulario de Contacto (Glassmorphism) */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-2">¿Tienes dudas sobre el proyecto?</h2>
            <p className="text-slate-400 mb-8 text-sm">Déjanos tu mensaje y nos pondremos en contacto contigo.</p>
            
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <input 
                type="text" required placeholder="Tu Nombre Completo"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-5 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <input 
                type="email" required placeholder="Correo Electrónico"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-5 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <textarea 
                required placeholder="¿En qué podemos ayudarte?" rows="4"
                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-5 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              ></textarea>
              
              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all">
                <Send className="w-5 h-5" /> Enviar Mensaje
              </button>
              
              {formStatus && (
                <p className={`text-center text-sm font-bold mt-4 ${formStatus.includes('éxito') ? 'text-green-400' : 'text-blue-400 animate-pulse'}`}>
                  {formStatus}
                </p>
              )}
            </form>
          </div>

          {/* Información y Redes Sociales */}
          <div className="flex flex-col justify-center lg:pl-10">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="text-blue-500 w-10 h-10" />
                <span className="text-white font-black text-3xl tracking-tighter">EMERIA TECH</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Desarrollado como proyecto de titulación para la carrera de Tecnologías de la Información de la UNESUM. Impulsando la educación a través de la gamificación y la Inteligencia Artificial.
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4 text-slate-400">
                <Globe className="w-5 h-5 text-blue-500" /> Jipijapa, Manabí, Ecuador
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <GraduationCap className="w-5 h-5 text-blue-500" /> Universidad Estatal del Sur de Manabí (UNESUM)
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Síguenos en Redes</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/5 hover:bg-blue-600 text-slate-400 hover:text-white rounded-full flex items-center justify-center transition-all border border-white/10">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 hover:bg-blue-400 text-slate-400 hover:text-white rounded-full flex items-center justify-center transition-all border border-white/10">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 hover:bg-pink-600 text-slate-400 hover:text-white rounded-full flex items-center justify-center transition-all border border-white/10">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 hover:bg-white hover:text-slate-900 text-slate-400 rounded-full flex items-center justify-center transition-all border border-white/10">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-6 text-center border-t border-white/5 bg-[#050B14]">
        <p className="text-slate-600 text-sm">© 2026 EMERIA TECH. Todos los derechos reservados. Proyecto Académico.</p>
      </div>
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
          email: email, role: 'estudiante', totalScore: 0, createdAt: new Date().toISOString()
        });
      }
    } catch (err) {
      if (err.code === 'auth/invalid-credential') setError('Correo o contraseña incorrectos.');
      else if (err.code === 'auth/email-already-in-use') setError('Este correo ya está registrado.');
      else setError('Error de autenticación. Verifica tus datos.');
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    if (!isConfigured) return setError("Firebase no configurado. Modo Demo activo.");
    setError(''); setLoading(true);
    const provider = new GoogleAuthProvider();
    try { await signInWithPopup(auth, provider); } 
    catch (err) { setError('Operación cancelada.'); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#050B14] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <style>{cssAnimations}</style>
      <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors z-20">
        <ArrowLeft className="w-5 h-5" /> Volver al Inicio
      </button>

      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
      
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative z-10 transform transition-all">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] mb-4">
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
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none transition-colors"
                placeholder="Nombre Completo" />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none transition-colors"
              placeholder="estudiante@unesum.edu.ec" />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none transition-colors"
              placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold mt-6 transition-all shadow-lg shadow-blue-600/20">
            {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4 opacity-50">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-xs text-white font-medium">O CONTINUAR CON</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* BOTÓN DE GOOGLE RESTAURADO CON SU LOGO OFICIAL SVG */}
        <button onClick={handleGoogleAuth} disabled={loading} className="w-full mt-6 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-400">
          {isLogin ? '¿Estudiante nuevo? ' : '¿Ya tienes cuenta? '}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-blue-400 font-bold hover:underline">
            {isLogin ? 'Regístrate aquí' : 'Inicia Sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// --- COMPONENTE 3: DASHBOARD PRINCIPAL ---
// ============================================================================
function Dashboard({ user, profile, onLogout, addExperience }) {
  const [view, setView] = useState('unidades');
  const nivelActual = Math.floor(profile.totalScore / 100) + 1;

  const modulos = [
    { id: 1, t: "Introducción a Tecnologías Emergentes e IA", d: "Conceptos generales de Inteligencia Artificial.", xp: 25 },
    { id: 2, t: "Gestión de Conocimientos y Avances", d: "Evolución tecnológica y administración de datos.", xp: 30 },
    { id: 3, t: "Sistemas Basados en Conocimiento", d: "Resolución de problemas mediante algoritmos de búsqueda.", xp: 35 },
    { id: 4, t: "Machine Learning e Incertidumbre", d: "Aprendizaje automático y manejo de incertidumbre en IA.", xp: 40 }
  ];

  return (
    <div className="flex h-screen bg-[#fafafa] font-sans text-slate-900 overflow-hidden">
      <aside className="w-72 bg-[#050B14] text-white flex flex-col hidden lg:flex border-r border-slate-800">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
          <Cpu className="text-blue-500 w-8 h-8" />
          <div>
            <h1 className="font-black text-lg tracking-tighter leading-none">EMERIA</h1>
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Tech System</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-slate-900/50 p-5 rounded-2xl border border-white/5 shadow-inner backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-blue-400 uppercase">Nivel {nivelActual}</span>
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-3xl font-black text-white">{profile.totalScore} <span className="text-xs text-slate-500 font-normal">XP</span></p>
            <div className="mt-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ width: `${profile.totalScore % 100}%` }}></div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <button onClick={() => setView('unidades')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-sm transition-all ${view === 'unidades' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}><BookOpen className="w-5 h-5"/> Unidades</button>
          <button onClick={() => setView('chat')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-sm transition-all ${view === 'chat' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}><BrainCircuit className="w-5 h-5"/> Emeria AI</button>
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-4 mb-4">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Perfil" className="w-10 h-10 rounded-full border border-slate-700" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black">{profile.name.charAt(0).toUpperCase()}</div>
            )}
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">{profile.name}</p>
              <p className="text-[9px] text-slate-500 uppercase font-black">{profile.role}</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl text-xs font-bold transition-colors">
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-slate-50">
        {view === 'unidades' && (
          <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
            <header>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Sílabo Gamificado</h2>
              <p className="text-slate-500 mt-1">Asignatura: Tecnologías Emergentes (8vo Semestre)</p>
            </header>
            <div className="grid md:grid-cols-2 gap-6">
              {modulos.map(u => (
                <div key={u.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-2 block">UT {u.id}</span>
                  <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">{u.t}</h3>
                  <p className="text-slate-500 text-sm mb-6">{u.d}</p>
                  <button onClick={() => addExperience(u.xp)} className="w-full py-4 bg-[#050B14] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors active:scale-95 shadow-lg">
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
    <div className="h-full max-w-4xl mx-auto flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="bg-[#050B14] p-6 flex items-center gap-3 text-white">
        <BrainCircuit className="text-blue-500" /> <h3 className="font-bold">EMERIA AI - Tutor UNESUM</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.r === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-5 rounded-2xl text-sm leading-relaxed ${m.r === 'user' ? 'bg-blue-600 text-white rounded-br-none shadow-md' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm whitespace-pre-wrap'}`}>
              {m.t}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-blue-500 font-bold animate-pulse">Analizando la base de conocimientos...</div>}
      </div>
      <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSend()} placeholder="Escribe tu duda técnica..." className="flex-1 bg-slate-100 rounded-xl px-5 py-3 outline-none focus:ring-2 ring-blue-500 transition-all" />
        <button onClick={handleSend} className="bg-[#050B14] text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"><Rocket className="w-5 h-5" /></button>
      </div>
    </div>
  );
}

// ============================================================================
// --- CONTROLADOR PRINCIPAL ---
// ============================================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('landing');

  useEffect(() => {
    if (!isConfigured) { setLoadingAuth(false); return; }
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
          } else { setProfile(snap.data()); }
          setCurrentScreen('dashboard');
        } catch (error) { console.error(error); }
      } else {
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
    return <Dashboard user={user} profile={profile} onLogout={handleLogout} addExperience={addExperience} />;
  }
  
  if (currentScreen === 'auth') {
    return <AuthScreen onBack={() => setCurrentScreen('landing')} />;
  }

  return <LandingPage onNavigateToAuth={() => setCurrentScreen('auth')} />;
}