// Imports
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
	description: {
		type: String,
		required: true,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	}
});


// taskSchema.pre('save', async function () {

// });


// Task Model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;