import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup', 
    [   
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({min:4, max: 20})
            .withMessage('Password must be between 4 and 20 characters')
    ]
    , (req:Request, res:Response) => {
        const errors = validationResult(req); // the middleware above is validating email and password this extracts the errors out of the express object returned 
        if(!errors.isEmpty()){
            throw new RequestValidationError(errors.array()); // we convert that errors object to an array and feed it to our custom class which in turn will call our error handler because we threw an error here
        }
        const {email, password} = req.body;
        
        console.log('Creating a user');
        throw new DatabaseConnectionError();
        res.send({message:'Success'})
});

export {router as signupRouter};