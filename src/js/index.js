// CONTROLLER: all in one file

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
* - Search object
* - Current recipe object
* - Shopping list onject
* - Liked recipes
*/

const state = {};


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

		// 4) Search for recipes
		await state.search.getResults(); // getResults is an async fn which returns a promise, thus, await the result

		// 5) Render results on UI
		clearLoader(); // remove loader
		searchView.renderResult(state.search.result); // result is a property of every object of Search class

	}

}

// addEventListener on search form
elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
})

