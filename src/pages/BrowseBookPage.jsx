import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const BrowseBooksPage = () => {
  const { category } = useParams();
  const allBooks = useSelector((state) => state.books.books);
  const [filteredBooks, setFilteredBooks] = useState(allBooks);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let result = allBooks;
    if (category) {
      result = result.filter((book) => book.category === category);
    }
    if (searchTerm) {
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredBooks(result);
  }, [category, searchTerm, allBooks]);

  return (
    <div className="container mx-auto px-4 space-y-6">
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Browse Books {category ? `- ${category}` : ''}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative"
      >
        <input
          type="text"
          placeholder="Search by title or author"
          className="input input-bordered w-full max-w-xs pl-10 pr-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {filteredBooks.map((book) => (
          <motion.div
            key={book.id}
            className="group h-96 [perspective:1000px]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0">
                <img 
                  className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
                  src={book.image} 
                  alt={book.title} 
                />
                <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h2 className="text-xl font-bold">{book.title}</h2>
                  <p className="text-sm">By {book.author}</p>
                </div>
              </div>
              <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="flex min-h-full flex-col items-center justify-center">
                  <h3 className="text-lg font-bold mb-2">Description</h3>
                  <p className="text-sm overflow-y-auto max-h-48">{book.description}</p>
                  <div className="mt-4">
                    <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">{book.category}</span>
                    <span className="ml-2 text-yellow-500">★ {book.rating}</span>
                  </div>
                  <p className="mt-2 text-sm">{book.language}</p>
                  <p className="mt-2 font-bold text-lg text-primary">${book.price.toFixed(2)}</p>
                  <Link to={`/book/${book.id}`} className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredBooks.length === 0 && (
        <p className="text-center text-xl">No books found.</p>
      )}
    </div>
  );
};

export default BrowseBooksPage;