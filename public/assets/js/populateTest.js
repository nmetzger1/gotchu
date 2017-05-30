$(document).ready(function() {


// $.get('/api/posts', function (data) {
//     for(var i = 0; i < data.length; i++) {
//         console.log(data[i].category);
//     }
//     console.log("THIS IS THE DATA*****", data);
// });

$('.catLink').on('click', function (event) {
    $('.userPostSection').empty();
    event.preventDefault();
    var categoryType = $(this).data('type');
    console.log(categoryType);
    switch(categoryType) {
        case "all":
            all();
            break;
        case "car":
            car();
            break;
        case "house":
            house();
            break;
        case "pet":
            pet();
            break;
        case "personal":
            personal();
            break;
        case "other":
            other();
            break;
        default:
            console.log("not working");
    }

});

function all () {
    $.get('/api/posts', function (data) {
        for(var i = 0; i < data.length; i++) {
            // Get data from post endpoint
            var category = data[i].category;
            var body= data[i].body;

            // populate member page with postings
            var newDiv = $('<div class="itemContainer">');
            var newPic = $('<div class="itemPic">');
            var newInfo = $('<div class="itemInfo">');
            var newDescription = $('<div class="itemDescription">');
            var newPrice = $('<div class="itemPrice">');
            var newLocation = $('<div class="itemLocation">');

            newInfo.append(newDescription);
            newInfo.append(newPrice);
            newInfo.append(newLocation);
            newDiv.append(newPic);
            newDiv.append(newInfo);
            // Add info from database
            newInfo.append(body);
            newPic.append(category);

            $('.all').append(newDiv);
        }
    });
}

function car () {
    $.get('/api/posts', function (data) {
        for(var i = 0; i < data.length; i++) {
            // Get data from post endpoint
            var category = data[i].category;
            var body= data[i].body;
            if(category == "car"){
                // populate member page with postings
                var newDiv = $('<div class="itemContainer">');
                var newPic = $('<div class="itemPic">');
                var newInfo = $('<div class="itemInfo">');
                var newDescription = $('<div class="itemDescription">');
                var newPrice = $('<div class="itemPrice">');
                var newLocation = $('<div class="itemLocation">');

                newInfo.append(newDescription);
                newInfo.append(newPrice);
                newInfo.append(newLocation);
                newDiv.append(newPic);
                newDiv.append(newInfo);
                // Add info from database
                newInfo.append(body);
                newPic.append(category);

                $('.car').append(newDiv);
            }
        }
    });
}

function house () {
    $.get('/api/posts', function (data) {
        for(var i = 0; i < data.length; i++) {
            // Get data from post endpoint
            var category = data[i].category;
            var body= data[i].body;
            if(category == "house") {

                // populate member page with postings
                var newDiv = $('<div class="itemContainer">');
                var newPic = $('<div class="itemPic">');
                var newInfo = $('<div class="itemInfo">');
                var newDescription = $('<div class="itemDescription">');
                var newPrice = $('<div class="itemPrice">');
                var newLocation = $('<div class="itemLocation">');

                newInfo.append(newDescription);
                newInfo.append(newPrice);
                newInfo.append(newLocation);
                newDiv.append(newPic);
                newDiv.append(newInfo);
                // Add info from database
                newInfo.append(body);
                newPic.append(category);

                $('.house').append(newDiv);
            }
        }
    });
}

function pet () {
    $.get('/api/posts', function (data) {
        for(var i = 0; i < data.length; i++) {
            // Get data from post endpoint
            var category = data[i].category;
            var body= data[i].body;
            if(category == "pet") {
                console.log("working Pet");
                // populate member page with postings
                var newDiv = $('<div class="itemContainer">');
                var newPic = $('<div class="itemPic">');
                var newInfo = $('<div class="itemInfo">');
                var newDescription = $('<div class="itemDescription">');
                var newPrice = $('<div class="itemPrice">');
                var newLocation = $('<div class="itemLocation">');

                newInfo.append(newDescription);
                newInfo.append(newPrice);
                newInfo.append(newLocation);
                newDiv.append(newPic);
                newDiv.append(newInfo);
                // Add info from database
                newInfo.append(body);
                newPic.append(category);

                $('.pet').append(newDiv);
            }
        }
    });
}

function personal () {
    $.get('/api/posts', function (data) {
        for(var i = 0; i < data.length; i++) {
            // Get data from post endpoint
            var category = data[i].category;
            var body= data[i].body;
            if(category == "personal") {

                // populate member page with postings
                var newDiv = $('<div class="itemContainer">');
                var newPic = $('<div class="itemPic">');
                var newInfo = $('<div class="itemInfo">');
                var newDescription = $('<div class="itemDescription">');
                var newPrice = $('<div class="itemPrice">');
                var newLocation = $('<div class="itemLocation">');

                newInfo.append(newDescription);
                newInfo.append(newPrice);
                newInfo.append(newLocation);
                newDiv.append(newPic);
                newDiv.append(newInfo);
                // Add info from database
                newInfo.append(body);
                newPic.append(category);

                $('.personal').append(newDiv);
            }
        }
    });
}

function other () {
    $.get('/api/posts', function (data) {
        for(var i = 0; i < data.length; i++) {
            // Get data from post endpoint
            var category = data[i].category;
            var body= data[i].body;
            if(category == "other") {

                // populate member page with postings
                var newDiv = $('<div class="itemContainer">');
                var newPic = $('<div class="itemPic">');
                var newInfo = $('<div class="itemInfo">');
                var newDescription = $('<div class="itemDescription">');
                var newPrice = $('<div class="itemPrice">');
                var newLocation = $('<div class="itemLocation">');

                newInfo.append(newDescription);
                newInfo.append(newPrice);
                newInfo.append(newLocation);
                newDiv.append(newPic);
                newDiv.append(newInfo);
                // Add info from database
                newInfo.append(body);
                newPic.append(category);

                $('.other').append(newDiv);
            }
        }
    });
}











// End of script
});
