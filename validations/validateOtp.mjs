import Joi from 'joi';

const validateOtp = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        otp1: Joi.string().length(6).optional(),
        otp2: Joi.string().length(6).optional()
    }).or('otp1', 'otp2');  // At least one OTP (email or phone) is required
    return schema.validate(data);
};

export default validateOtp