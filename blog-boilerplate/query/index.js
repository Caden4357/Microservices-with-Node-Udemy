import express from 'express';
import cors from 'cors';
import axios from 'axios';
const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    }
    if(type === 'CommentCreated') {
        const {id, content, postId, status} = data;
        const post = posts[postId];
        console.log('&&&&&&&&&&& ',post.comments);
        post.comments.push({id, content, status});
    }
    if(type === 'CommentUpdated') {
        const {id, content, postId, status} = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    handleEvent(type, data);
    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on 4002');
    try{
        const res = await axios.get('http://event-bus-srv:4005/events');
        for (let event of res.data) {
            console.log('Processing event:', event.type);
            handleEvent(event.type, event.data);
        }
    }
    catch(err) {
        console.log(err.message);
    }
});