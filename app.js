const express = require("express");
const ejs = require("ejs");
const app = express();


//Template Engine

app.set("view engine", "ejs");


// Middlewares
app.use(express.static('public'));

app.get("/index.html", function (req, res) {
  //const blog = { id: 1, title: "Blog title", description: "Blog description" };
  //res.send(blog);
    res.render("index")
});

app.get("/about.html", function (req, res) {
    //const blog = { id: 1, title: "Blog title", description: "Blog description" };
    //res.send(blog);
      res.render("about")
  });

  app.get("/add_post.html", function (req, res) {
    //const blog = { id: 1, title: "Blog title", description: "Blog description" };
    //res.send(blog);
      res.render("about")
  });



const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
