import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const isDark = theme === 'dark'

    const handleToggle = () => {
        setTheme(isDark ? 'light' : 'dark')
    }

    return (
        <div className='absolute left-4 top-4'>
            <button
                onClick={handleToggle}
                className='bg-gray-300 p-1 rounded-full border-2 border-border'
            >
                <Image
                    src={isDark ? "light.svg" : "dark.svg"}
                    width={52}
                    height={52}
                    alt={isDark ? "A lightbulb" : "A full moon"}
                />
            </button>
        </div>
    )
}

export default ThemeSwitch