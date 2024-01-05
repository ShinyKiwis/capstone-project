const fs = require("fs")
const jwt = require("jsonwebtoken")
require('dotenv').config()

let userData
try {
  filepath = "users.json"
  userData = JSON.parse(fs.readFileSync(filepath, "utf-8"))
} catch (err) {
  console.error(`[ERROR] Reading file ${filepath}`, err)
}
const usersByUsername = userData["users"].reduce((acc, user) => {
  acc[user.username] = user
  return acc
}, {})


function authenticate(user) {
  const {username, password, _} = user
  return usersByUsername[username]["password"] === password
}

function jwt_generation(user) {
  const payload = {
    username: user.username
  }
  return jwt.sign(payload, process.env.secretKey, {expiresIn: 60*30})
}

module.exports = {
  jwt_generation,
  authenticate
}