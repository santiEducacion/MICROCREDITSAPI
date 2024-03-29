let mongoose = require("mongoose")
let User = require("../models/user.model")
let DB = require("../config/database")

// Get all users
const getAllUsers = async(req, res) => {
    //open DB
    DB.connect()
    
    await User.find()
    .then(response =>{
        res.status(200).send({"results":response})
    })
    .catch(()=>{
        res.status(404).send({"error": "not found"})
    })
    //Close DB
    DB.disconnect()
}

// Create middleware
const find = (req, res, next) => {

    //open DB
    DB.connect()

    //Buscar si la cedula del usuario ya existe 
    User.findOne({cedula: req.body.cedula})
    .then((response) => {
        console.log("user ", response)
        // If response is not nul, the user already exists
        if(response !== null) {
            return res.status(500).send({"error": "User alredy exists"})
        }
        // Can be user
        else {
            next()
        }
    })
    .catch((error) => {
        res.send({"error":error.message})
                //Close DB
                DB.disconnect()

    })

}


// Create an user
const createUser = async(req, res) => {
    // Create user when not exists
    let newUser = new User(req.body)
    await newUser.save()
    .then((response) => {
        // send response in JSON format
        res.status(201).send({"mensaje": "Usuario creado correctamente", "status": 201})
    })
    .catch((error) => {
        // send response in JSON format
        res.status(404).send({"error": error.message, "status":404})
    })
        //Close DB
        DB.disconnect()

}

// Delete an user
const deleteUser = async(req, res) => {
    //open DB
    DB.connect()

    await User.findById(req.params._id)
    .then(async(userFound)=>{
        //Delete user
       await userFound.remove()
        .then((userDeleted)=>{
            //The user has beed delete
            res.status(200).send({"message": "User Deleted", "user":userDeleted})
        })
        .catch((error)=>{
            res.send({"error": error.message})
        })
    })
    .catch((error)=>{
        res.send("No encontrado")
    })
    //close DB
    DB.disconnect()
}

// Update an user
const updateUser = (req, res) => {
    //Open DB
    DB.connect()

    /*
    //Way1
    User.update({nombre: "Andrea"},{nombre: "Andrea Marcela"})
    .then(()=>{
        res.send("update")
    })
    .catch(()=>{
        res.send("error")
    })
    */
    
    
    //Way 2
    User.findById(req.params._id)
    .then((userFound)=>{
        User.update(userFound, req.body)
        .then(()=>{
            res.send("update")
        })
            .catch(()=>{
            res.send("No")
        })
        .catch(()=>{
            res.send("error")
        })
        //Close DB
        DB.disconnect()
    })
    

    //Way 3
       /* User.findById(req.params._id)    
        .then(userFound => {
        let userToSave = Object.assign(userFound, req.body)  // esta forma hace match entre lo que esta en la base de datos y el req.body
        userToSave.save()
     
        .then(()=>{   //** Si se actualizo responde OK */
         //The User has beed Update
       /*  res.status(200).send({ message: "User update"});
        })
        .catch(()=>{
        res.send("no")
       })
  
  
    })
  
    .catch(error => {
      res.send({ error: error.message });
    });*/
  
  
  };


module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    find
}