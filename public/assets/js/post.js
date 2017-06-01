var newPost = {};

$(document).ready(function () {
    //Getting references to the post input and post container

    // Getting the initial list of Posts
    getPosts();

    // // Function for creating a new list row for posts
    function createPostDiv(postData) {

            var Post = $("<div class='postings'>");
            //Post.data("posts", postData);
            // console.log("posts", postData);
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

                console.log("HIT", i);
                newPost = data[i];


                $.get('/api/distance/' + data[i].UserId, function (distance) {

                    newPost.distance = distance;
                    postsToAdd.push(createPostDiv(newPost));
                    renderPost(postsToAdd);
                })
            }

        });
    }


    // Function for rendering list of posts to the page
    function renderPost(posts) {

        console.log(posts);
        if (posts.length) {
            console.log("BING!");
            console.log(posts);
            $(".post-area").prepend(posts);
        }

    }

});