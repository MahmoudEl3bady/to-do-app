import Task from "./Task";
import { CgDetailsMore } from "react-icons/cg";
const Tasks = ({ tasks, onDelete, onModify ,onDone}) => {
  return (
    <section className="d-flex flex-column gap-3 justify-content-center align-items-center  pb-5 ">
      <div className="tasks-header d-flex justify-content-between align-items-center">
        <h2>Tasks</h2>
        <button className="btn text-light">
          <CgDetailsMore style={{ fontSize: 25 }} />
        </button>
      </div>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onDelete={() => onDelete(task.id)}
            onModify={onModify}
            onDone={()=>onDone(task)}
          />
        );
      })}
    </section>
  );
};

export default Tasks;
