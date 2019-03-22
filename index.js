const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("pages/home", { page: "Home", menuId: "home" });
});

app.get("/articles", function(req, res) {
  request("https://jsonplaceholder.typicode.com/posts", function(
    error,
    response,
    body
  ) {
    const data = JSON.parse(body);
    //console.log(data);

    request("https://jsonplaceholder.typicode.com/comments", function(
      error,
      response,
      body
    ) {
      const nbcomments = JSON.parse(body);
      //console.log(nbcomments);
      res.render("pages/articles", {
        page: "Articles",
        menuId: "articles",
        data: data,
        nbcomments: nbcomments
      });
    });
  });
});

app.get("/article/:id", function(req, res) {
  //console.log(req.params.id);
  //console.log(req.params.body);
  request(
    "https://jsonplaceholder.typicode.com/posts/" + req.params.id,
    function(error, response, body) {
      const info = JSON.parse(body);
      //console.log(info);

      request(
        "https://jsonplaceholder.typicode.com/comments?postId=" + req.params.id,
        function(error, response, body) {
          const comments = JSON.parse(body);
          //console.log(info);
          //console.log(comments);
          res.render("pages/article", {
            page: "Article" + req.params.id,
            menuId: "article" + req.params.id,
            info: info,
            comments: comments
          });
        }
      );
    }
  );
});

app.get("/albums", function(req, res) {
  request("https://jsonplaceholder.typicode.com/albums", function(
    error,
    response,
    body
  ) {
    const albums = JSON.parse(body);
    //console.log(info);
    //console.log(comments);
    res.render("pages/albums", {
      page: "Albums",
      menuId: "albums",
      albums: albums
    });
  });
});

app.get("/album/:id", function(req, res) {
  request(
    "https://jsonplaceholder.typicode.com/photos?albumId=" + req.params.id,
    function(error, response, body) {
      const photos = JSON.parse(body);
      //console.log(info);
      //console.log(comments);
      res.render("pages/album", {
        page: "Album" + req.params.id,
        menuId: "album" + req.params.id,
        photos: photos
      });
    }
  );
});

app.get("/contact", function(req, res) {
  res.render("pages/contact");
});

const server = app.listen(8000, function() {
  console.log("server on 8000");
});
