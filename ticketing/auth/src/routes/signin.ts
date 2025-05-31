import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { body, validationResult } from 'express-validator';
import { Password } from '../services/password';
import { RequestValidationError } from '../errors/request-validation-error';
import { validateRequest } from '../middlewares/validate-request';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password must be between 4 and 20 characters')
    ], validateRequest,
    async (req: Request, res: Response) => {
        // check if user exists with email 
        const { email, password } = req.body;
        const potentialUser = await User.findOne({ email });
        if (!potentialUser) {
            throw new BadRequestError('Invalid Credentials.');
        }
        const dbPass = await Password.compare(potentialUser.password, password);
        if (!dbPass) {
            throw new BadRequestError('Invalid Credentials.');
        }
        const token = jwt.sign({
            id: potentialUser.id,
            email: potentialUser.email
        }, process.env.JWT_KEY!);
        // store it on session object
        req.session = {
            jwt: token
        }; // because were using TS we just set session to a new object rather than using dot notation
        res.status(201).send(potentialUser);
    });

export { router as signinRouter };