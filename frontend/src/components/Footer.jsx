import { Link } from 'react-router-dom';
import Logo from './Logo';
import { BRAND } from '../constants/brand';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-default bg-ink-950 text-meridian-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="[&_p]:!text-meridian-100 [&_span]:!text-meridian-300">
              <Logo />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-meridian-200/80">{BRAND.tagline}</p>
            <p className="mt-2 text-xs text-meridian-300/60">
              Independent bookstore · Microservices-powered platform
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-meridian-300">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm text-meridian-200/80">
              <li><Link to="/" className="hover:text-white">All books</Link></li>
              <li><a href="/#collections" className="hover:text-white">Collections</a></li>
              <li><Link to="/cart" className="hover:text-white">Shopping cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-meridian-300">Account</h4>
            <ul className="mt-4 space-y-2 text-sm text-meridian-200/80">
              <li><Link to="/login" className="hover:text-white">Sign in</Link></li>
              <li><Link to="/register" className="hover:text-white">Create account</Link></li>
              <li><span>Meridian Rewards</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-meridian-300">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-meridian-200/80">
              <li>{BRAND.email}</li>
              <li>{BRAND.phone}</li>
              <li>Mon–Sat, 9am–8pm EST</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-meridian-800 pt-8 text-xs text-meridian-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p>Privacy · Terms · Shipping policy</p>
        </div>
      </div>
    </footer>
  );
}
