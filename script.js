import express from 'express'
const app = express()
import cors from 'cors'

import {getAllUsers, getSpecificUser} from './dbQuery.js'

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

    // if(){
    //     res.status(400)
    //     res.send("Incomplete Creds Provided")
    //     return
    // }

    await updateEmployee(employeeId, employeeName, employeeDesignation, employeeProfilePic)
    let allEmployeesList = await getAllEmployees()
    res.send(allEmployeesList)
})