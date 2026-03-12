export default function DestinationCard({ name }: { name: string }) {
    return (
        <div className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="h-48 bg-gray-200" />
            <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold">{name}</h3>
            </div>
        </div>
    );
}
