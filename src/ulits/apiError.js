class ApiError extends Error {  //The ApiError class extends the built-in Error class
    constructor(
        statusCode, //The HTTP status code (e.g., 404, 500) representing the error type.
        message= "Something went wrong", // default msg, if no message is provided
        errors = [], //that can hold detailed error information (default empty)
        stack = ""  //A stack trace, which helps in debugging
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack  // if it is provided
        } else{
            Error.captureStackTrace(this, this.constructor)  // This is a standard method in JavaScript to capture the error's stack trace,
        }

    }
}

export {ApiError}