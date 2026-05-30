import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bookApi, cartApi } from '../api/client';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import UspSection from '../components/UspSection';
import { BRAND, TESTIMONIALS, TRUST_STATS } from '../constants/brand';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const loadBooks = async (searchQuery = '') => {
    setLoading(true);
    setMessage('');
    try {
      const response = searchQuery
        ? await bookApi.search(searchQuery)
        : await bookApi.getAll();
      setBooks(response.data);
    } catch {
      setMessage('Unable to load catalog. Please ensure all services are running.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(books.map((b) => b.category).filter(Boolean))];
    return ['All', ...cats.sort()];
  }, [books]);

  const filteredBooks = useMemo(() => {
    if (category === 'All') return books;
    return books.filter((b) => b.category === category);
  }, [books, category]);

  const featuredBooks = useMemo(() => books.slice(0, 3), [books]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCategory('All');
    loadBooks(query.trim());
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToCart = async (book) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await cartApi.addItem({
        bookId: book.id,
        title: book.title,
        price: book.price,
        quantity: 1,
      });
      setMessage(`"${book.title}" has been added to your bag.`);
    } catch {
      setMessage('Please sign in again to continue shopping.');
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/75 to-ink-950/40" />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-meridian-300">
            {BRAND.founded} · Trusted by 50,000+ readers
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Stories worth staying up for.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-meridian-100/90">{BRAND.tagline}</p>
          <div className="mt-8 max-w-xl">
            <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} variant="hero" />
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/register" className="btn-primary">
              Create free account
            </Link>
            <a href="#collections" className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">
              Browse catalog
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-default bg-elevated">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-default sm:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="px-4 py-6 text-center sm:py-8">
              <p className="font-display text-2xl font-bold text-meridian-700 dark:text-meridian-400 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <UspSection />

      {/* Featured */}
      {featuredBooks.length > 0 && (
        <section className="bg-surface py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-meridian-600 dark:text-meridian-400">
              Editor&apos;s picks
            </p>
            <h2 className="section-title mt-2">Featured this week</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} onAddToCart={handleAddToCart} />
              ))}
            </div>
            </div>
        </section>
      )}

      {/* Catalog */}
      <section id="collections" className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-meridian-600 dark:text-meridian-400">
                Our catalog
              </p>
              <h2 className="section-title mt-2">Shop all titles</h2>
              <p className="section-subtitle">
                {books.length} books available · Filter by category or search above
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  category === cat
                    ? 'bg-meridian-600 text-white shadow-sm dark:bg-meridian-500'
                    : 'border border-default bg-elevated text-secondary hover:border-meridian-400 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {message && (
            <p className="mt-6 rounded-xl border border-meridian-200 bg-meridian-50 px-4 py-3 text-sm text-meridian-800 dark:border-meridian-800 dark:bg-meridian-950/50 dark:text-meridian-200">
              {message}
            </p>
          )}

          <div className="mt-8">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="card h-96 animate-pulse bg-muted" />
                ))}
              </div>
            ) : filteredBooks.length === 0 ? (
              <p className="py-16 text-center text-secondary">No titles match your search. Try another keyword.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} onAddToCart={handleAddToCart} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-default bg-elevated py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-meridian-600 dark:text-meridian-400">
              Reader reviews
            </p>
            <h2 className="section-title mt-2">Loved by book lovers</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="card p-6">
                <div className="flex gap-0.5 text-meridian-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} aria-hidden>★</span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-secondary">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 border-t border-default pt-4">
                  <p className="font-semibold text-primary">{t.name}</p>
                  <p className="text-xs text-secondary">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-meridian-950 px-4 py-16 text-center dark:bg-ink-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-white">Join the Meridian reading list</h2>
          <p className="mt-3 text-meridian-200/80">
            Weekly staff picks, early access to sales, and exclusive author interviews. No spam — unsubscribe anytime.
          </p>
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              setMessage('Thanks for subscribing! (Demo — no email sent)');
            }}
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="input-field max-w-sm border-0 bg-white/10 text-white placeholder:text-meridian-300/50 focus:ring-meridian-400"
            />
            <button type="submit" className="btn-primary bg-meridian-500 hover:bg-meridian-400">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
