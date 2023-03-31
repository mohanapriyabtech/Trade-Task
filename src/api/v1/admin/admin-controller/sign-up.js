// import Joi from 'joi'
// import { createAdmin } from '../../../../service/admin-service'
// import { responseHandler } from '../../../../utils/response-handler'




// /**
//  * @description API to create admin
//  * @param {*} req 
//  * @body 
//  * @param {*} res 
//  * @returns 
//  */
// export const adminSignupValidator = async(req, res, next)=>{
//     try {
//         const schema = Joi.object({
//             name: Joi.string().required().error(new Error("name id is required")),
//             email: Joi.string().required().error(new Error("email id is required")),
//             password: Joi.string().required().error(new Error("password id is required")),
//             profile_picture: Joi.string().error(new Error("please upload a proper profile_picture"))
//         })
//         const { error, value } = schema.validate(req.body)
//         if (error == undefined) {
//             next();
//         } else {
//             return responseHandler.errorResponse(res, error.message, {},  400);
//         }
//         // const admin = await createAdmin(req.body)
//     } catch (error) {
//         responseHandler.errorResponse(res, error.message, {}, 400)
//     }
// }

// export const adminSignup = async(req, res) => {
//     const admin = createAdmin(req.body)
// }