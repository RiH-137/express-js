const http = require('http');
const fileSystem = require('fs');
const url = require('url');
const express = require('express');  // import express module

const app = express();  // create server; this app is basically a handler server

// Create a route


app.get('/', (req, res) => {  // create route
    res.send('Hello from express');
});
app.get('/home', (req, res) => {  // create route
    res.send('Hello from home page');
});

app.get('/about', (req, res) => {  // create route
    res.send('Hello from about page'+ 'hey' + req.query.name + 'your age is' + req.query.age);
});
// search for --> http://localhost:3000/about?name=rih&age=21

app.get('/contact', (req, res) => {  // create another route
    res.send('Hello from contact page');
});

// Optionally, you can add a default route to handle 404 errors
app.get('*', (req, res) => {
    res.status(404).send('404 Page Not Found');
});

const myServer = http.createServer(app);  // passing app in myServer



// myServer.listen(3000, () => {  // Start the server
//     console.log('Server is running on port 3000');
// });
// the above use http server to create server


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// the above use express server to create server withou using http server