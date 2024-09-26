import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase'; 

export const validateContent = (req: Request, res: Response, next: NextFunction) => {
  const { content } = req.body;

  if (!content || typeof content !== 'string' || content.trim() === '') {
    return res.status(400).json({ error: 'Content must be a non-empty string' });
  }

  next();
};

export const validatePostId = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params; 

  const { data: post, error } = await supabase
    .from('Post')
    .select('id')
    .eq('id', postId)
    .single();

  if (error || !post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  next();
};

export const validateCommentId = async (req: Request, res: Response, next: NextFunction) => {
  const { commentId } = req.params; 

  const { data: comment, error } = await supabase
    .from('comment')
    .select('id')
    .eq('id', commentId)
    .single();

  if (error || !comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  next();
};
