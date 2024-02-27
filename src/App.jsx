import Header from "./components/Header";
import { useId, useState } from "react";
import AddTask from "./components/AddTask";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tasks from "./components/Tasks";
import { ThemeContext } from "./ThemeContext";
function App() {
  const id = useId();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      body: "Chapter 5 : Grokking Algorithms  ",
    },
    {
      id: 2,
      body: "Problem solving basic test: HackerRank",
    },
    {
      id: 3,
      body: "Theme Switcher : to-do app",
    },
    {
      id: 4,
      body: "Lorem ipsum dolor sit, amet consectetur.",
    },
  ]);
  const [theme, setTheme] = useState("dark");

  // Adding a New Task

  const handleAdd = (task) => {
    setTasks([...tasks, { id: id + task.substr(0, 5), body: task }]);
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
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <main className={theme == "dark" ? "app--dark" : "app-light"}>
        <Header />
        <AddTask onAdd={handleAdd} />
        <Tasks
          tasks={tasks}
          onDelete={handleDelete}
          onModify={handleModify}
          onDone={handleDone}
        />
      </main>
    </ThemeContext.Provider>
  );
}

export default App;