"use strict";
const btnCocktail = document.querySelector(".btn-cocktail");
const cocktailsContainer = document.querySelector(".cocktails");
const btnNonAlcoholic = document.querySelector(".btn-non-alcoholic");
const searchBtn = document.querySelector(".search_btn");
const bookmarked = document.querySelector(".bookmarked");
const bookmarkBtn = document.querySelector(".bookmark_btn");

// TODOs:
// 1. allow users to search cocktail by name then render search result as list
// 2. allow users to add cocktail to bookmark
// 3. allow users to view bookmarked cocktails
// 4. add pagination
// 5. structure js files

// Extras:
// 1. add servings calculator

let bookMarked = [];
const randomNum = function (length) {
  return Math.floor(Math.random() * (length + 1));
};
const renderSearchResult = function (name) {};

// Need to get the data to add it to bookmark, but how?
const addAsBookmark = function (data) {
  bookMarked.push(data);
  console.log(bookMarked);
};

const renderCocktail = function (data) {
  while (cocktailsContainer.firstChild) {
    cocktailsContainer.removeChild(cocktailsContainer.firstChild);
  }
  const html = `
  <article class="cocktail">
    <img class="cocktail__img" src="${data.strDrinkThumb}" />
    <div class="cocktail__data">
      <div class="cocktail_illustration">
        <h3 class="cocktail__name">${data.strDrink}</h3>
        <div class="bookmark_btn"><span class="material-symbols-outlined">
        bookmark</span>Bookmark</div>
      </div>
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
      <p class="cocktail__row"><span>Instruction:</span><br><div class="instruction-content">${
        data.strInstructions
      }</div></p>
      
    </div>
  </article>
`;
  cocktailsContainer.insertAdjacentHTML("beforeend", html);
};

// ISSUE: cannot generate random drink SOLVED
// Can only get the id of drink, need to use id to get other details (chaining promises)
const getNonAlcoholic = function () {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`
  )
    .then((res) => res.json())
    .then(function (data) {
      let length = data.drinks.length;
      let num = randomNum(length);
      let id = data.drinks[num].idDrink;
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

// ISSUE: cannot generate random drink SOLVED
// Can only get the id of drink, need to use id to get other details (chaining promises)
const getAlcoholic = function () {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`)
    .then((res) => res.json())
    .then(function (data) {
      let length = data.drinks.length;
      let num = randomNum(length);
      let id = data.drinks[num].idDrink;
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

btnCocktail.addEventListener("click", getAlcoholic);
btnNonAlcoholic.addEventListener("click", getNonAlcoholic);

if (bookmarkBtn) {
  bookmarkBtn.addEventListener("click", addAsBookmark);
}
