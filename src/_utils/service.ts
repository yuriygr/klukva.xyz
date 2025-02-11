import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';

/**
 * Небольшая обертка над Axios.
 * Потому что мне так удобно.
 * 
 * @author Боженька <god@heaven>
 * @version 2.0.0
 */
const service = class {
	options = {
		baseURL: '',
		version: '',
		withCredentials: true
	}

	instance: AxiosInstance

	token = false

	constructor(options = {}) {
		this.options = { ...this.options, ...options }

		this.instance = axios.create({
			baseURL: this.options.baseURL + this.options.version + '/',
			withCredentials: this.options.withCredentials,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})

		this.instance.interceptors.request.use(
			async (config) => {
				return config;
			},
			(error) => Promise.reject(error)
		)

		this.instance.interceptors.response.use(
			this.handleResponseSuccess,
			this.handleResponseError
		)
	}

	// Ничего не делает
	handleResponseSuccess(data): AxiosResponse<JSON> {
		return JSON.parse(data.request.response)
	}

	// Преобразует ошибочный ответ в что-то более приятное моему глазу
	handleResponseError(error): Promise<AxiosError> {
		let hasResponse = error.response != undefined

		return Promise.reject({
			code: hasResponse
						? error.response.data.code || error.response.code
						: 0,
			status: hasResponse
							? error.response.data.status || error.response.statusText
							: error.message,
			message: hasResponse
							? error.response.data.error
							: error
		})
	}

	prepareGetData(params) {
    return new URLSearchParams(params).toString()
  }

	preparePostData(params) {
    let formData = new FormData()
    Object.keys(params).forEach(item => {
      formData.append(item, params[item])
    })

    let headers: AxiosRequestConfig<AxiosRequestConfig<AxiosHeaders>> = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    return [formData, headers]
  }

  /**
  * Скажу сразу, мне это все пиздец не нравится, так же как и вам.
  * Вот эта вот тупая заморозка параметров, ковыряение тегов, удаление устых полей объекта
  * По этому если есть желание - поправьте меня
  */
  prepareFiltersData(params) {
    let _params = Object.assign({}, params)

    _params.tags = _params.tags.map(x => x.value)

    Object.keys(_params).forEach(item => {
      if (_params[item] === '') {
        delete _params[item]
      }
    })
    return new URLSearchParams(_params).toString()
  }

	get(path, params = {}) {
		return this.instance.get(path, { params })
	}

  post(path, params = {}) {
    let [formData, headers] = this.preparePostData(params)
    return this.instance.post(path, formData, headers)
  }
} 

// Fuck astro with this env problems
let _addr = {
	'development': 'http://localhost:3677/',
	'production': 'https://service.klukva.xyz/'
}

export default new service({
	baseURL: _addr[import.meta.env.MODE],
  version: 'v1',
  withCredentials: true
})