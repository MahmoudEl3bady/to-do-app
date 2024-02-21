import Header from "./components/Header";
import { useState } from "react";
import AddTask from "./components/AddTask";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";

function App() {
  const [id, setId] = useState(10);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      body: "Go to Gym",
    },
    {
      id: 2,
      body: "Problem solving basic test: HackerRank",
    },
    {
      id: 3,
      body: "Tasks and add tasks comp: React to-do app",
    },
    {
      id: 4,
      body: "Learning Python",
    },
  ]);

  // Adding a New Task

  const handleAdd = (task) => {
    setTasks([...tasks, { id: id, body: task }]);
    setId(id + 1);
  };

  // Delete Task Logic
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

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

  // Make the finished Task at the bottom of the TaskList 

  const handleDone = (task) => {
    const filtered = tasks.filter((t) => t.id !== task.id);
    setTasks([...filtered, task]);
  };

  return (
    <>
      <Header />
      <AddTask onAdd={handleAdd} />
      <Tasks
        tasks={tasks}
        onDelete={handleDelete}
        onModify={handleModify}
        onDone={handleDone}
      />
      {/* <Footer />  */}
    </>
  );
}

export default App;
