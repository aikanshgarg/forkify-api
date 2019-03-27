import { elements } from './base';

// ES6 arrow fn, returning the input of search form field
export const getInput = () => elements.searchInput.value;

// fn to clear the search form, using {} as fn isn't returning anything. Otherwise, => has an implicit return
export const clearInput = () => {
	elements.searchInput.value = '';
};

// clear previous results
export const clearResults = () => {
	elements.searchResList.innerHTML = '';
	elements.searchResPages.innerHTML = '';
};

// highlight the selected list item
export const highlightSelected = id => {
	const resultsArr = Array.from(document.querySelectorAll('.results__link')); // male array of all list items and remove active class 
	resultsArr.forEach(el => {
		el.classList.remove('results__link--active');
	});

	document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};

/*----------------------------------------------------------------------------------title shortening-----------------------------------------------------------------------*/
// method to shorten the name of recipes
export const limitRecipeTitle = (title, limit = 17) => {
	const newTitle = [];
	if (title.length > limit) {
		title.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newTitle.push(cur);
			}
			return acc + cur.length;
		}, 0);

		return `${newTitle.join(' ')} ...`;
	}
	return title;
};
/*----------------------------------------------------------------------------rendering recipes on left------------------------------------------------------------------*/
// displaying a single recipe, using template string to write HTML markup
const renderRecipe = recipe => {
	const markup = `
		<li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>    
	`;

	elements.searchResList.insertAdjacentHTML('beforeend', markup);
};
/*----------------------------------------------------------------- ----------------pagination-----------------------------------------------------------------------------*/
// type: 'prev' or 'next', page: current page
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `;
// render pagination buttons when there is more than a single page
const renderButtons = (page, numResults, resPerPage) => {
	const pages = Math.ceil(numResults / resPerPage);

	let button; 
	if (page === 1 && pages > 1) { // only forward page button visible
		button = createButton(page, 'next');
	} else if (page === pages && pages > 1) { // only previous button on last page
		button = createButton(page, 'prev');
	} else if (page < pages) { // show both buttons
		button = `
			${createButton(page, 'prev')}
			${createButton(page, 'next')}
		`;
	}

	elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};
/*-------------------------------------------------------------slices the recipe array and passes to render functions------------------------------------------------------*/
// displaying the recipes on UI
export const renderResult = (recipes, page = 1, resPerPage = 10) => {
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;
	
	recipes.slice(start, end).forEach(renderRecipe);

	// render pagination buttons
	renderButtons(page, recipes.length, resPerPage);
};
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/