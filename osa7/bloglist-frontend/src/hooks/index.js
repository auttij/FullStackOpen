import { useState, useEffect } from 'react'
import axios from 'axios'

/* eslint-disable no-mixed-spaces-and-tabs */
export const useResource = (baseUrl) => {
	const [resources, setResources] = useState([])

	useEffect(() => {
		const request = axios.get(baseUrl)
		return request.then(response => setResources(response.data))
	}, [baseUrl])

	const create = async (resource) => {
		const request = axios.post(baseUrl, resource)
		request.then(response => {
			setResources(resources.concat(response.data))
		})
	}

	const service = {
		create
	}

	return [
		resources, service
	]
}