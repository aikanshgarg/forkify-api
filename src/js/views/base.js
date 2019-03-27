// file having all the DOM elements: resusable stuff

export const elements = {
	searchForm: document.querySelector('.search'),
	searchInput: document.querySelector('.search__field'),
	searchRes: document.querySelector('.results'),
	searchResList: document.querySelector('.results__list'),
	searchResPages: document.querySelector('.results__pages'),
	recipe: document.querySelector('.recipe'),
	shopping: document.querySelector('.shopping__list'),
	likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

export const elementStrings = {
	loader: 'loader'
};

// for reusability: attach the loader to the parent element which is passed into as argument
export const renderLoader = parent => {
	const loader = `
		<div class="${elementStrings.loader}">
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			</svg>
		</div>
	`;
	// 'afterbegin': Just inside the element, before its first child.
	parent.insertAdjacentHTML('afterbegin', loader);
};
// remove the loader after data loads
export const clearLoader = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`);
	if (loader) {
		loader.parentElement.removeChild(loader);
	}
};