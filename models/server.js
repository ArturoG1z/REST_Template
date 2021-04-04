const express = require("express");
const cors = require("cors");
const routerUsers = require("../routes/users");
const routerAuth = require("../routes/auth");
const { dbConnecion } = require("../database/config");

class Server {
	constructor() {
		this.app = express();
		this.PORT = process.env.PORT;
		this.usersPath = '/api/users';
		this.authPath = '/api/auth';
		// Conect to database
		this.conectDB();
		// Middlewares
		this.middlewares();
		// Routes
		this.routes();
	}

	async conectDB() {
		await dbConnecion();
	}

	middlewares() {
		// CORS
		this.app.use(cors());
		// Read and parse body
		this.app.use(express.json());
		// Public directory
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.authPath, routerAuth);
		this.app.use(this.usersPath, routerUsers);
	}

	listen() {
		this.app.listen(this.PORT, () => {
			console.log(`Listening at http://localhost:${this.PORT}`);
		});
	}
}

module.exports = Server;
