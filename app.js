const express = require('express');
const app = express();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })




//!Declaring Storage Of The Uploaded Pic
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
  })
  
const getExt = (mimeType) =>{
    switch(mimeType){

        case "image/png":
            return ".png";
        
        case "image/jpeg":
            return ".jpeg"
    }
}


var upload = multer({ storage: storage })
const Post = require('./api/models/posts');
const postsData = new Post();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

app.use(express.json());

app.use('/uploads',express.static("uploads"));

app.get("/api/posts", (req, res) => {
    res.status(200).send(postsData.get());
})

app.get("/api/posts/:post_id", (req, res) => {
    const postID = req.params.post_id;
    const foundPost = postsData.getIndividualBlog(postID);
    if (foundPost) {
        res.status(200).send(foundPost);
    } else {
        res.status(404).send("Not Found");
    }
})


app.post("/api/posts", upload.single('post-image'), (req, res) =>{
    const newPoost = {
        "id" : `${Date.now()}`,
        "title" : req.body.title,
        "content" : req.body.content,
        "post_image" : req.file.path,
        "added_date" : `${Date.now()}`
    }
    postsData.add(newPoost);
    res.status(201).send('Ok');
})


app.listen(3000, () => {
    console.log("Listening On http://localhost:3000")
})