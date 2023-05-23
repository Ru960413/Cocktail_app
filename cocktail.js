"use strict";
const btnCocktail = document.querySelector(".btn-cocktail");
const cocktailsContainer = document.querySelector(".cocktails");
const btnNonAlcoholic = document.querySelector(".btn-non-alcoholic");
const btnAlcoholic = document.querySelector(".btn-alcoholic");

const renderCocktail = function (data) {
  while (cocktailsContainer.firstChild) {
    cocktailsContainer.removeChild(cocktailsContainer.firstChild);
  }
  const html = `
  <article class="cocktail">
    <img class="cocktail__img" src="${data.strDrinkThumb}" />
    <div class="cocktail__data">
      <h3 class="cocktail__name">${data.strDrink}</h3>
      <h4 class="cocktail__type">${data.strAlcoholic}</h4>
      <p class="cocktail__row"><span>Category</span>${data.strCategory}</p>
      <p class="cocktail__row"><span>Glass</span>${data.strGlass}</p>
      <p class="cocktail__row ingredients"><span>Ingredients:</span>
      <li class="ingredient-item">${data.strMeasure1 || ""} ${
    data.strIngredient1
  }</li>
      <li class="ingredient-item">${data.strMeasure2 || ""} ${
    data.strIngredient2
  }</li>
      <li class="ingredient-item">${data.strMeasure3 || ""} ${
    data.strIngredient3 || ""
  }</li> 
      <li class="ingredient-item">${data.strMeasure4 || ""} ${
    data.strIngredient4 || ""
  }</li>
      <li class="ingredient-item">${data.strMeasure5 || ""} ${
    data.strIngredient5 || ""
  }</li></p>
      <p class="cocktail__row instructions"><span>Instruction:</span><br><div>${
        data.strInstructions
      }</div></p>
      
    </div>
  </article>
`;
  cocktailsContainer.insertAdjacentHTML("beforeend", html);
};

const getRandomCocktail = function () {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then(function (data) {
      data = data.drinks[0];
      console.log(data);
      renderCocktail(data);
    })
    .finally((cocktailsContainer.style.opacity = 1));
};

// ISSUE: cannot generate random drink
// Can only get the id of drink, need to use id to get other details (chaining promises)
const getNonAlcoholic = function () {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`
  )
    .then((res) => res.json())
    .then(function (data) {
      let id = data.drinks[0].idDrink;
      return id;
    })
    .then((id) => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
          data = data.drinks[0];
          console.log(data);
          renderCocktail(data);
        });
    })
    .finally((cocktailsContainer.style.opacity = 1));
};

// ISSUE: cannot generate random drink
// Can only get the id of drink, need to use id to get other details (chaining promises)
const getAlcoholic = function () {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`)
    .then((res) => res.json())
    .then(function (data) {
      let id = data.drinks[0].idDrink;
      return id;
    })
    .then((id) => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
          data = data.drinks[0];
          console.log(data);
          renderCocktail(data);
        });
    })
    .finally((cocktailsContainer.style.opacity = 1));
};

btnCocktail.addEventListener("click", getRandomCocktail);
// btnAlcoholic.addEventListener("click", getAlcoholic);
// btnNonAlcoholic.addEventListener("click", getNonAlcoholic);
