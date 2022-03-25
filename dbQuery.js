import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import Database from 'better-sqlite3';

const db = await open({
    filename: 'database.sqlite',
    driver: sqlite3.Database
  });

const dbObject = new Database('database.sqlite', { verbose: console.log });

// ! surround each database call with try catch

async function getAllUsers(){
    var result = await db.all('SELECT * FROM User_table')
    return result
}

async function getSpecificUser(userId){
    let data = await dbObject.prepare("SELECT FROM User_table WHERE id = ?").run(userId)
    return data
}

export {getAllUsers, getSpecificUser};