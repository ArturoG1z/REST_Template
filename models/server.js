const express = require("express");
const cors = require('cors');
const routerUsers = require('../routes/users');

class Server {
	constructor() {
		this.app = express();
		this.PORT = process.env.PORT;
		// Middlewares
		this.middlewares();
		// Routes
		this.routes();
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
		this.app.use('/api/users', routerUsers)
	}

	listen() {
		this.app.listen(this.PORT, () => {
			console.log(`Listening at http://localhost:${this.PORT}`);
		});
	}
}

module.exports = Server;
