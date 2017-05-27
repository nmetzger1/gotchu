
$(document).ready(function () {
    //Getting references to the post input and post container, as well as the table body
    var postList = $("tbody");
    var postContainer = $(".post-container");



    // Adding event listeners to the form to create a new object, and the buttons to edit and delete a post
    $(document).on("click", ".removePost", handleDeleteButtonPress);

    // Getting the initial list of Posts
    getPosts();

    // Function for creating a new list row for posts
    function createPostRow(postData) {
        var newTr = $("<tr>");
        newTr.data("posts", postData);
        console.log(postData);
        newTr.append("<td>" + postData.title + "</td>");
        newTr.append("<td>" + postData.body + "</td>");
        newTr.append("<td><a href='/member?post_id=" + postData.id + "'>Edit Post</a></td>");
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-post'>Remove Post</a></td>");
        return newTr;
    }


    // Function for retrieving posts and getting them ready to be rendered to the page
    function getPosts() {
        $.get('/api/posts', function (data) {
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

    // // Gets post data for a post if editing
    // function getPostData(id) {
    //     $.get("/api/posts/" + id, function (data) {
    //         if (data) {
    //             postTitle.val(data.title);
    //             postBody.val(data.body);
    //             postCategorySelect.val(data.category);
    //
    //             updating = true;
    //         }
    //     });
    // }
    //
    // // Update a given post, bring user to the member page when done
    // function editPost(post) {
    //     $.ajax({
    //         method: "PUT",
    //         url: "/api/posts",
    //         data: post
    //     })
    //         .done(function () {
    //             window.location.href = "/member";
    //         });
    // }


    // Function for handling what happens when the remove button is clicked
    function handleDeleteButtonPress() {
        var listItemData = $(this).parent("td").parent("tr").data("post");
        var id = listItemData.id;
        $.ajax({
            method: "DELETE",
            url: "/api/posts/" + id
        })
            .done(getPosts);
    }

});