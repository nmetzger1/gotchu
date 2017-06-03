$(document).ready(function () {
    // Gets an optional query string from our url
    var url = window.location.search;
    var postId;
    var posts;
    // Sets a flag of whether or not we're updating a post to be false initially
    var updating = false;


    // Getting jQuery references to the post body, title, form, and category select
    var titleInput = $("#title");
    var bodyInput = $("#body");
    var postForm = $("#newPost");
    var postCategorySelect = $("#category");
    // Giving the postCategorySelect a default value
    postCategorySelect.val("Personal");
    // Adding an event listener for when the form is submitted
    $(postForm).on("submit", function handleFormSubmit(event) {
        event.preventDefault();

        var newPost = {
            title: titleInput.val(),
            body: bodyInput.val(),
            category: postCategorySelect.val()

        };
        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if (updating) {
            newPost.id = postId;
            updatePost(newPost);
        }
        else {
            submitPost(newPost);
        }
    });

    // Submits a new post and bring user to member page upon completion
    function submitPost(Post) {
        $.post("/api/posts", Post, function () {
            window.location.href = '/member';
        });
    }


});