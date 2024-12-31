import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex'); // generate a random id
    const { content } = req.body; // get the content from the request body
    const comments = commentsByPostId[req.params.id] || []; // get the comments for the post if they exist, or create an empty array
    comments.push({ id: commentId, content }); // add the new comment to the array
    commentsByPostId[req.params.id] = comments; // save the comments array back to the post
    res.status(201).send(comments); 
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});