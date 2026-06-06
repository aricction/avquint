const TaskItem = ({ task }) => {
  return (
    <li>
      <span>{task.title}</span>
    </li>
  );
};

export default TaskItem;