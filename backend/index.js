const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");  // Importing uuid
const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks = [
    {
        id: uuidv4(),
        desc: "write",
        completed: false,
    },
    {
        id: uuidv4(),
        desc: "write one",
        completed: false,
    },
    {
        id: uuidv4(),
        desc: "write two",
        completed: true,
    },
];

app.get("/", (req, res) => {
    res.send("task list");
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
    const taskId = req.params.id;  // Treat ID as a string
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        res.json(task);
    } else {
        res.status(404).send("Task not found");
    }
});

app.post("/tasks", (req, res) => {
    const newTask = {
        id: uuidv4(),  // Generate new UUID for the task
        desc: req.body.desc,
        completed: req.body.completed || false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const taskId = req.params.id;  // Treat ID as a string
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        task.desc = req.body.desc;
        task.completed = req.body.completed;
        res.json(task);
    } else {
        res.status(404).send("Task not found");
    }
});

app.delete("/tasks/:id", (req, res) => {
    const taskId = req.params.id;  // Treat ID as a string
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send("Task not found");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
