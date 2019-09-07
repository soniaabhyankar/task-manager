const express = require('express');
const User = require('../models/user');

const router = new express.Router();


// Create users
router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	}
	catch (error) {
		res.status(400).send(error);
	}

	// user.save().then(() => {
	// 	res.status(201).send(user);
	// }).catch((error) => {
	// 	res.status(400).send(error);
	// });
});

// Read users
router.get('/users', async (req, res) => {

	try {
		const users = await User.find();
		res.send(users);
	}
	catch (error) {
		res.status(500).send();
	}
});

// Read users by id
router.get('/users/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	}
	catch (error) {
		res.status(500).send();
	}
});

// Update user
router.patch('/users/:id', async (req, res) => {

	const updates = Object.keys(req.body);

	const allowedUpdates = ['name', 'email', 'password', 'age'];

	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}

	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	}
	catch (error) {
		res.status(400).send(error);
	}
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);

		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	}
	catch (error) {
		res.status(500).send();
	}
});

module.exports = router;