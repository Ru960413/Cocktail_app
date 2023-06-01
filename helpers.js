// put all the helper functions here, then export them to cocktail.js

export const randomNum = function (length) {
  return Math.floor(Math.random() * length);
};

export const setItemAsBookmarked = function () {
  document.querySelector(".bookmark_btn").classList.add("added");
  document.querySelector(
    ".bookmark_btn"
  ).innerHTML = `<span class="material-symbols-outlined">
  bookmark_added
  </span>Bookmarked`;
};

export const closeBookmarkList = function () {
  bookmarkContainer.classList.add("bookmarked_content_container_inactive");
  bookmarkContainer.classList.remove("bookmarked_content_container_active");
  closeBtn.classList.add("close_btn_inactive");
  closeBtn.classList.remove("close_btn_active");
  bookmarkList.innerHTML = "";
};