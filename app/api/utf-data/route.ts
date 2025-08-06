import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const response = await fetch("https://www.utf8.codes/json/utf8-library.json");
        const data = await response.json();

        // Filter for characters with 4 or fewer hex digits (BMP: U+0000 to U+FFFF)
        const bmpCharacters = data.filter((char: any) => {
            // Extract the hex code point (assuming the API returns something like "U+0041" or just the hex value)
            const codePoint = typeof char.hex === 'string'
                ? parseInt(char.hex.replace(/^U\+?/, ''), 16)
                : typeof char.code === 'number'
                    ? char.code
                    : parseInt(char.unicode?.replace(/^U\+?/, '') || '0', 16);

            // Return only characters in BMP range (0x0000 to 0xFFFF)
            return codePoint >= 0x0000 && codePoint <= 0xFFFF;
        });

        return NextResponse.json({
            total: bmpCharacters.length,
            characters: bmpCharacters
        });
    } catch (error) {
        console.error('Error fetching UTF-8 data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}