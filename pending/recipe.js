"use strict";
const btnRecipe = document.querySelector(".btn-recipe");
const recipeContainer = document.querySelector(".recipes");

const renderRecipe = function (data) {
  while (recipeContainer.firstChild) {
    recipeContainer.removeChild(recipeContainer.firstChild);
  }
  const html = `
  <article class="recipe">
    <img class="recipe__img" src="${data.strMealThumb}" />
    <div class="recipe__data">
      <h3 class="recipe__name">${data.strMeal}</h3>
      <h4 class="recipe__region">${data.strArea}</h4>
      <p class="recipe__row"><span>Category</span>${data.strCategory}</p>
      <p class="recipe__row"><span>Ingredients</span>${data.strIngredient1}, ${data.strIngredient2}, ${data.strIngredient3}, ${data.strIngredient4}, ${data.strIngredient5}</p>
      <p class="recipe__row"><span>Instruction</span>${data.strInstructions}</p>
      <p class="recipe__row"><span>Source</span><a href="${data.strSource}">${data.strSource}</a></p>
      <p class="recipe__row"><span>Video</span><a href="${data.strYoutube}">${data.strYoutube}</a></p>
    </div>
  </article>
`;
  recipeContainer.insertAdjacentHTML("beforeend", html);
};

const getRandomRecipe = function () {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then(function (data) {
      data = data.meals[0];
      console.log(data);
      renderRecipe(data);
    })
    .finally((recipeContainer.style.opacity = 1));
};


btnRecipe.addEventListener("click", getRandomRecipe);

