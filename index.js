const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u9ujzex.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const packageCollection = client.db('fastLink').collection('packages');

        app.get('/packages', async (req, res) => {
            const query = {}
            const cursor = packageCollection.find(query);
            const packages = await cursor.toArray();
            res.send(packages);
        })

        app.get('/packages/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const package = await packageCollection.findOne(query);
            res.send(package);
        });


    }
    finally {

    }
}

run().catch(e => console.error(e));


app.get('/', (req, res) => {
    res.send('Fast Link server is running')
})

app.listen(port, () => {
    console.log(`Fast Link server is running on${port}`);
})