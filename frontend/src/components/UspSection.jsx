import { USP_ITEMS } from '../constants/brand';

const icons = {
  curated: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  ),
  delivery: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8m4 0h2a1 1 0 001-1v-4a1 1 0 00-1-1h-2m-4 5v-5m4 5v-5" />
  ),
  rewards: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  support: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  ),
};

export default function UspSection() {
  return (
    <section id="why-meridian" className="border-y border-default bg-muted py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-meridian-600 dark:text-meridian-400">
            Why choose us
          </p>
          <h2 className="section-title mt-2">The Meridian difference</h2>
          <p className="section-subtitle mx-auto">
            We built our store around what readers actually want — not algorithms alone.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USP_ITEMS.map((item) => (
            <div
              key={item.title}
              className="card group p-6 transition hover:shadow-card-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-meridian-100 text-meridian-700 dark:bg-meridian-900/50 dark:text-meridian-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {icons[item.icon]}
                </svg>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
