export default function Button({ children, variant = 'primary' }: { children: React.ReactNode, variant?: 'primary' | 'secondary' }) {
    const styles = variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900';
    return (
        <button className={`px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 ${styles}`}>
            {children}
        </button>
    );
}
