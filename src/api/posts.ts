import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { validateContent } from '../middleware/validation';

const router = Router();

// Apply validateContent middleware only for POST requests
router.post('/', validateContent, async (req: Request, res: Response) => {
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

// GET all posts
router.get('/', async (_req: Request, res: Response) => {
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
        .eq('postid', post.id);
      
      const { count: likeCount } = await supabase
        .from('postlike') 
        .select('id', { count: 'exact', head: true })
        .eq('postid', post.id);

      return {
        ...post,
        commentCount,
        likeCount
      };
    })
  );

  res.json(postsWithCounts);
});

// GET a specific post by ID
router.get('/:id', async (req: Request, res: Response) => {
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
    .eq('postid', post.id)
    .order('timestamp', { ascending: false });

  if (commentsError) {
    return res.status(500).json({ error: commentsError.message });
  }

  const { data: likes, error: likesError } = await supabase
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

// PUT to update a post by ID
router.put('/:id', validateContent, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  const { data: post, error: postError } = await supabase
    .from('post')
    .select('*')
    .eq('id', id)
    .single();

  if (postError || !post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { data, error } = await supabase
    .from('post')
    .update({ content })
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// DELETE a post by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  // Delete comments associated with the post
  const { error: commentDeleteError } = await supabase
    .from('comment')
    .delete()
    .eq('postid', id);

  if (commentDeleteError) {
    return res.status(500).json({ error: commentDeleteError.message });
  }

  // Delete likes associated with the post
  const { error: likeDeleteError } = await supabase
    .from('postlike')
    .delete()
    .eq('postid', id);

  if (likeDeleteError) {
    return res.status(500).json({ error: likeDeleteError.message });
  }

  // Delete the post
  const { data: post, error: postError } = await supabase
    .from('post')
    .delete()
    .eq('id', id)
    .single();

  if (postError || !post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json({ message: 'Post deleted successfully' });
});

export { router };



























