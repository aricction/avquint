"use client";
import { createContext, useState, useContext } from "react";
const TaskContext = createContext({ hi: "hello" });

export function TaskProvider({children}) {
  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    setTasks((prev) => [...prev, { id: Date.now(), title, completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((item) => item.id !== id),
    );
  };

  const updateTask = (id) => {
    setTasks((prev) =>
      prev.map((tasks) => (tasks.id === id ? { ...tasks, title } : tasks)),
    );
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id == id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const values = ()=> ({
    addTask,
    updateTask,
    deleteTask,
    toggleTask
  })
  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>
}

export const useTasks = () => useContext(TaskContext);
