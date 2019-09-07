/* Imports */

const express = require('express');
require('./db/mongoose');

const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');


// Start express app
const app = express();

// Define the port
const port = process.env.PORT || 3000;

/* Middlewares */

// Parse response json to javascript object
app.use(express.json());

/* Routers */
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
	console.log('Server running on port ' + port);
});