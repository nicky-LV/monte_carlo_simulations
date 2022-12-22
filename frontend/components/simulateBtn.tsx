import {ArrowRightIcon} from "@heroicons/react/20/solid";

export default function SimulateBtn(props: SimulateBtnProps){
    return (
        <button
            type="button"
            className="inline-flex h-9 w-32 self-end justify-between items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => props.onClick()}
        >
            Simulate
            <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
    )
}

interface SimulateBtnProps {
    onClick: () => void
}