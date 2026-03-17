import { useState, useEffect } from "react";

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [taskText, setTaskText] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("facultad-data");
    if (saved) setSubjects(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("facultad-data", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (!name) return;
    setSubjects([...subjects, { name, tasks: [] }]);
    setName("");
  };

  const addTask = (index) => {
    const text = taskText[index];
    if (!text) return;

    const updated = [...subjects];
    updated[index].tasks.push({ text, done: false });
    setSubjects(updated);

    setTaskText({ ...taskText, [index]: "" });
  };

  const toggleTask = (sIndex, tIndex) => {
    const updated = [...subjects];
    updated[sIndex].tasks[tIndex].done =
      !updated[sIndex].tasks[tIndex].done;
    setSubjects(updated);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1>🎓 Planner de Facultad</h1>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          placeholder="Nueva materia"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addSubject}>Agregar</button>
      </div>

      {subjects.map((s, i) => (
        <div key={i} style={{ marginTop: 20 }}>
          <h2>{s.name}</h2>

          <div style={{ display: "flex", gap: 10 }}>
            <input
              placeholder="Nueva tarea"
              value={taskText[i] || ""}
              onChange={(e) =>
                setTaskText({ ...taskText, [i]: e.target.value })
              }
            />
            <button onClick={() => addTask(i)}>Agregar</button>
          </div>

          <ul>
            {s.tasks.map((t, ti) => (
              <li
                key={ti}
                onClick={() => toggleTask(i, ti)}
                style={{
                  cursor: "pointer",
                  textDecoration: t.done ? "line-through" : "none"
                }}
              >
                {t.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
