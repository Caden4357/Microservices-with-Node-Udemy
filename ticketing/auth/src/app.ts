import express from 'express';
import startDb from './config/mongoose.config';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFound } from './errors/not-found-error';
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test', // in test env this will be false to allow http req, otherwise it will be true allowing only https
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);



app.all('*', async (req, res, next) => {
    throw new NotFound();
})

app.use(errorHandler);

export { app }