import express from 'express';
import startDb from './config/mongoose.config';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFound } from './errors/not-found-error';
const app = express();
app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);



app.all('*', async (req, res, next) => {
    throw new NotFound();
})

app.use(errorHandler);

startDb();

app.listen(3000, () => {
    console.log('Listening on port 3000!');
})