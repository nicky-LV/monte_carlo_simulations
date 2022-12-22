import {useEffect, useState} from "react";
import axios from 'axios';
import SelectETF from "../components/selectETF";
import dynamic from 'next/dynamic';
import NumSimulations from "../components/numSimulations";
import SimulateBtn from "../components/simulateBtn";
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function Home() {
    const [ETF, setETF] = useState<string>('SPY');
    const [numSimulations, setNumSimulations] = useState<number>(50);
    const [data, setData] = useState([]);
    const [simulations, setSimulations] = useState([]);


    // todo: change
    const symbol: string = 'SPY'
    const graph_options = {
        chart: {
            animations: {
                enabled: false
            },
            type: 'line',
            zoom: {
                enabled: true
            }
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            labels: {
                formatter: (value: any) => ""
            }
        }
    }

    function simulate(){
        axios.get(`http://0.0.0.0:8000/monte-carlo-data/${symbol}/${numSimulations}`)
            .then(response => {
                setData(response.data.data);
                setSimulations(response.data.simulations)

            }).catch(error => {
            // todo: error handling
        })
    }

    useEffect(() => {
        simulate();
    }, [])


    return (
        <div className='flex flex-col gap-32 h-screen bg-gray-50'>
            <div className='flex flex-row xl:px-96 bg-white justify-between items-center p-6 shadow'>
                <p className='text-2xl mt-4'>Monte Carlo Simulations</p>
                <div className='grid grid-cols-3 grid-rows-1 items-center gap-3'>
                    <SelectETF setETF={(ETF) => setETF(ETF)} />
                    <NumSimulations
                        numSimulations={numSimulations}
                        onChange={(num_simulations) => setNumSimulations(num_simulations)} />
                    <SimulateBtn onClick={() => simulate()} />
                </div>
            </div>

            <section className='bg-white shadow-lg border-t p-6 xl:mx-96 h-full rounded-lg'>
                <div className='grid grid-cols-1 gap-16 h-full'>
                    {simulations.length > 0 && <ApexCharts
                        type="line"
                        options={graph_options}
                        series={simulations}
                    />}
                </div>
            </section>

        </div>
    )
}
