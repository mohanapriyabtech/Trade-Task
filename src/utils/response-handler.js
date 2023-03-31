/**
 * response handlers
 */

class ResponseHandler {

    /**
     * 
     * @param {*} res 
     * @param {*} data 
     * @param {*} message 
     * @param {*} statusCode 
     * @returns 
     */
    successResponse = (res, data = {}, message = '', statusCode = 200) => {
        return res.status(statusCode).json({
            status_code: statusCode,
            status: true,
            message: message,
            data: data
        });
    }

    /**
     * 
     * @param {*} error 
     * @returns 
     */
    catchHandler = (error) => {
        return this.errorResponse(res, 'Exception caught', error);
    }

    /**
     * 
     * @param {*} res 
     * @param {*} message 
     * @param {*} data 
     * @param {*} statusCode 
     * @returns 
     */
    errorResponse = (res, message = '', data = {}, statusCode = 500) => {
        if (message && message != '' && typeof message == 'string') message = message.replace(/[^a-zA-Z ]/g, "");
        // mongoose validation error handler 
        if(data && data != undefined && data != null) {
            if (data.name === 'ValidationError' && data.errors) {
                let errors = Object.values(data.errors).map(el => el.message);
                let fields = Object.values(data.errors).map(el => el.path);
                if(errors.length > 1) {
                    console.log(errors);
                    const formattedErrors = errors.join(' ');
                    return res.status(400).json({
                        status_code: 400,
                        status: false,
                        message: formattedErrors[0],
                        data: fields
                    });
                } else {
                    return res.status(400).json({
                        status_code: 400,
                        status: false,
                        message: errors,
                        data: fields
                    });
                }
            }

            // mongoose duplicate entry error handler
            if(data.code && data.code == 11000) {
                return res.status(409).json({
                    status_code: 409,
                    status: false,
                    message: `An account with that ${Object.keys(data.keyValue)} already exists.`,
                    data: data
                });
            }
        }

        // general error response handler
        return res.status(statusCode).json({
            status_code: statusCode,
            status: false,
            message: message,
            data: data
        });
    }
}

export const responseHandler = new ResponseHandler();
