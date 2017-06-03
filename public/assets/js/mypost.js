var newPost = {};

$(document).ready(function () {
    //Getting references to the post input and post container, as well as the table body
    var postList = $("tbody");
    var postContainer = $(".post-container");

    //Getting jQuery references to the post body, title, form, and category select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var postCategorySelect = $("#category");



    // Getting the initial list of Posts
    getPosts();

    // Get User Reputation
    getRep();


    // Function for creating a new list row for posts
    function createPostRow(postData) {
        var postId = "post" + postData.id;

        var newTr = $("<tr>");
        newTr.attr('id', postId);
        newTr.data("posts", postData);
        newTr.append("<td>" + postData.title + "</td>");
        newTr.append("<td>" + postData.body + "</td>");
        newTr.append("<td><button data-toggle='modal' class='btn-success' id='editBtn' href='#editPost'>Edit Post</button></td>");
        newTr.append("<td><button data-toggle='modal' class='btn-danger' id='completeBtn' href='#completePost'>Complete Post</button></td>");
        return newTr;
    }

    // Get post data for a post if editing

    $('tbody').on("click", "#editBtn", function () {

        //get postId in the row
        var postId = $(this).closest("tr").prop("id");

        //get actual post Id
        var actualId = postId.split("post");

        // Populate Edit Post Modal
        $.get("/api/posts/" + actualId[1], function (data) {
            $('#title').html(data.title);
            $('#body').html(data.body);
        });

        //set postID for Save Changes button
        $('#saveChanges').data("postId", actualId[1]);
    });

    //Update Post on Save Changes
    $('#saveChanges').on("click", function () {

        var newPost = {
            title: titleInput.val().trim(),
            body: bodyInput.val().trim(),
            category: postCategorySelect.val()
        };

        $.post("/api/posts/" + $(this).data("postId"), newPost)
            .done(function () {
                window.location.href = "/myposts";
            })
    });

    // Function for retrieving posts and getting them ready to be rendered to the page
    function getPosts() {
        $.get('/api/posts/byId',  function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createPostRow(data[i]));
            }
            renderPostList(rowsToAdd);
        });
    }


    // Function for rendering list of posts to the page
    function renderPostList(rows) {
        postList.children().not(":last").remove();
        postContainer.children(".alert").remove();
        if (rows.length) {
            postList.prepend(rows);
        }

    }

    //Function for showing user Reputation
    function getRep() {
        $.get("/api/userRep", function (data) {
            $('.reputation').html("My Rep: " + data);
        })
    }

});