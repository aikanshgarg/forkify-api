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

// method to shorten the name of recipes
const limitRecipeTitle = (title, limit = 17) => {
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
// displaying the recipes on UI
export const renderResult = recipes => {
	recipes.forEach(renderRecipe);
};