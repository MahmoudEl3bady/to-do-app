import Header from "./components/Header";
import { useEffect, useState } from "react";
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
  const [theme, setTheme] = useState("dark");


  const handleDone = (task) => {
    const filtered = tasks.filter((t) => t.id !== task.id);
    setTasks([...filtered, task]);
  };

  useEffect(() => {
    document.body.className = theme === "dark" ? "app--dark" : "app--light";
  }, [theme]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ThemeContext.Provider value={{ theme, setTheme }}>
                <main>
                  <Header />
                  <AddTask  />
                  <Tasks />
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
