import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookApi } from '../api/client';
import { BRAND } from '../constants/brand';
import { useAuth } from '../context/AuthContext';

const emptyBook = {
  title: '',
  author: '',
  category: '',
  description: '',
  imageUrl: '',
  price: '',
  stock: '',
};

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(emptyBook);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const loadBooks = async () => {
    const { data } = await bookApi.getAll();
    setBooks(data);
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
      return;
    }
    loadBooks();
  }, [isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };
    try {
      if (editingId) {
        await bookApi.update(editingId, payload);
        setMessage('Title updated in catalog.');
      } else {
        await bookApi.create(payload);
        setMessage('New title added to catalog.');
      }
      setForm(emptyBook);
      setEditingId(null);
      await loadBooks();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Operation failed.');
    }
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      category: book.category || '',
      description: book.description || '',
      imageUrl: book.imageUrl || '',
      price: book.price,
      stock: book.stock,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this title from the catalog?')) return;
    await bookApi.delete(id);
    setMessage('Title removed.');
    await loadBooks();
  };

  return (
    <div className="bg-muted min-h-[70vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-meridian-600 dark:text-meridian-400">
          {BRAND.name} · Staff portal
        </p>
        <h1 className="font-display text-3xl font-bold text-primary">Inventory management</h1>
        <p className="mt-1 text-secondary">Add, update, or remove titles from the live catalog.</p>

        {message && (
          <p className="mt-4 rounded-xl border border-meridian-200 bg-meridian-50 px-4 py-3 text-sm text-meridian-800 dark:border-meridian-800 dark:bg-meridian-950/50 dark:text-meridian-200">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="card mt-8 grid gap-4 p-6 sm:grid-cols-2">
          <p className="sm:col-span-2 font-display text-lg font-semibold text-primary">
            {editingId ? 'Edit title' : 'Add new title'}
          </p>
          {['title', 'author', 'category', 'imageUrl', 'price', 'stock'].map((field) => (
            <div key={field}>
              <label className="mb-1 block text-sm font-medium capitalize text-primary">{field}</label>
              <input
                className="input-field"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                required={['title', 'author', 'price', 'stock'].includes(field)}
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-primary">Description</label>
            <textarea
              className="input-field"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" className="btn-primary">
              {editingId ? 'Save changes' : 'Publish to catalog'}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyBook);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="card mt-10 overflow-hidden">
          <div className="border-b border-default bg-elevated px-6 py-4">
            <h2 className="font-display text-lg font-semibold text-primary">
              Live catalog ({books.length} titles)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-default bg-muted text-xs uppercase tracking-wide text-secondary">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Author</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 font-medium text-primary">{book.title}</td>
                    <td className="px-6 py-4 text-secondary">{book.author}</td>
                    <td className="px-6 py-4 text-secondary">{book.category}</td>
                    <td className="px-6 py-4">${Number(book.price).toFixed(2)}</td>
                    <td className="px-6 py-4">{book.stock}</td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleEdit(book)}
                        className="mr-3 font-medium text-meridian-600 hover:underline dark:text-meridian-400"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(book.id)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
