import * as model from './module.js'
import recipeView  from './views/recipeView.js'
import searchView from './searchView.js'
import resultView from './views/resultView.js'
import paginationView from './views/paginationView.js'
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js'
// import icons from '../img/icons.svg'
import 'core-js/stable'
import 'regenerator-runtime/runtime'


// if(model.hot){
//   model.hot.accept()
// }


const controlRecipes = async function(){
  try{

    const id = window.location.hash.slice(1)
    console.log(id);

    if(!id) return
    recipeView.renderSpinner()

    // update results view to mark selected mark results
    resultView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)
    // Loading recipe
    await model.loadRecipe(id)
    // const {recipe} = model.state
  //  Rendering recipe
  recipeView.render(model.state.recipe)
  }catch(err){
    recipeView.renderError()
  }
}
// controlRecipes()

const controlSearchResults = async function(){
  try{
    resultView.renderSpinner()
    // Get search query
    const query = searchView.getQuery()
    if(!query) return

    // Load search results
    await model.loadSearchResults(query)

    // Render results
    // resultView.render(model.state.search.results)
    resultView.render(model.getSearchResultsPage())

    // Render the initial pagination
    paginationView.render(model.state.search)


  }catch(err){
    console.log(err);
  }
};

const controlPagination = function(goToPage){
   // Render new Resuts
    // resultView.render(model.state.search.results)
    resultView.render(model.getSearchResultsPage(goToPage))

    // Render new pagination buttons
    paginationView.render(model.state.search)
}

const controlServings = function(newServings){
  // Update the recipe servings(in state)
  model.updateServings(newServings)

  // Update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)

}

const controlAddBookmark = function(){
  // Add or remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)

  // update recipe view
  recipeView.update(model.state.recipe)

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}
const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}
init()