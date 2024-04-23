import { useState } from "react";
import { addTask, handleAddTask } from "../rtk/features/tasksSlice";
import { useDispatch } from "react-redux";
const AddTask = () => {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const [taskBody, setTaskBody] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
   dispatch(handleAddTask(taskBody));
  };
  return (
    <section className="add-task-section  d-flex flex-column gap-3 justify-content-center align-items-center p-4  mx-auto ">
      <form method="POST" onSubmit={handleSubmit}>
        <input
          className="add-task-input form-control"
          name="addTask"
          value={taskBody}
          type="text"
          placeholder="What are you working on?"
          onChange={(e) => setTaskBody(e.target.value)}
          autoFocus
        />
        <button
          className="btn btn-light btn-lg text-dark mt-2 "
          style={{ width: 250, color: "#7f8487" }}
          type="submit"
          disabled={!taskBody}
        >
          Add Task
        </button>
      </form>
    </section>
  );
};

export default AddTask;
