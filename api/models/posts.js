const PATH = "./data.json";
const fs = require('fs');
class Post {

    get() {
        //!get List Of Blog Post
        return this.readData();
    }

    getIndividualBlog(postID) {
        //!Get Individual Blog Post
        const posts = this.readData();
        const foundPost = posts.find((post) => post.id == postID);
        return foundPost;
    }

    add(newPost) {
        //!Add New Post
        let doubleSlash = newPost;
        console.log(doubleSlash.post_image);
        let image = newPost.post_image;
        doubleSlash["post_image"] = image.replace("\\","/");
        const currentPost = this.readData();
        currentPost.unshift(newPost);
        this.storeData(currentPost);

    }

    readData() {
        let rawdata = fs.readFileSync(PATH);
        let posts = JSON.parse(rawdata);
        return posts;
    }

    storeData(raData) {
        let data = JSON.stringify(raData);
        fs.writeFileSync(PATH, data);
    }

}

module.exports = Post;