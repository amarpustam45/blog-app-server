import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors());

// app.post('/api/uploadCloud', async (req, res) => {
//   try {
//     const file = JSON.parse(req.body.data);
//     const uploadedResponse = await cloudinary.uploader.upload(file, {
//       upload_preset: 'dev_setups',
//     });
//     res.status(200).json(uploadedResponse.public_id);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

app.use('/api/uploadCloud', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
