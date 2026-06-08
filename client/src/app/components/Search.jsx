"use client";
import { useTasks } from "../context/TaskContext";

const Search = () => {
  const { searchQuery, setSearchQuery } = useTasks();

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Search;