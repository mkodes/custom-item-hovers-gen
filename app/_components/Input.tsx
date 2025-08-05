interface InputFieldProps {
    name: string
    index: number
}

export default function InputField({ name, index }: InputFieldProps) {
    return (
        <input
            type="text"
            name={`${name}-${index}`}
            className="border-2 border-gray-800 rounded-sm"
        />
    )
}