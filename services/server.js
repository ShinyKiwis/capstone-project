const express = require("express");
const bodyParser = require("body-parser");
const helper = require("./helper");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    next();
  } else {
    jwt.verify(token, process.env.secretKey, (err, _) => {
      if (err) {
        switch (err.name) {
          case "TokenExpiredError":
            return res
              .status(401)
              .json({ message: "Unauthorized - Token Expired" });
          default:
            return res
              .status(403)
              .json({ message: "Forbidden - Invalid Token" });
        }
      }

      res.json({
        message: token,
      });
    });
  }
}

app.use(authenticateToken);

const apiRouter = express.Router();

apiRouter.post("/auth/login", async (req, res) => {
  let user = req.body;
  if (!helper.authenticate(user)) {
    return res
      .status(401)
      .json({ message: "Invalid username or password", authenticated: false });
  }
  // Call BE => Create User/Get User
  user = helper.getUser(user);
  try {
    const userResponse = await axios.post("http://localhost:3500/auth", {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username
    });

    // Return token
    const token = helper.jwt_generation(user);
    res.json({
      token: token,
      ...userResponse.data,
    });
  } catch (error) {
    console.log(error);
  }
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Services server is running on port ${PORT}`);
});
