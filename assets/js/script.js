//made changes so that query limits to those with 14 ingredients or less
//and when the view button is selected, the recipe card is displayed.
//expanded total number of recipes viewed from default of 10 to 40
//added price per serving to recipe list cards

var apiKey = "ed73eb72a1ea4d5a9c2a849c3c578bc2"; //update with your API key Robert: 9a57136e6bca455b9771d343ad46c043 Nydia:1c2767aa27fe422c91f0d1e50285ab87 Parker:77989abd461041e9946863eb14fd2d2c
var cuisine = ""; // this would be populated based on our click event
var ingredients = ""; // this would be populated based on our click events for protein, starches, and veggies


var apiUrl =
  "https://api.spoonacular.com/recipes/complexSearch?cuisine=" +
  cuisine +
  //"&mealType=" +
  //mealType +
  "&includeIngredients=" +
  ingredients +
  "&number=40&apiKey=" +
  apiKey;



var recipeList = document.getElementById("recipe-list");
var recipeDetails = document.getElementById("recipeDetails");
var recipeName = document.getElementById("recipeName");
var recipeImage = document.getElementById("recipeImage");

fetch(apiUrl)
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(function (data) {
    var recipeIds = data.results.map(function (recipe) {
      return recipe.id;
    });

    // Fetch recipe details for all recipe IDs
    var recipeDetailsUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds.join(
      ","
    )}&apiKey=${apiKey}`;
    return fetch(recipeDetailsUrl);
  })
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(function (data) {
    var recipes = data;
    recipes.forEach(function (recipe) {
      // Check if the recipe has 14 or fewer extended ingredients
      if (recipe.extendedIngredients.length <= 14) {
        var recipeItem = document.createElement("div");
        recipeItem.className =
          "column is-one-third-desktop is-one-third-mobile";
        recipeItem.innerHTML = `
          <div class="card">
            <div class="card-content">
            <h1 class="larger-title">${recipe.title}</h1>
            <figure class="image">
                <img class="is-fullwidth" src="${recipe.image}" alt="${recipe.title}">
            <h1 class="larger-title">Price per Serving: $${(recipe.pricePerServing/100).toFixed(2)}</h1>
            </div>
            <button class="viewRecipeButton" data-id="${recipe.id}">View Recipe</button>
            <div class="card-footer">
                <div class="card-footer-detail">
                    <a href="#" class="button is-success">
                        <i class="fa fa-thumbs-o-up"></i>
                    </a>
                </div>
            <div class="card-footer-item">
                <a href="#" class="button is-danger">
                    <i class="fa fa-thumbs-o-down"></i>
                    </a>
                </div>
            </div>
          </div>
        `;
        recipeList.appendChild(recipeItem);
      }
    });

    // Event listeners for each "View Recipe" button
    var viewRecipeButtons = document.querySelectorAll(".viewRecipeButton");
    viewRecipeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var recipeId = this.getAttribute("data-id");
        displayRecipeDetails(recipeId);
      });
    });
  })
  .catch(function (error) {
    console.error("Error:", error);
  });

function displayRecipeDetails(recipeId) {
  // Fetch the recipe details for the selected recipe
  var recipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
  fetch(recipeDetailsUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      // Display the recipe details on console log
      console.log("Recipe Data:", data);

      // Fetch additional card data
      var cardUrl = `https://api.spoonacular.com/recipes/${recipeId}/card?apiKey=${apiKey}`;
      return fetch(cardUrl);
    })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then(function (cardData) {
      // Display the card data on console log
      console.log("Card Data:", cardData);

      // Extract the URL from cardData
      var cardUrl = extractUrlFromCardData(cardData);

      // Open the URL in a new window or tab
      if (cardUrl) {
        window.open(cardUrl);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

// function to extract the URL from cardData
function extractUrlFromCardData(cardData) {
  
  var cardObject = JSON.parse(cardData);
  return cardObject.url;
  
  console.error("Error parsing cardData:", error);
  return null;
}
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