const httpStatus = require("http-status");
const TrackError = require("../middleware/TrackError");
const prismaClient = require("../utils/prisma.client");
const { getUserByEmail } = require("../services/user.services");
const { comparePassword } = require("../utils/helperFunction");
const { generateAuthTokens } = require("../utils/tokenGenerator");

const login = TrackError(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(httpStatus.BAD_REQUEST).send({ success: false, message: "invalid email or password" })
    }
    console.log(await comparePassword(user.password, password), "<== user")
    if (await comparePassword(user.password, password) === false) {
        return res.status(httpStatus.BAD_REQUEST).send({ success: false, message: "invalid email or password" })
    }
    const tokens = await generateAuthTokens(user);
    res.status(httpStatus.OK).send({ success: true, user, tokens });
})

const getMyself = TrackError(async (req, res, next) => {
    const user = req.user;
    res.status(200).send(user)
})

module.exports = { login, getMyself }