
$(document).ready(function () {



    var postContainer = $(".postings");
    var postCategorySelect = $("#category");

    // $(document).on("click", "button.delete", handlePostDelete);
    // $(document).on("click", "button.edit", handlePostEdit);
    postCategorySelect.on("change", handleCategoryChange);
    var posts;

// This function grabs the Post from the db and updates the view
    function getPosts(category) {
        var categoryString = category || "";
        if(categoryString) {
            categoryString = "/category/" + categoryString;
        }
        $.get("/api/posts" + categoryString, function (data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty();
            }
            else {
                initializeRows();
            }
        });
    }

// // This function does an API call to delete posts
//     function deletePost(id) {
//         $.ajax({
//             method: "DELETE",
//             url: "/api/posts/" + id
//         })
//             .done(function () {
//                 getPosts(postCategorySelect.val());
//             });
//     }

// Getting the initial list of posts
    getPosts();
    // InitializeRows handles appending all of our constructed post HTML insiede the postContainer
    function initializeRows() {
        postContainer.empty();
        var postsToAdd =[];
        for (var i = 0; i < posts.length; i++ ) {
            postsToAdd.push(createNewRow(posts[i]));
        }
        postContainer.append(postsToAdd);
    }

// This function constructs a post's HTML
    function createNewRow(post) {
        var newPostPanel = $("<div>");
        newPostPanel.addClass("panel panel-default");
        var newPostPanelHeading = $("<div>");
        newPostPanelHeading.addClass("panel-heading");
        // var deleteBtn = $("<button>");
        // deleteBtn.text("X");
        // deleteBtn.addClass("delete btn btn-danger");
        // var editBtn = $("<button>");
        // editBtn.text("Edit");
        // editBtn.addClass("edit btn btn-default");
        var newPostTitle = $("<h2>");
        var newPostPanelBody = $("<div>");
        newPostPanelBody.addClass("panel-body");
        var newPostBody = $("<p>");
        newPostTitle.text(post.title + " ");
        newPostBody.text(post.body);
        // newPostPanelHeading.append(deleteBtn);
        // newPostPanelHeading.append(editBtn);
        newPostPanelHeading.append(newPostTitle);
        newPostPanelBody.append(newPostBody);
        newPostPanel.append(newPostPanelHeading);
        newPostPanel.append(newPostPanelBody);
        newPostPanel.data("post", post);
        return newPostPanel;
    }

// // This function figures out which post we want to delete and then calls deletePost
//     function handlePostDelete() {
//         var currentPost = $(this)
//             .parent()
//             .parent()
//             .data("post");
//         deletePost(currentPost.id);
//     }

// // This function figures out which post we want to edit and takes it to the appropriate url
//     function handlePostEdit() {
//         var currentPost = $(this)
//             .parent()
//             .parent()
//             .data("post");
//         window.location.href = "/member?post_id" + currentPost.id;
//     }

// This function displays a message when there are no posts
    function displayEmpty() {
        postContainer.empty();
        var message = $("<h2>");
        message.html("No posts yet for this category. Be the first to create one!");
        postContainer.append(message);
    }

// This function handles reloading new posts when category changes
    function handleCategoryChange() {
        var newPostCategory = $(this).val();
        getPosts(newPostCategory);
    }
});
