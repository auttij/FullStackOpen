const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return { likes: sum.likes + item.likes }
	}

	return blogs.reduce(reducer, { likes: 0 }).likes
}

module.exports = {
	dummy, totalLikes
}