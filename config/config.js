//const STRING_CONNECTION = "mongodb://app:1234@localhost:27017/microcredits_db"
const STRING_CONNECTION = "mongodb+srv://admin:admin123@cluster0-zuctx.mongodb.net/microcredits-db"


module.exports = {
    PORT: process.env.PORT || 3000,
    DB_CONNECTION: STRING_CONNECTION
  };