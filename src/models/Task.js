const db = require('../config/database');

class Task {
  constructor(title, description, status, userId) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.userId = userId;
  }

  save() {

    const query = 'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)';
    const values = [this.title, this.description, this.status, this.userId];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        });
      });
    }
    static findAll(userId) {
        const query = 'SELECT * FROM tasks WHERE user_id = ?';
    
        return new Promise((resolve, reject) => {
          db.query(query, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
      }

    static findById(taskId, userId) {
        const query = 'SELECT * FROM tasks WHERE id = ? AND user_id = ?';
    
    
     return new Promise((resolve, reject) => {
         db.query(query, [taskId, userId], (err, results) => {
             if (err) return reject(err);
              resolve(results[0]);
            });
          });
        }
      
    
      static updateTask(taskId, userId, updates) {
        const query = 'UPDATE tasks SET ? WHERE id = ? AND user_id = ?';
        const values = [updates, taskId, userId];
    
        return new Promise((resolve, reject) => {
          db.query(query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows);
          });
        });
      }
    
      static deleteTask(taskId, userId) {
        const query = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
        const values = [taskId, userId];
    
        return new Promise((resolve, reject) => {
          db.query(query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows);
          });
        });
      }
  }




module.exports = Task;