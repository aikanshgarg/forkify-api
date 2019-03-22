import axios from 'axios'; // include the axios package: http protocol

// ES6 class
export default class Search {
	constructor(query) {
		this.query = query;
	}

	// async method of Search class (every async fn returns a promise) 
	async getResults() {
		const key = 'ffc8d69c30962a2817b4094b238c8924';
		try {
			const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
			this.result = res.data.recipes;
			//console.log(this.result);
		} catch(error) {
			alert(error);
	  	}
	}
}

