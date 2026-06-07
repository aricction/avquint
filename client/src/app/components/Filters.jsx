"use client";

import React from "react";
import { useTasks } from "../context/TaskContext";

const Filters = () => {
  const { filter, setFilter } = useTasks();
  return (
    <div className="mb-4">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray-300  rounded px-3 py-2 bg-white dark:bg-gray-600 text-black dark:text-white   transition-colors"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default Filters;
