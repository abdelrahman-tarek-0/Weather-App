// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express")
// Start up an instance of app
const app = express()
/* Dependencies */
//require body-parser
const bodyParser = require("body-parser")
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 4040
// Spin up the server and Callback to debug

const server = app.listen(port,()=>{
    console.log("server is running")
    console.log(`on localhost:${port}`)
})
// Initialize all route with a callback function
app.get("/all",DataSending)
// Callback function to complete GET '/all'
function DataSending(req,res){
        res.send(projectData)
}

// Post Route
app.post("/add",postData)

function postData(req,res){
      projectData = {
        temperature: req.body.temp
        ,city: req.body.city
        ,date: req.body.date
        ,userInput: req.body.userInput
      }
      console.log(projectData)
}
