import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => (
    <motion.div initial={{opacity:0,y:-20 , scale:0.8}} animate={{opacity:1,y:0 , scale:1}} onHover={{scale:1.5}} transition={{duration:1}} className="group h-[28rem] w-full  [perspective:1000px]">
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
    </motion.div>
  );

  export default BookCard;