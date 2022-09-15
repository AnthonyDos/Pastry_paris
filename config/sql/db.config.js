const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DB_NAME,
  user: process.env.USER,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.log({ err: err });
  } else {
    console.log("connecté à  Sql");
  }
});

module.exports = connection;
