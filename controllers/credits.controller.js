let DB = require("../config/database")
let Credit = require("../models/credit.model")

// Get all Credits
const getAllCredits = async(req, res) => {
    //open DB
    DB.connect()
    
    await Credit.find()
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

    //Buscar si el id del credito ya existe 
    Credit.findById(req.body._id)
    .then((response) => {
        // If response is not nul, the user already exists
        if(response !== null) {
            return res.status(500).send({"error": "Credit alredy exists"})
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

// Create an Credit
const createCredit = async(req, res) => {
    // Create user when not exists
    let newCredit = new Credit(req.body)
    await newCredit.save()
    .then((response) => {
        // send response in JSON format
        res.status(201).send({"mensaje": "credito creado correctamente", "status": 201})
    })
    .catch((error) => {
        // send response in JSON format
        res.status(404).send({"error": error.message, "status":404})
    })
        //Close DB
        DB.disconnect()
}

// Delete an credit
const deleteCredit = async(req, res) => {
    //open DB
    DB.connect()

    await Credit.findById(req.params._id)
    .then(async(creditFound)=>{
        //Delete credit
       await creditFound.remove()
        .then((creditDeleted)=>{
            //The credit has beed delete
            res.status(200).send({"message": "credit Deleted", "credit":creditDeleted})
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

// Update an credit
const updateCredit = (req, res) => {
    //Open DB
    DB.connect()

    /*
    //Way1
    Credit.update({plazo: 18},{plazo: 36})
    .then(()=>{
        res.send("update")
    })
    .catch(()=>{
        res.send("error")
    })
    */
    
    
    //Way 2
    User.findById(req.params._id)
    .then((creditFound)=>{
        User.update(creditFound, req.body)
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
       /* Credit.findById(req.params._id)    
        .then(creditFound => {
        let userToSave = Object.assign(creditFound, req.body)  // esta forma hace match entre lo que esta en la base de datos y el req.body
        creditToSave.save()
     
        .then(()=>{   //** Si se actualizo responde OK */
         //The credit has beed Update
       /*  res.status(200).send({ message: "credit update"});
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
    getAllCredits,
    createCredit,
    deleteCredit,
    updateCredit,
    find
}