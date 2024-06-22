import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TaskForm.css';

const TaskForm = ({ addTask, updateTask, tasks }) => {
  const { id } = useParams(); // Extracting 'id' parameter from the URL
  const navigate = useNavigate(); // Navigate function from react-router-dom for redirection
  const formRef = useRef(null); // Ref for accessing the form DOM element
  const [task, setTask] = useState({ // State to manage the task being edited or added
    title: '',
    description: '',
    dueDate: '',
    completed: false,
    createdAt: ''
  });

  // Effect to populate the form fields when editing an existing task
  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find(task => task.id === id);
      if (taskToEdit) {
        setTask(taskToEdit);
      }
    }
  }, [id, tasks]);

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === 'checkbox' ? checked : value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if required fields are filled
    if (!task.title || !task.description || !task.dueDate) {
      alert('Please fill out all required fields.');
      return;
    }

    if (id) {
      updateTask(task); // Update existing task
    } else {
      // Add new task with a generated id and creation time
      addTask({ ...task, id: Date.now().toString(), createdAt: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }) });
    }
    navigate('/'); // Navigate back to the main tasks page after submission
  };

  // Handle navigation back to tasks list
  const handleBack = () => {
    navigate('/');
  };

  // Function to truncate text for displaying form title
  const truncateText = (text, maxLength = 20) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // Programmatically trigger form submission on button click
  const handleSubmitButtonClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  // Render the form with input fields and buttons
  return (
    <div className='container detail'>
      <h1 title="Tasks">{truncateText(id ? "Edit Task" : "Add Task")}</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Title"
            required // HTML5 required attribute for form validation
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Description"
            required // HTML5 required attribute for form validation
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required // HTML5 required attribute for form validation
          />
        </div>
        <div className="form-group">
          <label htmlFor="completed">Completed</label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
          />
        </div>
        {/* Display created time if editing an existing task */}
        {id ? (
          <div className="form-group">
            <label>Created Time:</label>
            <span>{task.createdAt}</span>
          </div>
        ) : null}
      </form>
      {/* Button to submit form */}
      <button type="submit" onClick={handleSubmitButtonClick}>Save Task</button>
      {/* Button to navigate back to tasks list */}
      <button type="button" className="back-button cst-btn" onClick={handleBack}>Back to Tasks</button>
    </div>
  );
};

export default TaskForm;
