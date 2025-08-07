interface AddInputsProps {
    inputCount: number
    onAddInput: () => void
}

export default function AddInputs({ inputCount, onAddInput }: AddInputsProps) {
    return (
        <div className="flex items-center justify-center space-x-2">
            <p>Current inputs: {inputCount}</p>
            <button className="border-2 border-border bg-button-plus p-2 rounded-md hover:cursor-pointer" type="button" onClick={onAddInput}>
                Add Input
            </button>
        </div>
    )
}