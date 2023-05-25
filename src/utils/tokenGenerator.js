const jwt = require("jsonwebtoken");
const moment = require("moment");


/**
 * Generate token
 * @param {ObjectId} userId
 * @param {ObjectId} userRole
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  userId,
  userRole,
  expires,
  type,
  secret = process.env.JWT_SECRET
) => {
  const payload = {
    sub: userId,
    role: userRole,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    process.env.JWT_TOKEN_EXPIRE_IN_MINUTES,
    "minutes"
  );
  const accessToken = generateToken(
    user.id,
    user.user_type,
    accessTokenExpires,
    "access"
  );
  return {
    token: accessToken,
    expires: accessTokenExpires.toDate(),
  };
}


module.exports = {
  generateAuthTokens,
};