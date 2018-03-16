const express = require("express")
const path = require("path")

const app = express()
const port = process.env.PORT || 8080

// Setup static assets
app.use(express.static("public"))

// Serve main index.html
app.get("/", noCache, (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"))
})

// Removing cache from the server
function noCache(req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate")
  res.header("Expires", "-1")
  res.header("Pragma", "no-cahce")
  next()
}

// Listening to the port
app.listen(port, () => {
  console.log(`🌍 Express server is up and running on port: ${port} 🐎`)
})
