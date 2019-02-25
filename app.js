var topics = ["coco chanel", "karl lagerfeld", "kate moss", "alexander mcqueen", "freja beha erichsen", "raf simons", "sofia coppola", "nick knight", "alexa chung", 
"anna wintour", "tom ford", "marc jacobs", "givenchy", "stella mccartney", "david bowie", "edie sedgwick", "dior and i", "proenza schouler", "rag and bone", "kenzo", "john galliano"];
var btn;
var load;
var x = 10;
var i = 0;
var topic = " ";
var rating;
var results;

function displayIcon() {
    topic = " ";
    $("#display-gifs").empty();
    $("#divLoadButton").empty();
    x = 10;
    i = 0;
    console.log(i);
    topic = $(this).attr("data-name");
    console.log(topic);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=CPnP7T93dynqIZ5D8SBRT7mHMeMS2cqR&limit="+x;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(queryURL);
        console.log(response);
        results = response.data;
        console.log(results);
       
        for (i; i<results.length; i++) {
            var topicDiv = $("<div class='m-4 icon'>");
            rating = results[i].rating;
            console.log(rating);
            var p = $("<p>").text("Rating: " + rating);
            var iconImage = document.createElement("img");
            iconImage.setAttribute("src", results[i].images.original_still.url);
            iconImage.setAttribute("data-still", results[i].images.original_still.url);
            iconImage.setAttribute("data-animate", results[i].images.original.url);
            iconImage.setAttribute("data-state", "still");
            iconImage.setAttribute("class", "gif");

            topicDiv.append(p, iconImage);
            $("#display-gifs").append(topicDiv);

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
             });
        }  
        load = document.createElement("button");
        load.setAttribute('id', "load-button");
        load.innerHTML = "load more";
        $("#divLoadButton").empty();
        $("#divLoadButton").append(load);

        $("#divLoadButton").on("click", function() {
            console.log(topic);
            x=x+10;
            console.log(x);
            //i=i+10;
            console.log(i);
            //Load
            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=CPnP7T93dynqIZ5D8SBRT7mHMeMS2cqR&limit="+x;
            $.ajax({
            url: queryURL,
            method: "GET"
            })
            .then(function(response) {
                console.log(queryURL);
                console.log(response);
                results = response.data;
                console.log(results);

                for (i; i<i+10; i++) {
            var topicDiv = $("<div class='m-4 icon'>");
            rating = results[i].rating;
            console.log(rating);
            var p = $("<p>").text("Rating: " + rating);
            var iconImage = document.createElement("img");
            iconImage.setAttribute("src", results[i].images.original_still.url);
            iconImage.setAttribute("data-still", results[i].images.original_still.url);
            iconImage.setAttribute("data-animate", results[i].images.original.url);
            iconImage.setAttribute("data-state", "still");
            iconImage.setAttribute("class", "gif");

            topicDiv.append(p, iconImage);
            $("#display-gifs").append(topicDiv);

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
             });

        }  


        })

    });//ajax


    })
}

function renderButtons() {
    $("#buttons").empty();
    for (var i=0; i<topics.length; i++) {
        btn = document.createElement("button");
        btn.setAttribute("type", "submit");
        btn.setAttribute("name", "icons");
        btn.setAttribute("data-name", topics[i]);
        btn.setAttribute('class', 'btn');
        btn.setAttribute('id', [i]);
        btn.innerHTML = topics[i];
        //console.log(btn.value);
        $('#buttons').append(btn);
        if (i%9 === 0) {
            document.getElementById([i]).style.backgroundColor = "rgb(221, 155, 133)"; //pink
        } else if (i%5 === 0) {
            document.getElementById([i]).style.backgroundColor = "rgb(220, 141, 66)"; //orange
        } else if (i%6 === 0) {
            document.getElementById([i]).style.backgroundColor = "rgb(80, 120, 85)"; //green
        } else if (i%4 === 0) {
            document.getElementById([i]).style.backgroundColor = "rgb(56, 55, 53)"; //black
        } else if (i%7 === 0) {
            document.getElementById([i]).style.backgroundColor = "rgb(144, 72, 48)"; //brown
        } else if (i%2 === 0) {
            document.getElementById([i]).style.backgroundColor = "rgb(243, 178, 58)"; //yellow
        } else {
            document.getElementById([i]).style.backgroundColor = "rgb(69, 142, 177)"; //blue
        }
    }
}

$("#submit-button").on("click", function(event) {
event.preventDefault();
var userIdea = document.getElementById("user-input").value;
console.log(userIdea);
topics.push(userIdea);
renderButtons();
});

$(document).on("click", ".btn", displayIcon);

renderButtons();