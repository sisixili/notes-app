// Express code to create HTTP server

import express from 'express'

import { getNote, getNotes, createNote } from './database.js'

const app = express()

app.use(express.json()) // any json body is accepted and passed to req.body

app.get("/notes", async (req, res) => {
    const notes = await getNotes()
    res.send(notes)
})

app.get("/notes/:id", async (req, res) => { // ex. ./notes/6 returns notes with id of 6
    const id = req.params.id
    const note = await getNote(id)
    res.send(note)
})

app.post("/notes", async (req, res) => {
    const { title, contents } = req.body
    const note = await createNote(title, contents)
    res.status(201).send(note) // send note back to client with 201 status code
})

app.use((err, req, res, next) => { // express 5 middleware
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})