import { Link } from 'react-router-dom';

export default function BookCard({ book, onAddToCart }) {
  const inStock = book.stock > 0;

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={book.imageUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'}
          alt={book.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {book.category && (
          <span className="absolute left-3 top-3 rounded-full bg-elevated/95 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-meridian-700 shadow-sm backdrop-blur dark:text-meridian-300">
            {book.category}
          </span>
        )}
        {!inStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-ink-950/60 text-sm font-semibold text-white">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-primary line-clamp-2">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-secondary">by {book.author}</p>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-secondary/80">
          {book.description}
        </p>

        <div className="mt-4 flex items-end justify-between gap-2 border-t border-default pt-4">
          <div>
            <p className="text-xl font-bold text-meridian-700 dark:text-meridian-400">
              ${Number(book.price).toFixed(2)}
            </p>
            {inStock && (
              <p className="text-[10px] text-secondary">{book.stock} in stock</p>
            )}
          </div>
          <div className="flex gap-2">
            <Link to={`/books/${book.id}`} className="btn-secondary px-3 py-1.5 text-xs">
              View
            </Link>
            {onAddToCart && inStock && (
              <button
                type="button"
                onClick={() => onAddToCart(book)}
                className="btn-primary px-3 py-1.5 text-xs"
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
