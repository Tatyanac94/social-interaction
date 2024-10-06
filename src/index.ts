// import 'dotenv/config'; 
// import express from 'express';
// import { json } from 'express';
// import cors from 'cors'; 
// import { router as postRouter } from './api/posts';
// import { router as commentRouter } from './api/comments';
// import { router as likeRouter } from './api/likes';
// import { router as commentLikeRouter } from './api/commentLikes';
// import { errorHandler } from './utils/errorHandler';
// import { supabase } from './config/supabase';

// const app = express();
// const PORT = process.env.PORT || 4000;

// app.use(cors()); 
// app.use(json());

// app.get('/', async (req, res) => {
//     try {
//         const { data: posts, error: postError } = await supabase
//             .from('post')
//             .select('*')
//             .order('timestamp', { ascending: false });

//         if (postError) {
//             return res.status(500).json({ error: postError.message });
//         }

//         const postsWithDetails = await Promise.all(
//             posts.map(async (post) => {
//                 const { data: comments } = await supabase
//                     .from('comment')
//                     .select('*')
//                     .eq('postid', post.id);

//                 // Handle potential null for comments
//                 const commentsWithLikes = await Promise.all(
//                     (comments || []).map(async (comment) => {
//                         const { count: commentLikeCount } = await supabase
//                             .from('postlike')
//                             .select('id', { count: 'exact', head: true })
//                             .eq('commentid', comment.id);

//                         return {
//                             ...comment,
//                             likeCount: commentLikeCount || 0, // Default to 0 if no likes
//                         };
//                     })
//                 );

//                 const { count: likeCount } = await supabase
//                     .from('postlike')
//                     .select('id', { count: 'exact', head: true })
//                     .eq('postid', post.id);

//                 return {
//                     ...post,
//                     comments: commentsWithLikes, // Include comments with like counts
//                     likeCount: likeCount || 0, // Default to 0 if likeCount is null
//                 };
//             })
//         );

//         res.json(postsWithDetails);
//     } catch (err) {
//         console.error('Server Error:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.use('/api/posts', postRouter);
// app.use('/api/comments', commentRouter);
// app.use('/api/likes', likeRouter);
// app.use('/api/likes', commentLikeRouter);

// app.use(errorHandler);

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });













import 'dotenv/config'; 
import express from 'express';
import { json } from 'express';
import cors from 'cors'; 
import { router as postRouter } from './api/posts';
import { router as commentRouter } from './api/comments';
import { router as likeRouter } from './api/likes';
import { router as commentLikeRouter } from './api/commentLikes';
import { errorHandler } from './utils/errorHandler';
import { supabase } from './config/supabase';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); 
app.use(json());

app.get('/', async (req, res) => {
    try {
        const { data: posts, error: postError } = await supabase
            .from('post')
            .select('*')
            .order('timestamp', { ascending: false });

        if (postError) {
            return res.status(500).json({ error: postError.message });
        }

        const postsWithDetails = await Promise.all(
            posts.map(async (post) => {
                const { data: comments } = await supabase
                    .from('comment')
                    .select('*')
                    .eq('postid', post.id);

                // Handle potential null for comments
                const commentsWithLikes = await Promise.all(
                    (comments || []).map(async (comment) => {
                        const { count: commentLikeCount } = await supabase
                            .from('postlike')
                            .select('id', { count: 'exact', head: true })
                            .eq('commentid', comment.id);

                        return {
                            ...comment,
                            likeCount: commentLikeCount || 0, // Default to 0 if no likes
                        };
                    })
                );

                const { count: likeCount } = await supabase
                    .from('postlike')
                    .select('id', { count: 'exact', head: true })
                    .eq('postid', post.id);

                return {
                    ...post,
                    comments: commentsWithLikes, // Include comments with like counts
                    likeCount: likeCount || 0, // Default to 0 if likeCount is null
                };
            })
        );

        // Rearranging the structure to show like count above the timestamp
        const formattedPosts = postsWithDetails.map(post => ({
            content: post.content,
            username: post.username,
            likeCount: post.likeCount, // Move like count here
            timestamp: post.timestamp,
            comments: post.comments,
        }));

        res.json(formattedPosts);
    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);
app.use('/api/likes', commentLikeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
