import React, { createContext, useContext, useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskapp";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const res = await createTask(task);
      setTasks((prev) => [...prev, res]);
    } catch (err) {
      console.error(err);
    }
  };

  const editTask = async (task) => {
    try {
      await updateTask(task);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{ tasks, loading, fetchTasks, addTask, editTask, removeTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
