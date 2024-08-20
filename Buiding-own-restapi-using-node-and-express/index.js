const express = require('express');
const FileSystem = require('fs');

// Acquiring database --> JSON
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//our middleware with urlencoded
app.use(express.urlencoded({extended: false}));  // can handle the form data from the postman's body

// Routes
app.get("/users", (req, res) => {
    return res.json(users);
}); // Return the data in JSON format 

// REST API
app.get("/api/users", (req, res) => {
    return res.json(users);
}); // Return the data in API format

app.get("/html/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
    </ul>
    `;
    return res.send(html);
});



// Get user by dynamic parameter (id)
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).json({ error: "User not found" });
    }
});

// Create a new user
app.post("/api/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        first_name: "New",
        last_name: "User",
        email: "newuser@gmail.com"
    };
    users.push(newUser);
    return res.status(201).json(newUser);
});

// getting data from the postman --body
app.post("/api/users", (req, res) => {
    const body= req.body;
    users.push({ ...body,id :users.length + 1});
    FileSystem.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {


    // console.log("Body",body);                //undifined---> to handle this we use middleware
    return res.json({status: "success", message: "New user created", id: users.length});
});
});




// Update user by id
app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (user) {
        user.first_name = "Updated";
        user.last_name = "User";
        user.email = "pk@gmail.com";
        return res.json(user);
    } else {
        return res.status(404).json({ error: "User not found" });
    }
});

// Delete user by id
app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        return res.json(deletedUser[0]);
    } else {
        return res.status(404).json({ error: "User not found" });
    }
});

// Merging GET, PUT, DELETE, PATCH together using route chaining
app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    })
    .put((req, res) => {
        // Edit user with id
    })
    .delete((req, res) => {
        // Delete user with id
    })
    .patch((req, res) => {
        // Update user with id
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Yeah! Server is running on port ${PORT}.`);
});






