import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="mesh-bg">
      <div className="max-w-6xl mx-auto px-4 py-20 sm:py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight"
        >
          Ship faster with a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-sky-500">
            clean MERN stack
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
        >
          Connect_Stack combines CRUD, JWT auth, and role-based routes — with a polished React UI,
          dark mode, and protected routing.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          {user ? (
            <Link
              to="/dashboard"
              className="px-8 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 shadow-lg shadow-brand-500/25"
            >
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="px-8 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 shadow-lg shadow-brand-500/25"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 rounded-xl border border-slate-300 dark:border-slate-600 font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Log in
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
