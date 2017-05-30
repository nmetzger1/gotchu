

$(document).ready(function () {
    //Getting references to the post input and post container

    var postDiv = $(".post-area")

    // Getting the initial list of Posts
    getPosts();

    // Function for creating a new list row for posts
    function createPostDiv(postData) {
        var Post = $(".postings");
        Post.data("posts", postData);
        console.log("Post data: " + postData);
        $(".post-title").append("<p>" + postData.title + "</p>");
        $(".post-body").append("<p>" + postData.body + "</p>");
        $(".post-category").append("<p>" + postData.category + "</p>");
        return Post;

    }




    // Function for retrieving posts and getting them ready to be rendered to the page
    function getPosts() {
        $.get('/api/posts/', function (data) {
            var postsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                postsToAdd.push(createPostDiv(data[i]));
            }
            renderPost(postsToAdd);
        });
    }


    // Function for rendering list of posts to the page
    function renderPost(posts) {
        postDiv.children().not(":last").remove();
        // postContainer.children(".alert").remove();
        if (posts.length) {
            console.log(posts);
            postDiv.prepend(posts);
        }

    }

});



