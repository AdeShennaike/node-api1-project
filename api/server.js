// BUILD YOUR SERVER HERE
const Users = require('./users/model')

const express = require('express')
const server = express()

server.use(express.json())

server.get("/api/users", (req, res) => {
    Users.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

server.get( "/api/users/:id", async ( req, res ) => {
    const userById = await Users.findById(req.params.id)
    
    try{ if(!userById){
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    }else{
        res.status(200).json(userById)
    }
    }catch(err){
        res.status(500).json({ message: "The user information could not be retrieved" })
    }    
})

server.delete("/api/users/:id", (req, res) => {
    Users.remove(req.params.id)
        .then(user => {
            if(!user){res.status(404).json({ message: "The user with the specified ID does not exist" })}
            else{res.status(200).json(user)}
        })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed" })
        })
})

server.post("/api/users", async (req, res) => {
    const {name, bio} = req.body
    const newUser = await Users.insert({name: name, bio: bio})

    if(!name || !bio){
        res.status(400).json({ message: "Please provide name and bio for the user" })
    }else {
        try{
            res.status(201).json(newUser)
        }catch(err){
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        }
    }
})

server.put("/api/users/:id", (req, res) => {
    const {name, bio} = req.body
    const changes = {name: name, bio: bio}
    const {id} = req.params

    if (!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    }else {
        Users.update(id, changes)
            .then(user => {
                if(!user){
                    res.status(404).json({ message: "The user with the specified ID does not exist" })
                }else{
                    res.status(200).json(user)
                }
            })
            .catch(err => {
                res.status(500).json({ message: "The user information could not be modified" })
            })
    }
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
