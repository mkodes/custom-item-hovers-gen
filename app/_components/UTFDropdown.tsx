import { useState, useEffect } from 'react';

interface character {
    char: string,
    hex: string
}

export default function UTFDropdown() {
    const [data, setData] = useState<character[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [expanded, setExpanded] = useState(false)
    const [copiedChar, setCopiedChar] = useState<string | null>(null)

    // Example API endpoint - replace with your actual endpoint
    const API_URL = '/api/utf-data';

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonData = await response.json();
            setData(jsonData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (char: string) => {
        try {
            await navigator.clipboard.writeText(char);
            setCopiedChar(char);
            // Clear the copied indicator after 1 second
            setTimeout(() => setCopiedChar(null), 1000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            // Fallback for older browsers
            fallbackCopyToClipboard(char);
        }
    };

    // Fallback method for browsers that don't support navigator.clipboard
    const fallbackCopyToClipboard = (char: string) => {
        const textArea = document.createElement('textarea');
        textArea.value = char;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            setCopiedChar(char);
            setTimeout(() => setCopiedChar(null), 1000);
        } catch (err) {
            console.error('Fallback copy failed:', err);
        } finally {
            document.body.removeChild(textArea);
        }
    };

    // Auto-fetch on component mount
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='h-full'>
            {
                loading && (
                    <p>Loading...</p>
                )
            }
            {
                error && (
                    <p>Error: {error}</p>
                )
            }
            {
                data && !loading && (
                    <div>
                        <button className={`flex mx-auto h-fit hover:cursor-pointer bg-zinc-800 text-gray-200 p-2 rounded-md`} onClick={() => setExpanded(!expanded)}>Copy a unicode character</button>
                        <div className={`text-gray-200 absolute grid grid-cols-12 left-0 right-0 mx-auto justify-center w-fit ${expanded ? (`h-128 visible`) : `invisible`} overflow-y-scroll bg-gray-800 rounded-b-md p-2`}>
                            {
                                expanded && (
                                    data.map((item, index) => (
                                        <div
                                            className={`text-2xl hover:bg-gray-700 hover:cursor-pointer p-1 rounded transition-colors relative ${copiedChar === item.char ? 'bg-green-600' : ''
                                                }`}
                                            key={index}
                                            onClick={() => copyToClipboard("\\u" + item.hex)}
                                            title={`Click to copy ${item.char} (${item.hex})`}
                                        >
                                            <p>{item.char}</p>
                                            {copiedChar === item.char && (
                                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                                                    Copied!
                                                </span>
                                            )}
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}