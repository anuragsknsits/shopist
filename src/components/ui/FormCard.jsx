export default function FormCard({ title, children }) {
  return <section className="mx-auto my-6 w-full max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
    <h1 className="mb-6 text-2xl font-semibold text-gray-900">{title}</h1>
    {children}
  </section>;
}
