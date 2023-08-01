import { useState } from 'react'
import axios, { AxiosError } from 'axios'

interface ApiResponse<T> {
    data: T | null
    error: AxiosError | null
    loading: boolean
}

interface DeleteAPIResponse extends ApiResponse<null> {
    deleteData: () => Promise<void>
}

const useDeleteAPI = (url: string): DeleteAPIResponse => {
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const deleteData = async (): Promise<void> => {
        try {
            setLoading(true)
            await axios.delete(url)
            setError(null)
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { error, loading, deleteData, data: null }
}

export default useDeleteAPI
