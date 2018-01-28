const express = require("express"),
  path = require("path"),
  port = process.env.PORT || 8080,
  app = express()

// Setup static assets
app.use("/build", express.static(path.resolve(__dirname, "/build")))
app.use(
  "/public/favicon.ico",
  express.static(path.resolve(__dirname, "/public/favicon.ico"))
)

// Serve main index.html
app.get("*", noCache, (req, res) => {
  res.sendFile(path.resolve(__dirname, "/public/index.html"))
})

// Removing cache from the server
function noCache(req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate")
  res.header("Expires", "-1")
  res.header("Pragma", "no-cahce")
  next()
}

app.listen(port, () => console.log(`Server listening to port: ${port}`))
