$(document).ready(function () {
    $("#search").on('keyup', function(event){
        filter();
    });

    $('.catLink').on('click', function (event) {
        var post, text, i, cat;
        post = document.getElementsByClassName('postings');
            cat = $(this).data('type');
        for (var i = 0; i < post.length; i++) {
            text = post[i].getElementsByTagName("p")[0];
            if (cat == 'all') {
                post[i].style.display = "";
            }
            else if (text.innerHTML.toLowerCase().indexOf(cat) > -1) {
                post[i].style.display = "";
            } else {
                post[i].style.display = "none";
            }
        }
    });

    // Declare variables
    function filter () {
        var input, filter, post, a;
        input = document.getElementById('search');
        filter = input.value.toUpperCase();
        post = document.getElementsByClassName('postings');
        // Loop through all list items, and hide those who don't match the search           query
        for (var i = 0; i < post.length; i++) {
            a = post[i].getElementsByTagName("h1")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                post[i].style.display = "";
            } else {
                post[i].style.display = "none";
            }
        }
    }


});
