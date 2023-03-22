const express = require("express");

const server = express();

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın
server.use(express.json());

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir
const {
  logger,
} = require("./middleware/middleware.js");
const userRouter = require("./users/users-router.js");
const postRouter = require("./posts/posts-router.js");

server.use("/api/users",logger, userRouter);
server.use("/api/users:id/posts",logger, postRouter);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

server.use((err, req, res, next) => {
  console.error(err);
 
  res.status(err.status||500).json({ message:err.message || "Server error",error:err });
});

module.exports = server;
