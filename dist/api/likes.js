"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const supabase_1 = require("../config/supabase");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/posts/:id/likes', async (req, res) => {
    const { id } = req.params;
    const { data: post, error: postError } = await supabase_1.supabase
        .from('post')
        .select('id')
        .eq('id', id)
        .single();
    if (postError || !post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const { error: likeError } = await supabase_1.supabase
        .from('postlike')
        .insert([{ PostID: post.id }]);
    if (likeError) {
        return res.status(500).json({ error: likeError.message });
    }
    res.status(201).json({ message: 'Post liked successfully' });
});
router.post('/comments/:id/likes', async (req, res) => {
    const { id } = req.params;
    const { data: comment, error: commentError } = await supabase_1.supabase
        .from('comment')
        .select('id, PostID')
        .eq('id', id)
        .single();
    if (commentError || !comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    const { error: likeError } = await supabase_1.supabase
        .from('postlike')
        .insert([{ CommentID: comment.id, PostID: comment.PostID }]);
    if (likeError) {
        return res.status(500).json({ error: likeError.message });
    }
    res.status(201).json({ message: 'Comment liked successfully' });
});
