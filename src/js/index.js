// CONTROLLERS: all in one file

import { elements, renderLoader, clearLoader } from './views/base';

import Search from './models/Search';
import * as searchView from './views/searchView';

import Recipe from './models/Recipe';



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
			console.log(state.recipe);
		} catch (error) {
			alert(error);
		}
		
	}
};


/*// addEventListener on window object to get recipe ID
window.addEventListener('hashchange', controlRecipe); // when hash(id) changes
window.addEventListener('load', controlRecipe); // page is refreshed, or URL bookmarked and visited later*/
// multiple event listeners attached to same event
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));