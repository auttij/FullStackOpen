import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
	const [resources, setResources] = useState([])

	useEffect(() => {
		const request = axios.get(baseUrl)
		return request.then(response => setResources(response.data))
	}, [baseUrl])

	const get = (id) => {
		const request = axios.get(baseUrl, id)
		return request.then(response => response.data)
	}

	const create = async (resource) => {
		const request = axios.post(baseUrl, resource)
		request.then(response => {
			setResources(resources.concat(response.data))
		})
	}

	const service = {
		get,
		create
	}

	return [
		resources, service
	]
}