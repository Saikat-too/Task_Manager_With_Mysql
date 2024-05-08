const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'task_manager'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

module.exports = connection;