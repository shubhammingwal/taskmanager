import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import TaskForm from './components/TaskForm/TaskForm';
import TaskDetail from './components/TaskDetail/TaskDetail';

// App component manages the main application structure and state.
const App = () => {
  // State to manage tasks, initialized from localStorage or empty array
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return storedTasks;
  });

  // Effect to update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task to the tasks state
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Function to update an existing task in the tasks state
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  // Function to delete a task from the tasks state
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Function to toggle the completion status of a task in the tasks state
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Render the application with routes and components
  return (
    <Router basename="/taskmanager">
      <Routes>
        {/* Route for the landing page showing all tasks */}
        <Route
          path="/"
          element={<LandingPage tasks={tasks} deleteTask={deleteTask} toggleTaskCompletion={toggleTaskCompletion} />}
        />
        {/* Route for the form to add a new task */}
        <Route path="/add" element={<TaskForm addTask={addTask} />} />
        {/* Route for the form to edit an existing task */}
        <Route path="/edit/:id" element={<TaskForm tasks={tasks} updateTask={updateTask} />} />
        {/* Route for displaying detailed information of a task */}
        <Route path="/task/:id" element={<TaskDetail tasks={tasks} />} />
      </Routes>
    </Router>
  );
};

export default App;
