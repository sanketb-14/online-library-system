import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from "react-slick";
import BookCard from '../components/BookCard';
import initialBooks from "../data/initialBooks"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



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
     
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 1 }}
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