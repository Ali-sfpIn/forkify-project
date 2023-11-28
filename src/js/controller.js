import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/PaginationView.js';
import bookmarkView from './views/bookmarkView.js';
import AddRecipeView from './views/AddRecipeView.js';
import addRecipeView from './views/AddRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 0) update the selected recipe results
    resultsView.update(model.getSearchResultsPage());
    // 1) loading the recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2) rendering the recipe
    recipeView.render(model.state.recipe);
    // 3) updating the bookmarks
    // debugger;
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) get search query...
    const query = searchView.getQuery();
    if (!query) return;
    // 2) loading the search results...
    await model.loadSearchResults(query);
    // 3) render the results..
    resultsView.render(model.getSearchResultsPage());
    // 4) render the initial pagination...
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const paginationControl = function (goToNum) {
  // 1) render the results..
  resultsView.render(model.getSearchResultsPage(goToNum));
  // 2) render the initial pagination...
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings in state
  model.updateServings(newServings);
  // update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add or remove the bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // update the recipe view
  recipeView.update(model.state.recipe);
  // render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const bookmarksControl = function () {
  bookmarkView.render(model.state.bookmarks);
};

const addRecipeControl = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // Render the uploaded recipe
    recipeView.render(model.state.recipe);
    // display the success message
    addRecipeView.renderMessage();
    // render the bookmarks
    bookmarkView.render(model.state.bookmarks);
    // change the id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // close the window
    setTimeout(() => addRecipeView._toggleWindow(), MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('🎇', err);
    addRecipeView.renderError(err.message);
  }
};

const init = () => {
  bookmarkView.addRenderHandler(bookmarksControl);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addUpdateServingsHandler(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(paginationControl);
  addRecipeView._addHandlerUpload(addRecipeControl);
  console.log('Welcome!');
};
init();
