interface InputFieldProps {
    name: string
    index: number
}

export default function InputField({ name, index }: InputFieldProps) {
    return (
        <input
            type="text"
            name={name}  // Use the name as-is, don't modify it
            className="border-2 border-gray-800 rounded-sm"
            placeholder={`Input ${index + 1}`}  // You can still use index for placeholder
        />
    )
}