import { Router, Request, Response } from 'express'; 
import { supabase } from '../config/supabase';
import { validateContent } from '../middleware/validation';

const router = Router();

router.use(validateContent);

router.post('/posts/:id/comments', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content, username } = req.body;
    const displayName = username || "Anonymous";

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

router.put('/comments/:commentid', async (req: Request, res: Response) => {
    const { commentid } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content must be a non-empty string' });
    }

    const { data, error } = await supabase
        .from('comment')
        .update({ content })
        .eq('id', commentid)
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

router.delete('/comments/:commentid', async (req: Request, res: Response) => {
    const { commentid } = req.params;

    const { data, error } = await supabase
        .from('comment')
        .delete()
        .eq('id', commentid)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(204).send(); 
});


export { router };
