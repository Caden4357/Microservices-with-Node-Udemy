import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
    console.log('Received Event');
    const event = req.body;
    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => { console.log(err.message) });
    axios.post('http://comments-srv:4001/events', event).catch((err) => { console.log(err.message) });
    axios.post('http://query-srv:4002/events', event).catch((err) => { console.log(err.message) });
    axios.post('http://moderation-srv:4003/events', event).catch((err) => { console.log(err.message) });

    res.send({status: 'OK'});
});

app.get('/events', (req, res) => {
    res.send(events);
});



app.listen(4005, () => {
    console.log('Event Bus listening on 4005');
});
