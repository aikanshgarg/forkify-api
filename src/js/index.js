import axios from 'axios'; // include the package

async function getResults(query) {
	const key = 'ffc8d69c30962a2817b4094b238c8924';
	try {
		const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
		const rec = res.data.recipes;
		console.log(rec);
	} catch (error){
		alert(error);
  	}
}
getResults('pizza');

// api key: 
// https://www.food2fork.com/api/search