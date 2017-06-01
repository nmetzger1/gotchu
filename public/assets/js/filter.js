$(document).ready(function () {
    $("#search").on('keyup', function(event){
        filter();
    });
    // Declare variables
    function filter () {
        var input, filter, post, a, i;
        input = document.getElementById('search');
        filter = input.value.toUpperCase();
        post = document.getElementsByClassName('postings');
        // Loop through all list items, and hide those who don't match the search           query
        for (i = 0; i < post.length; i++) {
            a = post[i].getElementsByTagName("h1")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                post[i].style.display = "";
            } else {
                post[i].style.display = "none";
            }
        }
    }


});
