import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/client';
import Logo from '../components/Logo';
import { BRAND } from '../constants/brand';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await authApi.login(form);
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-muted px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-default bg-elevated shadow-card lg:grid-cols-2">
        <div className="hidden bg-meridian-950 p-10 text-meridian-100 lg:flex lg:flex-col lg:justify-between">
          <Logo />
          <div>
            <h2 className="font-display text-3xl font-bold">Welcome back</h2>
            <p className="mt-3 text-meridian-200/80">
              Sign in to access your bag, order history, and Meridian Rewards points.
            </p>
          </div>
          <p className="text-xs text-meridian-400">{BRAND.tagline}</p>
        </div>

        <div className="p-8 sm:p-10">
          <h1 className="font-display text-2xl font-bold text-primary lg:hidden">Sign in</h1>
          <p className="mt-1 text-sm text-secondary">Continue to {BRAND.name}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary">Email</label>
              <input
                type="email"
                className="input-field"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary">Password</label>
              <input
                type="password"
                className="input-field"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-muted p-4 text-xs text-secondary">
            <p className="font-medium text-primary">Demo accounts</p>
            <p className="mt-1">Admin: admin@bookstore.com / admin123</p>
            <p>Reader: user@bookstore.com / user123</p>
          </div>

          <p className="mt-6 text-center text-sm text-secondary">
            New to Meridian?{' '}
            <Link to="/register" className="font-semibold text-meridian-600 hover:underline dark:text-meridian-400">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
