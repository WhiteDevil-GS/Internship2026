import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../api/client.js';

export default function AdminPanel() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    setError('');
    try {
      const [s, u] = await Promise.all([
        api.get('/api/admin/stats'),
        api.get('/api/admin/users'),
      ]);
      setStats(s.data.stats);
      setUsers(u.data.data || []);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this user?')) return;
    setDeletingId(id);
    try {
      await api.delete(`/api/admin/users/${id}`);
      setUsers((prev) => prev.filter((x) => x._id !== id));
      const { data } = await api.get('/api/admin/stats');
      setStats(data.stats);
    } catch (e) {
      setError(e.response?.data?.message || 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 flex justify-center">
        <div className="h-10 w-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Admin panel
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Platform metrics and user directory (JWT + admin role required).
        </p>
        {error && (
          <div className="mb-6 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        {stats && (
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Total users', value: stats.totalUsers },
              { label: 'Admins', value: stats.admins },
              { label: 'Standard users', value: stats.standardUsers },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-soft dark:shadow-soft-dark"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
                <p className="text-3xl font-display font-bold text-slate-900 dark:text-white mt-1">
                  {card.value}
                </p>
              </motion.div>
            ))}
          </div>
        )}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/40">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h2 className="font-semibold text-slate-900 dark:text-white">Users</h2>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                load();
              }}
              className="text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline"
            >
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium w-28">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {users.map((u) => (
                    <motion.tr
                      key={u._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t border-slate-100 dark:border-slate-800"
                    >
                      <td className="px-6 py-3 text-slate-900 dark:text-white font-medium">{u.name}</td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{u.email}</td>
                      <td className="px-6 py-3 capitalize text-slate-600 dark:text-slate-300">{u.role}</td>
                      <td className="px-6 py-3">
                        <button
                          type="button"
                          disabled={deletingId === u._id}
                          onClick={() => handleDelete(u._id)}
                          className="text-red-600 dark:text-red-400 text-xs font-semibold hover:underline disabled:opacity-50"
                        >
                          {deletingId === u._id ? '…' : 'Remove'}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {users.length === 0 && (
              <p className="px-6 py-8 text-center text-slate-500">No users yet.</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
