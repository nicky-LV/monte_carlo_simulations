import Dygraph from 'dygraphs';
import {useEffect, useState} from "react";
import axios from 'axios';
import SelectETF from "../components/selectETF";

export default function Home() {
    const [ETF, setETF] = useState<string>('SPY')
    const [data, setData] = useState([]);
    const [simulations, setSimulations] = useState([]);
    // todo: change
    const symbol: string = 'SPY'
    const num_iterations: number = 50


    useEffect(() => {
        axios.get(`0.0.0.0:8000/monte-carlo-data/${symbol}/${num_iterations}`)
            .then(response => {
                setData(response.data.data);
                setSimulations(response.data.simulations)
            }).catch(error => {
            // todo: error handling
        })
    }, [])


    return (
        <div className='flex flex-col gap-32 h-screen bg-gray-50'>
            <div className='flex flex-col bg-white justify-center items-center p-4 shadow'>
                <SelectETF setETF={(ETF: string) => setETF(ETF)} />

            </div>

            <section className='bg-white shadow-lg border-t p-6 md:mx-48 h-full rounded-lg'>
                
            </section>

        </div>
    )
}
