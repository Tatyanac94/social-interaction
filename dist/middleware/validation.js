"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCommentId = exports.validatePostId = exports.validateContent = void 0;
const supabase_1 = require("../config/supabase");
const validateContent = (req, res, next) => {
    const { content } = req.body;
    if (!content || typeof content !== 'string' || content.trim() === '') {
        return res.status(400).json({ error: 'Content must be a non-empty string' });
    }
    next();
};
exports.validateContent = validateContent;
const validatePostId = async (req, res, next) => {
    const { postId } = req.params;
    const { data: post, error } = await supabase_1.supabase
        .from('Post')
        .select('id')
        .eq('id', postId)
        .single();
    if (error || !post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    next();
};
exports.validatePostId = validatePostId;
const validateCommentId = async (req, res, next) => {
    const { commentId } = req.params;
    const { data: comment, error } = await supabase_1.supabase
        .from('comment')
        .select('id')
        .eq('id', commentId)
        .single();
    if (error || !comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    next();
};
exports.validateCommentId = validateCommentId;
