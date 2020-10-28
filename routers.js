const express = require('express');
const routers = express.Router();
const path = require('path');
const multer = require('multer');
const imageFilter = (req, file, cb) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return cb(null, false);
	}
	cb(null, true);
};
const upload = multer({ dest: 'public', fileFilter: imageFilter });
const fs = require('fs');

routers.get('/', (req, res) => {
	res.write('Hello World!');
	res.write('John Doe');
	res.end();
});

routers.post('/contoh', (req, res) => {
	res.send('Request dengan method POST');
});

routers.put('/contoh', (req, res) => {
	res.send('Request dengan method PUT');
});

routers.delete('/contoh', (req, res) => {
	res.send('Request dengan method DELETE');
});

routers.all('/universal', (req, res) => {
	res.send('Request dengan method ' + req.method);
});

routers.get('/post/:id?', (req, res) => {
	res.send('artikel-' + req.params.id);
});

routers.get('/foods', (req, res) => {
	const page = req.query.page ? req.query.page : 1;
	res.write('Foods page: ' + page + '\n');
	if (req.query.sort) res.write('Sort by: ' + req.query.sort);
	res.end();
});

routers.get('/page-*', (req, res) => {
	res.send('Route: ' + req.path);
});

routers.post('/login', (req, res) => {
	const { username, password } = req.body;
	res.send(`Anda login dengan username ${username} dan password ${password}`);
});

routers.get('/download', (req, res) => {
	const filename = 'gambar.jpg';
	res.sendFile(path.join(__dirname + '/' + filename));
});
routers.get('/download2', (req, res) => {
	const filename = 'gambar.jpg';
	res.sendFile(path.join(__dirname + '/' + filename), {
		headers: {
			'Content-Disposition': 'attachment; filename="gantinama.jpg"'
		}
	});
});
routers.get('/download3', (req, res) => {
	const filename = 'gambar.jpg';
	res.download(path.join(__dirname, filename), 'ganticara.jpg');
});
routers.get('/image-preview', (req, res) => {
	const filename = 'gambar.jpg';
	res.sendFile(path.join(__dirname, filename), {
		headers: {
			'Content-Type': 'image/jpg'
		}
	});
});

routers.post('/upload', upload.single('file'), (req, res) => {
	const file = req.file;
	if (file) {
		const target = path.join(__dirname, 'public', file.originalname);
		fs.renameSync(file.path, target);
		res.send('File berhasil diupload');
	} else {
		res.send('File gagal diupload');
	}
});

routers.post('/register', upload.single('avatar'), (req, res) => {
	const name = req.body.name;
	const avatar = req.file;
	res.send({ name: name, avatar: avatar });
});

module.exports = routers;
