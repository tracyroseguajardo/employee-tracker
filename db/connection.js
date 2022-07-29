const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "personelle_db"
    },
    
  );

  module.exports = connection;