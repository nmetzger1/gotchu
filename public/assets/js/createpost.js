
$(document).ready(function () {
    // Gets an optional query string from our url
    var url = window.location.search;
    var postId;
    // Sets a flag of whether or not we're updating a post to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the post id from the url
    if (url.indexOf("?post_id=") !== -1) {
        postId = url.split('=')[1];
        getPostData(postId);
    }

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
        console.log("New post: " + newPost);

        submitPost(newPost);

    });

    // Submits a new post and bring user to member page upon completion
    function submitPost(Post) {
        $.post("/api/posts/", Post, function () {
            window.location.href = '/member';
        });
    }


});
