const fs = require("fs")

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

module.exports = {
  authenticate
}