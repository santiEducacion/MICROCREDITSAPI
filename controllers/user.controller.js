let mongoose = require("mongoose")
let User = require("../models/user.model")
let connectionString="mongodb://app:1234@localhost:27017/microcredits_db"
mongoose.connect(connectionString)


//Get All Users
const getAllUsers = (req,res)=>{
    //Call to bd
    res.send("Get all users")
}

 // Create an user
const createUser = (req, res) => {
    console.log("BODY ", req.body.cedula)

    //Buscar si la cedula del usuario ya existe 
    User.findOne({cedula: req.body.cedula})
    .then((response) => {
        console.log("user ", response)
        // If response is not nul, the user already exists
        if(response !== null) {
            res.status(500).send({"error": "User alredy exists"})
        }

        // Create user when not exists
        let newUser = new User(req.body)
        newUser.save()
        .then((response) => {
            // send response in JSON format
            res.status(201).send({"mensaje": "Usuario creado correctamente", "status": 201})
        })
        .catch((error) => {
            // send response in JSON format
            res.status(404).send({"error": error.message, "status":404})
        })
    })
    .catch((error) => {
        console.log("****error", error)
    })
}

//Delete an user
const deleteUser = (req,res)=>{
    res.send("Delete users")
}

//Delete an user
const updateUser = (req,res)=>{
    res.send("update users")
}

module.exports = { 
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
}