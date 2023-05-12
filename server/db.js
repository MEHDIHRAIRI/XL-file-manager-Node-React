const mongoose = require("mongoose");
require('dotenv').config({ path: 'ENV_FILENAME' });

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect('mongodb://0.0.0.0:27017/myapp', connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};
