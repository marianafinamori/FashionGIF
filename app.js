var topics = ["coco chanel", "karl lagerfeld", "kate moss", "alexander mcqueen", "freja beha erichsen", "raf simons", "sofia coppola", "nick knight", "alexa chung", 
"anna wintour", "tom ford", "marc jacobs", "givenchy", "stella mccartney", "david bowie", "edie sedgwick", "dior and i", "proenza schouler", "rag and bone", "kenzo", "john galliano"];
var btn;
var load;
var x = 0;
var i = 0;
var topic = " ";
var rating;
var results;

//FUNCTION CALLED WHEN PAGE IS LOADED
renderButtons();

//CALLBACK THAT RENDERS BUTTONS WITH ICONS
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

//CLICK TO SUBMIT USER'S IDEA OF ICON AND GENERATES ITS BUTTON
$("#submit-button").on("click", addIcon)   

//CLICK TO SHOW GIFS OF CLICKED ICON
$(document).on("click", ".btn", displayIcon);

//CLICK TO ANIMATE OR STOP GIFS
$(document).on("click", ".gif", motion)

//CLICK TO LOAD 10 MORE ICONS 
$(document).on("click", "#divLoadButton", loadMore)


//CALLBACK THAT SUBMITS USER'S ICON IDEA AND GENERATES ITS BUTTON
function addIcon(event) {
    event.preventDefault();
    var userIdea = document.getElementById("user-input").value;
    console.log(userIdea);
    topics.push(userIdea);
    renderButtons();
}

//CALLBACK THAT GETS ICON AND MAKES A REQUEST TO GIPHY API
function displayIcon() {
    document.querySelector(".msg").innerHTML = "Click the images to animate them"
    topic = " ";
    $("#display-gifs").empty();
    $("#divLoadButton").empty();
    x = 0;
    i = 0;
    x = x + 10;
    topic = $(this).attr("data-name");
    // console.log(topic);
    console.log("Initial i: " + i)
    console.log("Initial x: " + x)
    requestApi()
}

//CALLBACK THAT SWITCHES MOTION OF GIFS 
function motion() {
    var state = $(this).attr("data-state");
    // console.log("initial state: " + state)
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animated");
        state = "animated"
        // console.log("switch to: " + state)
    } else if (state === "animated") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        state = "still"
        // console.log("switch to: " + state)
    }
 };

 //CALLBACK THAT LOADS 10 MORE GIFS
 function loadMore() {
     x = x + 10
     console.log("Load More i: " + i)
     console.log("Load More x: " + x)
     console.log(topic);
     requestApi()
 }

//CALLBACK THAT MAKES REQUEST TO GIPHY API AND LOADS RESPONSE
function requestApi() {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=CPnP7T93dynqIZ5D8SBRT7mHMeMS2cqR&limit="+x;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log("This is the queryURL")
        console.log(queryURL);
        console.log("This is the response")
        console.log(response);
        results = response.data;
        console.log("This are the RESULTS")
        console.log(results);
       
        for (i; i<results.length; i++) {
            var topicDiv = $("<div class='m-4 icon'>");
            rating = results[i].rating;
            // console.log(rating);
            var p = $("<p>").text("Rating: " + rating);
            var iconImage = document.createElement("img");
            var still = results[i].images.original_still.url;
            var animated = results[i].images.original.url;
            iconImage.setAttribute("src", still)
            iconImage.setAttribute("data-still", still);
            iconImage.setAttribute("data-animate", animated) ;
            iconImage.setAttribute("data-state", "still");
            iconImage.setAttribute("class", "gif");

            topicDiv.append(p, iconImage);
            $("#display-gifs").append(topicDiv);    
        }
        
        //CREATE LOAD MORE BUTTON 
        load = document.createElement("button");
        load.setAttribute('id', "load-button");
        load.innerHTML = "load more";
        $("#divLoadButton").empty();
        $("#divLoadButton").append(load);
    })
}




