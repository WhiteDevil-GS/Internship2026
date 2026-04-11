import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/api/users/me/profile');
        if (!cancelled) setProfile(data.data);
      } catch (e) {
        if (!cancelled) setError(e.response?.data?.message || 'Could not load profile');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 flex justify-center">
        <div className="h-10 w-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8 lg:grid-cols-3"
      >
        <div className="lg:col-span-2 space-y-4">
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Signed in as <span className="font-medium text-slate-900 dark:text-white">{user?.email}</span>
            {isAdmin && (
              <span className="ml-2 text-xs uppercase tracking-wide bg-brand-100 dark:bg-brand-900/40 text-brand-800 dark:text-brand-200 px-2 py-0.5 rounded-full">
                Admin
              </span>
            )}
          </p>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-soft dark:shadow-soft-dark">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              Profile (from API)
            </h2>
            {profile && (
              <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-slate-500 dark:text-slate-400">Name</dt>
                  <dd className="font-medium text-slate-900 dark:text-white">{profile.name}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 dark:text-slate-400">Email</dt>
                  <dd className="font-medium text-slate-900 dark:text-white break-all">{profile.email}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 dark:text-slate-400">Role</dt>
                  <dd className="font-medium text-slate-900 dark:text-white capitalize">{profile.role}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 dark:text-slate-400">Member since</dt>
                  <dd className="font-medium text-slate-900 dark:text-white">
                    {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '—'}
                  </dd>
                </div>
              </dl>
            )}
          </div>
        </div>
        <motion.aside
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-dashed border-brand-300 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-950/20 p-6 h-fit"
        >
          <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-2">Next steps</h3>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
            <li>Explore CRUD_Lab → Secure_Login → Role_Guard in this repo.</li>
            <li>Seed an admin and open the Admin panel.</li>
            <li>Toggle theme from the header.</li>
          </ul>
        </motion.aside>
      </motion.div>
    </div>
  );
}
