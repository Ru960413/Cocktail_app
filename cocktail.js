"use strict";
const btnCocktail = document.querySelector(".btn-cocktail");
const cocktailsContainer = document.querySelector(".cocktails");
const btnNonAlcoholic = document.querySelector(".btn-non-alcoholic");
const searchBtn = document.querySelector(".search_btn");
const bookmarkedLink = document.querySelector(".bookmarked");
const clearBtn = document.querySelector(".clear");
const mainContainer = document.querySelector(".container");

// TODOs:
// 1. allow users to search cocktail by name then render search result as list
// 2. allow users to add cocktail to bookmark DONE
// 3. allow users to view bookmarked cocktails (as list in a box or in cocktailsContainer?)
// 4. add pagination
// 5. structure js files

// Extras:
// 1. add servings calculator

let bookmarkedNonAlcoholic = [];
let bookmarkedAlcoholic = [];

const randomNum = function (length) {
  return Math.floor(Math.random() * length);
};

// render drinks as listed links
// Q1: How to make list items clickable links?
// can let the href of anchor tag (located inside list items) link to the drink's id, and then use one of the functions to render drink using the id provided

// Q2: How to get the search value from the form input?
// const renderResult = function (data) {
//   let i = 0;
//   while (i < data.length) {
//     console.log(data[i].strDrink, data[i].strAlcoholic);
//     i++;
//   }
// };

// const searchCocktailByName = function (name) {
//   fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
//     .then((res) => res.json())
//     .then((data) => {
//       data = data.drinks;
//       renderResult(data);
//     });
// };

const clearBookmarks = function () {
  localStorage.removeItem("Bookmarked Alcoholic");
  localStorage.removeItem("Bookmarked Non-alcoholic");
};

const addAsBookmarkAlcoholic = function (data) {
  document.addEventListener("click", function (e) {
    if (e.target.className == "bookmark_btn") {
      // add data into bookmarked array
      if (bookmarkedAlcoholic.includes(data)) return;
      bookmarkedAlcoholic.push(data);
      // change the style of bookmark btn
      document.querySelector(".bookmark_btn").classList.add("added");
      // add drink into localStorage
      localStorage.setItem(
        "Bookmarked Alcoholic",
        JSON.stringify(bookmarkedAlcoholic)
      );
    }
  });
};

// ISSUE: drink can be add into localStorage but after reload its bookmark's class doesn't have "added" anymore
// Need to get the data to add it to bookmark, but how? SOLVED
const addAsBookmarkNonAlcoholic = function (data) {
  document.addEventListener("click", function (e) {
    if (e.target.className == "bookmark_btn") {
      // add data into bookmarked array
      if (bookmarkedNonAlcoholic.includes(data)) return;
      bookmarkedNonAlcoholic.push(data);
      // change the style of bookmark btn
      document.querySelector(".bookmark_btn").classList.add("added");
      // add drink into localStorage
      localStorage.setItem(
        "Bookmarked Non-alcoholic",
        JSON.stringify(bookmarkedNonAlcoholic)
      );
    }
  });
};

// getting stored value from localStorage
const viewBookmarked = function () {
  const nonAlcoholic = JSON.parse(localStorage.getItem("Bookmarked Alcoholic"));
  const alcoholic = JSON.parse(
    localStorage.getItem("Bookmarked Non-alcoholic")
  );
  console.log(nonAlcoholic);
  console.log(alcoholic);

  // How to show bookmarked drinks?
  // when bookmarked btn is clicked, toggle div class to "bookmarked_content_active" to show it
  // render alcoholic and non-alcoholic drinks using localStorage objects
  // create link for each bookmarked drinks (don't know how...)
  const html1 = `
  <div class="bookmarked_content_active">
    <ul class="non_alcoholic">
      <li class="bookmark_item"><a href="#">Smoothie</a>(non_alcoholic)</li>
      <li class="bookmark_item"><a href="#">Coffee</a>(non_alcoholic)</li>
      <li class="bookmark_item"><a href="#">Juice</a>(non_alcoholic)</li>
    </ul>
  `;

  const html2 = `
    <ul class="alcoholic">
      <li class="bookmark_item"><a href="#">Vodka</a>(alcoholic)</li>
      <li class="bookmark_item"><a href="#">Gin</a>(alcoholic)</li>
      <li class="bookmark_item"><a href="#">Martini</a>(alcoholic)</li>
    </ul>
  </div>
`;

  const html = html1 + html2;
  mainContainer.insertAdjacentHTML("beforeend", html);
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
      //console.log(length);
      let num = randomNum(length);
      let id = data.drinks[num].idDrink;
      return id;
    })
    .then((id) => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
          data = data.drinks[0];
          //console.log(data);
          renderCocktail(data);
          addAsBookmarkNonAlcoholic(data);
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
          //console.log(data);
          renderCocktail(data);
          addAsBookmarkAlcoholic(data);
        });
    })
    .finally((cocktailsContainer.style.opacity = 1));
};

btnCocktail.addEventListener("click", getAlcoholic);
btnNonAlcoholic.addEventListener("click", getNonAlcoholic);
bookmarkedLink.addEventListener("click", viewBookmarked);
//clearBtn.addEventListener("click", clearBookmarks);
