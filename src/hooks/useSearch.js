import { useEffect, useState } from 'react'

export default function useSearch(query){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const makeQuery = async () => {
            try{
                setLoading(true)
                const url = `${process.env.REACT_APP_SERVER}/search?query=${query}`
                const res = await fetch(url)
                if(!res.ok){
                    throw res
                }
                const resData = await res.json()
                setData(resData)
                setLoading(false)
            }catch(err){
                setLoading(false)
                const errorData = await err.json()
                setError(errorData)
            }
        }
        if(query !== ''){
            makeQuery()
        }
        
    }, [query])

    return { data, loading, error }
}