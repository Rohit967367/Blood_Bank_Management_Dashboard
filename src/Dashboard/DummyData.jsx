// import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const DummyData = () => {
    let [data, setData] = useState([]);

    useEffect(() => {
        async function getUserData(){
            console.log("=== Inside use Effect ====")
        let {data = []} = await axios.get('https://jsonplaceholder.typicode.com/todos')
        console.log(data);
        setData(data);
        }

        getUserData()
    }, [])

    return (
        <div>
            {data && data.length ? data.map((datalist)=>(
                <h3 key={datalist.id}>{datalist.title}</h3>
            )) : (
                <h3>no data found...</h3>
            )}
        </div>
    )
}

export default DummyData
