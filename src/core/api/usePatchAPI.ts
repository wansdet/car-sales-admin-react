import { useState } from 'react'
import axios, { AxiosError } from 'axios'

interface ApiResponse<T> {
    data: T | null
    error: AxiosError | null
    loading: boolean
}

interface PatchAPIResponse<T> extends ApiResponse<T> {
    patchData: (patchData: T) => Promise<void>
}

const usePatchAPI = <T>(url: string): PatchAPIResponse<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const patchData = async (patchData: Partial<T>): Promise<void> => {
        try {
            setLoading(true)
            const response = await axios.patch(url, patchData)
            setData(response.data)
            setError(null)
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { data, error, loading, patchData }
}

export default usePatchAPI
