import { RiDeleteBinLine } from "react-icons/ri";
import { FaCheckSquare, FaEdit } from "react-icons/fa";
import { useContext, useState } from "react";
import { ThemeContext } from "../ThemeContext";
const Task = ({ task, onDelete, onModify, onDone, isActive, setIsActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.body);
  const [isDone, setIsDone] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleSave = () => {
    onModify({ ...task, body: editedTask });
    setIsEditing(false);
  };

  const handleActiveTask = () => {
    setIsActive(task.id);
  };

  return (
    <>
      <section
        className={
          !isDone
            ? `task  ${theme == "dark" ? "task--dark" : "task--light"}`
            : "task text-decoration-line-through"
        }
        style={{
          backgroundColor: isDone && "#7D7C7C",
          borderLeft: isActive ? "8px solid red" : "",
        }}
      >
        <div className="d-flex gap-5 doneTask h-100">
          <button className="btn" onClick={() => setIsDone(!isDone)}>
            <FaCheckSquare style={{ fontSize: 25 }} onClick={onDone} />
          </button>
          <span
            onClick={handleActiveTask}
            className="d-inline-block flex-wrap task-body"
          >
            {task.body}{" "}
          </span>
        </div>
        <div className="editAndDelBtn">
          <button
            className="btn"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            <FaEdit style={{ fontSize: 20 }} />
          </button>
          <button className="btn" onClick={onDelete}>
            <RiDeleteBinLine style={{ color: "red", fontSize: 25 }} />
          </button>
        </div>
      </section>
      {isEditing && (
        <div className="d-flex gap-3">
          <input
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            name="modify Task"
            style={{ width: 400 }}
            autoFocus
            className=" form-control task-edit-input"
          />
          <button className="btn  btn-light" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default Task;
