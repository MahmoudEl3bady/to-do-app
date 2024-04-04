import { useContext, useState, useEffect } from "react";
import Task from "./Task";
import { CgDetailsMore } from "react-icons/cg";
import { ThemeContext } from "../ThemeContext";

const Tasks = ({ tasks, onDelete, onModify, onDone }) => {
  const [isActive, setIsActive] = useState(null);
  const { theme } = useContext(ThemeContext);
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

      {tasks.length > 0 ? (
        tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              onDelete={() => onDelete(task.id)}
              onModify={onModify}
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
