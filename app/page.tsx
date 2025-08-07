'use client'
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import InputGroup from "./_components/InputGroup"
import UTFDropdown from "./_components/UTFDropdown"
import ThemeChanger from "./_components/ThemeChanger"

export default function Page() {
  const [jsonObjectCount, setJsonObjectCount] = useState(0)
  const [jsonObjects, setJsonObjects] = useState<React.ReactElement[]>([])
  const { theme, setTheme } = useTheme()

  // Convert theme to isDark boolean for your existing components
  const isDark = theme === 'dark'

  const handleThemeChange = (newIsDark: boolean) => {
    setTheme(newIsDark ? 'dark' : 'light')
  }

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

    // Convert to JSON string with proper Unicode handling
    let jsonString = JSON.stringify(jsonOutput, null, 2)

    // Fix double-escaped Unicode characters
    // This handles cases like \\u20bf -> \u20bf
    jsonString = jsonString.replace(/\\\\u([0-9a-fA-F]{4})/g, '\\u$1')

    // Alternative approach: you could also use this more comprehensive replacement
    // that handles your specific pattern u\\xxxx -> \uxxxx
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
      <ThemeChanger />
      <div className="mx-auto space-x-2 space-y-2 p-2 w-fit">
        <UTFDropdown />
        <button
          className="p-2 rounded-md mx-auto bg-button-plus border-2 border-border"
          type="button"
          onClick={addInputGroup}
        >
          Add Input Group
        </button>
        <button
          className="p-2 rounded-md mx-auto bg-button-minus border-2 border-border"
          type="button"
          onClick={removeInputGroup}
        >
          Remove Input Group
        </button>
      </div>
      <form className="w-full flex flex-col space-y-2" action={genFile}>
        {jsonObjects}
        <button className="mx-auto p-2 rounded-md hover:cursor-pointer bg-button-action border-2 border-border" type="submit">
          Generate File
        </button>
      </form>
    </div>
  )
}