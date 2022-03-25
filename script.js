import express from 'express'
const app = express()
import cors from 'cors'

import {getAllUsers, getSpecificUser, updateSpecificUser} from './DatabaseHandler/dbQuery.js'
import {isUserValid} from "./Validation/validation.js"

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
    let allEmployeesList = await getAllUsers()
    res.send(allEmployeesList)   
})

app.put("/updateUser",async function (req, res){

    let userObject = JSON.parse(req.query["userObject"])
    if(isUserValid(userObject)){
        return await updateSpecificUser(userObject) 
    }else{
        res.status(400)
        res.send("Incomplete Creds Provided")
        return
    }
})

app.post("/addFeedback")

app.get("/getAllFeedbacks", async function (req, res){
    let userId = req.query("userId")

})