"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const supabase_1 = require("../config/supabase");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/', validation_1.validateContent, async (req, res) => {
    const { content, username } = req.body;
    const { data, error } = await supabase_1.supabase
        .from('post')
        .insert([{
            content,
            username: username || 'Anonymous'
        }])
        .single();
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
});
router.get('/', async (_req, res) => {
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
            .eq('postid', post.id);
        const { count: likeCount } = await supabase_1.supabase
            .from('postlike')
            .select('id', { count: 'exact', head: true })
            .eq('postid', post.id);
        const { data: comments } = await supabase_1.supabase
            .from('comment')
            .select('*')
            .eq('postid', post.id);
        return {
            ...post,
            commentCount,
            likeCount,
            comments
        };
    }));
    res.json(postsWithCounts);
});
router.get('/:id', async (req, res) => {
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
        .eq('postid', post.id)
        .order('timestamp', { ascending: false });
    if (commentsError) {
        return res.status(500).json({ error: commentsError.message });
    }
    const { data: likes, error: likesError } = await supabase_1.supabase
        .from('postlike')
        .select('*')
        .eq('postid', post.id);
    if (likesError) {
        return res.status(500).json({ error: likesError.message });
    }
    res.json({
        post,
        comments,
        likes
    });
});
router.put('/:id', validation_1.validateContent, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const { data: post, error: postError } = await supabase_1.supabase
        .from('post')
        .select('*')
        .eq('id', id)
        .single();
    if (postError || !post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const { data, error } = await supabase_1.supabase
        .from('post')
        .update({ content })
        .eq('id', id)
        .single();
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error: commentDeleteError } = await supabase_1.supabase
        .from('comment')
        .delete()
        .eq('postid', id);
    if (commentDeleteError) {
        return res.status(500).json({ error: commentDeleteError.message });
    }
    const { error: likeDeleteError } = await supabase_1.supabase
        .from('postlike')
        .delete()
        .eq('postid', id);
    if (likeDeleteError) {
        return res.status(500).json({ error: likeDeleteError.message });
    }
    const { data: post, error: postError } = await supabase_1.supabase
        .from('post')
        .delete()
        .eq('id', id)
        .single();
    if (postError || !post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
});
