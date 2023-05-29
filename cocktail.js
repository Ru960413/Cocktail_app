"use strict";
const btnCocktail = document.querySelector(".btn-cocktail");
const cocktailsContainer = document.querySelector(".cocktails");
const btnNonAlcoholic = document.querySelector(".btn-non-alcoholic");
const searchBtn = document.querySelector(".search_btn");
const bookmarkedLink = document.querySelector(".bookmarked");
const clearBtn = document.querySelector(".clear");
const mainContainer = document.querySelector(".container");
const bookmarkContainer = document.querySelector(
  ".bookmarked_content_container"
);
const bookmarkList = document.querySelector(".bookmark_list");
const closeBtn = document.querySelector(".close-btn");
const deleteBtns = document.querySelectorAll(".delete");
// TODOs:
// DONE 1. allow users to add cocktail to bookmark
// DONE 2. allow users to view bookmarked cocktails (as list in a div),and add clickable link to list item
// 3. allow users to search cocktail by name then render search result as list
// 4. allow user to remove item from bookmark
// 5. add pagination
// 6. structure js files

// Extras:
// 1. add servings calculator

let bookmarked = [];

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

const deleteAllBookmarks = function () {
  localStorage.removeItem("Bookmarked");
};

// Not working...
// const deleteBookmarkedItem = function () {
//   if (confirm("Are you sure you want to delete this beverage?")) {
//     const bookmarkEl = e.target.closest(".bookmark_item");
//     localStorage.getItem("Bookmarked");
//     const bookmarks = JSON.parse(localStorage.getItem("Bookmarked"));
//     for (let i = 0; i < bookmarks.length; i++) {
//       if ((bookmarks[i] = bookmarkEl.getAttribute("data-id"))) {
//         bookmarks.splice(i, 1);
//         break;
//       }
//     }
//     localStorage.setItem("Bookmarked", JSON.stringify(bookmarks));
//     location.reload();
//     alert("Deleted!");
//   } else {
//     alert("Cancelled");
//   }
// };

// Unfinished
// ISSUE: drink can be add into localStorage but after reload its bookmark's class doesn't have "added" anymore kinda SOLVED (add the class again)
// ISSUE 2: drinks are not added correctly, now every drink rendered will be added... SOLVED

// Add the drink's id to localStorage, when bookmark button is clicked
const addAsBookmark = function (id) {
  // add id into bookmarked array
  if (bookmarked.includes(id)) return;
  bookmarked.push(id);
  //console.log(bookmarked);
  // change the style of bookmark btn
  document.querySelector(".bookmark_btn").classList.add("added");
  // add drink into localStorage
  localStorage.setItem("Bookmarked", JSON.stringify(bookmarked));
};

// Get stored ids from localStorage
const getLocalStorage = function () {
  const drinkIds = JSON.parse(localStorage.getItem("Bookmarked"));
  // console.log(drinkIds);
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
        //console.log(data);
        // render bookmarked drink list using data
        renderList(data);
      })
  );
};

// TODO: re-design list for showing both search result items and bookmarked items DONE
// render bookmarked items as a list using the drinks' ids stored in localStorage(need to get strDrink, strAlcoholic and strDrinkThumb) DONE
// and then create link for each bookmarked drinks (don't know how...)
const renderList = function (data) {
  let html = ``;
  html += `
        <li class="bookmark_item"><div class="link" data-id="${data.idDrink}" onClick="renderDrinkById(${data.idDrink})"><img class="bookmark_item_img" src="${data.strDrinkThumb}"/> ${data.strDrink} (${data.strAlcoholic})</div><div class="delete">Delete</div></li>`;

  bookmarkList.insertAdjacentHTML("beforeend", html);
};

const getBookmarkedItems = function () {
  bookmarkList.innerHTML = "";
  bookmarkContainer.classList.remove("bookmarked_content_container_inactive");
  bookmarkContainer.classList.add("bookmarked_content_container_active");
  closeBtn.classList.remove("close-btn_inactive");
  closeBtn.classList.add("close-btn_active");
  let drinkIds = getLocalStorage();
  if (!drinkIds) {
    bookmarkContainer.innerHTML = `<li class="bookmark_item">You don't have any bookmarked drinks</li>`;
  } else {
    getDrinkFromId(drinkIds);
  }
};

const closeBookmarkList = function () {
  bookmarkContainer.classList.add("bookmarked_content_container_inactive");
  bookmarkContainer.classList.remove("bookmarked_content_container_active");
  closeBtn.classList.add("close-btn_inactive");
  closeBtn.classList.remove("close-btn_active");
  bookmarkList.innerHTML = "";
};

const renderDrinkById = function (id) {
  while (cocktailsContainer.firstChild) {
    cocktailsContainer.removeChild(cocktailsContainer.firstChild);
  }
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      data = data.drinks[0];
      //console.log(data);
      renderCocktail(data);
      document.querySelector(".bookmark_btn").classList.add("added");
      // deleteBtns.forEach((deleteBtn) =>
      //   deleteBtn.addEventListener("click", deleteBookmarkedItem)
      // );
    });
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
        });
    })
    .finally((cocktailsContainer.style.opacity = 1));
};

btnCocktail.addEventListener("click", getAlcoholic);
btnNonAlcoholic.addEventListener("click", getNonAlcoholic);
bookmarkedLink.addEventListener("click", getBookmarkedItems);
// clearBtn.addEventListener("click", deleteAllBookmarks);
closeBtn.addEventListener("click", closeBookmarkList);
