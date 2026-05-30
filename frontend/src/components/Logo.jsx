import { Link } from 'react-router-dom';
import { BRAND } from '../constants/brand';

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-meridian-600 shadow-md transition group-hover:bg-meridian-700 dark:bg-meridian-500 dark:group-hover:bg-meridian-400">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor" aria-hidden>
          <path d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm2 3v2h12V7H6zm0 4v2h8v-2H6zm0 4v2h10v-2H6z" />
        </svg>
      </div>
      {!compact && (
        <div className="hidden sm:block">
          <p className="font-display text-lg font-bold leading-tight text-primary">{BRAND.name}</p>
          <p className="text-[10px] font-medium uppercase tracking-widest text-meridian-600 dark:text-meridian-400">
            {BRAND.founded}
          </p>
        </div>
      )}
    </Link>
  );
}
