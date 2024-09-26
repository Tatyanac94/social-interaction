import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { validateContent } from '../middleware/validation';

const router = Router();

router.use(validateContent);

router.post('/posts', async (req: Request, res: Response) => {
  const { content } = req.body;

  const { data, error } = await supabase
    .from('post') 
    .insert([{ content }])
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

router.get('/posts', async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('post') 
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const postsWithCounts = await Promise.all(
    data.map(async (post: any) => {
      const { count: commentCount } = await supabase
        .from('comment') 
        .select('id', { count: 'exact', head: true })
        .eq('PostID', post.id);
      
      const { count: likeCount } = await supabase
        .from('postlike') 
        .select('id', { count: 'exact', head: true })
        .eq('PostID', post.id);

      return {
        ...post,
        commentCount,
        likeCount
      };
    })
  );

  res.json(postsWithCounts);
});

router.get('/posts/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data: post, error: postError } = await supabase
    .from('post')
    .select('*')
    .eq('id', id)
    .single();

  if (postError || !post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { data: comments, error: commentsError } = await supabase
    .from('comment')
    .select('*')
    .eq('PostID', post.id)
    .order('timestamp', { ascending: false });

  if (commentsError) {
    return res.status(500).json({ error: commentsError.message });
  }

  const { data: likes, error: likesError } = await supabase
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

export { router };