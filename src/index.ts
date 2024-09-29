// import 'dotenv/config';
// import express from 'express';
// import { json } from 'express';
// import { router as postRouter } from './api/posts';
// import { router as commentRouter } from './api/comments';
// import { router as likeRouter } from './api/likes';
// import { errorHandler } from './utils/errorHandler';
// import { supabase } from './config/supabase';

// const app = express();
// const PORT = process.env.PORT || 4000;

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

//                 const { count: likeCount } = await supabase
//                     .from('postlike')
//                     .select('id', { count: 'exact', head: true })
//                     .eq('postid', post.id);

//                 return {
//                     ...post,
//                     comments: comments || [],
//                     likeCount: likeCount || 0
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

// app.use(errorHandler);

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });










// import 'dotenv/config';
// import express from 'express';
// import { json } from 'express';
// import { router as postRouter } from './api/posts';
// import { router as commentRouter } from './api/comments';
// import { router as likeRouter } from './api/likes';
// import { errorHandler } from './utils/errorHandler';
// import { supabase } from './config/supabase';

// const app = express();
// const PORT = process.env.PORT || 4000;

// // Middleware to parse JSON bodies
// app.use(json());

// // Root endpoint to get all posts with comments and likes
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

//                 const { count: likeCount } = await supabase
//                     .from('postlike')
//                     .select('id', { count: 'exact', head: true })
//                     .eq('postid', post.id);

//                 return {
//                     ...post,
//                     comments: comments || [],
//                     likeCount: likeCount || 0,
//                 };
//             })
//         );

//         res.json(postsWithDetails);
//     } catch (err) {
//         console.error('Server Error:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // API routes
// app.use('/api/posts', postRouter);
// app.use('/api/comments', commentRouter);
// app.use('/api/likes', likeRouter);

// // Error handling middleware
// app.use(errorHandler);

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
















import 'dotenv/config'; 
import express from 'express';
import { json } from 'express';
import cors from 'cors'; // Import CORS
import { router as postRouter } from './api/posts';
import { router as commentRouter } from './api/comments';
import { router as likeRouter } from './api/likes';
import { errorHandler } from './utils/errorHandler';
import { supabase } from './config/supabase';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(cors()); // Enable CORS
app.use(json());

// Root endpoint to get all posts with comments and likes
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

                const { count: likeCount } = await supabase
                    .from('postlike')
                    .select('id', { count: 'exact', head: true })
                    .eq('postid', post.id);

                return {
                    ...post,
                    comments: comments || [],
                    likeCount: likeCount || 0,
                };
            })
        );

        res.json(postsWithDetails);
    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API routes
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
