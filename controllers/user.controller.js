let mongoose = require("mongoose")
let User = require("../models/user.model")
let connectionString="mongodb://app:1234@localhost:27017/microcredits_db"
mongoose.connect(connectionString)


//Get All Users
const getAllUsers = (req,res)=>{
    //Call to bd
    res.send("Get all users")
}

//Create an user
const createUser = (req,res)=>{
    //call to bd
    console.log('create',req.body)

    //Buscar si la cedula del usuario ya existe
    User.findOne({cedula:84088346})
    .then((response)=>{
        console.log("user", response)
        //No se puede crear
    })
    .catch((error)=>{
        console.log("error", error)
        //Se puede crear en la bd

    })

    /*
    let newUser = new User(req.body)
    newUser.save()
        .then((response)=>{
            console.log("response", response)
            //res.status(201).send("<h1>OK</h1>")
            //send response in JSON format
            res.status(201).send({"mensaje": "Usuario creado correctamente", "status":201})
        })
        .catch((error)=>{
            console.log("*****error",error.message)
            //res.status(404).send("<h1>Not Found</h1>")
            //send response in JSON format
            res.status(404).send({"Error": error.message, "status":404})
        })*/
    
    
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