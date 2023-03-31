
import Joi from 'joi';
import { User } from '../../../../models/user';
import { decrypt } from '../../../../utils/encrypt';
import { responseHandler } from '../../../../utils/response-handler';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const loginRequest = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().error(new Error("Email is required")),
        password: Joi.string().required().error(new Error("Password is required")),
    });
    const { error, value } = schema.validate(req.body);
    if (error == undefined) {
        next();
    } else {
        return responseHandler.errorResponse(res, error.message, {},  400);
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email}).catch((error) => {
            return responseHandler.errorResponse(res, 'Email not found', error, 400);
        });
        if (user && user.password != undefined) {
            if (decrypt(user.password) == req.body.password) {
                return responseHandler.successResponse(res, user, 'User logged in successfully');
            } else {
                return responseHandler.errorResponse(res, 'Password do not match');
            }
        } else {
            return responseHandler.errorResponse(res, 'Account does not exist');
        }
    } catch (err) {
        responseHandler.errorResponse(res, 'Exception caught', err);
    }
}