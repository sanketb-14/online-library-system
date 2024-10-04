import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from "react-slick";
import initialBooks from "../data/initialBooks"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BookCard = ({ book }) => (
  <div className="group h-[28rem] w-full  [perspective:1000px]">
    <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      <div className="absolute inset-0 ">
        <div className="h-full w-full overflow-hidden rounded-xl">
          <img 
            src={book.image || 'https://placehold.co/400x600?text=No+Image'} 
            alt={book.title} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 rounded-xl"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold truncate">{book.title}</h3>
          <p className="text-sm">By {book.author}</p>
        </div>
      </div>
      <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-6 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
        <div className="flex min-h-full flex-col items-center justify-center">
          <h3 className="text-2xl font-bold mb-2">Description</h3>
          <p className="text-sm overflow-y-auto max-h-40 mb-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-700">{book.description || 'No description available.'}</p>
          <div className="space-y-2">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">{book.category}</span>
            <p className="text-yellow-400 text-lg">★ {book.rating}</p>
            <p className="text-sm">{book.language}</p>
            <p className="font-bold text-xl text-primary">${book.price.toFixed(2)}</p>
          </div>
          <Link 
            to={`/book/${book.id}`} 
            className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-300 transform hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    if (!localStorage.getItem('books')) {
      localStorage.setItem('books', JSON.stringify(initialBooks));
    }
  }, []);
  const categories = [...new Set(books.map((book) => book.category))];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="space-y-8 sm:space-y-16 w-full mx-auto max-w-7xl bg-base-200 rounded-xl shadow-xl p-2 sm:p-6">
      <motion.h1
        className="text-2xl md:text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to the Online Library
      </motion.h1>
      
      <motion.section
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl text-secondary font-semibold">Book Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/books/${category}`}
              className="btn btn-sm sm:btn-md btn-outline btn-primary"
            >
              {category}
            </Link>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-center text-secondary">Popular Books</h2>
        <Slider {...sliderSettings}>
          {books.slice(0, 10).map((book) => (
            <div key={book.id} className="px-2">
              <BookCard book={book} />
            </div>
          ))}
        </Slider>
        <div className="text-center mt-8">
          <Link to="/books" className="btn btn-secondary">
            View All Books
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;