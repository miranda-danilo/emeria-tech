import React, { useState, useRef } from 'react';
import { Cpu, ArrowLeft, CheckCircle2, BrainCircuit, Globe, GraduationCap, ChevronRight, PlayCircle, Lightbulb, Rocket, Award, Send, Zap, BookOpen, CheckSquare, BarChart, LogOut } from 'lucide-react';

import { silaboEmeria } from '../data/silabo';
import ChatComponent from '../components/ChatComponent';


export default function StudentDashboard({ user, profile, onLogout, addExperience }) {
  const [view, setView] = useState('unidades');
  const [unidadActiva, setUnidadActiva] = useState(null);
  const nivelActual = Math.floor(profile.totalScore / 100) + 1;

  const getInsignia = () => {
    if (nivelActual < 3) return { nombre: "Iniciado en TI", color: "bg-slate-200 text-slate-600" };
    if (nivelActual < 7) return { nombre: "Explorador Digital", color: "bg-blue-100 text-blue-600" };
    if (nivelActual < 15) return { nombre: "Especialista IA", color: "bg-purple-100 text-purple-600" };
    return { nombre: "Maestro Arquitecto", color: "bg-amber-100 text-amber-600" };
  };
  const insignia = getInsignia();

  return (
    <div className="flex h-screen bg-[#fafafa] font-sans text-slate-900 overflow-hidden">
      <aside className="w-72 bg-[#050B14] text-white flex flex-col hidden lg:flex border-r border-slate-800 relative z-20">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
          <Cpu className="text-blue-500 w-8 h-8" />
          <div><h1 className="font-black text-lg leading-none tracking-tight">EMERIA</h1><p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Tech System</p></div>
        </div>
        <div className="p-6">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 shadow-inner">
            <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-black text-blue-400 uppercase tracking-wider">Nivel {nivelActual}</span><Zap className="w-4 h-4 text-amber-400 fill-amber-400" /></div>
            <p className="text-3xl font-black text-white">{profile.totalScore} <span className="text-xs text-slate-500 font-normal">XP</span></p>
            <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all" style={{ width: `${profile.totalScore % 100}%` }}></div></div>
            <div className="mt-4 pt-4 border-t border-white/5"><div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${insignia.color}`}>Rango: {insignia.nombre}</div></div>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <button onClick={() => {setView('unidades'); setUnidadActiva(null);}} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-sm transition-all ${view === 'unidades' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}><BookOpen className="w-5 h-5"/> Unidades</button>
          <button onClick={() => setView('ejercicios')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-sm transition-all ${view === 'ejercicios' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}><Rocket className="w-5 h-5"/> Ejercicios Prácticos</button>
          <button onClick={() => setView('evaluaciones')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-sm transition-all ${view === 'evaluaciones' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}><CheckSquare className="w-5 h-5"/> Evaluaciones</button>
          <button onClick={() => setView('progreso')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-sm transition-all ${view === 'progreso' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}><BarChart className="w-5 h-5"/> Mi Progreso</button>
          <button onClick={() => setView('chat')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-sm transition-all ${view === 'chat' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}><BrainCircuit className="w-5 h-5"/> Emeria AI Tutor</button>
        </nav>
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-4 mb-4 bg-white/5 p-3 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black text-white">{profile.name.charAt(0).toUpperCase()}</div>
            <div className="flex-1 overflow-hidden"><p className="text-xs font-bold truncate text-white">{profile.name}</p><p className="text-[9px] text-blue-400 uppercase font-black">{profile.course || 'Estudiante TI'}</p></div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl text-xs font-bold transition-colors"><LogOut className="w-4 h-4" /> Salir</button>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-slate-50">
        {view === 'unidades' && !unidadActiva && (
          <div className="space-y-8 animate-in fade-in max-w-6xl mx-auto">
            <header className="mb-10"><h2 className="text-4xl font-black text-slate-900 tracking-tight">Ruta de Aprendizaje</h2><p className="text-slate-500 text-lg mt-2">Asignatura: Tecnologías Emergentes. Selecciona una unidad.</p></header>
            <div className="grid md:grid-cols-2 gap-6">
              {silaboEmeria.map(u => (
                <div key={u.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer" onClick={() => setUnidadActiva(u)}>
                  <div className="flex justify-between items-start mb-4"><span className="bg-blue-50 text-blue-600 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">UT {u.id}</span><span className="text-amber-500 font-bold text-sm flex items-center gap-1"><Zap className="w-4 h-4"/> {u.xpRecompensa} XP</span></div>
                  <h3 className="text-xl font-black text-slate-800 mb-4 group-hover:text-blue-600">{u.titulo}</h3>
                  <p className="text-slate-500 text-sm mb-6 flex items-center gap-2"><BookOpen className="w-4 h-4"/> {u.sesiones.length} Sesiones Académicas</p>
                  <div className="w-full py-4 bg-slate-50 text-slate-600 group-hover:bg-blue-600 group-hover:text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">Entrar a la Unidad <ChevronRight className="w-4 h-4" /></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'unidades' && unidadActiva && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-right-8 duration-300">
            <button onClick={() => setUnidadActiva(null)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-6"><ArrowLeft className="w-5 h-5" /> Volver</button>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl mb-8">
              <span className="text-blue-600 font-black text-xs uppercase block mb-2">Unidad Temática {unidadActiva.id}</span>
              <h2 className="text-3xl font-black text-slate-900 mb-6">{unidadActiva.titulo}</h2>
              <div className="space-y-6 mt-8">
                {unidadActiva.sesiones.map((sesion, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-lg text-slate-800">Sesión {sesion.num}</h4>
                      <button onClick={() => addExperience(20)} className="bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-200 px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-sm"><CheckCircle2 className="w-4 h-4"/> Completada (+20 XP)</button>
                    </div>
                    <ul className="space-y-2">
                      {sesion.temas.map((tema, i) => (<li key={i} className="flex items-start gap-3 text-sm text-slate-600"><span className="text-blue-500 mt-0.5">•</span><span>{tema}</span></li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'evaluaciones' && (
          <div className="max-w-4xl mx-auto animate-in fade-in">
            <header className="mb-10"><h2 className="text-4xl font-black text-slate-900">Evaluaciones Activas</h2></header>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 text-center py-16">
              <CheckSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-700">No hay evaluaciones pendientes</h3>
              <p className="text-slate-500 mt-2">Tu docente aún no ha publicado nuevos tests.</p>
            </div>
          </div>
        )}

        {view === 'ejercicios' && (
          <div className="max-w-4xl mx-auto text-center py-20 animate-in fade-in">
            <Rocket className="w-20 h-20 text-slate-200 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-800">Entorno Práctico en Construcción</h2>
            <p className="text-slate-500 mt-2">Pronto podrás acceder a laboratorios en la nube.</p>
          </div>
        )}

        {view === 'progreso' && (
          <div className="max-w-4xl mx-auto text-center py-20 animate-in fade-in bg-white rounded-3xl border border-slate-200">
             <h2 className="text-3xl font-bold text-slate-800">Tu Progreso General: {profile.totalScore} XP</h2>
          </div>
        )}

        {view === 'chat' && <ChatComponent />}
      </main>
    </div>
  );
}
