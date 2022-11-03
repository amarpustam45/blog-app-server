import Post from '../models/Post.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getAllPosts = async (req, res) => {
  const cat = req.query.cat;

  try {
    const [posts, _] = await Post.getAllPosts(cat);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getSinglePost = async (req, res) => {
  const ID = req.params.id;

  try {
    const [post, _] = await Post.getSinglePost(ID);
    return res.status(200).json(post[0]);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const addPost = (req, res) => {
  res.json('this is from the controller');
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not Authenticated!');

  jwt.verify(token, process.env.JWT_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const postID = req.params.id;
    try {
      await Post.deletePost(postID, userInfo.id);
      return res.status(200).json('Post has been deleted');
    } catch (error) {
      return res.status(403).json('Post was not deleted!');
    }
  });
};

export const updatePost = (req, res) => {
  res.json('this is from the controller');
};
