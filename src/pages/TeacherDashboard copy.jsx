import React, { useState, useRef } from 'react';
import { ShieldCheck, Users, Zap, BarChart, FileText, CheckSquare, LogOut, Cpu, BrainCircuit, Globe, GraduationCap, ChevronRight, PlayCircle, Lightbulb, Rocket, Award, Send } from 'lucide-react';
import { silabo } from '../data/silabo';

export default function TeacherDashboard({ profile, onLogout }) {
  const [view, setView] = useState('estadisticas');
  const [cursoSeleccionado, setCursoSeleccionado] = useState('Octavo A');
  const cursos = ['Octavo A', 'Octavo B', 'Octavo C', 'Octavo D'];
  const [nuevaPregunta, setNuevaPregunta] = useState('');
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(true);
  const [preguntas, setPreguntas] = useState([]);

  const handleCrearPregunta = () => {
    if (!nuevaPregunta.trim()) return;
    setPreguntas([...preguntas, { q: nuevaPregunta, a: respuestaCorrecta }]);
    setNuevaPregunta('');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <aside className="w-72 bg-slate-900 text-white flex flex-col hidden lg:flex border-r border-slate-800">
        <div className="p-8 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center"><ShieldCheck className="text-white w-6 h-6" /></div>
          <div><h1 className="font-black text-lg leading-none">EMERIA ADMIN</h1><p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Panel Docente</p></div>
        </div>
        <div className="p-6">
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <p className="text-xs text-slate-400">Bienvenido, Docente</p>
            <p className="text-sm font-bold truncate text-amber-400">{profile.name}</p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button onClick={() => setView('estadisticas')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${view === 'estadisticas' ? 'bg-amber-500 text-slate-900' : 'text-slate-400 hover:bg-slate-800'}`}><BarChart className="w-5 h-5"/> Progreso por Curso</button>
          <button onClick={() => setView('unidades')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${view === 'unidades' ? 'bg-amber-500 text-slate-900' : 'text-slate-400 hover:bg-slate-800'}`}><FileText className="w-5 h-5"/> Editar Unidades</button>
          <button onClick={() => setView('evaluaciones')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${view === 'evaluaciones' ? 'bg-amber-500 text-slate-900' : 'text-slate-400 hover:bg-slate-800'}`}><CheckSquare className="w-5 h-5"/> Creador de Exámenes</button>
        </nav>
        <div className="p-6 border-t border-slate-800">
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:text-red-400 rounded-xl text-xs font-bold"><LogOut className="w-4 h-4" /> Cerrar Sesión</button>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {view === 'estadisticas' && (
          <div className="space-y-6 animate-in fade-in">
            <header className="flex justify-between items-end mb-8">
              <div><h2 className="text-3xl font-black text-slate-900">Métricas de Estudiantes</h2></div>
              <select value={cursoSeleccionado} onChange={e=>setCursoSeleccionado(e.target.value)} className="bg-white border border-slate-200 py-2 px-4 rounded-xl outline-none focus:border-amber-500 font-bold">
                {cursos.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </header>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-200"><Users className="text-amber-500 mb-2 w-8 h-8"/><h3 className="text-xs font-bold text-slate-500 uppercase">Total Alumnos</h3><p className="text-3xl font-black">24</p></div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200"><Zap className="text-blue-500 mb-2 w-8 h-8"/><h3 className="text-xs font-bold text-slate-500 uppercase">Promedio XP</h3><p className="text-3xl font-black">1,250</p></div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200"><Award className="text-emerald-500 mb-2 w-8 h-8"/><h3 className="text-xs font-bold text-slate-500 uppercase">Aprobación</h3><p className="text-3xl font-black">85%</p></div>
            </div>
          </div>
        )}
        
        {view === 'evaluaciones' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
             <header className="mb-8"><h2 className="text-3xl font-black text-slate-900">Generador de Evaluaciones</h2></header>
             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Añadir Pregunta (Verdadero/Falso)</h3>
              <div className="flex gap-4">
                <input type="text" value={nuevaPregunta} onChange={e=>setNuevaPregunta(e.target.value)} placeholder="Ej: El ML es una rama de la IA." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-amber-500"/>
                <select value={respuestaCorrecta} onChange={e=>setRespuestaCorrecta(e.target.value === 'true')} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none">
                  <option value="true">Verdadero</option><option value="false">Falso</option>
                </select>
                <button onClick={handleCrearPregunta} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-500 hover:text-slate-900 transition-colors">Agregar</button>
              </div>
            </div>
            {preguntas.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-8">
                <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-lg">Cuestionario ({preguntas.length} preguntas)</h3><button className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md">Publicar</button></div>
                <div className="space-y-3">
                  {preguntas.map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100"><p className="font-medium text-slate-700"><span className="text-amber-500 font-black mr-2">Q{i+1}:</span> {p.q}</p><span className={`px-3 py-1 rounded-full text-xs font-black ${p.a ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>{p.a ? 'VERDADERO' : 'FALSO'}</span></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'unidades' && (
          <div className="space-y-6 animate-in fade-in">
             <header className="mb-8"><h2 className="text-3xl font-black text-slate-900">Gestor de Contenido</h2></header>
             <div className="grid gap-6">
              {silaboEmeria.map(ut => (
                <div key={ut.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center">
                  <div><span className="text-xs font-black text-amber-500 uppercase">Unidad Temática {ut.id}</span><h3 className="font-bold text-lg">{ut.titulo}</h3></div>
                  <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-200">Editar</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
