export function InputField(name: string) {
    return (
        <input type="text" name={name} />
    )
}

import { useState, useEffect } from "react"

export function Form() {
    let [inputCount, setInputCount] = useState(0)

    // useEffect(() => {
    //       const itemInputs = Intl.DateTimeFormat().resolvedOptions().locale
    //       setItemInputs(userLocale)
    //   }, [])

    async function genFile(formData: FormData) {
        'use server'

        const rawFormData = {
            items: formData.get('items'),
            hovers: formData.get('hovers'),
        }
        // mutate data
        // revalidate the cache
    }

    return (
        <form action={genFile}>
            {
            for (let index = 0; index < inputCount; index++) (
            )
            }
            <button type="submit">Generate File</button>
        </form>
    )
}