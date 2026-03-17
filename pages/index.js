import React, { useState, useEffect } from 'react';

export default function App() {
  const [añoActivo, setAñoActivo] = useState(1);
  const [materias, setMaterias] = useState([]);
  const [expandida, setExpandida] = useState(null);

  useEffect(() => {
    const datos = localStorage.getItem('psico_plan_v1');
    if (datos) setMaterias(JSON.parse(datos));
  }, []);

  useEffect(() => {
    localStorage.setItem('psico_plan_v1', JSON.stringify(materias));
  }, [materias]);

  const agregarMateria = () => {
    const nombre = prompt("Nombre de la materia (ej: Psicología Evolutiva):");
    if (!nombre) return;
    const prof = prompt("Nombre del profesor/titular:");
    
    const nueva = {
      id: Date.now(),
      nombre,
      profesor: prof || "A designar",
      año: añoActivo,
      p1: "", p2: "", final: "",
    };
    setMaterias([...materias, nueva]);
  };

  const actualizarMateria = (id, campo, valor) => {
    setMaterias(materias.map(m => m.id === id ? { ...m, [campo]: valor } : m));
  };

  const eliminarMateria = (id) => {
    if(confirm("¿Eliminar materia del plan?")) {
      setMaterias(materias.filter(m => m.id !== id));
    }
  };

  const obtenerColores = (final) => {
    if (!final || final === "") return { bg: '#fff', border: '#ddd', text: '#1a73e8' };
    const n = parseFloat(final);
    if (n >= 7) return { bg: '#e6ffed', border: '#52c41a', text: '#52c41a' }; // Promocionada
    if (n >= 4) return { bg: '#fffbe6', border: '#fadb14', text: '#faad14' }; // Regular
    return { bg: '#fff1f0', border: '#f5222d', text: '#f5222d' }; // Final pendiente/Recuperatorio
  };

  const calcularPromedio = () => {
    const materiasFinalizadas = materias.filter(m => m.final !== "");
    if (materiasFinalizadas.length === 0) return "0.00";
    const suma = materiasFinalizadas.reduce((acc, m) => acc + parseFloat(m.final), 0);
    return (suma / materiasFinalizadas.length).toFixed(2);
  };

  const porcentajeCarrera = () => {
    const totalEstimado = 40; // Promedio de materias en Psicología
    const aprobadas = materias.filter(m => parseFloat(m.final) >= 4).length;
    return Math.min(Math.round((aprobadas / totalEstimado) * 100), 100);
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Dashboard de Progreso */}
      <header style={{ backgroundColor: '#003366', color: 'white', padding: '25px 15px', textAlign: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem' }}>🧠 Lic. en Psicología</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px' }}>
          <div>
            <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>PROMEDIO</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{calcularPromedio()}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>CARRERA</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{porcentajeCarrera()}%</div>
          </div>
        </div>
        {/* Barra de progreso */}
        <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)', marginTop: '15px', borderRadius: '2px' }}>
          <div style={{ width: `${porcentajeCarrera()}%`, height: '100%', backgroundColor: '#4ade80', transition: 'width 1s ease-in-out' }}></div>
        </div>
      </header>

      <main style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#003366', margin: 0 }}>{añoActivo}º Año</h2>
          <button onClick={agregarMateria} style={btnAgregarStyle}>+ Nueva Materia</button>
        </div>

        {materias.filter(m => m.año === añoActivo).map(m => {
          const colores = obtenerColores(m.final);
          return (
            <div key={m.id} style={{ ...cardStyle, backgroundColor: colores.bg, borderLeft: `6px solid ${colores.border}` }}>
              <div onClick={() => setExpandida(expandida === m.id ? null : m.id)} style={cardHeaderStyle}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#333' }}>{m.nombre}</div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>{m.profesor}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {m.final && <span style={{ fontWeight: 'bold', color: colores.text }}>{m.final}</span>}
                  <span style={{ fontSize: '0.6rem', color: '#ccc' }}>{expandida === m.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expandida === m.id && (
                <div style={{ padding: '15px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    <div style={inputGroup}>
                      <label>1º Parcial</label>
                      <input type="number" value={m.p1} onChange={(e) => actualizarMateria(m.id, 'p1', e.target.value)} style={inputStyle} />
                    </div>
                    <div style={inputGroup}>
                      <label>2º Parcial</label>
                      <input type="number" value={m.p2} onChange={(e) => actualizarMateria(m.id, 'p2', e.target.value)} style={inputStyle} />
                    </div>
                    <div style={inputGroup}>
                      <label style={{ fontWeight: 'bold' }}>FINAL</label>
                      <input type="number" value={m.final} onChange={(e) => actualizarMateria(m.id, 'final', e.target.value)} style={{ ...inputStyle, fontWeight: 'bold', borderColor: colores.border }} />
                    </div>
                  </div>
                  <button onClick={() => eliminarMateria(m.id)} style={btnEliminarStyle}>Eliminar</button>
                </div>
              )}
            </div>
          );
        })}
      </main>

      <nav style={navStyle}>
        {[1, 2, 3, 4, 5, 6].map(n => (
          <button key={n} onClick={() => {setAñoActivo(n); setExpandida(null);}} style={{
            ...navBtnStyle,
            color: añoActivo === n ? '#003366' : '#94a3b8',
            fontWeight: añoActivo === n ? 'bold' : 'normal'
          }}>
            {n === 6 ? 'Tesis' : `${n}º`}
          </button>
        ))}
      </nav>
    </div>
  );
}

const cardStyle = { borderRadius: '10px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' };
const cardHeaderStyle = { padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' };
const inputGroup = { display: 'flex', flexDirection: 'column', fontSize: '0.65rem', color: '#64748b', textAlign: 'center' };
const inputStyle = { padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', marginTop: '4px', textAlign: 'center', fontSize: '1rem', width: '100%' };
const btnAgregarStyle = { backgroundColor: '#003366', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' };
const btnEliminarStyle = { width: '100%', marginTop: '12px', backgroundColor: 'transparent', color: '#cbd5e1', border: 'none', fontSize: '0.7rem', cursor: 'pointer' };
const navStyle = { position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', padding: '10px', borderTop: '1px solid #e2e8f0' };
const navBtnStyle = { border: 'none', backgroundColor: 'transparent', flex: 1, fontSize: '0.9rem', cursor: 'pointer' };
