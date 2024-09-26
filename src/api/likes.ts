import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

router.post('/posts/:id/likes', async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data: post, error: postError } = await supabase
    .from('post') 
    .select('id')
    .eq('id', id)
    .single();

  if (postError || !post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { error: likeError } = await supabase
    .from('postlike')
    .insert([{ PostID: post.id }]);

  if (likeError) {
    return res.status(500).json({ error: likeError.message });
  }

  res.status(201).json({ message: 'Post liked successfully' });
});

router.post('/comments/:id/likes', async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data: comment, error: commentError } = await supabase
    .from('comment')
    .select('id, PostID')
    .eq('id', id)
    .single();

  if (commentError || !comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  const { error: likeError } = await supabase
    .from('postlike') 
    .insert([{ CommentID: comment.id, PostID: comment.PostID }]);

  if (likeError) {
    return res.status(500).json({ error: likeError.message });
  }

  res.status(201).json({ message: 'Comment liked successfully' });
});

export { router };









