import str from './models/Search';

// import {add, multiply, ID} from './views/searchView';
import * as searchView from './views/searchView';

console.log(`using imported fns! ${searchView.add(searchView.ID, 0)} and ${searchView.multiply(searchView.ID, 2)}. str: ${str}`);