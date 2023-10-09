//need to fix the price to divide by 100
//only intended to show data and functionality, not format to fit in our actual html
//need to figure out how to randomize the url query, otherwise the same inputs will always show the same results
//need to change the variables so they are based on selections instead of hard coded
//add hover transition that provides limited info
//not a fan of the ingredient and instruction information from spoonacular and wondering if we should just use the recipe URL
//the initial title and image, hover transition for additional info like time, servings and cost per serving, then click on a button to go to the link the recipe was taken from. 


var apiKey = '1c2767aa27fe422c91f0d1e50285ab87';
var protein = 'chicken';
var cuisine = 'Italian'; // this would be populated based on our click event
var mealType = 'Dinner'; // this would be populated based on our click event
var ingredients = 'chicken,tomato'; // this would be populated based on our click events for protein, starches and veggies

var apiUrl = 'https://api.spoonacular.com/recipes/complexSearch?cuisine=' + cuisine + //having trouble entering the random sort may need to use separate random function
  '&mealType=' + mealType +
  '&includeIngredients=' + ingredients +
  '&apiKey=' + apiKey;

  var recipeList = document.getElementById('recipe-list');
    var recipeDetails = document.getElementById('recipeDetails');
    var recipeName = document.getElementById('recipeName');
    var recipeImage = document.getElementById('recipeImage');
    var recipeInfo = document.getElementById('recipeInfo');
    var recipeSteps = document.getElementById('recipeSteps');
    var recipeIngredients = document.getElementById('recipeIngredients');
    var backToListButton = document.getElementById('backToListButton');

fetch(apiUrl)
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(function(data) {
    var recipes = data.results; 
    recipes.forEach(function(recipe) {
        var recipeItem = document.createElement('div');
        recipeItem.className = 'column is-one-third-desktop is-one-third-mobile';
        recipeItem.innerHTML = `
        
          
          <div class="card">
            <div class="card-content">
                <h1 class="larger-title">${recipe.title}</h1>
              <figure class="image">
                  <img class="is-fullwidth" src="${recipe.image}" alt="${recipe.title}">
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
      });

      // Event listeners for each "View Recipe" button
      var viewRecipeButtons = document.querySelectorAll('.viewRecipeButton');
      viewRecipeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          var recipeId = this.getAttribute('data-id');
          displayRecipeDetails(recipeId);
        });
      });
    })
    .catch(function(error) {
      console.error('Error:', error);
    });

  function displayRecipeDetails(recipeId) {
    // Fetch the recipe details for the selected recipe
    var recipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    fetch(recipeDetailsUrl)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function(data) {
        // Display the recipe details
        recipeName.textContent = data.title;
        recipeImage.innerHTML = `<img src="${data.image}" alt="${data.title}" style="max-width: 300px;">`;

        // Display recipe info
        recipeInfo.innerHTML = `
          <p>Ready in: ${data.readyInMinutes} minutes</p>
          <p>Servings: ${data.servings}</p>
          <p>Price per Serving: $${data.pricePerServing.toFixed(2)}</p>
        `;

        // Display recipe steps
        var steps = data.analyzedInstructions[0].steps;
        var stepsHTML = '<h3>Steps:</h3><ol>';
        steps.forEach(function(step) {
          stepsHTML += `<li>${step.step}</li>`;
        });
        stepsHTML += '</ol>';
        recipeSteps.innerHTML = stepsHTML;

        // Display recipe ingredients
        var ingredientsHTML = '<h3>Ingredients:</h3><ul>';
        data.extendedIngredients.forEach(function(ingredient) {
          ingredientsHTML += `<li>${ingredient.original}</li>`;
        });
        ingredientsHTML += '</ul>';
        recipeIngredients.innerHTML = ingredientsHTML;

        // Show the recipe details section and hide the recipe list
        recipeList.style.display = 'none';
        recipeDetails.style.display = 'block';
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  }

  backToListButton.addEventListener('click', function() {
    // Show the recipe list and hide the recipe details
    recipeList.style.display = 'flex';
    recipeDetails.style.display = 'none';
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