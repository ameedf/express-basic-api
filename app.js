const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let users = [
	{ name: "a", age: 10 },
	{ name: "b", age: 20 },
	{ name: "d", age: 30 },
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((requset, res, next) => {
	console.log(`Serving Request with URL: ${requset.url}`);
	console.log('before');
	next();
	console.log('after');
});

const PORT = 4000;
app.get('/users', (req, res) => {
	res.send(users);
});

app.post('/users', (req, res) => {
	const newUser = req.body;
	const currentUser = users.find(u => u.name === newUser.name);
	if (currentUser) {
		res.status(400).send({ message: "Error adding new user" });
	} else {
		users.push(newUser);
		res.send(users);
	}
});

app.get('/users/:name', (req, res) => {
	const userName = req.params.name;
	const user = users.find(u => u.name === userName);
	if (user) {
		res.send(user);
	} else {
		res.status(400).send({ message: "User not found" });
	}
});

app.put('/users/:name', (req, res) => {
	const userName = req.params.name;
	const userNewData = req.body;
	let user = users.find(u => u.name === userName);
	if (user) {
		user.age = userNewData.age;
		user.name = userNewData.name;
		res.send(user);
	} else {
		res.status(400).send({ message: "User not found" });
	}
});

app.delete('/users/:name', (req, res) => {
	const userToDelete = req.params.name;
	const currentUser = users.find(u => u.name === userToDelete);
	if (currentUser) {
		users = users.filter(u => u.name !== userToDelete);
		res.send(users);
	} else {
		res.status(400).send({ message: "User not found" });
	}
});

app.get('/', (req, res) => {
	res.send("<html><body><h1>Welcome !</h1></body></html>");
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
