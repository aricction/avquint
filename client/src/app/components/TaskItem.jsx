import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { useTasks } from "../context/TaskContext";

const TaskItem = ({ task, onDelete, onToggle, onUpdate }) => {
    const { startEdit } = useTasks();
  return (
    <li className="flex items-center gap-3 mb-2 py-3 px-4 rounded-xl border border-1 border-gray-300  bg-white  transition-colors">
      <input type="checkbox" checked={!!task.completed} onChange={()=> onToggle(task.id)}/>
      <span
        
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
