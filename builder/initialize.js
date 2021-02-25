const fs = require('fs');
const tasksDirectory = `${__dirname}/tasks/`;
const tasks = fs.readdirSync(tasksDirectory);

// tasks you add will be included automatically
tasks.forEach(task => {
	// only add .js files
	if (task.match(/\.js$/)) {
		require(`${tasksDirectory}/${task}`);
	}
});