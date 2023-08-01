import { useState } from 'react'
import axios, { AxiosError } from 'axios'

interface ApiResponse<T> {
    data: T | null
    error: AxiosError | null
    loading: boolean
}

interface PutAPIResponse<T> extends ApiResponse<T> {
    putData: (putData: T) => Promise<void>
}

const usePutAPI = <T>(url: string): PutAPIResponse<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const putData = async (putData: Partial<T>): Promise<void> => {
        try {
            setLoading(true)
            const response = await axios.put(url, putData)
            setData(response.data)
            setError(null)
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { data, error, loading, putData }
}

export default usePutAPI
