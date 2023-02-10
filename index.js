const express = require('express');
const app = express();
const cors = require('cors');
let port = 5000;
const pool = require("./db");

// Middleware 
app.use(cors());
app.use(express.json());

// Create a task
app.post('/task', async (req, res) => {
    try {
        const { description } = req.body;
        const newTask = await pool.query(
            "INSERT INTO task (description) VALUES($1) RETURNING *",
            [description]);
        res.json(newTask.rows[0]);

    } catch (error) {
        console.log(error);
    }
});

// Get all tasks
app.get('/task', async (req, res) => {
    try {
        const allTasks = await pool.query(
            "SELECT * FROM task");
        res.json(allTasks.rows);
    } catch (error) {
        console.log(error);
    }
})

// Get one task
app.get('/task/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await pool.query(
            "SELECT * FROM task WHERE todo_id = $1",
            [id]);
        res.json(task.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

// Update a task
app.put("/task/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTask = await pool.query(
            "UPDATE task SET description = $1 WHERE todo_id = $2",
            [description, id]);
        res.json("Todo was updated");
    } catch (error) {
        console.log(error);
    }
});

// Delete a task
app.delete("/task/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const deleteTask = await pool.query(
            "DELETE FROM task WHERE todo_id =$1",
            [id]);
        res.json("Todo was deleted");
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

app.get('/', (req, res) => {
    res.send('Welcome to PERN task todo');
});