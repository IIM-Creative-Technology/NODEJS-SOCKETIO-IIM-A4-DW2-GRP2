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
    res.send("Une erreur est survenue lors de la création de l'utilisateur");
  }
});

router.get("/:id", (req, res) => {
  // #swagger.summary = 'Get user by id'
  // #swagger.tags = ['Users']
  res.send(req.params);
});

router.get("/", (req, res) => {
  // #swagger.summary = 'Get all users'
  // #swagger.tags = ['Users']
  res.send("get users");
});

router.delete("/:id", (req, res) => {
  // #swagger.summary = 'Delete user by id'
  // #swagger.tags = ['Users']
  try {
     userService.deleteUser(req.params.id);
    res.send()
  } catch (error) {
    res.status(400);
    res.send("Une erreur est survenue lors de la suppression de l'utilisateur");
  }
});

module.exports = router;
