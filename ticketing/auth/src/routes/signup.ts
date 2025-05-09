import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

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
    ]
    , async (req: Request, res: Response) => {
        const errors = validationResult(req); // the middleware above is validating email and password this extracts the errors out of the express object returned 
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array()); // we convert that errors object to an array and feed it to our custom class which in turn will call our error handler because we threw an error here
        }
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if(existingUser){
            throw new BadRequestError('Email already in use')
        }

        const user = User.build({email, password});
        await user.save();
        res.status(201).send(user);
    });

export { router as signupRouter };