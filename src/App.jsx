import Header from "./components/Header";
import { useEffect, useId, useState } from "react";
import AddTask from "./components/AddTask";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tasks from "./components/Tasks";
import { ThemeContext } from "./ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterFrom";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./AuthContext";
function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState("dark");

  // =============Fetch Tasks from the server======================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/tasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Adding a New Task

  // const handleAdd = (task) => {
  //   setTasks([...tasks, { id: id + task.substr(0, 5), body: task }]);
  // };

  const handleAddingTask =  (newTask) => {
  if (newTask && newTask.body) {
    setTasks([...tasks, newTask]);
  }
  };

  // Delete Task Logic
  const handleDelete = async (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    const response = await fetch(`http://127.0.0.1:5000/tasks/${id}`,{
      method:"DELETE",
    });
    try{
        const data =await response.json();
          if(data.success){
            console.log('Task Deleted successfully ');
          }
          
      }catch(error){
          console.log("Error while Deleting: ",error);
      }
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
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ThemeContext.Provider value={{ theme, setTheme }}>
                <main className={theme == "dark" ? "app--dark" : "app--light"}>
                  <Header />
                  <AddTask onAdd={handleAddingTask} />
                  <Tasks
                    tasks={tasks}
                    onDelete={handleDelete}
                    onModify={handleModify}
                    onDone={handleDone}
                  />
                </main>
              </ThemeContext.Provider>
            }
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
