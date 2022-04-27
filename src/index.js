require("dotenv").config();
const port = process.env.PORT || 3000;
const mainRouter = require("./routes/main");
const usersRouter = require("./routes/users");
const db = require("../config/config");

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const docRouter = express.Router();

app.get("/api/ping", (req, res) => {
  res.send("API is up and running!");
});

docRouter.use("/swagger", swaggerUi.serve);
docRouter.get("/swagger", swaggerUi.setup(swaggerDocument));

app.use("/docs", docRouter);

httpServer.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    httpServer.close();
  }
});
app.use("/", mainRouter);
app.use("/users", usersRouter);

// Socket IO
io.on("connection", (socket) => {
  socket.on("to-server", () => {
    console.log("Socket received from client !");
    socket.emit("to-client");
  });
});
