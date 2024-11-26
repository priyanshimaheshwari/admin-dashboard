const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = [];
let roles = [];

// CRUD for Users
app.get("/users", (req, res) => res.json(users));
app.post("/users", (req, res) => {
    const user = { id: Date.now(), ...req.body };
    users.push(user);
    res.status(201).json(user);
});
app.put("/users/:id", (req, res) => {
    const index = users.findIndex(user => user.id === parseInt(req.params.id));
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };
        res.json(users[index]);
    } else {
        res.status(404).send("User not found");
    }
});
app.delete("/users/:id", (req, res) => {
    users = users.filter(user => user.id !== parseInt(req.params.id));
    res.sendStatus(204);
});

// CRUD for Roles
app.get("/roles", (req, res) => res.json(roles));
app.post("/roles", (req, res) => {
    const role = { id: Date.now(), ...req.body };
    roles.push(role);
    res.status(201).json(role);
});
app.put("/roles/:id", (req, res) => {
    const index = roles.findIndex(role => role.id === parseInt(req.params.id));
    if (index !== -1) {
        roles[index] = { ...roles[index], ...req.body };
        res.json(roles[index]);
    } else {
        res.status(404).send("Role not found");
    }
});
app.delete("/roles/:id", (req, res) => {
    roles = roles.filter(role => role.id !== parseInt(req.params.id));
    res.sendStatus(204);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
