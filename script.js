import express from 'express'
const app = express()
import cors from 'cors'

import {getAllUsers, getSpecificUser} from './DatabaseHandler/dbQuery.js'

//cors needed to make calls
app.use(cors());

var port = process.env.PORT || 3000

app.listen(port , () => {
    console.log("Express app running at " + port);
})

app.get('/', function (req, res){
    res.send("Feedback API Running")
})

app.get("/allUsers", async function (req, res){
    let allEmployeesList = await getAllEmployees()
    res.send(allEmployeesList)   
})

app.put("/updateEmployee",async function (req, res){

    let userObject = JSON.parse(req.query["userObject"])
    console.log(userObject);
})