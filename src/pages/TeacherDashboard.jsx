import React, { useState, useEffect } from 'react';
import { LogOut, BookOpen, Edit3, Save, Users, LayoutDashboard, BarChart3, Upload, FileText, CheckCircle, Cpu, Zap, Search, Plus, Trash2, ArrowLeft, Image as ImageIcon, List, Type, MessageSquare, AlertTriangle, Star, Target } from 'lucide-react';
import { db, appId } from '../firebase/config';
import { collection, query, onSnapshot, doc, updateDoc, setDoc, orderBy } from 'firebase/firestore';
import { silabo as silaboInicial } from '../data/silabo'; 

export default function TeacherDashboard({ profile, onLogout }) {
  const [activeTab, setActiveTab] = useState('inicio');
  const [silaboData, setSilaboData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [editingUnitId, setEditingUnitId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const silaboRef = collection(db, 'artifacts', appId, 'public', 'data', 'silabo');
    const unsubSilabo = onSnapshot(silaboRef, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
        data.sort((a, b) => a.id.localeCompare(b.id));
        setSilaboData(data);
      }
      setLoading(false);
    });

    const usersRef = collection(db, 'artifacts', appId, 'public', 'data', 'usuarios');
    const qUsers = query(usersRef, orderBy('totalScore', 'desc'));
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
      const students = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(u => u.role === 'estudiante');
      setStudentsData(students);
    });

    return () => { unsubSilabo(); unsubUsers(); };
  }, []);

  const initializeSilaboInFirestore = async () => {
    setLoading(true);
    try {
      for (const unidad of silaboInicial) {
        const unitRef = doc(db, 'artifacts', appId, 'public', 'data', 'silabo', unidad.id);
        await setDoc(unitRef, unidad);
      }
      alert("¡Sílabo inicializado/sobrescrito correctamente en Firestore con la versión más reciente!");
    } catch (error) {
      console.error("Error al inicializar:", error);
      alert("Error al inicializar el sílabo.");
    }
    setLoading(false);
  };

  const handleSaveUnit = async (unitData) => {
    try {
      const unitRef = doc(db, 'artifacts', appId, 'public', 'data', 'silabo', unitData.firebaseId);
      await updateDoc(unitRef, unitData);
      setEditingUnitId(null);
      alert("Unidad actualizada correctamente en la nube.");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  const totalStudents = studentsData.length;
  const avgXP = totalStudents > 0 ? Math.round(studentsData.reduce((acc, s) => acc + (s.totalScore || 0), 0) / totalStudents) : 0;
  
  let totalLessonsInSilabo = 0;
  silaboData.forEach(u => u.sessions?.forEach(s => totalLessonsInSilabo += (s.lessons?.length || 0)));

  if (loading) return <div className="min-h-screen bg-[#050B14] flex items-center justify-center text-white"><Cpu className="w-12 h-12 animate-spin text-blue-500" /></div>;

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 flex overflow-hidden font-sans">
      
      <aside className="w-64 bg-slate-900/50 border-r border-white/5 flex flex-col justify-between hidden md:flex backdrop-blur-md">
        <div>
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Zap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-tight">EMERIA</h1>
              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Panel Docente</p>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            <SidebarBtn icon={<LayoutDashboard/>} label="Dashboard" isActive={activeTab==='inicio'} onClick={()=>setActiveTab('inicio')} />
            <SidebarBtn icon={<BookOpen/>} label="Gestión de Unidades" isActive={activeTab==='silabo'} onClick={()=>setActiveTab('silabo')} />
            <SidebarBtn icon={<BarChart3/>} label="Calificaciones" isActive={activeTab==='calificaciones'} onClick={()=>setActiveTab('calificaciones')} />
          </nav>
        </div>

        <div className="p-4 border-t border-white/5">
           <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-white/5">
              <p className="text-white font-bold text-sm truncate">{profile?.name || 'Profesor'}</p>
              <p className="text-xs text-amber-400 font-bold mt-1">Administrador</p>
           </div>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors font-medium">
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-50">
           <div className="flex items-center gap-2 md:hidden">
             <Zap className="text-amber-500 w-6 h-6" /><span className="text-white font-bold text-lg">EMERIA ADMIN</span>
           </div>
           <div className="hidden md:block">
             <h2 className="text-xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h2>
           </div>
           <button onClick={onLogout} className="md:hidden text-slate-400 hover:text-white"><LogOut className="w-6 h-6"/></button>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
          
          <div className="md:hidden grid grid-cols-3 bg-slate-900/50 p-1 rounded-xl mb-6 border border-white/5">
             <MobileTabBtn label="Inicio" isActive={activeTab==='inicio'} onClick={()=>setActiveTab('inicio')} />
             <MobileTabBtn label="Unidades" isActive={activeTab==='silabo'} onClick={()=>setActiveTab('silabo')} />
             <MobileTabBtn label="Notas" isActive={activeTab==='calificaciones'} onClick={()=>setActiveTab('calificaciones')} />
          </div>

          {activeTab === 'inicio' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gradient-to-br from-amber-900/40 to-slate-900/80 border border-amber-500/20 rounded-3xl p-8">
                <h2 className="text-3xl font-black text-white mb-2">Resumen del Curso</h2>
                <p className="text-slate-400 mb-6">Métricas en tiempo real de tus estudiantes de Tecnologías de la Información.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center">
                    <Users className="w-8 h-8 text-blue-400 mb-2" />
                    <p className="text-3xl font-black text-white">{totalStudents}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Estudiantes Inscritos</p>
                  </div>
                  <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center">
                    <Star className="w-8 h-8 text-yellow-400 mb-2" />
                    <p className="text-3xl font-black text-white">{avgXP}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">XP Promedio</p>
                  </div>
                  <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center">
                    <Target className="w-8 h-8 text-green-400 mb-2" />
                    <p className="text-3xl font-black text-white">{totalLessonsInSilabo}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Misiones Totales</p>
                  </div>
                </div>
              </div>
              
              {silaboData.length === 0 && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
                   <p className="text-amber-400 font-bold mb-4">La base de datos de misiones está vacía. Debes inicializarla para que los estudiantes puedan jugar.</p>
                   <button onClick={initializeSilaboInFirestore} className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition-all">
                     Inicializar Base de Datos de Misiones
                   </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'silabo' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/50 p-6 rounded-2xl border border-white/5 gap-4">
                 <div>
                   <h2 className="text-xl font-bold text-white flex items-center gap-2">
                     <Edit3 className="w-6 h-6 text-amber-400" /> Editor de Misiones
                   </h2>
                   <p className="text-sm text-slate-400 mt-1">Configura el contenido y administra los recursos de cada lección.</p>
                 </div>
                 
                 {/* BOTÓN CRÍTICO PARA SOBREESCRIBIR LA BASE DE DATOS */}
                 <div className="flex gap-2 w-full sm:w-auto">
                    {silaboData.length === 0 ? (
                      <button onClick={initializeSilaboInFirestore} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold w-full sm:w-auto">Cargar Sílabo Base</button>
                    ) : (
                      <button onClick={() => {
                        if(window.confirm('¿Deseas FORZAR el reinicio de la base de datos? Esto borrará la estructura actual (y las tareas administrativas viejas) y cargará la nueva versión 1.1 limpia.')) {
                          initializeSilaboInFirestore();
                        }
                      }} className="px-4 py-2 bg-red-600/10 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                        <AlertTriangle className="w-4 h-4"/> Forzar Reinicio del Sílabo
                      </button>
                    )}
                 </div>
               </div>

               {silaboData.map((unidad) => (
                <div key={unidad.firebaseId} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-xl">
                  {editingUnitId === unidad.firebaseId ? (
                    <EditUnitForm unit={unidad} onSave={handleSaveUnit} onCancel={() => setEditingUnitId(null)} />
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{unidad.title}</h3>
                          <p className="text-sm text-slate-400 mt-1">{unidad.description}</p>
                        </div>
                        <button onClick={() => setEditingUnitId(unidad.firebaseId)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold transition-all border border-white/10 shrink-0">
                          Modificar Unidad
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {unidad.sessions?.map((session, sIdx) => (
                          <div key={sIdx} className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                            <h4 className="font-bold text-amber-400 text-sm mb-3">{session.name}</h4>
                            <div className="space-y-2">
                              {session.lessons?.map((lesson, lIdx) => (
                                <div key={lIdx} className="flex flex-col md:flex-row items-center justify-between bg-slate-900 p-3 rounded-lg border border-white/5 gap-4">
                                  <div className="flex items-center gap-3 w-full md:w-auto">
                                    {lesson.type === 'document' ? <FileText className="w-4 h-4 text-blue-400 shrink-0"/> : 
                                     lesson.type === 'task' ? <CheckCircle className="w-4 h-4 text-green-400 shrink-0"/> : 
                                     <BookOpen className="w-4 h-4 text-slate-400 shrink-0"/>}
                                    <span className="text-sm text-slate-300 font-medium">{lesson.title}</span>
                                  </div>
                                  <div className="flex items-center gap-4 w-full md:w-auto justify-end shrink-0">
                                     <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">{lesson.xpReward} XP</span>
                                     <span className="text-[10px] uppercase text-slate-500 font-bold bg-slate-800 px-2 py-1 rounded">
                                        {lesson.type === 'theory' ? 'Teoría' : lesson.type === 'practice' ? 'Práctica' : lesson.type === 'document' ? 'PDF' : 'Tarea'}
                                     </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'calificaciones' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2"><BarChart3 className="w-6 h-6 text-green-400"/> Registro de Progreso</h2>
                    <p className="text-sm text-slate-400 mt-1">Supervisa la experiencia (XP) y misiones completadas.</p>
                  </div>
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Buscar estudiante..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64 bg-slate-950 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950/80 border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                        <th className="p-4 font-bold">Estudiante</th>
                        <th className="p-4 font-bold text-center">Nivel</th>
                        <th className="p-4 font-bold text-center">Experiencia</th>
                        <th className="p-4 font-bold text-center">Progreso de Misiones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {studentsData
                        .filter(s => (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((student) => {
                          const lvl = Math.floor((student.totalScore || 0) / 100) + 1;
                          const completedCount = student.completedMissions?.length || 0;
                          const progress = totalLessonsInSilabo > 0 ? (completedCount / totalLessonsInSilabo) * 100 : 0;

                        return (
                          <tr key={student.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30">
                                  {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-slate-200">{student.name || 'Sin Nombre'}</p>
                                  <p className="text-xs text-slate-500">{student.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold border border-slate-600">
                                {lvl}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <span className="font-mono text-yellow-400 font-bold">{student.totalScore || 0} XP</span>
                            </td>
                            <td className="p-4">
                               <div className="flex items-center gap-2 justify-center">
                                 <div className="w-full max-w-[100px] bg-slate-950 rounded-full h-1.5">
                                   <div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${progress}%`}}></div>
                                 </div>
                                 <span className="text-xs text-slate-400 w-8">{Math.round(progress)}%</span>
                               </div>
                            </td>
                          </tr>
                        );
                      })}
                      {studentsData.length === 0 && (
                        <tr><td colSpan="4" className="p-8 text-center text-slate-500">No hay estudiantes registrados.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUBCOMPONENTE: EDITOR DE UNIDAD
// ----------------------------------------------------------------------
function EditUnitForm({ unit, onSave, onCancel }) {
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(unit)));
  const [editingLessonContent, setEditingLessonContent] = useState(null); 

  const handleSessionChange = (sIndex, field, value) => {
    const newData = { ...formData };
    newData.sessions[sIndex][field] = value;
    setFormData(newData);
  };

  const handleLessonChange = (sIndex, lIndex, field, value) => {
    const newData = { ...formData };
    newData.sessions[sIndex].lessons[lIndex][field] = value;
    setFormData(newData);
  };

  const handleFileUpload = (sIndex, lIndex) => {
    const fileName = prompt("Ingresa el nombre del archivo PDF a vincular (Ej: GuiaEstudio.pdf):");
    if (fileName) {
      handleLessonChange(sIndex, lIndex, 'documentUrl', fileName);
      alert(`Archivo '${fileName}' vinculado correctamente.`);
    }
  };

  const saveLessonContent = (sIndex, lIndex, updatedLesson) => {
    const newData = { ...formData };
    newData.sessions[sIndex].lessons[lIndex] = updatedLesson;
    setFormData(newData);
    setEditingLessonContent(null);
  };

  if (editingLessonContent) {
    const { sIndex, lIndex } = editingLessonContent;
    const lesson = formData.sessions[sIndex].lessons[lIndex];
    return (
      <LessonContentEditor 
        lesson={lesson} 
        onSave={(updated) => saveLessonContent(sIndex, lIndex, updated)} 
        onCancel={() => setEditingLessonContent(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h3 className="text-lg font-black text-amber-400">Modo Edición: {unit.id}</h3>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-bold border border-white/10">Cancelar</button>
          <button onClick={() => onSave(formData)} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold flex items-center gap-2"><Save className="w-4 h-4"/> Guardar Unidad</button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Título de la Unidad</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white font-medium focus:border-amber-500 outline-none"/>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descripción General</label>
          <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white text-sm focus:border-amber-500 outline-none" rows={2}/>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h4 className="font-bold text-white mb-4">Administrar Sesiones y Misiones</h4>
          {formData.sessions?.map((session, sIndex) => (
            <div key={sIndex} className="bg-slate-950/80 border border-white/5 rounded-xl p-4 mb-4">
              <input type="text" value={session.name} onChange={(e) => handleSessionChange(sIndex, 'name', e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-amber-400 font-bold mb-4 outline-none"/>
              
              <div className="space-y-4 pl-2 sm:pl-4 border-l-2 border-slate-800">
                {session.lessons?.map((lesson, lIndex) => (
                  <div key={lIndex} className="flex flex-col gap-3 bg-slate-900 p-4 rounded-lg border border-white/5">
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                       <input type="text" value={lesson.title} onChange={(e) => handleLessonChange(sIndex, lIndex, 'title', e.target.value)} className="flex-1 bg-slate-800 border border-transparent rounded p-2 text-sm text-white focus:border-blue-500 outline-none font-medium"/>
                       <div className="flex items-center gap-2 bg-slate-800 p-1 rounded pr-2 shrink-0">
                          <span className="text-xs text-slate-400 pl-2">Tipo:</span>
                          <select value={lesson.type} onChange={(e) => handleLessonChange(sIndex, lIndex, 'type', e.target.value)} className="bg-slate-900 text-xs text-slate-300 p-1 rounded outline-none border border-white/5">
                            <option value="theory">Teoría</option>
                            <option value="practice">Práctica</option>
                            <option value="document">PDF</option>
                            <option value="task">Tarea</option>
                          </select>
                       </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-3 mt-1">
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                          XP: 
                          <input type="number" value={lesson.xpReward} onChange={(e) => handleLessonChange(sIndex, lIndex, 'xpReward', parseInt(e.target.value))} className="w-20 bg-slate-950 border border-white/10 rounded p-1.5 text-yellow-400 outline-none text-center"/>
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        {lesson.type === 'document' ? (
                          <button onClick={() => handleFileUpload(sIndex, lIndex)} className="flex items-center gap-2 text-xs bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 px-3 py-1.5 rounded-lg font-bold transition-colors border border-blue-500/30">
                            <Upload className="w-3 h-3" /> {lesson.documentUrl ? 'Cambiar PDF' : 'Subir PDF'}
                          </button>
                        ) : (lesson.type === 'theory' || lesson.type === 'practice') ? (
                          <button onClick={() => setEditingLessonContent({sIndex, lIndex})} className="flex items-center gap-2 text-xs bg-amber-600/20 text-amber-400 hover:bg-amber-600/40 px-3 py-1.5 rounded-lg font-bold transition-colors border border-amber-500/30">
                            <Edit3 className="w-3 h-3" /> Editar Contenido y Quiz
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUBCOMPONENTE: EDITOR DE CONTENIDO DE LECCIÓN
// ----------------------------------------------------------------------
function LessonContentEditor({ lesson, onSave, onCancel }) {
  const [localLesson, setLocalLesson] = useState(() => {
    const copy = JSON.parse(JSON.stringify(lesson));
    if (!copy.content) copy.content = [];
    if (!copy.quiz) copy.quiz = [];
    return copy;
  });

  const addContentBlock = (type) => {
    const newBlock = { type, value: '' };
    if (type === 'list') newBlock.items = ['Nuevo elemento'];
    if (type === 'image') { newBlock.url = ''; newBlock.alt = ''; }
    setLocalLesson(prev => ({ ...prev, content: [...prev.content, newBlock] }));
  };

  const updateContentBlock = (index, field, value) => {
    setLocalLesson(prev => {
      const newContent = [...prev.content];
      newContent[index][field] = value;
      return { ...prev, content: newContent };
    });
  };

  const removeContentBlock = (index) => {
    setLocalLesson(prev => ({ ...prev, content: prev.content.filter((_, i) => i !== index) }));
  };

  const addQuizQuestion = () => {
    const newQuiz = {
      question: 'Nueva pregunta',
      options: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'],
      correctAnswer: 0
    };
    setLocalLesson(prev => ({ ...prev, quiz: [...prev.quiz, newQuiz] }));
  };

  const updateQuizQuestion = (qIndex, field, value) => {
    setLocalLesson(prev => {
      const newQuiz = [...prev.quiz];
      newQuiz[qIndex][field] = value;
      return { ...prev, quiz: newQuiz };
    });
  };

  const updateQuizOption = (qIndex, optIndex, value) => {
    setLocalLesson(prev => {
      const newQuiz = [...prev.quiz];
      newQuiz[qIndex].options[optIndex] = value;
      return { ...prev, quiz: newQuiz };
    });
  };

  const removeQuizQuestion = (qIndex) => {
    setLocalLesson(prev => ({ ...prev, quiz: prev.quiz.filter((_, i) => i !== qIndex) }));
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4"/> Volver a la Unidad
          </button>
          <h3 className="text-xl font-black text-amber-400">Editando Contenido: <span className="text-white">{localLesson.title}</span></h3>
        </div>
        <button onClick={() => onSave(localLesson)} className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-green-600/20">
          <Save className="w-5 h-5"/> Guardar Contenido
        </button>
      </div>

      {/* SECCIÓN 1: CONTENIDO TEÓRICO */}
      <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-400"/> Material de Estudio</h4>
        
        <div className="space-y-4">
          {localLesson.content.map((block, idx) => (
            <div key={idx} className="bg-slate-900 border border-white/10 rounded-xl p-4 relative group">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => removeContentBlock(idx)} className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg"><Trash2 className="w-4 h-4"/></button>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase bg-slate-800 px-2 py-1 rounded">
                  {block.type === 'subtitle' ? 'Subtítulo' : block.type === 'text' ? 'Párrafo' : block.type === 'list' ? 'Lista' : 'Imagen'}
                </span>
              </div>

              {(block.type === 'subtitle' || block.type === 'text') && (
                <textarea 
                  value={block.value} 
                  onChange={(e) => updateContentBlock(idx, 'value', e.target.value)}
                  className={`w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-blue-500 ${block.type === 'subtitle' ? 'font-bold text-lg' : 'text-sm h-24'}`}
                  placeholder={block.type === 'subtitle' ? "Ej. Características Principales..." : "Escribe la teoría aquí..."}
                />
              )}

              {block.type === 'list' && (
                <div>
                  <p className="text-xs text-slate-400 mb-2">Escribe cada elemento en una línea separada:</p>
                  <textarea 
                    value={block.items?.join('\n')} 
                    onChange={(e) => updateContentBlock(idx, 'items', e.target.value.split('\n'))}
                    className="w-full h-32 bg-slate-950 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-blue-500 text-sm leading-relaxed"
                    placeholder="Elemento 1&#10;Elemento 2&#10;Elemento 3"
                  />
                </div>
              )}

              {block.type === 'image' && (
                <div className="space-y-3">
                  <input type="text" value={block.url} onChange={(e) => updateContentBlock(idx, 'url', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white text-sm outline-none" placeholder="Texto descriptivo o URL de la imagen..."/>
                  <input type="text" value={block.alt} onChange={(e) => updateContentBlock(idx, 'alt', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white text-sm outline-none" placeholder="Texto alternativo (Alt) para accesibilidad..."/>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => addContentBlock('subtitle')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold border border-white/5 flex items-center gap-1"><Type className="w-3 h-3"/> Añadir Subtítulo</button>
          <button onClick={() => addContentBlock('text')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold border border-white/5 flex items-center gap-1"><FileText className="w-3 h-3"/> Añadir Párrafo</button>
          <button onClick={() => addContentBlock('list')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold border border-white/5 flex items-center gap-1"><List className="w-3 h-3"/> Añadir Lista</button>
          <button onClick={() => addContentBlock('image')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold border border-white/5 flex items-center gap-1"><ImageIcon className="w-3 h-3"/> Añadir Imagen</button>
        </div>
      </div>

      {/* SECCIÓN 2: CUESTIONARIO / QUIZ */}
      <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-yellow-400"/> Reto de Conocimiento (Cuestionario)</h4>
        
        <div className="space-y-6">
          {localLesson.quiz.map((q, qIdx) => (
            <div key={qIdx} className="bg-slate-900 border border-white/10 rounded-xl p-5 relative">
              <button onClick={() => removeQuizQuestion(qIdx)} className="absolute top-4 right-4 p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg"><Trash2 className="w-4 h-4"/></button>
              
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Pregunta {qIdx + 1}</label>
              <textarea 
                value={q.question} 
                onChange={(e) => updateQuizQuestion(qIdx, 'question', e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white font-medium outline-none focus:border-amber-500 mb-4"
                rows={2}
              />

              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Opciones de Respuesta (Selecciona la correcta)</label>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name={`correct-${qIdx}`} 
                      checked={q.correctAnswer === optIdx} 
                      onChange={() => updateQuizQuestion(qIdx, 'correctAnswer', optIdx)}
                      className="w-4 h-4 accent-green-500 cursor-pointer"
                    />
                    <input 
                      type="text" 
                      value={opt} 
                      onChange={(e) => updateQuizOption(qIdx, optIdx, e.target.value)}
                      className={`flex-1 bg-slate-950 border rounded-lg p-2 text-sm text-white outline-none ${q.correctAnswer === optIdx ? 'border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.1)]' : 'border-white/10 focus:border-blue-500'}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button onClick={addQuizQuestion} className="px-4 py-2 bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 rounded-xl text-sm font-bold border border-yellow-500/30 flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4"/> Añadir Pregunta al Cuestionario
          </button>
        </div>
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// SUBCOMPONENTES UI
// ----------------------------------------------------------------------
function SidebarBtn({ icon, label, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
      <span className="w-5 h-5">{icon}</span> {label}
    </button>
  );
}

function MobileTabBtn({ label, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`flex-1 py-2 text-xs font-bold rounded-lg truncate px-1 ${isActive ? 'bg-amber-600 text-white' : 'text-slate-400'}`}>{label}</button>
  );
}