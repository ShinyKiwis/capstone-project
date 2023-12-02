const express = require("express")
const bodyParser = require("body-parser")
const helper = require("./helper")


const app = express()
const PORT = 4000

app.use(bodyParser.json())

const apiRouter = express.Router()

apiRouter.post("/auth/login", (req, res) => {
  const user =req.body
  const is_authenticated = helper.authenticate(user)
  res.json({
    data: is_authenticated
  })
})

app.use("/api", apiRouter)

app.listen(PORT, () => {
  console.log(`Services server is running on port ${PORT}`)
})