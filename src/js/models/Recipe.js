import { key, proxy } from '../config';
import axios from 'axios'; // include the axios package: http protocol

// ES6 class
export default class Recipe {
	constructor(id) {
		this.id = id;
	}
	// ajax call method to get a particular recipe by it's ID
	async getRecipe() {
		try {
			const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.img = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
		} catch(error) {
			alert('Something went wrong :(');
	  	}
	}

	// assuming every 3 ingredients take up 15 mins, to display cooking time
	calcTime() {
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
	}
	// just a random fixed no. of servings for displaying on UI
	calcServings() {
		this.servings = 4;
	}
}