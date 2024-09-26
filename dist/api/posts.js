"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const supabase_1 = require("../config/supabase");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
exports.router = router;
router.use(validation_1.validateContent);
router.post('/posts', async (req, res) => {
    const { content } = req.body;
    const { data, error } = await supabase_1.supabase
        .from('post')
        .insert([{ content }])
        .single();
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
});
router.get('/posts', async (_req, res) => {
    const { data, error } = await supabase_1.supabase
        .from('post')
        .select('*')
        .order('timestamp', { ascending: false });
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    const postsWithCounts = await Promise.all(data.map(async (post) => {
        const { count: commentCount } = await supabase_1.supabase
            .from('comment')
            .select('id', { count: 'exact', head: true })
            .eq('PostID', post.id);
        const { count: likeCount } = await supabase_1.supabase
            .from('postlike')
            .select('id', { count: 'exact', head: true })
            .eq('PostID', post.id);
        return {
            ...post,
            commentCount,
            likeCount
        };
    }));
    res.json(postsWithCounts);
});
router.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { data: post, error: postError } = await supabase_1.supabase
        .from('post')
        .select('*')
        .eq('id', id)
        .single();
    if (postError || !post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const { data: comments, error: commentsError } = await supabase_1.supabase
        .from('comment')
        .select('*')
        .eq('PostID', post.id)
        .order('timestamp', { ascending: false });
    if (commentsError) {
        return res.status(500).json({ error: commentsError.message });
    }
    const { data: likes, error: likesError } = await supabase_1.supabase
        .from('postlike')
        .select('*')
        .eq('PostID', post.id);
    if (likesError) {
        return res.status(500).json({ error: likesError.message });
    }
    res.json({
        post,
        comments,
        likes
    });
});
