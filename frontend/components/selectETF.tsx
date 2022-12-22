import {Fragment, useEffect, useState} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import axios from "axios";


const ETFs = [
    { id: 1, name: 'SPY' },
    { id: 2, name: 'Arlene Mccoy' }
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function SelectETF(props: SelectETFProps) {
    const [selected, setSelected] = useState<string>("");
    const [ETFs, setETFs] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`http://0.0.0.0:8000/symbols`).then((response) => {
            const symbols: string[] = response.data;
            setETFs(symbols)
            setSelected(symbols[0])
        })
    }, [])

    return (
         ETFs && <Listbox value={selected} onChange={(ETF) => {
            setSelected(ETF);
            props.setETF(ETF)
        }
        }>
            {({ open }) => (
                <>
                    <div className="relative w-32">
                        <p className='text-sm text-gray-500'>ETF</p>
                        <Listbox.Button
                            className="relative h-9 w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none hover:ring-1 hover:ring-black sm:text-sm">
                            <span className="block truncate">{selected}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {ETFs.map((etf, idx) => (
                                    <Listbox.Option
                                        key={idx}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={etf}
                                    >
                                        {({ selected, active }) => (
                                            <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {etf}
                        </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

interface SelectETFProps {
    setETF: (ETF: string) => void
}
