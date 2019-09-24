let express = require("express");
let userCtr = require("../controllers/user.controller");

let userRouter = express.Router();

userRouter
    //Obtener todo los usuarios Get All Users
    .get('/', userCtr.getAllUsers)
    //Create an user
    .post('/create', userCtr.createUser)
    // Drop an user
    .delete('/delete',userCtr.deleteUser)
    //update the user
    .put('/update',userCtr.updateUser)

module.exports = userRouter