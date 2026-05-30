import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartApi, orderApi } from '../api/client';
import { BRAND } from '../constants/brand';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const [cartRes, historyRes] = await Promise.all([cartApi.get(), orderApi.history()]);
      setCart(cartRes.data);
      setHistory(historyRes.data);
    } catch {
      setMessage('Could not load your bag. Please sign in again.');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadData();
  }, [isAuthenticated, navigate]);

  const removeItem = async (bookId) => {
    const res = await cartApi.removeItem(bookId);
    setCart(res.data);
  };

  const placeOrder = async () => {
    try {
      await orderApi.place();
      setMessage('Order confirmed! Thank you for shopping with Meridian.');
      await loadData();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not complete checkout.');
    }
  };

  if (!cart) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-secondary">Loading your bag...</p>
      </div>
    );
  }

  const itemCount = cart.items?.reduce((s, i) => s + i.quantity, 0) || 0;

  return (
    <div className="bg-muted min-h-[70vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-bold text-primary">Your bag</h1>
        <p className="mt-1 text-secondary">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>

        {message && (
          <p className="mt-4 rounded-xl border border-meridian-200 bg-meridian-50 px-4 py-3 text-sm text-meridian-800 dark:border-meridian-800 dark:bg-meridian-950/50 dark:text-meridian-200">
            {message}
          </p>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.items?.length === 0 ? (
              <div className="card p-10 text-center">
                <p className="text-secondary">Your bag is empty.</p>
                <Link to="/" className="btn-primary mt-4 inline-block">Continue shopping</Link>
              </div>
            ) : (
              cart.items.map((item) => (
                <div key={item.bookId} className="card flex gap-4 p-4 sm:p-5">
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-primary">{item.title}</h3>
                      <p className="text-sm text-secondary">
                        ${Number(item.price).toFixed(2)} each · Qty {item.quantity}
                      </p>
                    </div>
                    <p className="mt-2 font-semibold text-meridian-700 dark:text-meridian-400">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.bookId)}
                    className="btn-ghost self-start text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="card h-fit p-6">
            <h2 className="font-display text-lg font-semibold text-primary">Order summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-secondary">
                <span>Subtotal</span>
                <span>${Number(cart.totalAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Shipping</span>
                <span>{Number(cart.totalAmount) >= 35 ? 'Free' : '$4.99'}</span>
              </div>
              <div className="border-t border-default pt-2 flex justify-between font-semibold text-primary">
                <span>Total</span>
                <span>
                  $
                  {(Number(cart.totalAmount) + (Number(cart.totalAmount) >= 35 ? 0 : 4.99)).toFixed(2)}
                </span>
              </div>
            </div>
            {cart.items?.length > 0 && (
              <button type="button" onClick={placeOrder} className="btn-primary mt-6 w-full py-3">
                Checkout securely
              </button>
            )}
            <p className="mt-4 text-center text-xs text-secondary">
              {BRAND.name} · Encrypted checkout
            </p>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-primary">Order history</h2>
          <div className="mt-4 space-y-4">
            {history.length === 0 ? (
              <p className="text-secondary">No past orders yet.</p>
            ) : (
              history.map((order) => (
                <div key={order.id} className="card p-5">
                  <div className="flex flex-wrap justify-between gap-2">
                    <p className="font-medium text-primary">
                      Order · {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="font-semibold text-meridian-700 dark:text-meridian-400">
                      ${Number(order.totalAmount).toFixed(2)}
                    </p>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-secondary">
                    {order.items.map((item) => (
                      <li key={`${order.id}-${item.bookId}`}>
                        {item.title} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
