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
			alert(error);
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

	// convert all ingredient units into some standards
	parseIngredients() {
		const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'g', 'kg', 'stick', 'scant'];

		const newIngredients = this.ingredients.map(el => {
			// 1) Uniform units
			let ingredient = el.toLowerCase();
			unitsLong.forEach((current, index) => {
				ingredient = ingredient.replace(current, unitsShort[index]);
			});

			// 2) Remove paranthesis
			 ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			// 3) Parse ingredients into count, unit and ingredients
			const arrIng = ingredient.split(' '); // convert ingredient string from step-2 into array, add elements seperated by ' ' to this array
			const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

			let objIng;
			if (unitIndex > -1) { // There is a unit

				// Ex: 4 1/2 cups, arrCount = [4, 1/2] or 4-1/2 cups, arrCount = [4-1/2]
				// Ex: 4 cups, arrCount = [4]
				const arrCount = arrIng.slice(0, unitIndex);

				let count;
				if (arrCount.length === 1) {
					count = eval(arrIng[0].replace('-', '+'));
				} else {
					count = eval(arrCount.join('+'));
				}

				objIng = {
					count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex+1).join(' ')
				};

			} else if (parseInt(arrIng[0], 10)) { // There is no unit but 1st element is a number: 1 tomato
				
				objIng = {
					count: parseInt(arrIng[0], 10),
					unit: '',
					ingredient: arrIng.slice(1).join(' ')
				};

			} else if (unitIndex === -1) { // There is no unit and no number: pasta sauce
				
				objIng = {
					count: '1',
					unit: '',
					ingredient // ES6 for ingredient:ingredient
				};
			}

			return objIng; // map method works like this, in each itern returned item is saved to newIngredients current position
		});
		this.ingredients = newIngredients; 
	}

	updateServings (type) {
		// Servings
		const newServings = type === 'dec' ? this.servings-1 : this.servings+1;

		// Ingredients
		this.ingredients.forEach(ing => {
			ing.count *= (newServings / this.servings);
		});

		this.servings = newServings;
	}

}