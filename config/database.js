let mongoose = require("mongoose")
const {DB_CONNECTION} = require("../config/config");

module.exports = {
    //variable to indicate the connection status
    connection: false,

    //Function  to do connect
    connect: ()=>{
        //If connection is actiev, return the connection
        if (this.connection) return this.connection

        //connect to bd
        mongoose.connect((DB_CONNECTION))
        .then((connection)=>{
            console.log("CONNECTION", connection)
        })
        .catch((error)=>{
            console.log("ERROR:", error)
        })
    },

    disconnect:()=>{
        mongoose.connection.close()
        .then(()=>{
            console.log("DISCONNECTED!")
        })
        .catch(()=>{
            console.log("DISCONNECTED FAIL!")
        })
    }
}