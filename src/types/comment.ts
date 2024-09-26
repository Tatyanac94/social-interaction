export interface comment {
  id: number;
  postId: number;
  content: string;
  timestamp: string;
}

export interface CreateCommentRequest {
  content: string;
}

export interface CreateCommentResponse {
  id: number;
  postId: number; 
  content: string;
  timestamp: string;
}

export interface GetCommentsResponse {
  comments: Comment[];
}
