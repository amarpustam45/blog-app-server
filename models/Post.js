import db from '../config/db.js';

class Post {
  constructor() {}

  static addPost(post, uid) {
    const sql = `INSERT INTO posts (title,posts.desc,img,date,uid,category)
    VALUES ('${post.title}','${post.desc}','${post.img}','${post.date}','${uid}','${post.cat}');`;
    return db.execute(sql);
  }

  static updatePost(post, id, uid) {
    const sql = `UPDATE posts SET title='${post.title}',posts.desc='${post.desc}',img='${post.img}',category='${post.cat}' WHERE id=${id} AND uid = ${uid}`;
    return db.execute(sql);
  }

  static getAllPosts(cat) {
    const sql = cat
      ? `SELECT * FROM posts WHERE category='${cat}';`
      : `SELECT * FROM posts;`;

    return db.execute(sql);
  }

  static getSinglePost(id) {
    const sql = `SELECT p.id,u.username,p.title,p.desc,p.img,u.img AS userimg,p.category,p.date FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=${id};`;
    return db.execute(sql);
  }

  static deletePost(id, uid) {
    const sql = `DELETE FROM posts where id = ${id} AND uid = ${uid}`;
    return db.execute(sql);
  }
}

export default Post;
