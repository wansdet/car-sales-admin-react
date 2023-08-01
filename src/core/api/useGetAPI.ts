import { useState, useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'

interface ApiResponse<T> {
    data: T | null
    error: AxiosError | null
    loading: boolean
}

const useGetAPI = <T>(url: string): ApiResponse<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        let isMounted = true

        const fetchData = async (): Promise<void> => {
            try {
                const response: AxiosResponse<T> = await axios.get(url)
                if (isMounted) {
                    const responseData = response.data
                    // Infer the type when accessing the property 'hydra:member' on an unknown type
                    const extractedData =
                        (responseData as any)['hydra:member'] || responseData
                    setData(extractedData)
                    setError(null)
                    setLoading(false)
                }
            } catch (error: any) {
                if (isMounted) {
                    setError(error)
                    setLoading(false)
                }
            }
        }

        fetchData().catch((error) => {
            setError(error)
            setLoading(false)
        })

        return () => {
            isMounted = false
        }
    }, [url])

    return { data, error, loading }
}

export default useGetAPI
