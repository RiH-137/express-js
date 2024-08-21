// working with single insertion

const mongoose = require('mongoose');
const express = require('express');

// Importing the Todo model
const { Todo } = require('./models/Todo.js');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Define the root route
app.get('/', async (req, res) => {
    const todo = new Todo({
        title: 'hey first todo',
        desc: "Description of this todo",
        isDone: false,
        age: 20,
        math_func: Math.floor(Math.random() * 10)
    });

    try {
        await todo.save();
        res.send('Hey, this todo is saved and running on localhost');
    } catch (err) {
        res.status(500).send('Error saving todo: ' + err.message);
    }
});

// Reading the data from the database
app.get('/find', async (req, res) => {
    try {
        const todo = await Todo.findOne({});
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        res.json({ title: todo.title, desc: todo.desc });
        console.log(todo);
    } catch (err) {
        res.status(500).send('Error finding todo: ' + err.message);
    }
});

// Deleting the data from the database
app.get('/delete', async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ title: 'hey first todo' });
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        res.json({ title: todo.title, desc: todo.desc });
        console.log(todo);
    } catch (err) {
        res.status(500).send('Error deleting todo: ' + err.message);
    }
});
