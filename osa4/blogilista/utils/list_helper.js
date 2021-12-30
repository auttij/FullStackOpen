const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return { likes: sum.likes + item.likes }
	}

	return blogs.reduce(reducer, { likes: 0 }).likes
}

const favoriteBlog = (blogs) => {
	const reducer = (favorite, item) => {
		return item.likes > favorite.likes ?
			item : favorite
	}

	return blogs.length === 0
		? {}
		: blogs.reduce(reducer, { likes: -1 })
}

module.exports = {
	dummy, totalLikes, favoriteBlog
}