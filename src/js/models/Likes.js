export default class Likes {
	constructor() {
		this.likes = [];
	}

	addLike(id, title, author, img) {
		const like = { id, title, author, img };
		this.likes.push(like);

		// Persist the data in local storage
		this.persistData();

		return like;
	}

	deleteLike(id) {
		const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // Persist the data in local storage
        this.persistData();
	}

	isLiked(id) {
		return this.likes.findIndex(el => el.id === id) !== -1;
	}

	getNumLikes() {
		return this.likes.length;
	}

	// Each time likes array is modified, store it in local storage. Convert the likes array to string as localStorage accepts only string
	persistData() {
		localStorage.setItem('likes', JSON.stringify(this.likes));
		//localStorage.setItem('likes', this.likes.join(''));
	}

	// JSON.parse turns back to original data structure, array in this case
	readStorage() {
		const storage = JSON.parse(localStorage.getItem('likes'));

		// Restore localStorage data to likes array
		if (storage) { this.likes = storage };
	}

}