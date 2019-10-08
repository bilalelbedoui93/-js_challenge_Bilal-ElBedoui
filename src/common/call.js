import React from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'

export default function call(url, options) {
    const { method , headers, data, timeout = 0 } = options

        return (async () => {
            try {
				debugger
                const result = await axios({
                    url,
                    method,
                    headers,
                    data,
                    timeout
                })
                return result
            } catch (err) {
                if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') throw new ConnectionError('cannot connect')

                if (!err.response) throw err
                const { response: { data: { error } } } = err
                if (error) err.message = error
                throw err
            }
        })()
}


/*
export default async function call(method, url, options = {}) {
	const { data, token, params } = options
	let response = {}

	try {
		response = await axios({
			method,
			url,
			data: data ? data : undefined,
			headers: {
				'auth': token ? token : undefined
			},
			params: params ? params : undefined

		})

		return response.data
	} catch (axiosError) {
		//IN CASE OF NETWORK ERROR
		if (axiosError.message && !axiosError.response) {
			response.error = axiosError.message
			response.code = axiosError.status
			return response
		}

		response.code = axiosError.response.status
		//WE NEED TO CHECK ON BACK-END WHY SOME ERROR RESPONSE ARE SET AS ERROR OR MESSAGE 

		if (axiosError.response.data.error) response.error = axiosError.response.data.error

		if (axiosError.response.data.message) response.error = axiosError.response.data.message

		return response
	}
}
*/