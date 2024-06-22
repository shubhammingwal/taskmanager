import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './TaskDetail.css';

// TaskDetail component displays detailed information of a specific task.
const TaskDetail = ({ tasks }) => {
  // Extracting the 'id' parameter from the URL using useParams hook
  const { id } = useParams();

  // Finding the task with the matching id from the tasks array
  const task = tasks.find(task => task.id === id);

  // If no task is found with the given id, display "Task not found"
  if (!task) {
    return <p>Task not found</p>;
  }

  // Render detailed information of the found task
  return (
    <div className='task-detail-container'>
      {/* Displaying task title */}
      <h1>{task.title}</h1>
      {/* Displaying task description */}
      <p><h3>Description: </h3>{task.description}</p>
      {/* Displaying task due date */}
      <p><h3>Due Date: </h3>{task.dueDate}</p>
      {/* Displaying task status (completed or incomplete) */}
      <p><h3>Status: </h3>{task.completed ? 'Completed' : 'Incomplete'}</p>
      {/* Link to navigate back to the tasks list */}
      <Link to="/" className="back-link">Back to Tasks</Link>
    </div>
  );
};

export default TaskDetail;
