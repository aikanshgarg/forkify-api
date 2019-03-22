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
};

// displaying a single recipe, using template string to write HTML markup
const renderRecipe = recipe => {
	const markup = `
		<li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>    
	`;

	elements.searchResList.insertAdjacentHTML('beforeend', markup);
};
// displaying the recipes on UI
export const renderResult = recipes => {
	recipes.forEach(renderRecipe);
};