const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
// const bodyParser = require('body-parser');

app.use(cors())

// parse x-www-form-url-encode
app.use(express.urlencoded({ extended: true }));

// parse JSON
app.use(express.json());

// Middleware log
const log = (req, res, next) => {
	console.log(Date.now() + ' ' + req.ip + ' ' + req.originalUrl);
	next();
};

app.use(log);

const routers = require('./routes');
app.use(routers);

// Middleware menangani 404
const notFound = (req, res, next) => {
	res.status(404);
	res.json({
		status: 'error',
		message: 'resource tidak ditemukan'
	});
};
app.use(notFound);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
