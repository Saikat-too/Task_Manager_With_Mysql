const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const values = [this.username, hashedPassword];

    return new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      });
    });
  }

  static findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';

    return new Promise((resolve, reject) => {
      db.query(query, [username], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }
}

module.exports = User;