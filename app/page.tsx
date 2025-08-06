'use client'

import { useState } from "react"
import InputGroup from "./_components/InputGroup"
import UTFDropdown from "./_components/UTFDropdown"

export default function Page() {
  const [jsonObjectCount, setJsonObjectCount] = useState(0)
  const [jsonObjects, setJsonObjects] = useState<React.ReactElement[]>([])

  async function genFile(formData: FormData) {
    const hoversArray = []

    // Loop through each InputGroup
    for (let i = 0; i < jsonObjectCount; i++) {
      const itemValues = []
      const hoverValues = []

      // Collect items for this group
      let itemIndex = 0
      while (true) {
        const itemValue = formData.get(`items-${i}-${itemIndex}`)
        if (itemValue && typeof itemValue === 'string') {
          itemValues.push(itemValue)
          itemIndex++
        } else {
          break
        }
      }

      // Collect hovers for this group
      let hoverIndex = 0
      while (true) {
        const hoverValue = formData.get(`hovers-${i}-${hoverIndex}`)
        if (hoverValue && typeof hoverValue === 'string') {
          hoverValues.push(hoverValue)
          hoverIndex++
        } else {
          break
        }
      }

      // Add this group's data to the hovers array
      if (itemValues.length > 0 || hoverValues.length > 0) {
        hoversArray.push({
          items: itemValues,
          hovers: [hoverValues]
        })
      }
    }

    // Create the final JSON structure
    const jsonOutput = {
      "is_hover_map": "absolutely",
      "hovers": hoversArray
    }

    // Convert to JSON string and fix the double-escaped unicode
    let jsonString = JSON.stringify(jsonOutput, null, 2)

    // Replace u\\xxxx with \uxxxx (your specific pattern)
    jsonString = jsonString.replace(/u\\\\([0-9a-fA-F]{4})/g, '\\u$1')

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

  const addInputGroup = () => {
    setJsonObjectCount(prev => prev + 1)
    setJsonObjects([...jsonObjects, <InputGroup key={jsonObjectCount} groupIndex={jsonObjectCount} />])
  }

  const removeInputGroup = () => {
    setJsonObjectCount(prev => prev - 1)
    setJsonObjects(jsonObjects.slice(0, -1))
  }

  return (
    <div>
      <div className="mx-auto space-x-2 space-y-2 p-2 w-fit">
        <UTFDropdown />
        <button
          className="p-2 rounded-md bg-blue-300 mx-auto"
          type="button"
          onClick={addInputGroup}
        >
          Add Input Group
        </button>
        <button
          className="p-2 rounded-md text-gray-200 bg-red-800 mx-auto"
          type="button"
          onClick={removeInputGroup}
        >
          Remove Input Group
        </button>
      </div>
      <form className="w-full flex flex-col space-y-2" action={genFile}>
        {jsonObjects}
        <button className="mx-auto bg-green-800 text-gray-200 p-2 rounded-md hover:cursor-pointer" type="submit">
          Generate File
        </button>
      </form>
    </div>
  )
}