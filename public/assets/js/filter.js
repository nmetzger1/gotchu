$('input').keypress(function(event) {
    // When Enter is clicked
    if(event.which === 13) {
        event.preventDefault();
        var input, filter, post, userText, i, userInput;
        input = $('#searchFilter');
        post = $('.userText');
        filter = input.value.toUpperCase();

        userInput = $('#searchFilter').val();
        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < post.length; i++) {
            // looks at post for matching letter
            userText = post[i].getElementsByTagName("p")[0];
            // if letter exists....
            if (userText.innerHTML.toLowerCase() == userInput.toLowerCase()) {
                //get all IDs add show class;
                var getId = userText.innerHTML;
                var hashGetId = "#" + getId.toLowerCase();
                console.log(hashGetId);
                $(hashGetId).attr('class', 'show');
                return false;
            } else {
                // hide them
                $('#house').attr('class','hide');
                $('#car').attr('class','hide');
                $('#pet').attr('class','hide');
                $('#other').attr('class','hide');
            }
        }

    }
});


