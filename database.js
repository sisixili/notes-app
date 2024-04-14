// In package.json, type: module so can use ES modules (imports instead of common JS)
import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

// Environment variables on separate .env file (run npm i dotenv)
export const pool = mysql.createPool({ // pool is collection of connections to db (pool of cxn can be reused)
    host: process.env.MYSQL_HOST,  // 127.0.0.1 is same as localhost
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise() // To use async/await instead of callbacks

// const result = await pool.query("SELECT * FROM notes") // result is an array of objects (first is db children, others are metadata)
//const rows = result[0]
// Put above actions in function for clarity
export async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM notes")
    return rows
}
export async function getNote(id) { // returns undefined if id not found
    const [rows] = await pool.query(`
    SELECT * FROM notes 
    WHERE id = ?
    `, [id])
    return rows[0]
    // NOTE: WHERE id = ${id} is bad b/c the value is untrustworthy (prob come from http req from end user)
    // Pass id as second param to avoid SQL injection attacks (user modify query to do anything)
    // This is called a "prepared statement"
}
export async function createNote(title, content) {
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [title, content])
    // return result.insertId // return id of new note. result is an array with a lot more data
    const new_id = result.insertId
    //console.log(new_id)
    return getNote(new_id) // get actual new row
}

//const result = await createNote('Test Note 1', 'Testing insert function')
//console.log(result)

//const note = await getNote(1) 
//console.log(note)