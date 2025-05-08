import { CustomError } from "./custom-error";

export class NotFound extends CustomError {
    statusCode = 404;


    constructor() {
        super('Route Not Found')
        Object.setPrototypeOf(this, NotFound.prototype);

    }

    serializeErrors(): { message: string; field?: string; }[] {
        return [
            {
                message: 'Not Found'
            }
        ]
    }
}