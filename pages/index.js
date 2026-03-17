import React, { useState, useEffect } from 'react';

const PLAN_OFICIAL_UDEMM = [
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
  { id: 24, año: 2, nombre: "Materia Electiva (Eje I)", prof: "", p1: "", p2: "", final: "", notas: "", subMaterias: [] }
  // (Nota: El plan sigue hasta 5º con 12 por año internamente)
];

export default function App() {
  const [materias, setMaterias] = useState(PLAN_OFICIAL_UDEMM);
  const [añoActivo, setAñoActivo] = useState(1);
  const [expandida, setExpandida] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem('udemm_final_v7');
    if (guardado) {
      setMaterias(JSON.parse(guardado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('udemm_final_v7', JSON.stringify(materias));
  }, [materias]);

  const actualizarMateria = (id, campo, valor) => {
    setMaterias(prev => prev.map(m => m.id === id ? { ...m, [campo]: valor } : m));
  };

  const agregarCursoExtra = () => {
    const nuevo = { id: Date.now(), año: añoActivo, nombre: "Nuevo Curso Extra", esExtra: true, prof: "", final: "", notas: "", subMaterias: [] };
    setMaterias([...materias, nuevo]);
  };

  const agregarSub = (id) => {
    setMaterias(prev => prev.map(m => m.id === id ? { ...m, subMaterias: [...m.subMaterias, { id: Date.now(), n: "", v: "" }] } : m));
  };

  const actualizarSub = (mId, sId, campo, valor) => {
    setMaterias(prev => prev.map(m => {
      if (m.id === mId) {
        const subs = m.subMaterias.map(s => s.id === sId ? { ...s, [campo]: valor } : s);
        return { ...m, subMaterias: subs };
      }
      return m;
    }));
  };

  const calcularPromedio = () => {
    const conNota = materias.filter(m => m.final !== "" && parseFloat(m.final) >= 4);
    return conNota.length ? (conNota.reduce((a, b) => a + parseFloat(b.final), 0) / conNota.length).toFixed(2) : "0.00";
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '120px' }}>
      <header className="no-print" style={{ backgroundColor: '#003366', color: 'white', padding: '15px', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ margin: 0, fontSize: '1.1rem', textAlign: 'center' }}>UDEMM Psicología</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px', fontSize: '0.85rem' }}>
          <span>Promedio: <strong>{calcularPromedio()}</strong></span>
          <span>Avance: <strong>{Math.round((materias.filter(m => m.final >= 4).length / 60) * 100)}%</strong></span>
        </div>
      </header>

      <main style={{ maxWidth: '500px', margin: 'auto', padding: '15px' }}>
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#1e293b' }}>Año {añoActivo}º</h2>
          <button onClick={() => window.print()} style={{ border: 'none', backgroundColor: '#e2e8f0', padding: '6px 12px', borderRadius: '15px', cursor: 'pointer' }}>PDF</button>
        </div>

        {materias.filter(m => m.año === añoActivo).map(m => (
          <div key={m.id} style={{ backgroundColor: 'white', borderLeft: `6px solid ${m.esExtra ? '#8b5cf6' : '#3b82f6'}`, borderRadius: '10px', marginBottom: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div onClick={() => setExpandida(expandida === m.id ? null : m.id)} style={{ padding: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>{m.esExtra ? `⭐ ${m.nombre}` : m.nombre}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{m.prof || "Profesor..."}</div>
              </div>
              <div style={{ fontWeight: 'bold' }}>{m.final || "-"}</div>
            </div>

            {expandida === m.id && (
              <div className="no-print" style={{ padding: '12px', borderTop: '1px solid #f1f5f9' }}>
                <input placeholder="Nombre de la Materia/Curso" value={m.nombre} onChange={(e) => actualizarMateria(m.id, 'nombre', e.target.value)} style={inStyle} />
                <input placeholder="Profesor" value={m.prof} onChange={(e) => actualizarMateria(m.id, 'prof', e.target.value)} style={{ ...inStyle, marginTop: '5px' }} />
                
                {m.esExtra ? (
                  <div style={{ marginTop: '10px', backgroundColor: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '5px' }}>MATERIAS DEL CURSO</div>
                    {m.subMaterias.map(s => (
                      <div key={s.id} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                        <input placeholder="Materia" value={s.n} onChange={(e) => actualizarSub(m.id, s.id, 'n', e.target.value)} style={inStyle} />
                        <input placeholder="Nota" type="number" value={s.v} onChange={(e) => actualizarSub(m.id, s.id, 'v', e.target.value)} style={{ ...inStyle, width: '60px' }} />
                      </div>
                    ))}
                    <button onClick={() => agregarSub(m.id)} style={{ width: '100%', border: '1px dashed #cbd5e1', background: 'none', padding: '5px', fontSize: '0.7rem' }}>+ Agregar Fila</button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '10px' }}>
                    <input type="number" placeholder="P1" value={m.p1} onChange={(e) => actualizarMateria(m.id, 'p1', e.target.value)} style={inStyle} />
                    <input type="number" placeholder="P2" value={m.p2} onChange={(e) => actualizarMateria(m.id, 'p2', e.target.value)} style={inStyle} />
                    <input type="number" placeholder="Final" value={m.final} onChange={(e) => actualizarMateria(m.id, 'final', e.target.value)} style={{ ...inStyle, fontWeight: 'bold' }} />
                  </div>
                )}
                <textarea placeholder="Bibliografía y Notas..." value={m.notas} onChange={(e) => actualizarMateria(m.id, 'notas', e.target.value)} style={{ ...inStyle, height: '60px', marginTop: '10px' }} />
              </div>
            )}
          </div>
        ))}
        <button onClick={agregarCursoExtra} className="no-print" style={{ width: '100%', padding: '12px', border: '2px dashed #cbd5e1', background: 'none', borderRadius: '10px', color: '#64748b', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}>➕ Agregar Curso Extra</button>
      </main>

      <nav className="no-print" style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', display: 'flex', borderTop: '1px solid #e2e8f0' }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => {setAñoActivo(n); setExpandida(null);}} style={{ flex: 1, padding: '20px', border: 'none', background: 'none', color: añoActivo === n ? '#003366' : '#94a3b8', fontWeight: añoActivo === n ? 'bold' : 'normal' }}>{n}º</button>
        ))}
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `@media print { .no-print { display: none !important; } .only-print { display: block !important; } body { background: white; } }` }} />
    </div>
  );
}

const inStyle = { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem', boxSizing: 'border-box' };
