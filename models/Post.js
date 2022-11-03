import db from '../config/db.js';

class Post {
  constructor() {}

  static getAllPosts(cat) {
    const sql = cat
      ? `SELECT * FROM posts WHERE category='${cat}';`
      : `SELECT * FROM posts;`;

    return db.execute(sql);
  }

  static getSinglePost(id) {
    const sql = `SELECT u.username,p.title,p.desc,p.img,u.img AS userimg,p.category,p.date FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=${id};`;
    return db.execute(sql);
  }

  static deletePost(id, uid) {
    const sql = `DELETE FROM posts where id = ${id} AND uid = ${uid}`;
    return db.execute(sql);
  }
}

export default Post;
