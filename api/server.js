// BUILD YOUR SERVER HERE
const Users = require('./users/model')

const express = require('express')
const server = express()

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
module.exports = server; // EXPORT YOUR SERVER instead of {}
