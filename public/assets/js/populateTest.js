$(document).ready(function() {

    $('.catLink').on('click', function (event) {
        $('.userPostSection').empty();
        event.preventDefault();
        var categoryType = $(this).data('type');

        getPosts(categoryType);
    });

    function getPosts(category) {
        $.get('/api/posts/category/:category', function (data) {
            for(var i = 0; i < data.length; i++){

                var postData = data.body;
                var category = data[i].category;

                // Create Divs to store data
                var newDiv = $('<div class="itemContainer">');
                var newPic = $('<div class="itemPic">');
                var newInfo = $('<div class="itemInfo">');
                var newDescription = $('<div class="itemDescription">');
                var newPrice = $('<div class="itemPrice">');
                var newLocation = $('<div class="itemLocation">');

                //Fill Dives with Post Info
                newInfo.append(newDescription);
                newInfo.append(newPrice);
                newInfo.append(newLocation);
                newDiv.append(newPic);
                newDiv.append(newInfo);
                // Add info from database
                newInfo.append(postData);
                newPic.append(category);

                ///Send to the page
                $('.all').append(newDiv);
            }
        })
    }

// End of script
});
