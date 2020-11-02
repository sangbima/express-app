const MongoClient = require('mongodb').MongoClient;
const connectionString =
	'mongodb+srv://userexpress:VTZwsVyTVfHsR5t0@cluster0.iy3g1.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(connectionString, {
	useUnifiedTopology: true
});
(async () => {
	try {
		await client.connect();
	} catch (error) {
		console.error(error);
	}
})();

module.exports = client;
