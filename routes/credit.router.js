let express = require("express");
let creditCtr = require("../controllers/credits.controller");

let creditRouter = express.Router();

creditRouter
    //Obtener todo los creditos Get All credits
    .get('/', creditCtr.getAllCredits)
    //Create an credit
    .post('/create', creditCtr.find, creditCtr.createCredit)
    // Drop an credit
    .delete('/delete/:_id',creditCtr.deleteCredit)
    //update the credit
    .put('/update/:id',creditCtr.updateCredit)

module.exports = creditRouter