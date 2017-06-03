var newPost = {};

$(document).ready(function () {
    // Image
    var imgArr = ['http://s.eatthis-cdn.com/media/images/ext/543627202/happy-people-friends.jpg',
        'http://i.huffpost.com/gen/3872496/images/n-HAPPY-628x314.jpg',
        'http://st.motortrend.com/uploads/sites/5/2017/04/2017-Honda-Civic-Si-Coupe-cabin-1.jpg',
        'https://secure-akns.subaru.com/content/media/mp_hero_880/brz-17-sports-car-seating.jpg',
        'http://cdn.attackofthecute.com/September-21-2011-22-10-11-6765.jpeg',
        'http://centeredmanproject.com/wp-content/uploads/2016/05/learn-from-conor-mcgregor-centeredmanproject.jpg',
        'http://homestead-and-survival.com/wp-content/uploads/2015/11/2-diy-bow-and-arrow-projects-for-survival.jpg',
        'https://thumbs.dreamstime.com/z/happy-farmers-standing-arms-crossed-sunny-day-55571735.jpg',
        'https://eatdrinkbetter.com/wp-content/uploads/2014/08/Happy-Farmer.jpg',
        'https://sg-dae.kxcdn.com/blog/wp-content/uploads/2014/05/Hands-of-farmers-family-holdin-sapling.jpg',
        'http://www.meh.ro/original/2010_03/meh.ro3660.jpg'];
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

        Post.append('<img src= ' + imgArr[randNum] + ' +  width="250px">');
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
