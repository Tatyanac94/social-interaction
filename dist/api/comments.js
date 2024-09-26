"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const supabase_1 = require("../config/supabase");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
exports.router = router;
router.use(validation_1.validateContent);
router.post('/posts/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { content, username } = req.body;
    const displayName = username ? username : "Anonymous";
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