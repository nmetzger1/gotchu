var newPost = {};

$(document).ready(function () {
    //Getting references to the post input and post container

    // Getting the initial list of Posts
    getPosts();

    // Get User Reputation
    getRep();


    //Function for showing user Reputation
    function getRep() {
        $.get("/api/userRep", function (data) {
            $('#reputation').html(data);
        })
    }


    // // Function for creating a new list row for posts
    function createPostDiv(postData) {

        var Post = $("<div class='postings'>");
        //Post.data("posts", postData);
        Post.append('<img src="https://s-media-cache-ak0.pinimg.com/originals/28/81/4d/28814dbf59005e2f4953ee62f76df0b6.jpg" width="250px">');
        Post.append("<p>" + postData.title + "</p>");
        Post.append("<p>" + postData.category + "</p>");
        Post.append("<p>" + postData.distance  + "</p>");
        Post.append('<button data-toggle="modal" href="#postInfo" >Details</button>');
        // var button = $('<button type="button" class="btn btn-default comment-btn" id="message" aria-label="Left Align"></button>');
        // Post.append(button);
        // button.append('<span class="glyphicon glyphicon-comment" aria-hidden="true"></span>');
        return Post;

    }


    // Function for retrieving posts and getting them ready to be rendered to the page
    function getPosts() {
        $.get('/api/posts/', function (data) {
            var postsToAdd = [];
            for (var i = 0; i < data.length; i++) {

                newPost = data[i];

                postsToAdd.push(createPostDiv(newPost));
                renderPost(postsToAdd);
            }
        });
    }


    // Function for rendering list of posts to the page
    function renderPost(posts) {

        if (posts.length) {
            $(".post-area").prepend(posts);
        }

    }

});