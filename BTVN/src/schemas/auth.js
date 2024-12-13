import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().required().trim().messages({
        "any.required": "Username là trường bắt buộc",
        "string.empty": "Username không được để trống",
        "string.trim": "Username không được khoan trắng",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email là trường bắt buộc",
        "string.email": "Email không hợp lệ",
        "string.empty": "Email không được để trống",
    }),
    password: Joi.string().min(6).required().messages({
        "any.required": "Password là trường bắt buộc",
        "string.min": "Password phải có ít nhất {#limit} ký tự",
        "string.empty": "Password không được để trống",
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        "any.required": "Confirm password là trường bắt buộc",
        "any.only": "Confirm password không khớp với password",
        "string.empty": "Confirm password không được để trống",
    }),
    age: Joi.number().max(100).messages({
        "number.max": "Tuổi không hợp lệ",
    }),
});
