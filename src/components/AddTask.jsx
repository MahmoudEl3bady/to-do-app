import { useState } from "react";

const AddTask = ({onAdd}) => {
  const token = sessionStorage.getItem('token');
  const [taskBody, setTaskBody] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      const response = await fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ addTask: taskBody }),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      const data =await response.json();
      if(data.success){
         const newTask = {
           id: data.id, // Use the actual ID from the backend
           body: data.task,
           isCompleted: false,
         };
        onAdd(newTask)
        console.log(data);
        setTaskBody('');
        // alert(data.message);
      }
    }
    catch (error){
        console.error("Error Ading Task : " ,error);
    }

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
        className="btn btn-light btn-lg text-dark"
        style={{ width: 250, color: "#7f8487" }}
        type="submit"
      >
        Add Task
      </button>
      </form>
    </section>
  );
};

export default AddTask;
