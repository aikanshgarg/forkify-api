// CONTROLLER: all in one file

import Search from './models/Search';

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
	const query = 'pizza';

	if (query) {
		// 2) New search object and add it to state
		state.search = new Search(query);

		// 3) Prepare UI for results (loading spinner)

		// 4) Seatch for recipes
		await state.search.getResults(); // getResults is an async fn which returns a promise, thus, await the result

		// 5) Render results on UI
		console.log(state.search.result);
	}

}

// addEventListener on search form
document.querySelector('.search').addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
})

