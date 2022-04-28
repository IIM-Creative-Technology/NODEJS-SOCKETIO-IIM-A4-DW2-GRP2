require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const mainRouter = require("./routes/main");
const usersRouter = require("./routes/users");
const documentsRouter = require("./routes/documents")
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

httpServer.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    httpServer.close();
  }
});
app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/documents", documentsRouter);

// Socket IO
io.on("connection", (socket) => {
  socket.on("to-server", () => {
    console.log("Socket received from client !");
    socket.emit("to-client");
  });
});
