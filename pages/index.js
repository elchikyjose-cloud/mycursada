import React, { useState, useEffect } from 'react';

const PLAN_UDEMM_12 = [
  // 1º AÑO
  { id: 1, año: 1, nombre: "Psicología General I", prof: "", p1: "", p2: "", final: "" },
  { id: 2, año: 1, nombre: "Neurofisiología", prof: "", p1: "", p2: "", final: "" },
  { id: 3, año: 1, nombre: "Antropología Cultural", prof: "", p1: "", p2: "", final: "" },
  { id: 4, año: 1, nombre: "Filosofía", prof: "", p1: "", p2: "", final: "" },
  { id: 5, año: 1, nombre: "Psicología General II", prof: "", p1: "", p2: "", final: "" },
  { id: 6, año: 1, nombre: "Biología Humana", prof: "", p1: "", p2: "", final: "" },
  { id: 7, año: 1, nombre: "Lógica", prof: "", p1: "", p2: "", final: "" },
  { id: 8, año: 1, nombre: "Introducción a la Psicología", prof: "", p1: "", p2: "", final: "" },
  { id: 9, año: 1, nombre: "Sociología", prof: "", p1: "", p2: "", final: "" },
  { id: 10, año: 1, nombre: "Historia de la Psicología", prof: "", p1: "", p2: "", final: "" },
  { id: 11, año: 1, nombre: "Teoría de la Comunicación", prof: "", p1: "", p2: "", final: "" },
  { id: 12, año: 1, nombre: "Taller de Lectura y Escritura", prof: "", p1: "", p2: "", final: "" },
  // 2º AÑO
  { id: 13, año: 2, nombre: "Psicología del Desarrollo I", prof: "", p1: "", p2: "", final: "" },
  { id: 14, año: 2, nombre: "Teorías Psicoanalíticas I", prof: "", p1: "", p2: "", final: "" },
  { id: 15, año: 2, nombre: "Estadística Aplicada a la Psicología", prof: "", p1: "", p2: "", final: "" },
  { id: 16, año: 2, nombre: "Psicología Social", prof: "", p1: "", p2: "", final: "" },
  { id: 17, año: 2, nombre: "Epistemología", prof: "", p1: "", p2: "", final: "" },
  { id: 18, año: 2, nombre: "Psicología del Desarrollo II", prof: "", p1: "", p2: "", final: "" },
  { id: 19, año: 2, nombre: "Teorías Psicoanalíticas II", prof: "", p1: "", p2: "", final: "" },
  { id: 20, año: 2, nombre: "Metodología de la Investigación", prof: "", p1: "", p2: "", final: "" },
  { id: 21, año: 2, nombre: "Psicofisiología", prof: "", p1: "", p2: "", final: "" },
  { id: 22, año: 2, nombre: "Teorías y Sistemas en Psicología", prof: "", p1: "", p2: "", final: "" },
  { id: 23, año: 2, nombre: "Materia Electiva I", prof: "", p1: "", p2: "", final: "" },
  { id: 24, año: 2, nombre: "Materia Electiva II", prof: "", p1: "", p2: "", final: "" },
  // 3º AÑO
  { id: 25, año: 3, nombre: "Psicopatología I", prof: "", p1: "", p2: "", final: "" },
  { id: 26, año: 3, nombre: "Técnicas de Exploración Psicológica I", prof: "", p1: "", p2: "", final: "" },
  { id: 27, año: 3, nombre: "Psicología Cognitiva", prof: "", p1: "", p2: "", final: "" },
  { id: 28, año: 3, nombre: "Psicopatología II", prof: "", p1: "", p2: "", final: "" },
  { id: 29, año: 3, nombre: "Técnicas de Exploración Psicológica II", prof: "", p1: "", p2: "", final: "" },
  { id: 30, año: 3, nombre: "Psicología Ética y Deontología", prof: "", p1: "", p2: "", final: "" },
  { id: 31, año: 3, nombre: "Psicología de los Grupos", prof: "", p1: "", p2: "", final: "" },
  { id: 32, año: 3, nombre: "Psicología Educacional", prof: "", p1: "", p2: "", final: "" },
  { id: 33, año: 3, nombre: "Teoría y Técnica de Grupos", prof: "", p1: "", p2: "", final: "" },
  { id: 34, año: 3, nombre: "Seminario de Actualización I", prof: "", p1: "", p2: "", final: "" },
  { id: 35, año: 3, nombre: "Materia Electiva III", prof: "", p1: "", p2: "", final: "" },
  { id: 36, año: 3, nombre: "Materia Electiva IV", prof: "", p1: "", p2: "", final: "" },
  // 4º AÑO
  { id: 37, año: 4, nombre: "Psicología Clínica", prof: "", p1: "", p2: "", final: "" },
  { id: 38, año: 4, nombre: "Psicología Laboral", prof: "", p1: "", p2: "", final: "" },
  { id: 39, año: 4, nombre: "Psicodiagnóstico Clínico", prof: "", p1: "", p2: "", final: "" },
  { id: 40, año: 4, nombre: "Psicología Preventiva", prof: "", p1: "", p2: "", final: "" },
  { id: 41, año: 4, nombre: "Orientación Vocacional", prof: "", p1: "", p2: "", final: "" },
  { id: 42, año: 4, nombre: "Entrevista Psicológica", prof: "", p1: "", p2: "", final: "" },
  { id: 43, año: 4, nombre: "Psicología de la Salud", prof: "", p1: "", p2: "", final: "" },
  { id: 44, año: 4, nombre: "Modelos de Intervención", prof: "", p1: "", p2: "", final: "" },
  { id: 45, año: 4, nombre: "Seminario de Actualización II", prof: "", p1: "", p2: "", final: "" },
  { id: 46, año: 4, nombre: "Materia Electiva V", prof: "", p1: "", p2: "", final: "" },
  { id: 47, año: 4, nombre: "Materia Electiva VI", prof: "", p1: "", p2: "", final: "" },
  { id: 48, año: 4, nombre: "Materia Electiva VII", prof: "", p1: "", p2: "", final: "" },
  // 5º AÑO
  { id: 49, año: 5, nombre: "Psicología Jurídica", prof: "", p1: "", p2: "", final: "" },
  { id: 50, año: 5, nombre: "Clínica de Niños y Adolescentes", prof: "", p1: "", p2: "", final: "" },
  { id: 51, año: 5, nombre: "Psicofarmacología", prof: "", p1: "", p2: "", final: "" },
  { id: 52, año: 5, nombre: "Psicoterapia", prof: "", p1: "", p2: "", final: "" },
  { id: 53, año: 5, nombre: "Residencia Clínica / P.P.S.", prof: "", p1: "", p2: "", final: "" },
  { id: 54, año: 5, nombre: "Taller de Tesis", prof: "", p1: "", p2: "", final: "" },
  { id: 55, año: 5, nombre: "Evaluación Psicológica", prof: "", p1: "", p2: "", final: "" },
  { id: 56, año: 5, nombre: "Clínica de Adultos", prof: "", p1: "", p2: "", final: "" },
  { id: 57, año: 5, nombre: "Seminario Final", prof: "", p1: "", p2: "", final: "" },
  { id: 58, año: 5, nombre: "Materia Electiva VIII", prof: "", p1: "", p2: "", final: "" },
  { id: 59, año: 5, nombre: "Materia Electiva IX", prof: "", p1: "", p2: "", final: "" },
  { id: 60, año: 5, nombre: "Materia Electiva X", prof: "", p1: "", p2: "", final: "" }
];

export default function App() {
  const [materias, setMaterias] = useState(PLAN_UDEMM_12);
  const [añoActivo, setAñoActivo] = useState(1);
  const [expandida, setExpandida] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem('udemm_psico_v5');
    if (guardado) setMaterias(JSON.parse(guardado));
  }, []);

  useEffect(() => {
    localStorage.setItem('udemm_psico_v5', JSON.stringify(materias));
  }, [materias]);

  const actualizarMateria = (id, campo, valor) => {
    setMaterias(prev => prev.map(m => m.id === id ? { ...m, [campo]: valor } : m));
  };

  const calcularPromedio = () => {
    const aprobadas = materias.filter(m => m.final !== "" && parseFloat(m.final) >= 4);
    return aprobadas.length === 0 ? "0.00" : (aprobadas.reduce((acc, m) => acc + parseFloat(m.final), 0) / aprobadas.length).toFixed(2);
  };

  const calcularProgresoTotal = () => {
    const total = materias.length;
    const aprobadas = materias.filter(m => parseFloat(m.final) >= 4).length;
    return Math.round((aprobadas / total) * 100);
  };

  const getColor = (final) => {
    if (!final) return { border: '#cbd5e1', text: '#64748b', bg: '#fff' };
    const n = parseFloat(final);
    if (n >= 7) return { border: '#22c55e', text: '#15803d', bg: '#f0fdf4' };
    if (n >= 4) return { border: '#f59e0b', text: '#b45309', bg: '#fffbeb' };
    return { border: '#ef4444', text: '#b91c1c', bg: '#fef2f2' };
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '100px' }}>
      
      <header className="no-print" style={{ backgroundColor: '#003366', color: 'white', padding: '20px', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem', textAlign: 'center' }}>UDEMM - Psicología</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '12px', fontSize: '0.9rem' }}>
          <span>Promedio: <strong>{calcularPromedio()}</strong></span>
          <span>Carrera: <strong>{calcularProgresoTotal()}%</strong></span>
        </div>
        <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)', marginTop: '10px', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${calcularProgresoTotal()}%`, height: '100%', backgroundColor: '#22c55e', transition: 'width 0.8s' }}></div>
        </div>
      </header>

      <main style={{ maxWidth: '600px', margin: 'auto', padding: '15px' }}>
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#1e293b', fontSize: '1.3rem' }}>{añoActivo}º Año</h2>
          <button onClick={() => window.print()} style={btnPdfStyle}>📄 Imprimir PDF</button>
        </div>

        <div className="print-area">
          <div className="only-print" style={{ display: 'none', textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #003366', paddingBottom: '10px' }}>
            <h2>Reporte de Cursada - {añoActivo}º Año</h2>
            <p>Licenciatura en Psicología - UDEMM | Promedio Total: {calcularPromedio()}</p>
          </div>

          {materias.filter(m => m.año === añoActivo).map(m => {
            const colores = getColor(m.final);
            return (
              <div key={m.id} style={{ 
                backgroundColor: colores.bg, 
                borderLeft: `6px solid ${colores.border}`, 
                borderRadius: '10px', 
                marginBottom: '10px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <div onClick={() => setExpandida(expandida === m.id ? null : m.id)} style={{ padding: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{m.nombre}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{m.prof || "Profesor no cargado"}</div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: colores.text, fontSize: '1.2rem' }}>{m.final || "-"}</div>
                </div>

                {expandida === m.id && (
                  <div className="no-print" style={{ padding: '15px', borderTop: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'white' }}>
                    <label style={labelStyle}>Docente Titular</label>
                    <input value={m.prof} onChange={(e) => actualizarMateria(m.id, 'prof', e.target.value)} style={inputStyle} placeholder="Nombre del profesor" />
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '12px' }}>
                      <div><label style={labelStyle}>1º Parc.</label><input type="number" value={m.p1} onChange={(e) => actualizarMateria(m.id, 'p1', e.target.value)} style={inputStyle} /></div>
                      <div><label style={labelStyle}>2º Parc.</label><input type="number" value={m.p2} onChange={(e) => actualizarMateria(m.id, 'p2', e.target.value)} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Final</label><input type="number" value={m.final} onChange={(e) => actualizarMateria(m.id, 'final', e.target.value)} style={{ ...inputStyle, fontWeight: 'bold', borderColor: colores.border }} /></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <nav className="no-print" style={navStyle}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => {setAñoActivo(n); setExpandida(null);}} style={{
            ...navBtnStyle,
            color: añoActivo === n ? '#003366' : '#94a3b8',
            borderTop: añoActivo === n ? '4px solid #003366' : '4px solid transparent'
          }}>{n}º</button>
        ))}
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          .only-print { display: block !important; }
          body { background-color: white !important; }
          main { max-width: 100% !important; padding: 0 !important; }
          .print-area > div { box-shadow: none !important; border: 1px solid #eee !important; border-left: 6px solid #ccc !important; }
        }
      `}} />
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', boxSizing: 'border-box' };
const labelStyle = { fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold', marginBottom: '4px', display: 'block', textTransform: 'uppercase' };
const btnPdfStyle = { backgroundColor: '#003366', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' };
const navStyle = { position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #e2e8f0' };
const navBtnStyle = { border: 'none', background: 'none', flex: 1, padding: '15px 0', fontSize: '1.1rem', cursor: 'pointer', transition: '0.2s' };
