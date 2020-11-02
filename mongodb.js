const MongoClient = require('mongodb').MongoClient;
const connectionString =
	'mongodb+srv://userexpress:VTZwsVyTVfHsR5t0@cluster0.iy3g1.mongodb.net/?retryWrites=true&w=majority';

// Connect to mongodb dengan callback
// MongoClient.connect(connectionString, { useUnifiedTopology: true }, (error, client) => {
// 	if (error) return console.error(error);
// 	console.log('Server database connect!');
// });

// Connect to mongodb dengat promise
// MongoClient.connect(connectionString, { useUnifiedTopology: true })
// 	.then((client) => {
// 		console.log('server database connect!');
// 	})
//   .catch((error) => console.error(error));

// Connect to mongodb dengan async/await
(async () => {
	try {
		const client = await MongoClient.connect(connectionString, { useUnifiedTopology: true });
		console.log('server database connect!');
		const db = client.db('latihan');

		const quotes = await db
			.collection('quotes')
			.find({
				word: /Gitu/
			})
			.toArray();
		console.log(quotes);

		const quote = await db.collection('quotes').findOne();
		console.log(quote);
	} catch (error) {
		console.error(error);
	}
})();
