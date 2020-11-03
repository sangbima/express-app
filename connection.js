// const MongoClient = require('mongodb').MongoClient;
// const connectionString =
// 	'mongodb+srv://userexpress:VTZwsVyTVfHsR5t0@cluster0.iy3g1.mongodb.net/latihan?retryWrites=true&w=majority';

// const client = new MongoClient(connectionString, {
// 	useUnifiedTopology: true
// });
// (async () => {
// 	try {
// 		await client.connect();
// 	} catch (error) {
// 		console.error(error);
// 	}
// })();

// module.exports = client;

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userexpress:VTZwsVyTVfHsR5t0@cluster0.iy3g1.mongodb.net/latihan?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
	console.log("Server database connect!")
})