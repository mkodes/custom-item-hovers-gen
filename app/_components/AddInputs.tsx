interface AddInputsProps {
    inputCount: number
    onAddInput: () => void
}

export default function AddInputs({ inputCount, onAddInput }: AddInputsProps) {
    return (
        <div className="flex items-center justify-center space-x-2">
            <p>Current inputs: {inputCount}</p>
            <button className="p-2 bg-zinc-800/50 text-gray-200 rounded-md hover:cursor-pointer" type="button" onClick={onAddInput}>
                Add Input
            </button>
        </div>
    )
}