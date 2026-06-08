"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "../context/TaskContext";

const Register = () => {
  const router = useRouter();
  const { registerUser } = useTasks();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    if (!password) e.password = "Password is required";
    if (password !== confirmPassword) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const userData = { username, email, password };
      await registerUser(userData);
      router.push("/dashboard");
    } catch (err) {
      setErrors((prev) => ({ ...prev, server: err.response?.data?.message || err.message || "Registration failed" }));
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>
      <form onSubmit={handleRegister}>


        <div className="space-y-4">
          <input
            placeholder="Enter your name"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}

          <input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

          <input
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}

          <input
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirm && <p className="text-sm text-red-600">{errors.confirm}</p>}

          <button
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? "Registering..." : "Register"}
          </button>
          {errors.server && <p className="text-sm text-red-600 mt-2">{errors.server}</p>}
              
        </div>
      </form>


          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </a>
          </div>
      </div>
    </div>
  );
};

export default Register;