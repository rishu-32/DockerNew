import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { bookApi, cartApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');
  const [qty, setQty] = useState(1);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    bookApi.getById(id).then((res) => setBook(res.data)).catch(() => setMessage('This title is no longer available.'));
  }, [id]);

  const addToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await cartApi.addItem({
        bookId: book.id,
        title: book.title,
        price: book.price,
        quantity: qty,
      });
      setMessage(`Added ${qty} copy${qty > 1 ? 'ies' : ''} to your bag.`);
    } catch {
      setMessage('Please sign in to add items to your bag.');
    }
  };

  if (!book && !message) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-secondary">Loading title details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-red-600 dark:text-red-400">{message}</p>
        <Link to="/" className="btn-primary mt-6 inline-block">Back to shop</Link>
      </div>
    );
  }

  const inStock = book.stock > 0;

  return (
    <div className="bg-surface">
      <div className="border-b border-default bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-secondary sm:px-6">
          <Link to="/" className="hover:text-meridian-600">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{book.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl border border-default bg-muted shadow-card">
            <img src={book.imageUrl} alt={book.title} className="aspect-[3/4] w-full object-cover" />
          </div>

          <div>
            {book.category && (
              <span className="rounded-full bg-meridian-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-meridian-800 dark:bg-meridian-900/50 dark:text-meridian-300">
                {book.category}
              </span>
            )}
            <h1 className="mt-4 font-display text-4xl font-bold text-primary">{book.title}</h1>
            <p className="mt-2 text-lg text-secondary">by {book.author}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-meridian-700 dark:text-meridian-400">
                ${Number(book.price).toFixed(2)}
              </span>
              <span className="text-sm text-secondary">
                {inStock ? `${book.stock} available` : 'Out of stock'}
              </span>
            </div>

            <p className="mt-6 leading-relaxed text-secondary">{book.description}</p>

            <ul className="mt-6 space-y-2 text-sm text-secondary">
              <li>Free delivery on orders over $35</li>
              <li>7-day hassle-free returns</li>
              <li>Meridian Rewards points on this purchase</li>
            </ul>

            {message && (
              <p className="mt-4 rounded-lg bg-meridian-50 px-4 py-2 text-sm text-meridian-800 dark:bg-meridian-950/50 dark:text-meridian-200">
                {message}
              </p>
            )}

            {inStock && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <label className="text-sm font-medium text-primary">
                  Qty
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="input-field ml-2 inline-block w-20"
                  >
                    {Array.from({ length: Math.min(5, book.stock) }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <button type="button" onClick={addToCart} className="btn-primary px-8 py-3">
                  Add to bag
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
