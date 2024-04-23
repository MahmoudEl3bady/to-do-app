import { useContext, useState, useEffect } from "react";
import Task from "./Task";
import { CgDetailsMore } from "react-icons/cg";
import { ThemeContext } from "../ThemeContext";
import { useDispatch ,useSelector} from "react-redux";
import { deleteTask, fetchUserTasks, handleDeleteTask, handleModifyTask } from "../rtk/features/tasksSlice";
const Tasks = ({ onDone }) => {
  const [isActive, setIsActive] = useState(null);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  // =============Fetch Tasks from the server======================

  useEffect(() => {
    dispatch(fetchUserTasks());
  }, []);
  const userTasks = useSelector((state) => state.tasks);
  const [tasks, setTasks] = useState(userTasks);

  // Edit Task
  const handleModify = (nextTask) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === nextTask.id) {
          return nextTask;
        } else return t;
      })
    );
  };

  return (
    <section className="d-flex flex-column gap-3 justify-content-center align-items-center  pb-5 tasks ">
      <div
        className={`${
          theme === "dark" ? "text-light" : "text-dark"
        } tasks-header d-flex justify-content-between align-items-center `}
      >
        <h2>Tasks</h2>
        <button className="btn" type="button">
          <CgDetailsMore
            className={theme === "dark" ? "text-light" : "text-dark"}
            style={{ fontSize: 28 }}
          />
        </button>
      </div>

      {userTasks.length > 0 ? (
        userTasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              onDelete={()=>dispatch(handleDeleteTask(task.id))}
              onModify={()=>handleModifyTask(id,task,editedTask)}
              onDone={() => onDone(task)}
              isActive={task.id === isActive}
              setIsActive={setIsActive}
            />
          );
        })
      ) : (
        <div>
          <img
            src="https://todosapplication.netlify.app/static/media/icon-empty.41c83759.svg"
            className="img-fluid "
            style={{ width: 400 ,opacity:0.6 }}
            alt="Empty paper means there is no tasks yet "
          />
          <h3 className={`text-center ${theme=='dark' ? "text-light":"text-dark"} `}>Task List is Empty!</h3>
        </div>
      )}
    </section>
  );
};

export default Tasks;
