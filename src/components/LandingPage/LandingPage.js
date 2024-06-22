import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

// LandingPage component displays a list of tasks with options to delete, mark as complete, edit, and add new tasks.
const LandingPage = ({ tasks, deleteTask, toggleTaskCompletion }) => {
  return (
    <div className="container detail">
      <h1 title="Tasks">Tasks</h1>
      <ul>
        {/* Mapping through each task to display in the list */}
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {/* Checkbox to mark task as completed */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <div className="task-info">
              {/* Link to task details page */}
              <Link to={`/task/${task.id}`} className="task-title" title={task.title}>
                {task.title}
              </Link>
              {/* Displaying task creation date */}
              <p className="task-createdAt">{task.createdAt}</p>
            </div>
            {/* Button to delete the task */}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            {/* Link to edit task page */}
            <Link to={`/edit/${task.id}`} className="edit-link">Edit</Link>
          </li>
        ))}
      </ul>
      {/* Button to navigate to add new task page */}
      <Link to="/add">
        <button className="btn-custom">Add New Task</button>
      </Link>
    </div>
  );
};

export default LandingPage;
