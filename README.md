# FashionGIF

OVERVIEW:
In this assignment, students should use the GIPHY API to make a dynamic web page that populates with gifs of choice. Call the GIPHY API and use JavaScript and jQuery to change the HTML.

TOOLS: GIPHY API, Javascript, jQuery, HTML, CSS, Bootstrap

HOW TO USE THIS APP:
The page will load some buttons with names of fashion icons.
Users can click on a button to see gifs of a fashion icon. Initially the images are static, but once the user clicks the images they gets animated. 
The user can also include his/her own fashion icon by using the form and submit the icon name. This will generate a new button with the user icon, then the user can click the generated button and explore gifs of this new icon. 

ASSIGNMENT INSTRUCTIONS:
- Students should create an array of strings related to a topic. 
- The app should take the topics in this array and create buttons in the HTML using a loop.
- When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
- When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
- Under every gif, display its rating (PG, G, so on). This data is provided by the GIPHY API.
- Add a form to the page that takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.
- Allow users to request additional gifs to be added to the page.Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.
- Include a 1-click download button for each gif, this should work across device types.

