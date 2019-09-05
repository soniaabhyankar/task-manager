/* Imports */

const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');


// Start express app
const app = express();

// Define the port
const port = process.env.PORT || 3000;

/* Middlewares */

// Parse response json to javascript object
app.use(express.json());

/* Routes */

// User routes

// Create users
app.post('/users', (req, res) => {
	const user = new User(req.body);

	user.save().then(() => {
		res.status(201).send(user);
	}).catch((error) => {
		res.status(400).send(error);
	});
});

// Read users
app.get('/users', (re, res) => {
	User.find().then((users) => {
		res.send(users);
	}).catch((error) => {
		res.status(500).send();
	});
});

// Read users by id
app.get('/users/:id', (req, res) => {
	const _id = req.params.id;

	User.findById(_id).then((user) => {
		if (!user) {
			return res.status(404).send();
		}

		res.send(user);

	}).catch((error) => {
		res.status(500).send();
	});
});


// Task routes

// Create task
app.post('/tasks', (req, res) => {
	const task = new Task(req.body);


	task.save().then(() => {
		res.status(201).send(task);
	}).catch((error) => {
		res.status(400).send(error);
	});
});

// Read all tasks
app.get('/tasks', (re, res) => {
	Task.find().then((tasks) => {
		res.send(tasks);
	}).catch((error) => {
		res.status(500).send();
	});
});

// Read task by id
app.get('/tasks/:id', (req, res) => {
	const _id = req.params.id;

	Task.findById(_id).then((task) => {
		if (!task) {
			return res.status(404).send();
		}

		res.send(task);

	}).catch((error) => {
		res.status(500).send();
	});
});

app.listen(port, () => {
	console.log('Server running on port ' + port);
})