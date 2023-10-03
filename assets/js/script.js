//-Define global variables
var cuisine ='';
var protein ='';
var starch = '';
var veggies ='';
var mealType ='';
var favorite = '';
var newRecipe='';

var SpoonacularApi = require('spoonacular_api');

var defaultClient = SpoonacularApi.ApiClient.instance;
// Configure API key authorization: apiKeyScheme
var apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
apiKeyScheme.apiKey = "YOUR API KEY"
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKeyScheme.apiKeyPrefix['x-api-key'] = "Token"

var api = new SpoonacularApi.DefaultApi()
var analyzeRecipeRequest = new SpoonacularApi.AnalyzeRecipeRequest(); // {AnalyzeRecipeRequest} Example request body.
var opts = {
  'language': en, // {String} The input language, either \"en\" or \"de\".
  'includeNutrition': false, // {Boolean} Whether nutrition data should be added to correctly parsed ingredients.
  'includeTaste': false // {Boolean} Whether taste data should be added to correctly parsed ingredients.
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.analyzeRecipe(analyzeRecipeRequest, opts, callback);

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