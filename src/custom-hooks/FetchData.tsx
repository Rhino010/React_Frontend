import { useEffect, useState } from 'react'
import { server_calls } from '../api/server'

export const useGetData = () => {

    const [contactData, setData] = useState<[]>([])

    async function handleDataFetch() {
        const result = await server_calls.get();
        setData(result)
    }

    // useEffect on mount
    useEffect( () => {
        handleDataFetch();
    }, []) //Without the ,[] useEffect would run every single time the component changes that useEffect lives in.
    //Even if it was something as simple as checking or unchecking a box.
    //The empty array will only run when the DataTable component comes into existence on the Virtual DOM it will occur one time.
    // if you change it to [componentName] it would watch for changes on that one component and then run any time there
    // are changes to that one component.

    return { contactData, getData: handleDataFetch }

}





