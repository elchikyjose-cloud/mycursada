      import React, { useState, useEffect } from 'react';

const PLAN_UDEMM_FINAL = [
  // 1º AÑO
  { id: 1, año: 1, nombre: "Psicología General I", prof: "", p1: "", p2: "", final: "" },
  { id: 2, año: 1, nombre: "Bases Biológicas y Neurológicas", prof: "", p1: "", p2: "", final: "" },
  { id: 3, año: 1, nombre: "Historia de la Psicología", prof: "", p1: "", p2: "", final: "" },
  { id: 4, año: 1, nombre: "Epistemología y Lógica", prof: "", p1: "", p2: "", final: "" },
  { id: 5, año: 1, nombre: "Filosofía", prof: "", p1: "", p2: "", final: "" },
  { id: 6, año: 1, nombre: "Fundamentos de Sociología", prof: "", p1: "", p2: "", final: "" },
  { id: 7, año: 1, nombre: "Psicología General II", prof: "", p1: "", p2: "", final: "" },
  { id: 8, año: 1, nombre: "Neuropsicología", prof: "", p1: "", p2: "", final: "" },
  { id: 9, año: 1, nombre: "Teorías Psicológicas Contemporáneas", prof: "", p1: "", p2: "", final: "" },
  { id: 10, año: 1, nombre: "Metodología de las Ciencias", prof: "", p1: "", p2: "", final: "" },
  { id: 11, año: 1, nombre: "Antropología", prof: "", p1: "", p2: "", final: "" },
  { id: 12, año: 1, nombre: "Psicología de la Personalidad", prof: "", p1: "", p2: "", final: "" },
  // 2º AÑO
  { id: 13, año: 2, nombre: "Psicoanálisis I", prof: "", p1: "", p2: "", final: "" },
  { id: 14, año: 2, nombre: "Psicología del Desarrollo I", prof: "", p1: "", p2: "", final: "" },
  { id: 15, año: 2, nombre: "Cultura y Subjetividad", prof: "", p1: "", p2: "", final: "" },
  { id: 16, año: 2, nombre: "Lenguaje y Comunicación", prof: "", p1: "", p2: "", final: "" },
  { id: 17, año: 2, nombre: "Psicología Social", prof: "", p1: "", p2: "", final: "" },
  { id: 18, año: 2, nombre: "Psicopatología I", prof: "", p1: "", p2: "", final: "" },
  { id: 19, año: 2, nombre: "Psicología del Desarrollo II", prof: "", p1: "", p2: "", final: "" },
  { id: 20, año: 2, nombre: "Dinámica de Grupos", prof: "", p1: "", p2: "", final: "" },
  { id: 21, año: 2, nombre: "Evaluación y Técnicas Psicológicas I", prof: "", p1: "", p2: "", final: "" },
  { id: 22, año: 2, nombre: "Psicosociología Educacional", prof: "", p1: "", p2: "", final: "" },
  { id: 23, año: 2, nombre: "Fundamentos del Psicoanálisis", prof: "", p1: "", p2: "", final: "" },
  { id: 24, año: 2, nombre: "Materia Electiva (Eje I)", prof: "", p1: "", p2: "", final: "" },
  // 3º AÑO
  { id: 25, año: 3, nombre: "Psicoanálisis II", prof: "", p1: "", p2: "", final: "" },
  { id: 26, año: 3, nombre: "Evaluación y Técnicas Psicológicas II", prof: "", p1: "", p2: "", final: "" },
  { id: 27, año: 3, nombre: "Psicopatología II", prof: "", p1: "", p2: "", final: "" },
  { id: 28, año: 3, nombre: "Técnicas de Abordaje en Crisis", prof: "", p1: "", p2: "", final: "" },
  { id: 29, año: 3, nombre: "Psicología Organizacional", prof: "", p1: "", p2: "", final: "" },
  { id: 30, año: 3, nombre: "Obs. y Práctica Prof. I", prof: "", p1: "", p2: "", final: "" },
  { id: 31, año: 3, nombre: "Evaluación y Técnicas III", prof: "", p1: "", p2: "", final: "" },
  { id: 32, año: 3, nombre: "Psicología Jurídica", prof: "", p1: "", p2: "", final: "" },
  { id: 33, año: 3, nombre: "Ética y Deontología Profesional", prof: "", p1: "", p2: "", final: "" },
  { id: 34, año: 3, nombre: "Intervenciones en Psicoanálisis", prof: "", p1: "", p2: "", final: "" },
  { id: 35, año: 3, nombre: "Modelos en Psicopatología", prof: "", p1: "", p2: "", final: "" },
  { id: 36, año: 3, nombre: "Materia Electiva (Eje II)", prof: "", p1: "", p2: "", final: "" },
  // 4º AÑO
  { id: 37, año: 4, nombre: "Métodos Psicoterapéuticos I", prof: "", p1: "", p2: "", final: "" },
  { id: 38, año: 4, nombre: "Psicología Clínica de Niños", prof: "", p1: "", p2: "", final: "" },
  { id: 39, año: 4, nombre: "Psicología Preventiva I", prof: "", p1: "", p2: "", final: "" },
  { id: 40, año: 4, nombre: "Psicoterapia Familiar", prof: "", p1: "", p2: "", final: "" },
  { id: 41, año: 4, nombre: "Obs. y Práctica Prof. II", prof: "", p1: "", p2: "", final: "" },
  { id: 42, año: 4, nombre: "PPS I", prof: "", p1: "", p2: "", final: "" },
  { id: 43, año: 4, nombre: "Orientación Vocacional", prof: "", p1: "", p2: "", final: "" },
  { id: 44, año: 4, nombre: "Psicología Preventiva II", prof: "", p1: "", p2: "", final: "" },
  { id: 45, año: 4, nombre: "Psicología Clínica de Adultos", prof: "", p1: "", p2: "", final: "" },
  { id: 46, año: 4, nombre: "Métodos Psicoterapéuticos II", prof: "", p1: "", p2: "", final: "" },
  { id: 47, año: 4, nombre: "Obs. y Práctica Prof. III", prof: "", p1: "", p2: "", final: "" },
  { id: 48, año: 4, nombre: "Materia Electiva (Eje III)", prof: "", p1: "", p2: "", final: "" },
  // 5º AÑO
  { id: 49, año: 5, nombre: "Taller de Tesis", prof: "", p1: "", p2: "", final: "" },
  { id: 50, año: 5, nombre: "Trabajo Integrador Final (TIF)", prof: "", p1: "", p2: "", final: "" },
  { id: 51, año: 5, nombre: "PPS II", prof: "", p1: "", p2: "", final: "" },
  { id: 52, año: 5, nombre: "Obs. y Práctica Prof. IV", prof: "", p1: "", p2: "", final: "" },
  { id: 53, año: 5, nombre: "Psicofarmacología", prof: "", p1: "", p2: "", final: "" },
  { id: 54, año: 5, nombre: "Neuropsicología Clínica", prof: "", p1: "", p2: "", final: "" },
  { id: 55, año: 5, nombre: "Clínica Psicopatológica", prof: "", p1: "", p2: "", final: "" },
  { id: 56, año: 5, nombre: "Intervenciones Comunitarias", prof: "", p1: "", p2: "", final: "" },
  { id: 57, año: 5, nombre: "Seminario de Integración I", prof: "", p1: "", p2: "", final: "" },
  { id: 58, año: 5, nombre: "Seminario de Integración II", prof: "", p1: "", p2: "", final: "" },
  { id: 59, año: 5, nombre: "Materia Electiva (Eje IV)", prof: "", p1: "", p2: "", final: "" },
  { id: 60, año: 5, nombre: "Materia Electiva (Eje V)", prof: "", p1: "", p2: "", final: "" }
];

export default function App() {
  const [materias, setMaterias] = useState(PLAN_UDEMM_FINAL);
  const [añoActivo, setAñoActivo] = useState(1);
  const [expandida, setExpandida] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem('udemm_psico_vFinal');
    if (guardado) setMaterias(JSON.parse(guardado));
  }, []);

  useEffect(() => {
    localStorage.setItem('udemm_psico_vFinal', JSON.stringify(materias));
  }, [materias]);

  const actualizarMateria = (id, campo, valor) => {
    setMaterias(prev => prev.map(m => m.id === id ? { ...m, [campo]: valor } : m));
  };

  const calcularPromedio = () => {
    const aprobadas = materias.filter(m => m.final !== "" && parseFloat(m.final) >= 4);
    return aprobadas.length === 0 ? "0.00" : (aprobadas.reduce((acc, m) => acc + parseFloat(m.final), 0) / aprobadas.length).toFixed(2);
  };

  const calcularProgresoTotal = () => {
    const aprobadas = materias.filter(m => parseFloat(m.final) >= 4).length;
    return Math.round((aprobadas / materias.length) * 100);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', paddingBottom: '120px' }}>
      <header className="no-print" style={{ backgroundColor: '#002855', color: 'white', padding: '15px', position: 'sticky', top: 0, zIndex: 100, textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.1rem' }}>UDEMM - Gestión Académica</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', fontSize: '0.85rem' }}>
          <span>Promedio: <strong>{calcularPromedio()}</strong></span>
          <span>Avance: <strong>{calcularProgresoTotal()}%</strong></span>
        </div>
        <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)', marginTop: '8px' }}>
          <div style={{ width: `${calcularProgresoTotal()}%`, height: '100%', backgroundColor: '#4caf50', transition: '0.5s' }}></div>
        </div>
      </header>

      <main style={{ maxWidth: '500px', margin: 'auto', padding: '15px' }}>
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#334e68' }}>Año {añoActivo}º</h2>
          <button onClick={() => window.print()} style={{ padding: '6px 12px', borderRadius: '15px', border: 'none', backgroundColor: '#334e68', color: 'white', fontSize: '0.75rem', cursor: 'pointer' }}>Imprimir PDF</button>
        </div>

        <div className="print-section">
          <div className="only-print" style={{ display: 'none', textAlign: 'center', borderBottom: '1px solid #000', marginBottom: '20px' }}>
            <h2>Plan de Estudios - Psicología UDEMM</h2>
            <p>Año: {añoActivo}º | Promedio General: {calcularPromedio()}</p>
          </div>

          {materias.filter(m => m.año === añoActivo).map(m => (
            <div key={m.id} style={{ backgroundColor: 'white', borderLeft: `5px solid ${m.final >= 4 ? '#4caf50' : '#cbd5e0'}`, borderRadius: '8px', marginBottom: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div onClick={() => setExpandida(expandida === m.id ? null : m.id)} style={{ padding: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#102a43' }}>{m.nombre}</div>
                  <div style={{ fontSize: '0.7rem', color: '#627d98' }}>{m.prof || "Prof. a designar"}</div>
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '1rem', marginLeft: '10px' }}>{m.final || "-"}</div>
              </div>

              {expandida === m.id && (
                <div className="no-print" style={{ padding: '0 12px 12px', borderTop: '1px solid #f0f4f8' }}>
                  <input placeholder="Nombre del Profesor" value={m.prof} onChange={(e) => actualizarMateria(m.id, 'prof', e.target.value)} style={inputStyle} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '8px' }}>
                    <input type="number" placeholder="1P" value={m.p1} onChange={(e) => actualizarMateria(m.id, 'p1', e.target.value)} style={inputStyle} />
                    <input type="number" placeholder="2P" value={m.p2} onChange={(e) => actualizarMateria(m.id, 'p2', e.target.value)} style={inputStyle} />
                    <input type="number" placeholder="Final" value={m.final} onChange={(e) => actualizarMateria(m.id, 'final', e.target.value)} style={{ ...inputStyle, fontWeight: 'bold' }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <nav className="no-print" style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', display: 'flex', borderTop: '1px solid #d9e2ec' }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => {setAñoActivo(n); setExpandida(null);}} style={{ flex: 1, padding: '15px', border: 'none', background: 'none', color: añoActivo === n ? '#002855' : '#9fb3c8', fontWeight: añoActivo === n ? 'bold' : 'normal', fontSize: '1rem' }}>{n}º</button>
        ))}
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          .only-print { display: block !important; }
          body { background: white !important; }
          main { max-width: 100% !important; padding: 0 !important; }
        }
      `}} />
    </div>
  );
}

const inputStyle = { width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #d9e2ec', fontSize: '0.85rem', boxSizing: 'border-box' };
