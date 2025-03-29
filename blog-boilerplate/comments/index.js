import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';
const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});
app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex'); // generate a random id
    const { content } = req.body; // get the content from the request body
    const comments = commentsByPostId[req.params.id] || []; // get the comments for the post if they exist, or create an empty array
    comments.push({ id: commentId, content, status:'pending' }); // add the new comment to the array
    commentsByPostId[req.params.id] = comments; // save the comments array back to the post
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    });
    res.status(201).send(comments); 
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        console.log('Comment:', comment);
        axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        });
    }
    res.send({});
})

app.listen(4001, () => {
    console.log('Listening on 4001');
});