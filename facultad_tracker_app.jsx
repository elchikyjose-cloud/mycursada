import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FacultadTracker() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [taskText, setTaskText] = useState({});

  // cargar datos guardados
  useEffect(() => {
    const saved = localStorage.getItem("facultad-data");
    if (saved) setSubjects(JSON.parse(saved));
  }, []);

  // guardar datos
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
    updated[sIndex].tasks[tIndex].done = !updated[sIndex].tasks[tIndex].done;
    setSubjects(updated);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Planner de Facultad</h1>

      <div className="flex gap-2">
        <Input
          placeholder="Nueva materia"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={addSubject}>Agregar</Button>
      </div>

      <div className="grid gap-4">
        {subjects.map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-3">
              <h2 className="text-xl font-semibold">{s.name}</h2>

              <div className="flex gap-2">
                <Input
                  placeholder="Nueva tarea"
                  value={taskText[i] || ""}
                  onChange={(e) =>
                    setTaskText({ ...taskText, [i]: e.target.value })
                  }
                />
                <Button onClick={() => addTask(i)}>Agregar</Button>
              </div>

              <ul className="space-y-1">
                {s.tasks.map((t, ti) => (
                  <li
                    key={ti}
                    onClick={() => toggleTask(i, ti)}
                    className={`cursor-pointer ${t.done ? "line-through opacity-60" : ""}`}
                  >
                    • {t.text}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
