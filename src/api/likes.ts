import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

// Get likes for a specific post
router.get('/posts/:id/likes', async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data: likes, error } = await supabase
    .from('postlike') 
    .select('*')
    .eq('postid', id); 

  if (error) {
    console.error('Error fetching likes:', error);
    return res.status(500).json({ error: 'Failed to fetch likes' });
  }

  res.json(likes || []); 
});









// Like a post with a username
router.post('/posts/:id/likes', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.body; // Get the username from the request body

  const { data: post, error: postError } = await supabase
    .from('post')
    .select('id')
    .eq('id', id)
    .single();

  if (postError || !post) {
    console.error('Post not found:', postError);
    return res.status(404).json({ error: 'Post not found' });
  }

  const { error: likeError } = await supabase
    .from('postlike')
    .insert([{ postid: post.id, username }]); // Insert username with like

  if (likeError) {
    console.error('Error liking post:', likeError);
    return res.status(500).json({ error: 'Failed to like post' });
  }

  res.status(201).json({ message: 'Post liked successfully' });
});



// // Like a post
// router.post('/posts/:id/likes', async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const { data: post, error: postError } = await supabase
//     .from('post')
//     .select('id')
//     .eq('id', id)
//     .single();

//   if (postError || !post) {
//     console.error('Post not found:', postError);
//     return res.status(404).json({ error: 'Post not found' });
//   }

//   const { error: likeError } = await supabase
//     .from('postlike')
//     .insert([{ postid: post.id }]); 

//   if (likeError) {
//     console.error('Error liking post:', likeError);
//     return res.status(500).json({ error: 'Failed to like post' });
//   }

//   res.status(201).json({ message: 'Post liked successfully' });
// });

// Delete a like by ID
router.delete('/likes/:likeId', async (req: Request, res: Response) => {
  const { likeId } = req.params;

  const { error } = await supabase
    .from('postlike')
    .delete()
    .eq('id', likeId); 

  if (error) {
    console.error('Error deleting like:', error);
    return res.status(500).json({ error: 'Failed to delete like' });
  }

  res.json({ message: 'Like deleted successfully' });
});

export { router };
