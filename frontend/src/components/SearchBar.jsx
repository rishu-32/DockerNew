export default function SearchBar({ value, onChange, onSubmit, variant = 'default' }) {
  const isHero = variant === 'hero';

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className={`flex flex-col gap-2 sm:flex-row ${
          isHero ? 'sm:items-stretch' : ''
        }`}
      >
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search by title, author, or keyword..."
            className={`input-field pl-11 ${isHero ? 'border-0 bg-white/95 py-3.5 shadow-lg dark:bg-ink-900/95' : ''}`}
          />
        </div>
        <button
          type="submit"
          className={isHero ? 'btn-primary px-8 py-3.5' : 'btn-primary sm:px-8'}
        >
          Search
        </button>
      </div>
    </form>
  );
}
