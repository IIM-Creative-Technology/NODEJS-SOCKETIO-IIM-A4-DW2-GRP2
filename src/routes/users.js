const UserService = require("../services/userService");
const userService = new UserService();

const router = require("express").Router();

router.post("/", (req, res) => {
    // #swagger.summary = 'Create a new user';
    // #swagger.tags = ['Users']
    try {
        const result = userService.createUser(req.body);
        res.send(result);
    } catch (error) {
        res.status(400);
        res.send("An error occured while creating user");
    }
});

router.get("/:id", (req, res) => {
    // #swagger.summary = 'Get user by id'
    // #swagger.tags = ['Users']
    res.send(req.params);
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

router.delete("/:id", async (req, res) => {
    // #swagger.summary = 'Delete user by id'
    // #swagger.tags = ['Users']
    /* #swagger.parameters['parameterName'] = {
          offset: <integer>,
          limit: <integer>,
          search: <string>,
    } */

    try {
        await userService.deleteUser(req.params.id)
        res.send()
    } catch (error) {
        res.status(400);
        res.send("An error occured when deleting user");
    }
});

module.exports = router;
