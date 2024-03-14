import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [taskBody, setTaskBody] = useState("");
  return (
    <section className="add-task-section  d-flex flex-column gap-3 justify-content-center align-items-center p-4  mx-auto ">
      <form method="POST" action="http://127.0.0.1:5000/add_task" onSubmit={(e)=>e.preventDefault()}>
        <input
          className="add-task-input form-control"
          name="addTask"
          value={taskBody}
          type="text"
          placeholder="What are you working on?"
          onChange={(e) => setTaskBody(e.target.value)}
          autoFocus
        />
      </form>
      <button
        className="btn btn-light btn-lg text-dark"
        style={{ width: 250, color: "#7f8487" }}
        onClick={() => {
          if (!taskBody) return;
          setTaskBody("");
          onAdd(taskBody);
        }}
      >
        Add Task
      </button>
    </section>
  );
};

export default AddTask;
