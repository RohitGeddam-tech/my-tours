export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input {...props} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 ring-blue-500 ring-offset-2 transition-all" />
    );
}
