import React, { useState, useEffect } from 'react';

// LISTA COMPLETA DE MATERIAS (Basada en un plan estándar de Lic. en Psicología)
const PLAN_ESTUDIOS_INICIAL = [
  { id: 1, año: 1, nombre: "Psicología General", prof: "", p1: "", p2: "", final: "" },
  { id: 2, año: 1, nombre: "Neurofisiología", prof: "", p1: "", p2: "", final: "" },
  { id: 3, año: 1, nombre: "Filosofía", prof: "", p1: "", p2: "", final: "" },
  { id: 4, año: 1, nombre: "Antropología Cultural", prof: "", p1: "", p2: "", final: "" },
  { id: 5, año: 1, nombre: "Estadística Aplicada", prof: "", p1: "", p2: "", final: "" },
  { id: 6, año: 2, nombre: "Psicología Evolutiva I", prof: "", p1: "", p2: "", final: "" },
  { id: 7, año: 2, nombre: "Psicoanálisis: Freud", prof: "", p1: "", p2: "", final: "" },
  { id: 8, año: 2, nombre: "Psicología Social", prof: "", p1: "", p2: "", final: "" },
  { id: 9, año: 2, nombre: "Metodología de la Investigación", prof: "", p1: "", p2: "", final: "" },
  { id: 10, año: 3, nombre: "Psicopatología I", prof: "", p1: "", p2: "", final: "" },
  { id: 11, año: 3, nombre: "Técnicas de Exploración Psicológica", prof: "", p1: "", p2: "", final: "" },
  { id: 12, año: 3, nombre: "Psicología Ética y Deontología", prof: "", p1: "", p2: "", final: "" },
  { id: 13, año: 4, nombre: "Psicología Clínica", prof: "", p1: "", p2: "", final: "" },
  { id: 14, año: 4, nombre: "Psicología Educacional", prof: "", p1: "", p2: "", final: "" },
  { id: 15, año: 4, nombre: "Psicología Laboral", prof: "", p1: "", p2: "", final: "" },
  { id: 16, año: 5, nombre: "Psicología Jurídica", prof: "", p1: "", p2: "", final: "" },
  { id: 17, año: 5, nombre: "Clínica de Niños y Adolescentes", prof: "", p1: "", p2: "", final: "" },
  { id: 18, año: 5, nombre: "Trabajo Integrador Final (Tesis)", prof: "", p1: "", p2: "", final: "" }
];

export default function App() {
  const [materias, setMaterias] = useState(PLAN_ESTUDIOS_INICIAL);
  const [añoActivo, setAñoActivo] = useState(1);
  const [expandida, setExpandida] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem('psico_data_v2');
    if (guardado) setMaterias(JSON.parse(guardado));
  }, []);

  useEffect(() => {
    localStorage.setItem('psico_data_v2', JSON.stringify(materias));
  }, [materias]);

  const actualizarMateria = (id, campo, valor) => {
    setMaterias(prev => prev.map(m => m.id === id ? { ...m, [campo]: valor } : m));
  };

  const calcularPromedio = () => {
    const aprobadas = materias.filter(m => m.final !== "" && parseFloat(m.final) >= 4);
    if (aprobadas.length === 0) return "0.00";
    const suma = aprobadas.reduce((acc, m) => acc + parseFloat(m.final), 0);
    return (suma / aprobadas.length).toFixed(2);
  };

  const porcentajeCarrera = () => {
    const total = materias.length;
    const aprobadas = materias.filter(m => parseFloat(m.final) >= 4).length;
    return Math.round((aprobadas / total) * 100);
  };

  const getColor = (final) => {
    if (!final) return { bg: '#fff', border: '#ccc' };
    const n = parseFloat(final);
    if (n >= 7) return { bg: '#e6ffed', border: '#28a745' };
    if (n >= 4) return { bg: '#fffbe6', border: '#ffc107' };
    return { bg: '#fff1f0', border: '#dc3545' };
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f7f9', minHeight: '100vh', paddingBottom: '100px' }}>
      <header style={{ backgroundColor: '#003366', color: 'white', padding: '20px', textAlign: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem' }}>🧠 Mi Cursada Psico</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
          <span>Promedio: <strong>{calcularPromedio()}</strong></span>
          <span>Progreso: <strong>{porcentajeCarrera()}%</strong></span>
        </div>
        <div style={{ width: '100%', height: '5px', backgroundColor: '#444', marginTop: '10px' }}>
          <div style={{ width: `${porcentajeCarrera()}%`, height: '100%', backgroundColor: '#28a745', transition: 'width 0.5s' }}></div>
        </div>
      </header>

      <main style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#003366' }}>{añoActivo}º Año</h2>
        
        {materias.filter(m => m.año === añoActivo).map(m => {
          const colores = getColor(m.final);
          return (
            <div key={m.id} style={{ backgroundColor: colores.bg, borderLeft: `6px solid ${colores.border}`, borderRadius: '8px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div onClick={() => setExpandida(expandida === m.id ? null : m.id)} style={{ padding: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{m.nombre}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{m.prof || "Profesor no asignado"}</div>
                </div>
                <div style={{ fontWeight: 'bold', color: colores.border }}>{m.final || "-"}</div>
              </div>

              {expandida === m.id && (
                <div style={{ padding: '15px', borderTop: '1px solid #eee' }}>
                  <input placeholder="Nombre del Profesor" value={m.prof} onChange={(e) => actualizarMateria(m.id, 'prof', e.target.value)} style={inputStyle} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '10px' }}>
                    <div><label style={labelStyle}>P1</label><input type="number" value={m.p1} onChange={(e) => actualizarMateria(m.id, 'p1', e.target.value)} style={inputStyle} /></div>
                    <div><label style={labelStyle}>P2</label><input type="number" value={m.p2} onChange={(e) => actualizarMateria(m.id, 'p2', e.target.value)} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Final</label><input type="number" value={m.final} onChange={(e) => actualizarMateria(m.id, 'final', e.target.value)} style={{ ...inputStyle, fontWeight: 'bold' }} /></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </main>

      <nav style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'space-around', padding: '15px', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => setAñoActivo(n)} style={{ border: 'none', background: 'none', fontWeight: añoActivo === n ? 'bold' : 'normal', color: añoActivo === n ? '#003366' : '#999', fontSize: '1.1rem' }}>{n}º</button>
        ))}
      </nav>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '5px' };
const labelStyle = { fontSize: '0.7rem', color: '#888', display: 'block' };
