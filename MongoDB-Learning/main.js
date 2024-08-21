// working with multiple insertion


const mongoose = require('mongoose');
const express = require('express');

// Importing the Todo model (assuming Todo.js is in the same directory)
const Todo = require('./models/Todo');

// Create an Express application
const app = express();
const port = 3000;

// Connect to MongoDB using a descriptive database name
mongoose.connect('mongodb://localhost:27017/your_todo_database_name')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define the root route (assuming you don't need a specific route for this)
// app.get('/home', async (req, res) => {
//   // ... your logic for creating sample todos here
// });

// Create multiple todos using a loop (consider using a seed script for cleaner setup)
app.get('/home', async (req, res) => {
  try {
    const todos = [];
    for (let i = 0; i < 3; i++) { // Create 3 sample todos
      todos.push({
        title: `Sample Todo ${i + 1}`,
        desc: `Description of sample todo ${i + 1}`,
        isDone: false,
        age: Math.floor(Math.random() * 100), // Adjust age range as needed
        math_func: Math.floor(Math.random() * 10)
      });
    }
    await Todo.insertMany(todos); // Efficiently insert multiple todos
    res.send('Todos successfully created!');
  } catch (err) {
    console.error('Error creating todos:', err);
    res.status(500).send('Error creating todos!');
  }
});

// Read all todos (consider filtering or pagination for large datasets)
app.get('/get-all-todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error('Error getting todos:', err);
    res.status(500).send('Error getting todos!');
  }
});

// Read a single todo by ID (assuming your Todo model has an ID field)
app.get('/get-todo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    res.json(todo);
  } catch (err) {
    console.error('Error getting todo by ID:', err);
    res.status(500).send('Error getting todo!');
  }
});

// Update a todo by ID (assuming your Todo model has an ID field)
app.put('/update-todo/:id', async (req, res) => {
  const { id } = req.params;
  const { title, desc, isDone, age, math_func } = req.body; // Destructure updated fields

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      title, desc, isDone, age, math_func
    }, { new: true }); // Return the updated document

    if (!updatedTodo) {
      return res.status(404).send('Todo not found');
    }
    res.json(updatedTodo);
  } catch (err) {
    console.error('Error updating todo by ID:', err);
    res.status(500).send('Error updating todo!');
  }
});

// Delete a todo by ID (assuming your Todo model has an ID field)
app.delete('/delete-todo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).send('Todo not found');
    }
    res.json(deletedTodo);
  } catch (err) {
    console.error('Error deleting todo by ID:', err);
    res.status(500).send('Error deleting todo!');
    }
});


app.listen(port, () => {
  console.log(`Hey, Server running on port ${port}`);
});