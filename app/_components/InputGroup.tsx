"use client"
import { useState, useEffect } from "react"

import AddInputs from "./AddInputs"
import InputField from "./Input"

export default function InputGroup({ groupIndex }: { groupIndex: number }) {
    const [inputCountItems, setInputCountItems] = useState(0)
    const [inputCountHovers, setInputCountHovers] = useState(0)
    const [inputsItems, setInputsItems] = useState<string[]>([])
    const [inputsHovers, setInputsHovers] = useState<string[]>([])

    const addInputItems = () => {
        setInputCountItems(prev => prev + 1)
        setInputsItems(prev => [...prev, `input-${inputCountItems + 1}`])
    }

    const removeInputItems = (index: number) => {
        setInputsItems(prev => prev.filter((_, i) => i !== index))
        setInputCountItems(prev => prev - 1)
    }

    const addInputHovers = () => {
        setInputCountHovers(prev => prev + 1)
        setInputsHovers(prev => [...prev, `input-${inputCountHovers + 1}`])
    }

    const removeInputHovers = (index: number) => {
        setInputsHovers(prev => prev.filter((_, i) => i !== index))
        setInputCountHovers(prev => prev - 1)
    }

    return (
        <div className="grid grid-cols-2 grid-rows-1 gap-2 bg-amber-200/20 border-2 border-zinc-800/50 rounded-md p-4 mb-4">
            <div className="col-start-1">
                <h3 className="text-center font-bold text-xl">Items (Group {groupIndex})</h3>
                <div className="flex flex-col items-center space-y-2">
                    <AddInputs
                        inputCount={inputCountItems}
                        onAddInput={addInputItems}
                    />

                    {inputsItems.map((inputId, index) => (
                        <div className="space-x-2" key={inputId}>
                            <InputField name={`items-${groupIndex}-${index}`} index={index} />
                            <button
                                className="bg-red-800 rounded-md p-2 text-gray-200"
                                type="button"
                                onClick={() => removeInputItems(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-start-2">
                <h3 className="text-center font-bold text-xl">Hovers (Group {groupIndex})</h3>
                <div className="flex flex-col items-center space-y-2">
                    <AddInputs
                        inputCount={inputCountHovers}
                        onAddInput={addInputHovers}
                    />

                    {inputsHovers.map((inputId, index) => (
                        <div className="space-x-2" key={inputId}>
                            <InputField name={`hovers-${groupIndex}-${index}`} index={index} />
                            <button
                                className="bg-red-800 rounded-md p-2 text-gray-200"
                                type="button"
                                onClick={() => removeInputHovers(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}