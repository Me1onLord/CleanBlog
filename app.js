const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejs = require("ejs");
const Post = require("./models/Post");



const app = express();

// connect D
mongoose.connect("mongodb://localhost/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine

app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', {
  methods: ["POST", "GET"]
}));

// ROUTES

app.get("/", async function (req, res) {
  const posts = await Post.find({}); 
  res.render("index", {
    posts:posts
  });
});

app.get("/posts/:id", async function (req, res) {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post
  })
});

app.get("/index.html", async function (req, res) {
  const posts = await Post.find({}); 
  res.render("index", {
    posts:posts
  });
});

app.get("/about.html", function (req, res) {
  
  res.render("about");
});

app.get("/add_post.html", function (req, res) {
  
  res.render("add_post");
});

app.get("/post.html", function (req, res) {
  
  res.render("post");
});

app.post("/posts", async (req,res) => {
  await Post.create(req.body);
  res.redirect('/add_post.html');
})

app.get("/posts/edit/:id", async function (req, res) {
  const post = await Post.findOne({_id: req.params.id})
  
  res.render("edit", {
    post
  });
});

app.put("/posts/:id", async function (req, res) {
  const post = await Post.findOne({_id: req.params.id})
  post.title = req.body.title;
  post.message = req.body.message;
  post.save();

  res.redirect(`/posts/${req.params.id}`);
});

app.delete("/posts/:id", async (req,res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect("/");
})

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
