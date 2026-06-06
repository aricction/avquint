"use client";
import TaskItem from "./TaskItem";
import { useTasks} from "../context/TaskContext";


const TaskList = ()=> {
    const {tasks} = useTasks();
    return (
         <div>
            <ul>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
         </div>
    )
}
export default TaskList;