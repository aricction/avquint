import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { useTasks } from "../context/TaskContext";

const TaskItem = ({ task, onDelete, onToggle, onUpdate }) => {
    const { startEdit } = useTasks();
  return (
    <li className="flex items-center gap-3 py-3 px-4 rounded-lg border border-gray-200  bg-white  transition-colors">
      <span
        checked={!!task.completed}
        onClick={() => onToggle(task.id)}
        className={`flex-1 cursor-pointer ${
          task.completed ? "line-through text-black-400" : "text-black-900"
        }`}
      >
        {task.title}
      </span>
     <button onClick={() => startEdit(task)}>
        <FaPen/>
     </button>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 dark:text-red-400 hover:text-red-700 px-2 py-1 rounded"
      >
        <MdDelete />
      </button>
    </li>
  );
};

export default TaskItem;
