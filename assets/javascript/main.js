var memeArray = ["anchorman", "h3h3", "spongebob meme", "cat memes", "dog memes", "bob's burgers", "imaqtpie", "memes", "talladega nights the ballad of ricky bobby"];

$(document).ready(function() {
    for (var i = 0; i < memeArray.length; i++) {
        $("#meme-buttons").append("<button type='button' onclick='searchGif(\"" + memeArray[i] + "\")' class='btn btn-primary' value=' " + memeArray[i] + "'> " + memeArray[i] + " </button>");
    }
});

function memeButtonClicked() {
    var userInput = $('#meme-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#meme-input').val();

    if (userInput) {
        $('#meme-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#meme').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#meme').append(image);
    }

    $('.movImage').on('click', function() {
        event.preventDefault(); 
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
    
}
