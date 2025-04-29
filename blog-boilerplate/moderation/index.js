import express from 'express';
import axios from 'axios';
const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        console.log('CommentCreated event received');
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        console.log('status: ', status);
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                content: data.content,
                postId: data.postId,
                status
            }
        });
    }
    res.send({});
});

app.listen(4003, async () => {
    console.log('Listening on 4003');
});