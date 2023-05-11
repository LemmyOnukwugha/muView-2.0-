const fs = require("fs")
const path = require("path")
const mongoose = require("mongoose")
const Album = require("./models/Album")
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "album.json"), "utf8")
)

mongoose.connect(
  "mongodb+srv://lemmyinquiry:fiqgyt-xyjMu3-qynzyj@cluster0.lqs0po9.mongodb.net/?retryWrites=true&w=majority"
)
const db = mongoose.connection
db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`)
  Album.create(data)
    .then((res) => {
      console.log("data successfully inserted")
    })
    .catch((err) => {
      console.log("Error occurred with sedding")
      console.log(err)
    })
  // Album.deleteMany()
  //   .then((res) => console.log("done"))
  //   .catch((err) => console.log(err))
})
