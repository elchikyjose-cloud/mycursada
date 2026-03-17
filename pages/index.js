import React, { useState, useEffect } from 'react';

const PLAN_INICIAL = [
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
  // Se repite la estructura para los demás años (ids 13 a 60)...
];

export default function App() {
  const [materias, setMaterias] = useState(PLAN_INICIAL);
  const [añoActivo, setAñoActivo] = useState(1);
  const [expandida, setExpandida] = useState(null);
  const [cursoEditando, setCursoEditando] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem('mycursada_v6_data');
    if (guardado) setMaterias(JSON.parse(guardado));
  }, []);

  useEffect(() => {
    localStorage.setItem('mycursada_v6_data', JSON.stringify(materias));
  }, [materias]);

  const actualizarMateria = (id, campo, valor) => {
    setMaterias(prev => prev.map(m => m.id === id ? { ...m, [campo]: valor } : m));
  };

  const agregarCursoExtra = () => {
    const nuevoCurso = {
      id: Date.now(),
      año: añoActivo,
      nombre: "Nuevo Curso Extra",
      esExtra: true,
      prof: "",
      notas: "",
      subMaterias: []
    };
    setMaterias([...materias, nuevoCurso]);
  };

  const agregarSubMateria = (cursoId) => {
    setMaterias(prev => prev.map(m => {
      if (m.id === cursoId) {
        return { ...m, subMaterias: [...m.subMaterias, { id: Date.now(), nombre: "", nota: "" }] };
      }
      return m;
    }));
  };

  const actualizarSubMateria = (cursoId, subId, campo, valor) => {
    setMaterias(prev => prev.map(m => {
      if (m.id === cursoId) {
        const subs = m.subMaterias.map(s => s.id === subId ? { ...s, [campo]: valor } : s);
        return { ...m, subMaterias: subs };
      }
      return m;
    }));
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', paddingBottom: '120px' }}>
      <header className="no-print" style={{ backgroundColor: '#1e293b', color: 'white', padding: '15px', textAlign: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem' }}>MyCursada - Panel de Control</h1>
      </header>

      <main style={{ maxWidth: '600px', margin: 'auto', padding: '15px' }}>
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ color: '#334e68' }}>Año {añoActivo}º</h2>
          <button onClick={() => window.print()} style={btnStyle}>📄 PDF</button>
        </div>

        {materias.filter(m => m.año === añoActivo).map(m => (
          <div key={m.id} style={{ backgroundColor: 'white', borderRadius: '12px', marginBottom: '10px', overflow: 'hidden', borderLeft: `6px solid ${m.esExtra ? '#8b5cf6' : '#3b82f6'}`, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div onClick={() => setExpandida(expandida === m.id ? null : m.id)} style={{ padding: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{m.esExtra ? `⭐ ${m.nombre}` : m.nombre}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.prof || "Sin asignar"}</div>
              </div>
              <div style={{ fontWeight: 'bold' }}>{m.final || "-"}</div>
            </div>

            {expandida === m.id && (
              <div className="no-print" style={{ padding: '15px', borderTop: '1px solid #f1f5f9' }}>
                <input placeholder="Docente / Institución" value={m.prof} onChange={(e) => actualizarMateria(m.id, 'prof', e.target.value)} style={inputStyle} />
                
                {m.esExtra ? (
                  <div style={{ marginTop: '10px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px' }}>Módulos del Curso:</div>
                    {m.subMaterias.map(s => (
                      <div key={s.id} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                        <input placeholder="Materia/Módulo" value={s.nombre} onChange={(e) => actualizarSubMateria(m.id, s.id, 'nombre', e.target.value)} style={inputStyle} />
                        <input placeholder="Nota" type="number" value={s.nota} onChange={(e) => actualizarSubMateria(m.id, s.id, 'nota', e.target.value)} style={{ ...inputStyle, width: '70px' }} />
                      </div>
                    ))}
                    <button onClick={() => agregarSubMateria(m.id)} style={{ ...btnStyle, width: '100%', marginTop: '5px', backgroundColor: '#f8fafc', color: '#6366f1' }}>+ Agregar Módulo</button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '10px' }}>
                    <input type="number" placeholder="P1" value={m.p1} onChange={(e) => actualizarMateria(m.id, 'p1', e.target.value)} style={inputStyle} />
                    <input type="number" placeholder="P2" value={m.p2} onChange={(e) => actualizarMateria(m.id, 'p2', e.target.value)} style={inputStyle} />
                    <input type="number" placeholder="Final" value={m.final} onChange={(e) => actualizarMateria(m.id, 'final', e.target.value)} style={{ ...inputStyle, fontWeight: 'bold' }} />
                  </div>
                )}
                
                <div style={{ marginTop: '15px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8' }}>BIBLIOGRAFÍA Y NOTAS</label>
                  <textarea value={m.notas} onChange={(e) => actualizarMateria(m.id, 'notas', e.target.value)} style={{ ...inputStyle, height: '80px', marginTop: '5px' }} placeholder="Ej: Freud (1915) - Lo Inconsciente..." />
                </div>
              </div>
            )}
          </div>
        ))}

        <button onClick={agregarCursoExtra} className="no-print" style={btnExtraStyle}>➕ Agregar Curso o Taller Extra</button>
      </main>

      <nav className="no-print" style={navStyle}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => {setAñoActivo(n); setExpandida(null);}} style={{ ...navBtnStyle, color: añoActivo === n ? '#3b82f6' : '#94a3b8' }}>{n}º</button>
        ))}
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print { .no-print { display: none !important; } .only-print { display: block !important; } body { background: white; } }
      `}} />
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', boxSizing: 'border-box' };
const btnStyle = { padding: '8px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', backgroundColor: 'white', cursor: 'pointer', fontSize: '0.8rem' };
const btnExtraStyle = { width: '100%', padding: '15px', borderRadius: '12px', border: '2px dashed #cbd5e1', backgroundColor: 'transparent', color: '#64748b', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' };
const navStyle = { position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', display: 'flex', borderTop: '1px solid #e2e8f0' };
const navBtnStyle = { flex: 1, padding: '20px', border: 'none', background: 'none', fontSize: '1.1rem', cursor: 'pointer' };
