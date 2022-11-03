import db from '../config/db.js';

class Auth {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  save() {
    const sql = `INSERT INTO users (username,email,password) VALUES ('${this.username}','${this.email}','${this.password}');`;
    return db.execute(sql);
  }

  static checkExisting(username, email) {
    //check if user already exists
    const sql = `SELECT * FROM users WHERE email = '${email}' OR username = '${username}'`;
    return db.execute(sql);
  }
}

export default Auth;
