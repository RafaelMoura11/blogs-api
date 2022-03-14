// regex retirado do site: https://www.w3resource.com/javascript/form/email-validation.php#:~:text=To%20get%20a%20valid%20email,%5D%2B)*%24%2F.
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const { User } = require('../models');

const displayNameValidation = async (req, _res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return next(
    { status: 400, message: '"displayName" length must be at least 8 characters long' },
    ); 
  }
  next();
};

const emailValidation = async (req, _res, next) => {
  const { email } = req.body;

  if (!email) return next({ status: 400, message: '"email" is required' });

  if (!emailRegex.test(email)) {
    return next({ status: 400, message: '"email" must be a valid email' });
  }

  const isUserAlreadyRegistered = await User.findOne({ where: { email } });

  console.log(isUserAlreadyRegistered);

  if (isUserAlreadyRegistered) return next({ status: 409, message: 'User already registered' });
  
  next();
};

const passwordValidation = async (req, _res, next) => {
  const { password } = req.body;

  if (!password) return next({ status: 400, message: '"password" is required' });

  if (password.length !== 6) {
    return next({ status: 400, message: '"password" length must be 6 characters long' });
  }
  next();
};

module.exports = {
  displayNameValidation,
  emailValidation,
  passwordValidation,
};