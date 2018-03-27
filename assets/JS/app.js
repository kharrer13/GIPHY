var firstButtons = ['test', 'fail', 'fall'];

$(document).ready(function () {

    // Map the first buttons from the initial array
    var startingButtons = firstButtons.map(makeButton)
    $('#buttons').append(startingButtons);

    $('#manual-button').click(function() {
        event.preventDefault();
        var newButtonText = $('#manualInput').val();
        makeButton(newButtonText);
    })

    $('body').on('click', '.search-button', function() {
        var searchTerm = $(this).text();
        console.log(searchTerm);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        }) .then(function(response) {
            $('#gifs').empty();
            var results = response.data;
            for (let i = 0; i < results.length; i++) {
                var pause = results[i].images.fixed_height_still.url;
                var play = results[i].images.fixed_height.url;
                var newDiv = $('<div>').addClass('pull-left gif-div');
                var newP = $('<p>').text('Rating: ' + results[i].rating)
                var newImage = $('<img>').addClass('gif')
                    .attr('src', pause)
                    .attr('state', "still")
                    .attr('play', play)
                    .attr('pause', pause);
                newDiv.append(newP)
                    .append(newImage)
                $('#gifs').append(newDiv);
            }

        });
    });

    $('body').on('click', '.gif', function() {
        var state = $(this).attr('state')
        var play = $(this).attr('play')
        var pause = $(this).attr('pause')
        if (state === 'still') {
            $(this).attr('src', play)
                .attr('state', play);
        } else{
            $(this).attr('src', pause)
                .attr('state', pause);
        }
    })
});

// Function used to create new buttons
function makeButton(ButtonName) {
    var newButton = $('<button>').text(ButtonName).addClass('btn btn-default btn-custom search-button');
    $('#buttons').append(newButton);
    return;
}

