const router = require("express").Router();
const { user } = require("../models");

router.post("/", (req, res) => {
  // #swagger.summary = 'Create a new user';
  // #swagger.tags = ['Users']
  res.send("CREATE user");
});

router.get("/:id", async (req, res) => {
  // #swagger.summary = 'Get user by id'
  // #swagger.tags = ['Users']
  // const user = await User.findAll({
  //   where: {
  //     id: req.params.id
  //   }
  // });
  // console.log("User:", JSON.stringify(user));
  res.send(req.params);
});

router.get("/", async (req, res) => {
  // #swagger.summary = 'Get all users'
  // #swagger.tags = ['Users']

  //METHODE 1 BY ME
  const users = await user.findAll();
  console.log("All users:", JSON.stringify(users));

  // console.log(await user.findAll());
  res.send("get users");
});

router.delete("/:id", (req, res) => {
  // #swagger.summary = 'Delete user by id'
  // #swagger.tags = ['Users']
  res.send("DELETE USER");
});

module.exports = router;
