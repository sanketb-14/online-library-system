import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BookDetailsPage = () => {
  const { id } = useParams();
  const book = useSelector((state) =>
    state.books.books.find((b) => b.id === parseInt(id))
  );

  if (!book) {
    return <div className="text-center text-2xl font-bold text-red-500">Book not found</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-500 via-grey-800 to-slate-900">
      <motion.div
        className="max-w-5xl w-full mx-4 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-xl shadow-2xl overflow-hidden p-1"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-base-300 rounded-lg p-8">
          <div className="lg:flex gap-8">
            <motion.div 
              className="lg:w-1/3 mb-8 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {book.image && (
                <img src={book.image} alt={book.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
              )}
            </motion.div>
            <div className="lg:w-2/3">
              <motion.div
                className="uppercase tracking-wide text-sm text-accent font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {book.category}
              </motion.div>
              <motion.h1 
                className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-secondary sm:text-5xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {book.title}
              </motion.h1>
              <motion.p 
                className="mt-2 text-2xl text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                by {book.author}
              </motion.p>
              <motion.div 
                className="mt-6 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <p className="text-xl text-gray-400"><span className="font-semibold text-slate-200">Rating:</span> {book.rating} ⭐</p>
                <p className="text-xl text-slate-400"><span className="font-semibold text-slate-200">Language:</span> {book.language}</p>
                <p className="text-xl text-slate-400"><span className="font-semibold text-slate-200">Price:</span> ${book.price.toFixed(2)}</p>
                <p className="mt-6 text-lg text-gray-400 leading-relaxed">{book.description}</p>
              </motion.div>
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Link 
                  to="/books" 
                  className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 transition-all duration-300"
                >
                  Back to Browse
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookDetailsPage;