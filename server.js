const express = require('express')
const app = express();
var cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const password = "Bruh";

app.set("trust proxy", true);
app.use(cors({origin: "*"}));
app.use(express.json());
app.use(bodyParser.json());

app.listen(3000, function() {
    console.log("Server is running on port 3000");
    console.log("http://localhost:3000");
})

// Used to send the pdf's to the client's location
app.use('/pdfs', express.static(path.join(__dirname, 'pdfviewer')));

/*CRUD Functions have the uri and client setup here aswell */
const uri = "mongodb+srv://examiner:123321@u220543.emownxr.mongodb.net/?retryWrites=true&w=majority&appName=u220543";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


// Code to conenct to the data base
async function connectiontoDatabase() {
    await client.connect();
        console.log("Connected to database!");
    const collection = {
        philo_article: await client.db("Articles").collection("Philo_Articles")
    }  
    //console.log("database: " + JSON.stringify(db));
    //console.log("collection: " + collection);
    return collection;
}

//Retreive All from site: http:localhost:3000...
app.get('/GetAll', async function(req, res) {
    try{
        const all_objects = await getAll();
        res.status(200).json(all_objects);
    } catch(err) {
        res.status(404).json(all_objects);
    }
})

//Post an Article
app.post('/create', async function(req, res) {
    // Sending the JSON data into the database
    const data = req.body;

    //We need to clean the inputted data:
    var clean_data = {
        title: data.title,
        author: data.author,
        filePath: data.filePath,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    }
        console.log(clean_data)

    if(data.pasword === password) { 
        try {
            await insertArticle(clean_data)
        } catch(err) {console.log(err)}
        // Send a response back to the client
        res.status(200).send('Object created successfully');
    }
    else {
        //Passwords don't match
        res.status(401).send("Unauthorized")
    }
});

//FindbyName
app.get('/FindbyName/:name', async function(req, res){
    const {name} = req.params;
        console.log(JSON.stringify(name));
    try{
        const collection = await connectiontoDatabase();
        const result = await collection.philo_article.findOne({title: name})
            console.log(result);
        res.status(200).json(result);
    } catch(error){
        console.log(error);
    } 
})

//Update and Article by referencing _id:
app.put('/update', async function(req, res) {
    const data = req.body;
        //console.log("Update info:");
        //console.log(data);

    data._id = new ObjectId(data._id); // Id changed to ibject id for update function 

    const old_data = await findArticle(data._id);
        //console.log(old_data); 
    
    var clean_data = {
        _id: data._id,
        title: (data.title == null || data.title == undefined)? data.title : old_data.title,
        author: (data.author == null || data.author == undefined)? data.author : old_data.author,
        filePath: (data.filePath == null || data.filePath == undefined)? data.filePath : old_data.filePath,
        createdAt: (data.createdAt == null || data.createdAt == undefined)? data.createdAt : old_data.createdAt,
        updatedAt: data.updatedAt,
        password: data.password
    }
        //console.log("Clean Data: ");
        //console.log(clean_data);

    if(data.password == password){
        try {
            //data._id = new ObjectId(data._id);
            await updateArticle(clean_data);
            res.status(200);
        } catch(error) {
                // If an error occurs, send an error response
            const statusCode = error.statusCode || 500;
            const errorMessage = error.message || 'Internal Server Error';
            res.status(statusCode).json({
                status: statusCode,
                error: 'Bad Request',
                message: errorMessage,
                details: error.details // Assuming error.details is available for more specific errors
            });
        }

    } else { res.status(401).send("Unauthorized"); }
})


// Create An Article:
async function insertArticle(data) {
    const collection = await connectiontoDatabase();
    await (collection.philo_article).insertOne(data);
}

//Retreive An Article:
async function findArticle(id) {
    const collection = await connectiontoDatabase();
    const filter = {_id: id}
    const results = await collection.philo_article.findOne(filter, async function(err){
        if(err) throw err;
    })
    return results;
}


// Update an Article:
async function updateArticle(data) {
    const collection = await connectiontoDatabase();
    const filter = {_id: data._id};
    const new_value = {$set: data};
    await collection.philo_article.updateOne(filter, new_value, async function(err) {
        if(err) throw err;
    })

    const results = await findArticle(data._id);
        return results;
}

//Delete an Article: 
async function deleteArticle(id) {
    const collection = await connectiontoDatabase();
    const filter = {_id: id};
    await collection.philo_article.deleteOne(filter, async function(err) {
        if(err) throw err;
    })
}

//Testing if everything works:
async function run() {
    var samplearticle1 = {
        filePath: 'sample.pdf',
        title: "Sample Article 1",
        author: ["Joe Bloggs"], 
        createdAt: new Date(),  
        updatedAt: 0,
    }

    await insertArticle(samplearticle1);
    const tester1 = await findArticle(samplearticle1._id);
        console.log(tester1);

    samplearticle1.updatedAt = new Date();
    const tester2 = await updateArticle(samplearticle1);
        console.log(tester2);

    //await deleteArticle(samplearticle1);
}

//run()

async function getAll(){
    const collection = await connectiontoDatabase();
    try {
        const cursor = await collection.philo_article.find({});
        let allObjects = [];
        while(await cursor.hasNext()) {
            const doc = await cursor.next();
            allObjects.push(doc);
        }
            //console.log(allObjects);
        return allObjects;
    } catch (error) {
        console.error(`Failed to retrieve all objects from .philo_article:`, error);
        throw error;
    }
}
//getAll()