const jwt = require("jsonwebtoken");
const { getUserByID } = require("../services/user.services");



const verify =
    (roles = null) =>
        async (req, res, next) => {
            const token = req.header("Authorization");
            if (!token) return res.status(401).send("Access Denied");
            try {
                const verified = jwt.verify(token, process.env.JWT_SECRET);
                // console.log(verified, "<==== veri")
                const user = await getUserByID(verified.sub);
                let flag = false;
                if (roles) {
                    for (let index = 0; index < roles.length; index++) {
                        if (verified.role === roles[index]) {
                            flag = true;
                            break;
                        }
                    }   
                    if (flag === true) {
                        req.user = user;
                        next();
                    } else {
                        console.log("error");
                        return res.status(401).send("Access Denied")
                    }
                } else {
                    req.user = user;
                    next();
                }
            } catch (err) {
                console.log(err)
                res.status(400).send("Invalid Token");
            }
        };

module.exports = { verify };
