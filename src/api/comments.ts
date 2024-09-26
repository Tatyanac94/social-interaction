import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { validateContent } from '../middleware/validation';

const router = Router();

// Middleware to validate comment content
router.use(validateContent);

// Add a comment to a specific post
router.post('/posts/:id/comments', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content, username } = req.body;
    const displayName = username ? username : "Anonymous";

    if (!content) {
        return res.status(400).json({ error: 'Content cannot be empty' });
    }

    const { data: post, error: postError } = await supabase
        .from('post')
        .select('id')
        .eq('id', id)
        .single();

    if (postError || !post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const { data: comment, error: commentError } = await supabase
        .from('comment')
        .insert([{ postid: post.id, content, username: displayName }])
        .single();

    if (commentError) {
        return res.status(500).json({ error: commentError.message });
    }

    res.status(201).json(comment);
});

// Retrieve all comments for a specific post
router.get('/posts/:id/comments', async (req: Request, res: Response) => {
    const { id } = req.params;

    const { data: post, error: postError } = await supabase
        .from('post')
        .select('id')
        .eq('id', id)
        .single();

    if (postError || !post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const { data: comments, error: commentsError } = await supabase
        .from('comment')
        .select('*')
        .eq('postid', post.id)
        .order('timestamp', { ascending: false });

    if (commentsError) {
        return res.status(500).json({ error: commentsError.message });
    }

    res.json(comments);
});

export { router };
