//-Define global variables
// var cuisine ='';
// var protein ='';
// var starch = '';
// var veggies ='';
// var mealType ='';
// var favorite = '';
// var newRecipe='';

const apiUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=9a57136e6bca455b9771d343ad46c043&includeNutrition=true";
fetch(apiUrl)
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    // Log the API response to the console
    console.log(data);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });


//-Function to make api request including api key
//	-make fetch request
//-Function to display recipe cards
//	-clear existing cards
//	-loop through recipes and create card elements
//-function to create a recipe card element
//-create card content
//	image
//	name
//	time
//	cost
//	spice level
//-add all cards
//-create buttons for favorite/dislike
// -append content and buttons to the cards
// -function to save a recipe as a favorite
// 	-add recipe to favorites array
// 	-save favorites array to local storage
// -function to save a recipe as a dislike
// 	-add recipe to dislikes array
// 	-save dislikes array to local storage
// -function to show modal recipe
// -event listener for criteria submission
// 	-get user selected criteria from form
// -event listener for selection of recipe card to show modal
// -event listener for like/dislike buttons
// -begin website by listing previous favorites