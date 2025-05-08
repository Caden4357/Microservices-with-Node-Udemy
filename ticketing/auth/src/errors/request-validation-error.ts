import { ValidationError } from "express-validator"; // this is a type that refers to the type of error by express validator 
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[]){
        super('Error validating request');
        // only because were extending Error class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    
    serializeErrors(){
        return this.errors.map(err => {
            if (err.type === 'field') {
                return { message: err.msg, field: err.path };
            }
            return {message: err.msg};
        });
    };
}