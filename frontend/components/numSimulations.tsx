import {useState} from "react";

export default function NumSimulations(props: NumSimulationsProps){
    return (
        <div className='h-full w-32'>
            <p className="block text-sm text-gray-500">
                Simulations
            </p>
            <div>
                <input
                    type="number"
                    onChange={(e) => {
                        console.log('change')
                        props.onChange(e.target.valueAsNumber)
                    }}
                    className="block h-9 w-full hover:ring-1 hover:ring-black rounded-md placeholder-black px-3 shadow-sm border border-gray-300 bg-white text-sm"
                    placeholder='50'
                />
            </div>
        </div>
    )
}

interface NumSimulationsProps {
    numSimulations: number,
    onChange: (numSimulations: number) => void
}