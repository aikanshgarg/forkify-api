import { key, proxy } from '../config';
import axios from 'axios'; // include the axios package: http protocol

// ES6 class
export default class Search {

	constructor(query) {
		this.query = query;
	}

	// async method of Search class (every async fn returns a promise) 
	async getResults() {
		try {
			const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
			this.result = res.data.recipes;
		} catch(error) {
			alert('Something went wrong :(');
	  	}
	}
}