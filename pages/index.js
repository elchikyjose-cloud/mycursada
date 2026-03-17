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
    const guardado = localStorage.getItem('udemm_final_v9');
    if (guardado) setMaterias(JSON.parse(guardado));
  }, []);

  useEffect(() => {
    localStorage.setItem('udemm_final_v9', JSON.stringify(materias));
  }, [materias]);

  const actualizarMateria = (id, campo, valor) => {
    setMaterias(prev => prev.map(m => m.id === id ? { ...m, [campo]: valor } : m));
  };

  const agregarCursoExtra = () => {
    const nuevo = { id: Date.now(), año: añoActivo, nombre: "Nuevo Curso Extra", esExtra: true, prof: "", final: "", notas: "", subMaterias: [] };
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

  // CALCULOS
  const calcularPromedioGral = () => {
    const notas = materias.filter(m => m.final !== "" && parseFloat(m.final) >= 1).map(m => parseFloat(m.final));
    return notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2) : "0.00";
  };

  const calcularPromedioAño = () => {
    const notas = materias.filter(m => m.año === añoActivo && m.final !== "" && parseFloat(m.final) >= 1).map(m => parseFloat(m.final));
    return notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2) : "0.00";
  };

  const calcularAvance = () => {
    const aprobadas = materias.filter(m => !m.esExtra && m.final !== "" && parseFloat(m.final) >= 4).length;
    return Math.round((aprobadas / 60) * 100);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', paddingBottom: '120px' }}>
      <header className="no-print" style={{ backgroundColor: '#002855', color: 'white', padding: '15px', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ margin: 0, fontSize: '1.1rem', textAlign: 'center' }}>UDEMM - Psicología</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
          <div style={{ textAlign: 'center' }}>{calcularPromedioGral()}<br/><span style={{ fontSize: '0.6rem', opacity: 0.8 }}>PROM. GRAL</span></div>
          <div style={{
