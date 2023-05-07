export default function SelectionBox({ label, name, options, handleChange }) {
    return (
        <div>
            <label className="text-white dark:text-gray-200">{label}</label>
            <select
                name={name}
                className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
            >
                {
                    options.map((option, index) => {
                        return (
                            <option key={index}>{option}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}