import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
const router = express.Router();

router.post('/api/users/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters')
    ], validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email already in use')
        }

        const user = User.build({ email, password });
        await user.save();

        // generate jwt 
        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);
        // store it on session object
        req.session = {
            jwt: token
        }; // because were using TS we just set session to a new object rather than using dot notation

        res.status(201).send(user);
    });

export { router as signupRouter };