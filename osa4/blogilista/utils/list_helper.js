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

const mostBlogs = (blogs) => {
	let counts = {}
	blogs.forEach(blog => {
		if (!(blog.author in counts)) {
			counts[blog.author] = 1
		} else {
			counts[blog.author] += 1
		}
	})

	const reducer = (a, b) => {
		return a[1] > b[1] ? a : b
	}

	const result = Object.entries(counts).reduce(reducer, { '': 0 })
	return blogs.length === 0
		? { author: '', blogs: 0 }
		: { author: result[0], blogs: result[1] }
}

const mostLikes = (blogs) => {
	let counts = {}
	blogs.forEach(blog => {
		if (!(blog.author in counts)) {
			counts[blog.author] = blog.likes
		} else {
			counts[blog.author] += blog.likes
		}
	})

	const reducer = (a, b) => {
		return a[1] > b[1] ? a : b
	}

	const result = Object.entries(counts).reduce(reducer, { '': 0 })
	return blogs.length === 0
		? { author: '', likes: 0 }
		: { author: result[0], likes: result[1] }
}

module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}