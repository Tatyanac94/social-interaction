"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const posts_1 = require("./api/posts");
const comments_1 = require("./api/comments");
const likes_1 = require("./api/likes");
const errorHandler_1 = require("./utils/errorHandler");
const supabase_1 = require("./config/supabase");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, express_2.json)());
app.get('/', async (req, res) => {
    try {
        const { data: posts, error: postError } = await supabase_1.supabase
            .from('post')
            .select('*')
            .order('timestamp', { ascending: false });
        if (postError) {
            return res.status(500).json({ error: postError.message });
        }
        const postsWithDetails = await Promise.all(posts.map(async (post) => {
            const { data: comments } = await supabase_1.supabase
                .from('comment')
                .select('*')
                .eq('postid', post.id);
            const { count: likeCount } = await supabase_1.supabase
                .from('postlike')
                .select('id', { count: 'exact', head: true })
                .eq('postid', post.id);
            return {
                ...post,
                comments: comments || [],
                likeCount: likeCount || 0
            };
        }));
        res.json(postsWithDetails);
    }
    catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.use('/api/posts', posts_1.router);
app.use('/api/comments', comments_1.router);
app.use('/api/likes', likes_1.router);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});