const UserService = require("../services/userService");
const userService = new UserService();
const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpiration } = require("../../config/auth.config");
const bcrypt = require("bcryptjs");
const {authJwt, verifySignUp} = require("../middleware");
const router = require("express").Router();

router.post("/", verifySignUp.checkDuplicateUsernameOrEmail, async (req, res) => {
    // #swagger.summary = 'Create a new user';
    // #swagger.tags = ['Users']
    try {
        res.send(await userService.createUser(req.body));
    } catch (error) {
        res.status(400);
        res.send("An error occured while creating user");
    }
});

router.post("/login", async (req, res) => {
    // #swagger.summary = 'Login route'
    // #swagger.tags = ['Users']
    /* #swagger.parameters['parameterName'] = {
          email: <string>,
          password: <string>
    } */
    try {
        const {email, password} = req.body;
        const user = await userService.findUserByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            // Generate an access token
            jwt.sign({email: user.email, id: user.id}, jwtSecret, {algorithm: 'HS256', expiresIn: jwtExpiration }, (err, token) => {
                res.send({
                    token,
                    id: user.id,
                    email: user.email
                });
            })
        } else {
            res.status(401);
            res.send({message: 'Email or password incorrect'});
        }
    } catch (error) {
        res.status(500).send({message: 'An error occured while signin you in'})
    }
});

router.get("/:id", authJwt, async (req, res) => {
    // #swagger.summary = 'Get user by id'
    // #swagger.tags = ['Users']
    try{
        const user = await userService.findUserById(req.params.id);

        if(user){
            if(user.id !== req.user.id && !req.user.isAdmin){
                res.status(403).send({message:'Not authorized'})
                return
            }

            res.json(user);

        }else{
            res.status(404).send({message: 'User not found'})
        }
    }catch (error){
        res.status(500).send({message: 'Internal server error'})
    }

});

router.get("/", async (req, res) => {
    // #swagger.summary = 'Search users'
    // #swagger.tags = ['Users']
    try {
        res.send(await userService.searchUsers(req.query));
    } catch (error) {
        res.status(400);
        res.send({message: "An error occured while searching users"})
    }
});

router.patch("/:id", authJwt, async (req, res) => {
    // #swagger.summary = 'Update user by id'
    // #swagger.tags = ['Users']
    /* #swagger.parameters['parameterName'] = {
          email: <string>,
          firstName: <string>,
          lastName: <string>,
          password: <string>
    } */
    try {
        const user = await userService.findUserById(req.params.id);

        if(user){
            if(user.id !== req.user.id && !req.user.isAdmin){
                res.status(403).send({message:'Not authorized'})
                return
            }
            const result = await userService.updateUser(user, req.body);
            result.password = undefined;
            res.send(result);
        }else{
            res.status(404).send({message: 'User not found'});
        }

    } catch (error) {
        res.status(500);
        res.send("An error occured when deleting user");
    }
});

router.delete("/:id", authJwt, async (req, res) => {
    // #swagger.summary = 'Delete user by id'
    // #swagger.tags = ['Users']
    /* #swagger.parameters['parameterName'] = {
          offset: <integer>,
          limit: <integer>,
          search: <string>,
    } */

    try {
        const user = await userService.findUserById(req.params.id);

        if(user){
            if(user.id !== req.user.id && !req.user.isAdmin){
                res.status(403).send({message:'Not authorized'})
                return
            }

            res.json(user);

        }else{
            res.status(404).send({message: 'User not found'})
        }
        await userService.deleteUser(req.params.id)
        res.send()
    } catch (error) {
        res.status(500);
        res.send("An error occured when deleting user");
    }
});

module.exports = router;
