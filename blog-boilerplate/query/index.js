import express from 'express';
import cors from 'cors';
import axios from 'axios';
const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    if (type === 'PostCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    }
    if(type === 'CommentCreated') {
        const {id, content, postId} = data;
        const post = posts[postId];
        post.comments.push({id, content});
    }
    console.log(posts);
    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on 4002');
});