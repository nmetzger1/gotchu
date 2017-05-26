$(document).ready(function() {
    //Capture Class on click
    $('a').on('click', function(event) {
        let navClass = $(this).attr('class');
        // COME BACK better way to do this ***************
        switch (navClass) {
            case "all":
                $('#house').attr('class','show');
                $('#car').attr('class','show');
                $('#pet').attr('class','show');
                $('#other').attr('class','show');
                break;
            case "house":
                $('#house').attr('class','show');
                $('#car').attr('class','hide');
                $('#pet').attr('class','hide');
                $('#other').attr('class','hide');
                break;
            case "car":
                $('#car').attr('class','show');
                $('#house').attr('class','hide');
                $('#pet').attr('class','hide');
                $('#other').attr('class','hide');
                break;
            case "pet":
                $('#pet').attr('class','show');
                $('#car').attr('class','hide');
                $('#house').attr('class','hide');
                $('#other').attr('class','hide');
                break;
            case "other":
                $('#other').attr('class','show');
                $('#car').attr('class','hide');
                $('#house').attr('class','hide');
                $('#pet').attr('class','hide');
                break;
        }
        return false;
    });
});
// End of document
