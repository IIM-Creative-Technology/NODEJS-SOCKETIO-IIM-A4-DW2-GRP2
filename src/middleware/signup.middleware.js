const db = require("../models");
const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Email
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Email is already in use!"
            });
            return;
        }
        next();
    });
};

const signupMiddleware = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};
module.exports = signupMiddleware;