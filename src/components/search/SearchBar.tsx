export default function SearchBar() {
    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <input type="text" placeholder="Where are you going?" className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:ring-2 ring-blue-500 ring-offset-2" />
        </div>
    );
}
