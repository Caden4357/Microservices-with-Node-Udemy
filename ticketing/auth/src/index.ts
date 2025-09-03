
import startDb from './config/mongoose.config';
import { app } from './app';
startDb();

app.listen(3000, () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT not defined')
    }
    console.log('Listening on port 3000!');
})