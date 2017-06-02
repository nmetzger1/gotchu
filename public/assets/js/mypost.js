$(document).ready(function () {
    //Getting references to the post input and post container, as well as the table body
    var postList = $("tbody");
    var postContainer = $(".post-container");

    //Getting jQuery references to the post body, title, form, and category select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var postForm = $("#newPost");
    var postCategorySelect = $("#category");



    // Adding event listeners to the form to create a new object, and the buttons to edit and delete a post
    // $(document).on("click", "#completeBtn", handlePostComplete);
    // $(document).on("click", "#editBtn", handlePostEdit);

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
        console.log(postData);
        newTr.append("<td>" + postData.title + "</td>");
        newTr.append("<td>" + postData.body + "</td>");
        newTr.append("<td><button data-toggle='modal' class='btn-success' id='editBtn' href='#editPost'>Edit Post</button></td>");
        newTr.append("<td><button data-toggle='modal' class='btn-danger' id='completeBtn' href='#completePost'>Complete Post</button></td>");
        return newTr;
    }

    // Added
    //Populate Edit Modal
    $('tbody').on("click", "#editBtn", function () {

        //get postId in the row
        var postId = $(this).closest("tr").prop("id");
        console.log(postId);

        //get actual post Id
        var actualId = postId.split("post");
        console.log(actualId);

        $.get("/api/posts/" + actualId[1], function (data) {
            $('.modal-title').html('<h4>' + data.title + '</h4>');
            $('.postDetail').html('<p>' + data.body + '</p>');


        });

        //set postID for help button
        $('#submitBtn').data("postId", actualId[1]);
    });
    // // Added

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
            console.log(rows);
            postList.prepend(rows);
        }

    }

    //Function for showing user Reputation
    function getRep() {
        $.get("/api/userRep", function (data) {
            $('.reputation').html("My Rep: " + data);
        })
    }

    // // Update a given post, bring user to the member page when done
    // function handlePostEdit(post) {
    //     var currentPost = $(this)
    //         .parent()
    //         .parent()
    //         .data("post");
    //     window.location.href = ".update"
    // }
    //
    //
    // // Function for handling what happens when the remove button is clicked
    // function handleCompleteBtn() {
    //     var listItemData = $(this).parent("td").parent("tr").data("post");
    //     var id = listItemData.id;
    //     $.ajax({
    //         method: "PUT",
    //         url: "/api/posts/" + id
    //     })
    //         .done(getPosts);
    // }

});