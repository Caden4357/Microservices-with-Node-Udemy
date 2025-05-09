import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';
const app = express();
app.use(express.json());
app.use(cors());
const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts);
});
app.post('/posts/create', async (req, res) => {
    // adding comment 
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    const post = {
        id, title
    };
    posts[id] = post;
    console.log('POSTS: ', posts);
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    });
    res.status(201).send(post);
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
})

app.listen(4000, () => {
    console.log('v21');
    console.log('Listening on 4000');
});