'use client'

import { useState } from "react"
import InputField from "./_components/Input"
import AddInputs from "./_components/AddInputs"

export default function Page() {
  const [inputCountItems, setInputCountItems] = useState(0)
  const [inputCountHovers, setInputCountHovers] = useState(0)
  const [inputsItems, setInputsItems] = useState<string[]>([])
  const [inputsHovers, setInputsHovers] = useState<string[]>([])

  async function genFile(formData: FormData) {
    // Collect all item values
    const itemValues: string[] = []
    for (let i = 0; i < inputsItems.length; i++) {
      const value = formData.get(`items-${i}`)
      if (value && typeof value === 'string') {
        itemValues.push(value)
      }
    }

    // Collect all hover values
    const hoverValues: string[] = []
    for (let i = 0; i < inputsHovers.length; i++) {
      const value = formData.get(`hovers-${i}`)
      if (value && typeof value === 'string') {
        hoverValues.push(value)
      }
    }

    // Create the JSON structure
    const jsonOutput = {
      "is_hover_map": "absolutely",
      "hovers": [
        {
          "items": itemValues,
          "hovers": hoverValues // Note: wrapped in array as per your example
        }
      ]
    }

    // Convert to JSON string
    const jsonString = JSON.stringify(jsonOutput, null, 2)

    // Create and download the file
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'hover_map.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

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
    <div>
      <form className="w-full" action={genFile}>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 bg-amber-200/20 border-2 border-zinc-800/50 rounded-md">
          <div className="col-start-1">
            <h3 className="text-center font-bold text-xl">Items</h3>
            <div className="flex flex-col items-center space-y-2">
              <AddInputs
                inputCount={inputCountItems}
                onAddInput={addInputItems}
              />

              {inputsItems.map((inputId, index) => (
                <div className="space-x-2" key={inputId}>
                  <InputField name="items" index={index} />
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
            <h3 className="text-center font-bold text-xl">Hovers</h3>
            <div className="flex flex-col items-center space-y-2">
              <AddInputs
                inputCount={inputCountHovers}
                onAddInput={addInputHovers}
              />

              {inputsHovers.map((inputId, index) => (
                <div className="space-x-2" key={inputId}>
                  <InputField name={"hovers"} index={index} />
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
          <button className="row-start-2 col-span-2 flex m-auto bg-green-800 text-gray-200 p-2 rounded-md hover:cursor-pointer" type="submit">Generate File</button>
        </div>
      </form>
    </div>
  )
}