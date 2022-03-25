import express from 'express'
const app = express()
import cors from 'cors'

import {deleteSpecificUser, getAllUsers, getSpecificUser, updateSpecificUser} from './DatabaseHandler/dbQuery.js'
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
        await updateSpecificUser(userObject) 
        res.send("Update Successfull")
    }else{
        res.status(400)
        res.send("Incomplete Creds Provided")
        return
    }
})

app.get("/getSpecificUser", async function(req, res){
    let userId = req.query["userId"]
    let objectToReturn = await getSpecificUser(userId)
    res.send(objectToReturn)
})

app.delete("/deleteSpecificUser", async function(req, res){
    let userId = req.query["userId"]
    await deleteSpecificUser(userId)
    res.send("Delete Succesful")
})

app.put("/updateSpecificUser", async function(req, res){
    let userObject = JSON.parse(req.query["userObject"])
    await updateSpecificUser(userObject)
    res.send("Update Succesful")
})

app.post("/addFeedback", async function(req, res){
    let feedbackObject = JSON.parse(req.query["feedbackObject"])
    let data = await addFeedback(feedbackObject)
    res.send(data)
})

app.put("/updateFeedback", async function(req, res){
    let feedbackObject = JSON.parse(req.query["feedbackObject"])
    let data = await updateFeedback(feedbackObject)
    res.send(data)
})

app.get("/getSpecificFeedback", async function(req, res){
    let feedbackId = req.query["feedbackId"]
    let data = await getSpecificFeedback(feedbackId)
    res.send(data)
})

app.get("/getAllFeedbacks", async function(req, res){
    let userId = req.query["userId"]
    let data = await getAllFeedbacks(userId)
    res.send(data)
})

app.put("/approveByBuddy", async function(req, res){
    let feedbackId = req.query["feedbackId"]
    let data = await approveByBuddy(feedbackId)
    res.send(data)
})

app.put("/approveByManager", async function(req, res){
    let feedbackId = req.query["feedbackId"]
    let data = await approveByManager(feedbackId)
    res.send(data)
})

app.put("/deniedByBuddy", async function(req, res){
    
})

app.put("/deniedByManager", async function(req, res){
    
})

app.post("/reportFeedback", async function(req, res){

})

app.delete("/deleteFeedback", async function(res, req){

})