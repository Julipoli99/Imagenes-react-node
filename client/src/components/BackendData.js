import {React, useState, useEffect} from "react";

function BackendData(){
    const [backendData, setBackendData] = useState([]);
    const [edades, setEdades] = useState([]);

    useEffect(() => {
        fetch("/api").then(response => response.json()).then(data => setBackendData(data.Nombres))
    }, [])

    useEffect(() => {
        fetch("/api").then(response => response.json()).then(data => setEdades(data.Edades))
    }, [])

    console.log(backendData);

    return(
        <div>
            {
                backendData.map((val, i) => {
                    return <li key={i}>{val}</li>
                })
            }

            {
                edades.map((val, i) => {
                    return <li key={i}>{val}</li>
                })
            }
        </div>
    )
}

export default BackendData;