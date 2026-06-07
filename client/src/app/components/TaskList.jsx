"use client";
import TaskItem from "./TaskItem";
import { useTasks} from "../context/TaskContext";


const TaskList = ()=> {
    const {tasks , deleteTask , toggleTask} = useTasks();
    return (
         <div>
            <ul>
                {tasks.map((task) => (
                    <TaskItem key={task.id} 
                    task={task}
                    onDelete={deleteTask}
                    onToggle={toggleTask} />
                ))}
            </ul>
         </div>
    )
}
export default TaskList;