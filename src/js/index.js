// CONTROLLERS: all in one file

import { elements, renderLoader, clearLoader } from './views/base';

import Search from './models/Search';
import * as searchView from './views/searchView';

import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';

import List from './models/List';
import * as listView from './views/listView';

import Likes from './models/Likes';
import * as likesView from './views/likesView';

/** Global state of the app
* - Search object
* - Current recipe object
* - Shopping list onject
* - Liked recipes
*/

const state = {};

/********************************************************************************************************************************SEARCH CONTROLLER**************************/
// method for search form
const controlSearch = async () => { // async function for getting recipes from API
	// 1) get query from view
	const query = searchView.getInput();


	if (query) {
		// 2) New search object and add it to state
		state.search = new Search(query);

		// 3) Prepare UI for results (loading spinner)
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes); // results is the parent passed to renderLoader fn

		try {			
			// 4) Search for recipes (ajax call)
			await state.search.getResults(); // getResults is an async fn which returns a promise, thus, await the result

			// 5) Render results on UI
			clearLoader(); // remove loader
			searchView.renderResult(state.search.result); // result is a property of every object of Search class
		} catch (error) {
			alert(error);
			clearLoader(); 
		}
	}
};

// addEventListener on search form
elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

// addEventListener on the pagination buttons
elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) { // if btn is clicked, 
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();// clear previous list and its's buttons
		searchView.renderResult(state.search.result, goToPage); // render newer list and buttons
	}
});


/******************************************************************************************************************************RECIPE CONTROLLER***************************/
const controlRecipe = async () => {
	// 1) Get the ID from URL
	const id = window.location.hash.replace('#',''); // replace method of string class, 
	// URL => http://localhost:8080/#47746 [window.location- http://localhost:8080/][hash- #47746]
	console.log(id);

	if (id) {
		// 2) Prepare UI for changes
		recipeView.clearResults();
		renderLoader(elements.recipe);

		// Highlight the selected recipe
		if (state.search) searchView.highlightSelected(id);	
			

		// 3) Create new recipe object and add it to state
		state.recipe = new Recipe(id);
		
		try {
			// 4) Get recipe data (ajax call)
			await state.recipe.getRecipe();

			// 5) Calculate servings and time
			state.recipe.calcTime();
			state.recipe.calcServings();
			state.recipe.parseIngredients();

			// 6) Render recipe on UI
			clearLoader();
			recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

		} catch (error) {
			alert(error);
		}
		
	}
};


/********************************************************************************************************************************LIST CONTROLLER**************************/
const controlList = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};




state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());
/********************************************************************************************************************************LIKES CONTROLLER*************************/
const controlLike = () => {
	// Create a new likes array IF there in none yet
    if (!state.likes) state.likes = new Likes();

    const currentID = state.recipe.id;

    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
    	// Add like to state
    	const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img);

    	// Toggle like button(UI)
    	likesView.toggleLikeBtn(true);
    	
    	// Add likes lits(UI) 
    	likesView.renderLike(newLike);

   	// User has already liked the current recipe
    } else {
    	// Remove from state
    	state.likes.deleteLike(currentID);

    	// Toggle like button(UI)
    	likesView.toggleLikeBtn(false);

    	// Remove from likes list(UI)
    	likesView.deleteLike(currentID);
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());

};


/********************************************************************************************************************************EVENT LISTENERS***************************/
/*// addEventListener on window object to get recipe ID
window.addEventListener('hashchange', controlRecipe); // when hash(id) changes
window.addEventListener('load', controlRecipe); // page is refreshed, or URL bookmarked and visited later*/
// multiple event listeners attached to same event
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_In the below two methods we added event listeners to entire divs as the actual objects are not rendered when the page loads

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;// wherever we click on the list item (count, unit, ing or delete icon), we will get the id of that item

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);
	    // Delete from UI
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {// Handle the count update
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

// addEventListener on recipe servings + - button, love symbol, add recipe button
elements.recipe.addEventListener('click', el => {
	if (el.target.matches('.btn-decrease, .btn-decrease *')) {
		if (state.recipe.servings > 1) {
			state.recipe.updateServings('dec');
			recipeView.updateServingsIngredients(state.recipe);	
		} 
	} else if (el.target.matches('.btn-increase, .btn-increase *')) {
		state.recipe.updateServings('inc');
		recipeView.updateServingsIngredients(state.recipe);
	} else if (el.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
		controlList();
	} else if (el.target.matches('.recipe__love, .recipe__love *')) {
		// Like controller 
		controlLike();
	}
});