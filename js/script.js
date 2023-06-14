// import { randomNum, setItemAsBookmarked } from "/js/helpers.js";

"use strict";
const btnCocktail = document.querySelector(".btn_cocktail");
const cocktailsContainer = document.querySelector(".cocktails");
const btnNonAlcoholic = document.querySelector(".btn_non_alcoholic");
const searchBtn = document.querySelector(".search_btn");
const bookmarkedLink = document.querySelector(".bookmarked");
const clearBtn = document.querySelector(".clear");
const mainContainer = document.querySelector(".container");
const bookmarkContainer = document.querySelector(
  ".bookmarked_content_container"
);
const bookmarkList = document.querySelector(".bookmark_list");
const closeBtn = document.querySelector(".close_btn");
const searchList = document.querySelector(".search_list");
const inputCocktail = document.getElementById("cocktail");
const greeting = document.querySelector(".greeting_text");

// TODOs:
// DONE 1. allow users to add cocktail to bookmark
// DONE 2. allow users to view bookmarked cocktails (as list in a div),and add clickable link to list item
// DONE 3. allow user to remove item from bookmark
// DONE 4. allow users to search cocktail by name then render search result as list
// DONE 5. clean up code
// DONE 6. structure js
// 7. files add pagination (cancelled)
// 8. Solve bookmark issue: after reload the bookmarked cocktail's bookmark_btn class doesn't have "added" anymore

// Extras:
// 1. add servings calculator (cancelled)

let bookmarked = [];

// When render, if the drink's id is saved in localStorage then show "bookmarked"
// let drinkIds = getLocalStorage();
// if (drinkIds.includes(`${data.idDrink}`)) {
//   setItemAsBookmarked()
// }

// render drinks as listed links
// <SOLVED> Q1: How to make list items clickable links?
// Solution: can let the href of anchor tag (located inside list items) link to the drink's id, and then use one of the functions to render drink using the id provided

// <SOLVED> Q2: How to get the search value from the form input?
const randomNum = function (length) {
  return Math.floor(Math.random() * length);
};

const setItemAsBookmarked = function () {
  document.querySelector(".bookmark_btn").classList.add("added");
  document.querySelector(
    ".bookmark_btn"
  ).innerHTML = `<span class="material-symbols-outlined">
  bookmark_added
  </span>Bookmarked`;
};

const test = function (data) {
  let drinkIds = getLocalStorage();
  if (drinkIds.includes(`${data.idDrink}`)) {
    console.log("Yes!");
    // setItemAsBookmarked();
  }
};

const renderDrinkFromSearch = function (id) {
  while (cocktailsContainer.firstChild) {
    cocktailsContainer.removeChild(cocktailsContainer.firstChild);
  }
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      data = data.drinks[0];
      renderCocktail(data);
    })
    .finally((cocktailsContainer.style.opacity = 1));
};

const renderResult = function (data) {
  searchList.innerHTML = "";
  let html = "";
  let i = 0;
  while (i < data.length) {
    html += `
      <li class="list_item">
        <div class="list_link" data-id="${data[i].idDrink}" onClick="renderDrinkFromSearch(${data[i].idDrink})">
          <img
            class="list_item_img"
            src="${data[i].strDrinkThumb}"
          />
          ${data[i].strDrink} (${data[i].strAlcoholic})
        </div>
      </li>`;
    i++;
  }
  searchList.insertAdjacentHTML("beforeend", html);
};

const getCocktailByName = function (name) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => {
      data = data.drinks;
      renderResult(data);
    });
};

const searchCocktailByName = function (e) {
  e.preventDefault();
  let name = inputCocktail.value.toLowerCase().trim();
  getCocktailByName(name);
};

const deleteAllBookmarks = function () {
  localStorage.removeItem("Bookmarked");
};

const closeBookmarkList = function () {
  bookmarkContainer.classList.add("bookmarked_content_container_inactive");
  bookmarkContainer.classList.remove("bookmarked_content_container_active");
  closeBtn.classList.add("close_btn_inactive");
  closeBtn.classList.remove("close_btn_active");
  bookmarkList.innerHTML = "";
};

// <SOLVED> This function is not working correctly...
// <SOLVED> Not working
// Solution: 可以用drink id
const deleteBookmarkedItem = function (id) {
  if (confirm("Do you want to delete this beverage?")) {
    const bookmarks = JSON.parse(localStorage.getItem("Bookmarked"));
    const adjustedBookmarks = bookmarks.filter((bookmark) => bookmark != id);
    localStorage.setItem("Bookmarked", JSON.stringify(adjustedBookmarks));
    location.reload();
    alert("Deleted!");
  } else {
    alert("Cancelled");
  }
};

// ISSUE: drink can be add into localStorage but after reload its bookmark's class doesn't have "added" anymore kinda SOLVED (add the class again)--> need improvement
// <SOLVED> ISSUE 2: drinks are not added correctly, now every drink rendered will be added...
// Add the drink's id to localStorage, when bookmark button is clicked
const addAsBookmark = function (id) {
  // add id into bookmarked array
  if (bookmarked.includes(id)) return;
  bookmarked.push(id);

  // change the style of bookmark btn
  if (document.querySelector(".bookmark_btn").classList.contains("added")) {
    deleteBookmarkedItem(id);
  } else {
    setItemAsBookmarked();
    // add drink into localStorage
    localStorage.setItem("Bookmarked", JSON.stringify(bookmarked));
    alert("Drink was added successfully!");
    getBookmarkedItems();
  }
};

// Get stored ids from localStorage
const getLocalStorage = function () {
  const drinkIds = JSON.parse(localStorage.getItem("Bookmarked"));
  return drinkIds;
};

// Using the id to get the drink's data
// when bookmarked btn is clicked, get drink data from the id stored in localStorage
const getDrinkFromId = function (drinkIds) {
  drinkIds.forEach((drinkId) =>
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
      .then((res) => res.json())
      .then((data) => {
        data = data.drinks[0];
        // render bookmarked drink list using data
        renderList(data);
      })
  );
};
const renderDrinkById = function (id) {
  while (cocktailsContainer.firstChild) {
    cocktailsContainer.removeChild(cocktailsContainer.firstChild);
  }
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      data = data.drinks[0];
      renderCocktail(data);
      setItemAsBookmarked();
    })
    .finally((cocktailsContainer.style.opacity = 1));
};

//<DONE> TODO: re-design list for showing both search result items and bookmarked items
// render bookmarked items as a list using the drinks' ids stored in localStorage(need to get strDrink, strAlcoholic and strDrinkThumb) DONE
// and then create link for each bookmarked drinks DONE
const renderList = function (data) {
  let html = ``;
  html += `
        <li class="bookmark_item"><div class="link" data-id="${data.idDrink}" onClick="renderDrinkById(${data.idDrink})"><img class="bookmark_item_img" src="${data.strDrinkThumb}"/> ${data.strDrink} (${data.strAlcoholic})</div></li>`;

  bookmarkList.insertAdjacentHTML("beforeend", html);
};

const getBookmarkedItems = function () {
  bookmarkList.innerHTML = "";
  bookmarkContainer.classList.remove("bookmarked_content_container_inactive");
  bookmarkContainer.classList.add("bookmarked_content_container_active");
  closeBtn.classList.remove("close_btn_inactive");
  closeBtn.classList.add("close_btn_active");
  let drinkIds = getLocalStorage();
  if (drinkIds?.length > 0) {
    getDrinkFromId(drinkIds);
  } else {
    bookmarkContainer.innerHTML = `<li class="bookmark_item">You don't have any bookmarked drinks</li>`;
  }
};

const renderCocktail = function (data) {
  greeting.style.display = "none";

  while (cocktailsContainer.firstChild) {
    cocktailsContainer.removeChild(cocktailsContainer.firstChild);
  }

  const html = `
  <article class="cocktail">
    <img class="cocktail__img" src="${data.strDrinkThumb}" />
    <div class="cocktail__data">
      <div class="cocktail_illustration">
        <h3 class="cocktail__name">${data.strDrink}</h3>
        <div class="bookmark_btn" onClick="addAsBookmark(${
          data.idDrink
        })"><span class="material-symbols-outlined">
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

// <SOLVED> ISSUE: cannot generate random drink
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
          renderCocktail(data);
        })
        .finally((cocktailsContainer.style.opacity = 1));
    });
};

// <SOLVED> ISSUE: cannot generate random drink
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
          renderCocktail(data);
        })
        .finally((cocktailsContainer.style.opacity = 1));
    });
};

const link = document.querySelector(".link");
const bookmarkBtn = document.querySelector(".bookmark_btn");
const listedLink = document.querySelector(".list_link");
const input = document.querySelector("[type=search]");

btnCocktail.addEventListener("click", getAlcoholic);
btnNonAlcoholic.addEventListener("click", getNonAlcoholic);
bookmarkedLink.addEventListener("click", getBookmarkedItems);
closeBtn.addEventListener("click", closeBookmarkList);
searchBtn.addEventListener("click", searchCocktailByName);

// const hideMobileKeyboardOnReturn = function (keyboardEvent) {
//   element.addEventListener("keyup", (keyboardEvent) => {
//     if (keyboardEvent.code == "Enter") {
//       element.blur();
//     }
//   });
// };
input.addEventListener("keyup", (keyboardEvent) => {
  if (keyboardEvent.code == "Enter") {
    input.blur();
  }
});
