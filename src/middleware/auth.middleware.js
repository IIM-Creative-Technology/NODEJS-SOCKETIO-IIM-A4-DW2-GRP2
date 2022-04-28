const jwt = require('jsonwebtoken');
const {jwtSecret} = require("../../config/auth.config");
const UserService = require("../services/userService");
const userService = new UserService();

/**
 * Verifies jwt token and passes user to request context
 * @param req
 * @param res
 * @param next
 */
const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader){
            res.status(401).send({message:'You are not logged in'});
            return;
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, jwtSecret, async (err, decoded) => {
            if(!decoded?.id){
                res.status(400).send({message: 'Unable to verify token'})
            }
            const user = await userService.findUserById(decoded.id);
            if (!user) {
                res.status(404).send({message: "User not found"});
            } else {
                req.user = user;
                next();
            }
        });
    } catch(error) {
        res.status(401).send(error);
    }
};

module.exports = auth;