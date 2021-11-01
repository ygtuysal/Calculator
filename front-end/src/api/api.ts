import axios from 'axios'

export type APIParams = {displayValue: string, key: string}
export type APIRetValue = {value: string}

export const api = async (params: APIParams) => {
    const url = process.env.REACT_APP_API_URL || 'http://localhost:5000'
    try {
        const res = await axios.post<APIRetValue>(url, params)
        const ret: APIRetValue = res.data
        return ret
    } catch (err) {
        console.error(err)
        throw err
    }
}