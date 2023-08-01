/* src/core/api/usePostAPI.ts */
import { useState } from 'react'
import axios, { AxiosError } from 'axios'

interface ApiResponse<T> {
    data: T | null
    error: AxiosError | null
    loading: boolean
}

interface PostAPIResponse<T> extends ApiResponse<T> {
    postData: (postData: T) => Promise<void>
}

const usePostAPI = <T>(url: string): PostAPIResponse<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const postData = async (postData: T): Promise<void> => {
        try {
            setLoading(true)
            const response = await axios.post(url, postData)
            setData(response.data)
            setError(null)
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { data, error, loading, postData }
}

export default usePostAPI
