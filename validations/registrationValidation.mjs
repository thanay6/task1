import Joi from 'joi';

const nameSchema = Joi.string().min(3).required();
const usernameSchema = Joi.string().pattern(/^[a-z0-9._]+$/).required();
const passwordSchema = Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required();
const phoneSchema = Joi.string().pattern(/^\d{10}$/).required();
const emailSchema = Joi.string().email().required();

export const adminSchema = Joi.object({
  firstName: nameSchema,
  lastName: nameSchema,
  userName: usernameSchema,
  password: passwordSchema,
  phoneNumber: phoneSchema,
  email: emailSchema
  // add other fields as required
});

function validateAdminRegistration(data) {
  return adminSchema.validate(data);
}

export default validateAdminRegistration;