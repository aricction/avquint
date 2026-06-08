"use client";
import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://avquint-cn2m.onrender.com";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
  },
});

const TaskContext = createContext(null);

const normalizeTask = (task) => ({
  ...task,
  id: task.id ?? task._id, // converts task._id to task.id for client
  completed: task.completed ?? task.status === "completed",
});

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  const fetchTasks = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get("/api/tasks");
      setTasks(Array.isArray(data) ? data.map(normalizeTask) : []); //
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      fetchTasks();
    }
  }, [token]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.Authorization = `Bearer ${storedToken}`;
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setAuthLoaded(true);
  }, []);

  const addTask = async (title) => {
    try {
      setError(null);
      const { data } = await api.post("/api/tasks", {
        title,
        description: title,
      });
      const normalized = normalizeTask(data);
      setTasks((prev) => [...prev, normalized]);
      return normalized;
    } catch (err) {
      console.error("Failed to add task:", err);
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      setError(null);
      await api.delete(`/api/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const updateTask = async (id, title) => {
    try {
      setError(null);
      const { data } = await api.put(`/api/tasks/${id}`, {
        title,
        description: title,
      });
      const normalized = normalizeTask(data);
      setTasks((prev) =>
        prev.map((item) => (item.id === id ? normalized : item)),
      );
      return normalized;
    } catch (err) {
      console.error("Failed to update task:", err);
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const startEdit = (task) => setEditTask(task);
  const cancelEdit = () => setEditTask(null);

  const toggleTask = async (id) => {
    try {
      setError(null);
      const { data } = await api.patch(`/api/tasks/${id}/toggle`);
      const normalized = normalizeTask(data);
      setTasks((prev) =>
        prev.map((item) => (item.id === id ? normalized : item)),
      );
      return normalized;
    } catch (err) {
      console.error("Failed to toggle task:", err);
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const filterTasks = () => {
    let filtered = tasks;
    if (filter === "completed") {
      filtered = filtered.filter((t) => t.completed);
    }
    if (filter === "pending") {
      filtered = filtered.filter((t) => !t.completed);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title?.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query),
      );
    }
    return filtered;
  };

  const registerUser = async (userData) => {
    try {
      const res = await api.post(`/api/auth/register`, userData);
      const { token: authToken, user: authUser } = res.data;
      setToken(authToken);
      setUser(authUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", authToken);
        localStorage.setItem("user", JSON.stringify(authUser));
      }
      api.defaults.headers.Authorization = `Bearer ${authToken}`;
      await fetchTasks();
      return res.data;
    } catch (err) {
      console.error("Failed to Register:", err);
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const loginUser = async (userData) => {
    try {
      const res = await api.post(`/api/auth/login`, userData);
      const { token: authToken, user: authUser } = res.data;
      setToken(authToken);
      setUser(authUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", authToken);
        localStorage.setItem("user", JSON.stringify(authUser));
      }
      api.defaults.headers.Authorization = `Bearer ${authToken}`;
      await fetchTasks();
      return res.data;
    } catch (err) {
      console.error("Failed to Login:", err);
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setTasks([]);
    setError(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    delete api.defaults.headers.Authorization;
  };

  const values = {
    tasks: filterTasks(),
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    startEdit,
    editTask,
    cancelEdit,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    registerUser,
    loginUser,
    logout,
    user,
    token,
    authLoaded,
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
}

export const useTasks = () => useContext(TaskContext);
