// BUILD YOUR SERVER HERE
const Users = require('./users/model')

const express = require('express')
const server = express()

server.get( "/api/users", (req, res) => {
    Users.find()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({ message: "The users information could not be retrieved" })
    })
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
