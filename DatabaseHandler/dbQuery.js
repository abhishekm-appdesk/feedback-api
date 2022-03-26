import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import Database from 'better-sqlite3';

const db = await open({
    filename: 'DatabaseHandler/database.sqlite',
    driver: sqlite3.Database
  });

const dbObject = new Database('DatabaseHandler/database.sqlite', { verbose: console.log });

// ! surround each database call with try catch

async function getAllUsers(){
    var result = await db.all('SELECT * FROM User_table')
    return result
}

async function getSpecificUser(userId){
    let data = await db.get("SELECT * FROM User_table WHERE id = ?", userId)
    return data
}

async function getSpecificUserByEmail(userEmail){
    let data = await db.get("SELECT * FROM User_table WHERE email = ?", userEmail)
    return data
}

async function deleteSpecificUser(userId){
    await dbObject.prepare("DELETE FROM User_table WHERE Id = ?").run(userId)
    return "User Deleted"
}

async function updateSpecificUser(userObject){
    try{
        let updateQuery = await dbObject.prepare("UPDATE User_table SET fullName = ? , email = ?,password =?, userType = ?, joinedOn =?, position = ? , buddyId = ?, managerId = ? WHERE id = ?")
        await updateQuery.run(userObject.fullName, userObject.email, userObject.password, userObject.userType,userObject.joinedOn,userObject.position,userObject.buddyId,userObject.managerId, userObject.id)
        return "Update Success"
    }
    catch(err){
        return err
    }
}

async function addFeedback(feedbackObject){
    try {
    let addFeedback = await dbObject.prepare("INSERT INTO Feedback_table(id, timeStamp, senderType, content, senderId, receiverId, improved, isVerifiedByBuddy, isVerifiedByManager) VALUES (?,?,?,?,?,?,?,?,?)")
    await addFeedback.run(feedbackObject.id, feedbackObject.timeStamp, feedbackObject.senderType, feedbackObject.content, feedbackObject.senderId, feedbackObject.receiverId,feedbackObject.improved,feedbackObject.isVerifiedByBuddy,feedbackObject.isVerifiedByManager)
    return "Added Feedback"
    }
    catch(err) {
        return err
    }
}

async function updateFeedback(feedbackObject){
    try {
        let UpdateFeedback = await dbObject.prepare("UPDATE Feedback_table SET content = ?, isVerifiedByBuddy = ?, isVerifiedByManager = ? WHERE id = ?")
        await UpdateFeedback.run(feedbackObject.content,feedbackObject.isVerifiedByBuddy,feedbackObject.isVerifiedByManager, feedbackObject.id)
        return "Update Feedback"
        }
        catch(err) {
            return err
        }
}

async function getSpecificFeedback(feedbackId){
    return await db.get("SELECT * FROM Feedback_table WHERE id = ?", feedbackId)
}

async function getAllFeedbacks(userId){
    return await db.all("SELECT * FROM Feedback_table WHERE receiverId = ?",userId)
}

async function approveByBuddy(feedbackId){
    let approve = await dbObject.prepare("UPDATE Feedback_table SET isVerifiedByBuddy = ? WHERE id = ?")
        await approve.run("true",feedbackId)
        return "Approve by buddy"
}

async function approveByManager(feedbackId){
    let approve = await dbObject.prepare("UPDATE Feedback_table SET isVerifiedByManager = ? WHERE id = ?")
        await approve.run("true",feedbackId)
        return "Approve by manager"
}

async function deniedByBuddy(feedbackId){
    let denied = await dbObject.prepare("UPDATE Feedback_table SET isVerifiedByBuddy = ? WHERE id = ?")
        await denied.run("false",feedbackId)
        return "Denied by buddy"
}

async function deniedByManager(feedbackId){
    let denied = await dbObject.prepare("UPDATE Feedback_table SET isVerifiedByManager = ? WHERE id = ?")
        await denied.run("false",feedbackId)
        return "Denied by manager"
}

async function reportFeedback(feedbackObject){
    let report = await dbObject.prepare("DELETE FROM Feedback_table WHERE Id = ?").run(feedbackObject.id)
    let addFeedback = await dbObject.prepare("INSERT INTO Report_table(id, timeStamp, senderType, content, senderId, receiverId, improved, isVerifiedByBuddy, isVerifiedByManager) VALUES (?,?,?,?,?,?,?,?,?)")
    await addFeedback.run(feedbackObject.id, feedbackObject.timeStamp, feedbackObject.senderType, feedbackObject.content, feedbackObject.senderId, feedbackObject.receiverId,feedbackObject.improved,feedbackObject.isVerifiedByBuddy,feedbackObject.isVerifiedByManager)
    return "Feedback reported"
}

async function deleteFeedback(feedbackId){
    return await dbObject.prepare("DELETE FROM Feedback_table WHERE Id = ?").run(feedbackId)
}

async function getUserDetails(userEmail){
    console.log(userEmail);
    let data = await db.all("SELECT * FROM User_table WHERE email = ?", userEmail)
    console.log(data);
    return data
}

export {getAllUsers, getSpecificUser, updateSpecificUser, deleteSpecificUser, addFeedback, updateFeedback,getSpecificFeedback, getAllFeedbacks, approveByBuddy, approveByManager, deniedByBuddy, deniedByManager,reportFeedback, deleteFeedback, getUserDetails , getSpecificUserByEmail};