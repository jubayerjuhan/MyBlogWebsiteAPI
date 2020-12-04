const PATH = "./data.json";
const fs = require('fs');
class Post{

    get() {
        //!get List Of Blog Post
        return this.readData();
    }

    getIndividualBlog() {
        //!Get Individual Blog Post

    }

    add() {
        //!Add New Post

    }

    readData (){
        let rawdata = fs.readFileSync(PATH);
        let posts = JSON.parse(rawdata);
        return posts;
    }

}

module.exports = Post;