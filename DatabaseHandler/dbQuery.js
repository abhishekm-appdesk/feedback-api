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
    let data = await dbObject.prepare("SELECT FROM User_table WHERE id = ?").run(userId)
    return data
}

async function updateSpecificUser(userObject){
    try{
        let updateQuery = await dbObject.prepare("UPDATE User_table SET id = ? , fullName = ? , email = ?,password =?, userType = ?, joinedOn =?, position = ? , buddyId = ?, managerId = ? WHERE id = ?")
        await updateQuery.run(userObject.id, userObject.fullName, userObject.email, userObject.password, userObject.userType,userObject.joinedOn,userObject.position,userObject.buddyId,userObject.managerId, userObject.id)
        return "Update Success"
    }
    catch(err){
        return err
    }
}

async function getAllFeedbacks(userId){
    return await dbObject.prepare("SELECT * FROM User_table WHERE id = ?").run(userId)
}



export {getAllUsers, getSpecificUser, updateSpecificUser};