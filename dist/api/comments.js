"use strict";
// import { Router, Request, Response } from 'express';
// import { supabase } from '../config/supabase';
// import { validateContent } from '../middleware/validation';
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// const router = Router();
// router.use(validateContent);
// router.post('/posts/:id/comments', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { content, username } = req.body;
//     const displayName = username ? username : "Anonymous";
//     if (!content) {
//         return res.status(400).json({ error: 'Content cannot be empty' });
//     }
//     const { data: post, error: postError } = await supabase
//         .from('post')
//         .select('id')
//         .eq('id', id)
//         .single();
//     if (postError || !post) {
//         return res.status(404).json({ error: 'Post not found' });
//     }
//     const { data: comment, error: commentError } = await supabase
//         .from('comment')
//         .insert([{ postid: post.id, content, username: displayName }])
//         .single();
//     if (commentError) {
//         return res.status(500).json({ error: commentError.message });
//     }
//     res.status(201).json(comment);
// });
// router.get('/posts/:id/comments', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { data: post, error: postError } = await supabase
//         .from('post')
//         .select('id')
//         .eq('id', id)
//         .single();
//     if (postError || !post) {
//         return res.status(404).json({ error: 'Post not found' });
//     }
//     const { data: comments, error: commentsError } = await supabase
//         .from('comment')
//         .select('*')
//         .eq('postid', post.id)
//         .order('timestamp', { ascending: false });
//     if (commentsError) {
//         return res.status(500).json({ error: commentsError.message });
//     }
//     res.json(comments);
// });
// export { router };
// import { Router, Request, Response } from 'express'; 
// import { supabase } from '../config/supabase';
// import { validateContent } from '../middleware/validation';
// const router = Router();
// // Middleware to validate content
// router.use(validateContent);
// // Add a comment to a post
// router.post('/posts/:id/comments', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { content, username } = req.body;
//     const displayName = username ? username : "Anonymous";
//     if (!content) {
//         return res.status(400).json({ error: 'Content cannot be empty' });
//     }
//     const { data: post, error: postError } = await supabase
//         .from('post')
//         .select('id')
//         .eq('id', id)
//         .single();
//     if (postError || !post) {
//         return res.status(404).json({ error: 'Post not found' });
//     }
//     const { data: comment, error: commentError } = await supabase
//         .from('comment')
//         .insert([{ postid: post.id, content, username: displayName }])
//         .single();
//     if (commentError) {
//         return res.status(500).json({ error: commentError.message });
//     }
//     res.status(201).json(comment);
// });
// // Get all comments for a specific post
// router.get('/posts/:id/comments', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { data: post, error: postError } = await supabase
//         .from('post')
//         .select('id')
//         .eq('id', id)
//         .single();
//     if (postError || !post) {
//         return res.status(404).json({ error: 'Post not found' });
//     }
//     const { data: comments, error: commentsError } = await supabase
//         .from('comment')
//         .select('*')
//         .eq('postid', post.id)
//         .order('timestamp', { ascending: false });
//     if (commentsError) {
//         return res.status(500).json({ error: commentsError.message });
//     }
//     res.json(comments);
// });
// // Update a comment
// router.put('/comments/:commentId', async (req: Request, res: Response) => {
//     const { commentId } = req.params;
//     const { content } = req.body;
//     const { data, error } = await supabase
//         .from('comment')
//         .update({ content })
//         .eq('id', commentId)
//         .select('*')
//         .single();
//     if (error) {
//         return res.status(500).json({ error: error.message });
//     }
//     if (!data) {
//         return res.status(404).json({ error: 'Comment not found' });
//     }
//     res.json(data);
// });
// // Delete a comment
// router.delete('/comments/:commentId', async (req: Request, res: Response) => {
//     const { commentId } = req.params;
//     const { data, error } = await supabase
//         .from('comment')
//         .delete()
//         .eq('id', commentId);
//     if (error) {
//         return res.status(500).json({ error: error.message });
//     }
//     if (!data) {
//         return res.status(404).json({ error: 'Comment not found' });
//     }
//     res.status(204).send(); // No content to return
// });
// export { router };
// import { Router, Request, Response } from 'express'; 
// import { supabase } from '../config/supabase';
// import { validateContent } from '../middleware/validation';
// const router = Router();
// // Middleware to validate content
// router.use(validateContent);
// // Add a comment to a post
// router.post('/posts/:id/comments', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { content, username } = req.body;
//     const displayName = username || "Anonymous";
//     if (!content) {
//         return res.status(400).json({ error: 'Content cannot be empty' });
//     }
//     const { data: post, error: postError } = await supabase
//         .from('post')
//         .select('id')
//         .eq('id', id)
//         .single();
//     if (postError || !post) {
//         return res.status(404).json({ error: 'Post not found' });
//     }
//     const { data: comment, error: commentError } = await supabase
//         .from('comment')
//         .insert([{ postid: post.id, content, username: displayName }])
//         .single();
//     if (commentError) {
//         return res.status(500).json({ error: commentError.message });
//     }
//     res.status(201).json(comment);
// });
// // Get all comments for a specific post
// router.get('/posts/:id/comments', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { data: post, error: postError } = await supabase
//         .from('post')
//         .select('id')
//         .eq('id', id)
//         .single();
//     if (postError || !post) {
//         return res.status(404).json({ error: 'Post not found' });
//     }
//     const { data: comments, error: commentsError } = await supabase
//         .from('comment')
//         .select('*')
//         .eq('postid', post.id)
//         .order('timestamp', { ascending: false });
//     if (commentsError) {
//         return res.status(500).json({ error: commentsError.message });
//     }
//     res.json(comments);
// });
// // Update a comment
// router.put('/comments/:commentId', async (req: Request, res: Response) => {
//     const { commentId } = req.params;
//     const { content } = req.body;
//     if (!content) {
//         return res.status(400).json({ error: 'Content cannot be empty' });
//     }
//     const { data, error } = await supabase
//         .from('comment')
//         .update({ content })
//         .eq('id', commentId)
//         .select('*')
//         .single();
//     if (error) {
//         return res.status(500).json({ error: error.message });
//     }
//     if (!data) {
//         return res.status(404).json({ error: 'Comment not found' });
//     }
//     res.json(data);
// });
// // // Delete a comment
// router.delete('/comments/:commentId', async (req: Request, res: Response) => {
//     const { commentId } = req.params;
//     const { data, error } = await supabase
//         .from('comment')
//         .delete()
//         .eq('id', commentId)
//         .select(); // Add select() to get the deleted row data
//     if (error) {
//         return res.status(500).json({ error: error.message });
//     }
//     if (!data || data.length === 0) {
//         return res.status(404).json({ error: 'Comment not found' });
//     }
//     res.status(204).send(); // No content to return
// });
// export { router };
const express_1 = require("express");
const supabase_1 = require("../config/supabase");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
exports.router = router;
// Middleware to validate content
router.use(validation_1.validateContent);
// Add a comment to a post
router.post('/posts/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { content, username } = req.body;
    const displayName = username || "Anonymous";
    if (!content) {
        return res.status(400).json({ error: 'Content cannot be empty' });
    }
    const { data: post, error: postError } = await supabase_1.supabase
        .from('post')
        .select('id')
        .eq('id', id)
        .single();
    if (postError || !post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const { data: comment, error: commentError } = await supabase_1.supabase
        .from('comment')
        .insert([{ postid: post.id, content, username: displayName }])
        .single();
    if (commentError) {
        return res.status(500).json({ error: commentError.message });
    }
    res.status(201).json(comment);
});
// Get all comments for a specific post
router.get('/posts/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { data: post, error: postError } = await supabase_1.supabase
        .from('post')
        .select('id')
        .eq('id', id)
        .single();
    if (postError || !post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const { data: comments, error: commentsError } = await supabase_1.supabase
        .from('comment')
        .select('*')
        .eq('postid', post.id)
        .order('timestamp', { ascending: false });
    if (commentsError) {
        return res.status(500).json({ error: commentsError.message });
    }
    res.json(comments);
});
// Update a comment
router.put('/comments/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Content must be a non-empty string' });
    }
    const { data, error } = await supabase_1.supabase
        .from('comment')
        .update({ content })
        .eq('id', commentId)
        .select('*')
        .single();
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    if (!data) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(data);
});
// Delete a comment
router.delete('/comments/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { data, error } = await supabase_1.supabase
        .from('comment')
        .delete()
        .eq('id', commentId)
        .select(); // Ensure we retrieve the deleted row(s)
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    // Check if data is null or has no length
    if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(204).send(); // No content to return
});
