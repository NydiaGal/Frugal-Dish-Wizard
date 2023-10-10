// Declare variables
var apiKey = ""; //update with your API key Robert: 9a57136e6bca455b9771d343ad46c043 Nydia:1c2767aa27fe422c91f0d1e50285ab87 Parker:77989abd461041e9946863eb14fd2d2c
var protein = "chicken";
var cuisine = "Italian"; 
var mealType = ""; 
var ingredients = "pork";

var apiUrl =
  "https://api.spoonacular.com/recipes/complexSearch?cuisine=" +
  cuisine +
  "&mealType=" +
  mealType +
  "&includeIngredients=" +
  ingredients +
  "&number=40&apiKey=" +
  apiKey;

var recipeList = document.getElementById("recipe-list");
var recipeDetails = document.getElementById("recipeDetails");
var recipeName = document.getElementById("recipeName");
var recipeImage = document.getElementById("recipeImage");
//Initial fetch based on user criteria 
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

    // Fetch recipe details for all recipe ID results
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
      // Check if the recipe has 14 or fewer extended ingredients and create cards
      if (recipe.extendedIngredients.length <= 14) {
        var recipeItem = document.createElement("div");
        recipeItem.className =
          "column is-one-third-desktop is-one-third-mobile";
        recipeItem.innerHTML = `
          <div class="card">
            <div class="card-content">
            <h1 class="larger-title">${recipe.title}</h1>
            <figure class="image">
                <img class="is-fullwidth" src="${recipe.image}" alt="${
          recipe.title
        }">
            <h1 class="larger-title">Price per Serving: $${(
              recipe.pricePerServing / 100
            ).toFixed(2)}</h1>
            </div>
            <button class="viewRecipeButton" data-id="${
              recipe.id
            }">View Recipe</button>
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

    // Event listeners for "is-success" (favorite) buttons
var favoriteButtons = document.querySelectorAll(".is-success");
favoriteButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var recipeId = this.closest(".card").querySelector(".viewRecipeButton").getAttribute("data-id");
    saveFavoriteRecipe(recipeId);
  });
});

// Event listeners for "is-danger" (dislike) buttons
var dislikeButtons = document.querySelectorAll(".is-danger");
dislikeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var recipeId = this.closest(".card").querySelector(".viewRecipeButton").getAttribute("data-id");
    saveDislikedRecipe(recipeId);
  });
});

});

function displayRecipeDetails(recipeId) {
  // Fetch recipe card
  var cardUrl = `https://api.spoonacular.com/recipes/${recipeId}/card?apiKey=${apiKey}`;
  fetch(cardUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then(function (cardData) {
      // Extract the URL from cardData
      var cardUrl = extractUrlFromCardData(cardData);

      // Open the URL in a new window or tab
      if (cardUrl) {
        window.open(cardUrl);
      }
    });
}

// function to extract the URL from cardData
function extractUrlFromCardData(cardData) {
  var cardObject = JSON.parse(cardData);
  return cardObject.url;
}

//function to add thumbs up recipe ids to the favorite local storage
function saveFavoriteRecipe(recipeId) {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(recipeId)) {
    favorites.push(recipeId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

//function to add thumbs down recipe ids to the dislikes local storage
function saveDislikedRecipe(recipeId) {
  var dislikes = JSON.parse(localStorage.getItem("dislikes")) || [];
  if (!dislikes.includes(recipeId)) {
    dislikes.push(recipeId);
    localStorage.setItem("dislikes", JSON.stringify(dislikes));
  }
}
