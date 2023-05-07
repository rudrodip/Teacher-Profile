export default function ColorPicker(label = 'Color', name, handleChange) {
    return (
        <div>
            <label className="text-white dark:text-gray-200">{label}</label>
            <input
                name={name}
                type="color"
                className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md bg-gray-800 dark:text-gray-300 border-gray-600  focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
            />
        </div>
    )
}