"use strict";
// import 'dotenv/config';
// import express from 'express';
// import { json } from 'express';
// import { router as postRouter } from './api/posts';
// import { router as commentRouter } from './api/comments';
// import { router as likeRouter } from './api/likes';
// import { errorHandler } from './utils/errorHandler';
// import { supabase } from './config/supabase';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// const PORT = process.env.PORT || 4000;
// app.use(json());
// app.get('/', async (req, res) => {
//     try {
//         const { data: posts, error: postError } = await supabase
//             .from('post')
//             .select('*')
//             .order('timestamp', { ascending: false });
//         if (postError) {
//             return res.status(500).json({ error: postError.message });
//         }
//         const postsWithDetails = await Promise.all(
//             posts.map(async (post) => {
//                 const { data: comments } = await supabase
//                     .from('comment')
//                     .select('*')
//                     .eq('postid', post.id);
//                 const { count: likeCount } = await supabase
//                     .from('postlike')
//                     .select('id', { count: 'exact', head: true })
//                     .eq('postid', post.id);
//                 return {
//                     ...post,
//                     comments: comments || [],
//                     likeCount: likeCount || 0
//                 };
//             })
//         );
//         res.json(postsWithDetails);
//     } catch (err) {
//         console.error('Server Error:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
// app.use('/api/posts', postRouter);
// app.use('/api/comments', commentRouter);
// app.use('/api/likes', likeRouter);
// app.use(errorHandler);
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
// import 'dotenv/config';
// import express from 'express';
// import { json } from 'express';
// import { router as postRouter } from './api/posts';
// import { router as commentRouter } from './api/comments';
// import { router as likeRouter } from './api/likes';
// import { errorHandler } from './utils/errorHandler';
// import { supabase } from './config/supabase';
// const app = express();
// const PORT = process.env.PORT || 4000;
// // Middleware to parse JSON bodies
// app.use(json());
// // Root endpoint to get all posts with comments and likes
// app.get('/', async (req, res) => {
//     try {
//         const { data: posts, error: postError } = await supabase
//             .from('post')
//             .select('*')
//             .order('timestamp', { ascending: false });
//         if (postError) {
//             return res.status(500).json({ error: postError.message });
//         }
//         const postsWithDetails = await Promise.all(
//             posts.map(async (post) => {
//                 const { data: comments } = await supabase
//                     .from('comment')
//                     .select('*')
//                     .eq('postid', post.id);
//                 const { count: likeCount } = await supabase
//                     .from('postlike')
//                     .select('id', { count: 'exact', head: true })
//                     .eq('postid', post.id);
//                 return {
//                     ...post,
//                     comments: comments || [],
//                     likeCount: likeCount || 0,
//                 };
//             })
//         );
//         res.json(postsWithDetails);
//     } catch (err) {
//         console.error('Server Error:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
// // API routes
// app.use('/api/posts', postRouter);
// app.use('/api/comments', commentRouter);
// app.use('/api/likes', likeRouter);
// // Error handling middleware
// app.use(errorHandler);
// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const cors_1 = __importDefault(require("cors")); // Import CORS
const posts_1 = require("./api/posts");
const comments_1 = require("./api/comments");
const likes_1 = require("./api/likes");
const errorHandler_1 = require("./utils/errorHandler");
const supabase_1 = require("./config/supabase");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middleware to parse JSON bodies
app.use((0, cors_1.default)()); // Enable CORS
app.use((0, express_2.json)());
// Root endpoint to get all posts with comments and likes
app.get('/', async (req, res) => {
    try {
        const { data: posts, error: postError } = await supabase_1.supabase
            .from('post')
            .select('*')
            .order('timestamp', { ascending: false });
        if (postError) {
            return res.status(500).json({ error: postError.message });
        }
        const postsWithDetails = await Promise.all(posts.map(async (post) => {
            const { data: comments } = await supabase_1.supabase
                .from('comment')
                .select('*')
                .eq('postid', post.id);
            const { count: likeCount } = await supabase_1.supabase
                .from('postlike')
                .select('id', { count: 'exact', head: true })
                .eq('postid', post.id);
            return {
                ...post,
                comments: comments || [],
                likeCount: likeCount || 0,
            };
        }));
        res.json(postsWithDetails);
    }
    catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// API routes
app.use('/api/posts', posts_1.router);
app.use('/api/comments', comments_1.router);
app.use('/api/likes', likes_1.router);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
