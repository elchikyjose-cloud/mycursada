import React, { useState, useEffect } from 'react';

const PLAN_COMPLETO_UDEMM = [
  // 1º AÑO
  { id: 1, año: 1, nombre: "Psicología General I", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 2, año: 1, nombre: "Bases Biológicas y Neurológicas", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 3, año: 1, nombre: "Historia de la Psicología", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 4, año: 1, nombre: "Epistemología y Lógica", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 5, año: 1, nombre: "Filosofía", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 6, año: 1, nombre: "Fundamentos de Sociología", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 7, año: 1, nombre: "Psicología General II", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 8, año: 1, nombre: "Neuropsicología", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 9, año: 1, nombre: "Teorías Psicológicas Contemporáneas", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 10, año: 1, nombre: "Metodología de las Ciencias", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 11, año: 1, nombre: "Antropología", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 12, año: 1, nombre: "Psicología de la Personalidad", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  // 2º AÑO
  { id: 13, año: 2, nombre: "Psicoanálisis I", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 14, año: 2, nombre: "Psicología del Desarrollo I", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 15, año: 2, nombre: "Cultura y Subjetividad", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 16, año: 2, nombre: "Lenguaje y Comunicación", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 17, año: 2, nombre: "Psicología Social", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 18, año: 2, nombre: "Psicopatología I", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 19, año: 2, nombre: "Psicología del Desarrollo II", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 20, año: 2, nombre: "Dinámica de Grupos", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 21, año: 2, nombre: "Evaluación y Técnicas Psicológicas I", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 22, año: 2, nombre: "Psicosociología Educacional", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 23, año: 2, nombre: "Fundamentos del Psicoanálisis", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 24, año: 2, nombre: "Materia Electiva (Eje I)", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  // 3º AÑO
  { id: 25, año: 3, nombre: "Psicoanálisis II", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 26, año: 3, nombre: "Evaluación y Técnicas Psicológicas II", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 27, año: 3, nombre: "Psicopatología II", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 28, año: 3, nombre: "Técnicas de Abordaje en Crisis", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 29, año: 3, nombre: "Psicología Organizacional", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 30, año: 3, nombre: "Obs. y Práctica Prof. I", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 31, año: 3, nombre: "Evaluación y Técnicas III", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 32, año: 3, nombre: "Psicología Jurídica", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 33, año: 3, nombre: "Ética y Deontología Profesional", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 34, año: 3, nombre: "Intervenciones en Psicoanálisis", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 35, año: 3, nombre: "Modelos en Psicopatología", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 36, año: 3, nombre: "Materia Electiva (Eje II)", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  // 4º AÑO
  { id: 37, año: 4, nombre: "Métodos Psicoterapéuticos I", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 38, año: 4, nombre: "Psicología Clínica de Niños", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 39, año: 4, nombre: "Psicología Preventiva I", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 40, año: 4, nombre: "Psicoterapia Familiar", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 41, año: 4, nombre: "Obs. y Práctica Prof. II", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 42, año: 4, nombre: "PPS I", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 43, año: 4, nombre: "Orientación Vocacional", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 44, año: 4, nombre: "Psicología Preventiva II", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 45, año: 4, nombre: "Psicología Clínica de Adultos", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 46, año: 4, nombre: "Métodos Psicoterapéuticos II", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 47, año: 4, nombre: "Obs. y Práctica Prof. III", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 48, año: 4, nombre: "Materia Electiva (Eje III)", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  // 5º AÑO
  { id: 49, año: 5, nombre: "Taller de Tesis", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 50, año: 5, nombre: "Trabajo Integrador Final (TIF)", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 51, año: 5, nombre: "PPS II", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 52, año: 5, nombre: "Obs. y Práctica Prof. IV", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 53, año: 5, nombre: "Psicofarmacología", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 54, año: 5, nombre: "Neuropsicología Clínica", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 55, año: 5, nombre: "Clínica Psicopatológica", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 56, año: 5, nombre: "Intervenciones Comunitarias", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 57, año: 5, nombre: "Seminario de Integración I", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 58, año: 5, nombre: "Seminario de Integración II", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 59, año: 5, nombre: "Materia Electiva (Eje IV)", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] },
  { id: 60, año: 5, nombre: "Materia Electiva (Eje V)", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] }
];

export default function App() {
  const [materias, setMaterias] = useState(PLAN_COMPLETO_UDEMM);
  const [añoActivo, setAñoActivo] = useState(1);
  const [expandida, setExpandida] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem('udemm_final_v10');
    if (guardado) setMaterias(JSON.parse(guardado));
  }, []);

  useEffect(() => {
    localStorage.setItem('udemm_final_v10', JSON.stringify(materias));
  }, [materias]);

  const actualizarMateria = (id, campo, valor) => {
    setMaterias(prev => prev.map(m => m.id === id ? { ...m, [campo]: valor } : m));
  };

  const agregarCursoExtra = () => {
    const nuevo = { id: Date.now(), año: añoActivo, nombre: "Curso Extra", esExtra: true, prof: "", final: "", notas: "", subMaterias: [] };
    setMaterias([...materias, nuevo]);
  };

  const agregarFila = (mId) => {
    setMaterias(prev => prev.map(m => m.id === mId ? { ...m, subMaterias: [...m.subMaterias, { id: Date.now(), n: "", v: "" }] } : m));
  };

  const actualizarFila = (mId, fId, campo, valor) => {
    setMaterias(prev => prev.map(m => {
      if (m.id === mId) {
        const filas = m.subMaterias.map(f => f.id === fId ? { ...f, [campo]: valor } : f);
        return { ...m, subMaterias: filas };
      }
      return m;
    }));
  };

  // LÓGICA DE CÁLCULOS
  const calcularPromedioGral = () => {
    const notas = materias.filter(m => m.final !== "" && parseFloat(m.final) > 0).map(m => parseFloat(m.final));
    return notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2) : "0.00";
  };

  const calcularPromedioAño = () => {
    const notas = materias.filter(m => m.año === añoActivo && m.final !== "" && parseFloat(m.final) > 0).map(m => parseFloat(m.final));
    return notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2) : "0.00";
  };

  const calcularAvance = () => {
    const aprobadas = materias.filter(m => !m.esExtra && parseFloat(m.final) >= 4).length;
    return Math.round((aprobadas / 60) * 100);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', paddingBottom: '120px' }}>
      <header className="no-print" style={{ backgroundColor: '#002855', color: 'white', padding: '15px', position: 'sticky', top: 0, zIndex: 100, textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>UDEMM</h1>
        <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>Licenciatura en Psicología</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px', fontSize: '0.9rem' }}>
          <div><div style={{ fontWeight: 'bold' }}>{calcularPromedioGral()}</div><span style={subL}>PROM. GRAL</span></div>
          <div><div style={{ fontWeight: 'bold' }}>{calcularPromedioAño()}</div><span style={subL}>PROM. AÑO {añoActivo}º</span></div>
          <div><div style={{ fontWeight: 'bold' }}>{calcularAvance()}%</div><span style={subL}>PROGRESO</span></div>
        </div>
        
        <div style={{ width: '90%', height: '6px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '12px auto 0', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${calcularAvance()}%`, height: '100%', backgroundColor: '#4caf50', transition: 'width 0.5s ease' }}></div>
        </div>
      </header>

      <main style={{ maxWidth: '500px', margin: 'auto', padding: '15px' }}>
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '1.3rem', color: '#1e293b', margin: 0 }}>Materias {añoActivo}º Año</h2>
          <button onClick={() => window.print()} style={btnPDF}>Descargar PDF</button>
        </div>

        {materias.filter(m => m.año === añoActivo).map(m => {
          const notaNum = parseFloat(m.final);
          const colorSemaforo = notaNum >= 4 ? '#4caf50' : notaNum > 0 ? '#f44336' : '#cbd5e1';
          
          return (
            <div key={m.id} style={{ backgroundColor: 'white', borderLeft: `6px solid ${colorSemaforo}`, borderRadius: '12px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div onClick={() => setExpandida(expandida === m.id ? null : m.id)} style={{ padding: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.95rem' }}>{m.esExtra ? `⭐ ${m.nombre}` : m.nombre}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.prof || "Asignar docente..."}</div>
                </div>
                <div style={{ fontWeight: '800', fontSize: '1.2rem', color: colorSemaforo !== '#cbd5e1' ? colorSemaforo : '#1e293b' }}>
                  {m.final || "-"}
                </div>
              </div>

              {expandida === m.id && (
                <div className="no-print" style={{ padding: '0 15px 15px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  <label style={tagL}>DOCENTE / INSTITUCIÓN</label>
                  <input placeholder="Nombre..." value={m.prof} onChange={(e) => actualizarMateria(m.id, 'prof', e.target.value)} style={inS} />
                  
                  {m.esExtra ? (
                    <div style={{ marginTop: '15px', backgroundColor: '#f8fafc', padding: '10px', borderRadius: '10px' }}>
                      <label style={tagL}>MÓDULOS DEL CURSO</label>
                      {m.subMaterias.map(f => (
                        <div key={f.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                          <input placeholder="Módulo" value={f.n} onChange={(e) => actualizarFila(m.id, f.id, 'n', e.target.value)} style={inS} />
                          <input placeholder="Nota" type="number" value={f.v} onChange={(e) => actualizarFila(m.id, f.id, 'v', e.target.value)} style={{ ...inS, width: '70px' }} />
                        </div>
                      ))}
                      <button onClick={() => agregarFila(m.id)} style={btnMini}>+ Añadir Módulo</button>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '15px' }}>
                      <div><label style={tagL}>PARCIAL 1</label><input type="number" value={m.p1} onChange={(e) => actualizarMateria(m.id, 'p1', e.target.value)} style={inS} /></div>
                      <div><label style={tagL}>PARCIAL 2</label><input type="number" value={m.p2} onChange={(e) => actualizarMateria(m.id, 'p2', e.target.value)} style={inS} /></div>
                      <div><label style={tagL}>NOTA FINAL</label><input type="number" value={m.final} onChange={(e) => actualizarMateria(m.id, 'final', e.target.value)} style={{ ...inS, fontWeight: 'bold', border: `1px solid ${colorSemaforo}` }} /></div>
                    </div>
                  )}
                  <div style={{ marginTop: '15px' }}>
                    <label style={tagL}>BIBLIOGRAFÍA Y NOTAS</label>
                    <textarea placeholder="Ej: Freud (1900) La interpretación de los sueños..." value={m.notas} onChange={(e) => actualizarMateria(m.id, 'notas', e.target.value)} style={{ ...inS, height: '80px' }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        <button onClick={agregarCursoExtra} className="no-print" style={btnExtra}>➕ Agregar Curso Extra (SAP, Cripto, etc.)</button>
      </main>

      <nav className="no-print" style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', display: 'flex', borderTop: '2px solid #e2e8f0', zIndex: 100 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => {setAñoActivo(n); setExpandida(null);}} style={{ flex: 1, padding: '18px', border: 'none', background: 'none', color: añoActivo === n ? '#002855' : '#94a3b8', fontWeight: añoActivo === n ? '800' : '500', fontSize: '1.1rem' }}>{n}º</button>
        ))}
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `@media print { .no-print { display: none !important; } body { background: white; padding: 0; } }` }} />
    </div>
  );
}

const inS = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', boxSizing: 'border-box' };
const subL = { fontSize: '0.65rem', opacity: 0.8, display: 'block' };
const tagL = { fontSize: '0.6rem', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '4px', textTransform: 'uppercase' };
const btnPDF = { border: 'none', backgroundColor: '#e2e8f0', color: '#1e293b', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' };
const btnExtra = { width: '100%', padding: '15px', border: '2px dashed #cbd5e1', background: 'none', borderRadius: '12px', color: '#64748b', fontWeight: '700', marginTop: '15px', cursor: 'pointer' };
const btnMini = { width: '100%', border: '1px solid #cbd5e1', background: 'white', padding: '6px', fontSize: '0.75rem', borderRadius: '6px', color: '#334e68', cursor: 'pointer' };
