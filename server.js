const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nbatra22:dinosaurbunny@cluster0.ab47sgg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connec(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
