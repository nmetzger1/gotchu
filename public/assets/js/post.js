var newPost = {};

$(document).ready(function () {
    // Image
    var imgArr = ['http://68.media.tumblr.com/36ea5fe1d703d6e0a1427ae815bb69a8/tumblr_nxq628pdKV1ukl3gio2_r1_1280.jpg',
        'https://secure-akns.subaru.com/content/media/mp_hero_880/brz-17-sports-car-seating.jpg',
        'http://cdn.akc.org/Marketplace/Breeds/Boxer_SERP.jpg',
        'https://thumbs.dreamstime.com/z/happy-farmers-standing-arms-crossed-sunny-day-55571735.jpg',
        'https://sg-dae.kxcdn.com/blog/wp-content/uploads/2014/05/Hands-of-farmers-family-holdin-sapling.jpg'];
    //Getting references to the post input and post container

    // Getting the initial list of Posts
    getPosts();

    // Get User Reputation
    getRep();

    //Populate Detail Modal
    $('.post-area').on("click", ".detail-btn", function () {

        //get Id of Div
        var postId = $(this).closest("div").prop("id");

        //get actual post Id
        var actualId = postId.split("post");

        $.get("/api/posts/" + actualId[1], function (data) {
            $('.modal-title').html('<h4>' + data.title + '</h4>');
            $('.postDetail').html('<p>' + data.body + '</p>');
        });

        //set postID for help button
        $('.help-btn').data("postId", actualId[1]);
    });

    //Assign Helper
    $('.help-btn').on("click", function () {

       $.post("/api/helper/" + $(this).data("postId"), function () {
           window.location.href = '/member';
       })
    });

    //Function for showing user Reputation
    function getRep() {
        $.get("/api/userRep", function (data) {
            $('.reputation').html("My Rep: " + data);
        })
    }

    // // Function for creating a new list row for posts
    function createPostDiv(postData) {
    // RandomNuber
        var randNum = Math.floor(Math.random() * 10);

        var postId = "post" + postData.id;
        var Post = $('<div class="postings">');
        Post.attr('id', postId);

        Post.append('<img src= ' + postImage(postData.category) + ' +  width="250px">');
        // Post.append('<img src="https://s-media-cache-ak0.pinimg.com/originals/28/81/4d/28814dbf59005e2f4953ee62f76df0b6.jpg" width="250px">');
        Post.append("<p>" + postData.title + "</p>");
        Post.append("<p>" + postData.category + "</p>");
        Post.append("<p>" + postData.distance  + "</p>");
        Post.append('<button data-toggle="modal" class="detail-btn" href="#postInfo" >Details</button>');
        // var button = $('<button type="button" class="btn btn-default comment-btn" id="message" aria-label="Left Align"></button>');
        // Post.append(button);
        // button.append('<span class="glyphicon glyphicon-comment" aria-hidden="true"></span>');
        return Post;

    }

    //Function for determining post image
    function postImage(category) {

        switch (category){
            case "Home":
                return imgArr[0];
            case "Cars":
                return imgArr[1];
            case "Pets":
                return imgArr[2];
            case "Personal":
                return imgArr[3];
            default:
                return imgArr[4];
        }
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
