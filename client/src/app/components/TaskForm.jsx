"use client";

import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";

const TaskForm = () => {
  const { addTask, editTask, updateTask, cancelEdit } = useTasks();

  const [input, setInput] = useState("");

  useEffect(() => {
    if (editTask) {
      setInput(editTask.title || "");
    } else {
      setInput("");
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    if (editTask) {
      await updateTask(editTask.id, input.trim());
      cancelEdit();
      setInput("");
      return;
    }

    await addTask(input.trim());
    setInput("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6 lg:mb-10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <input
            value={input}
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new task"
            className="w-full sm:flex-1 border border-gray-300  rounded-xl px-4 py-2 bg-white  text-black  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          />
          <div className="flex gap-3">
            <button
              className="
            w-full sm:w-[110px] h-[42px]
            bg-blue-600 dark:bg-gray-600 text-white rounded-md
            hover:bg-gray-500 dark:bg-gray-600 transition
            disabled:opacity-50 disabled:cursor-not-allowed
            "
            >
              {editTask ? "update" : "add"}
            </button>
            {editTask && (
              <button
                className=" w-full sm:w-[110px] h-[42px]
            bg-blue-600 dark:bg-blue-500 text-white rounded-md
            hover:bg-blue-700 dark:hover:bg-blue-600 transition
            disabled:opacity-50 disabled:cursor-not-allowed
            "
                onClick={() => {
                  cancelEdit();
                  setInput("");
                }}
              >
                cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
