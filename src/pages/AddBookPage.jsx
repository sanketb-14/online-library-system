// src/pages/AddBookPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addBook } from '../redux/booksSlice';

const AddBookPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingCategories = useSelector(state => 
    [...new Set(state.books.books.map(book => book.category))]
  );

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('addBookFormData');
    return savedFormData ? JSON.parse(savedFormData) : {
      title: '',
      author: '',
      category: '',
      rating: '',
      description: '',
      image: '',
      price: '',
      language: '',
    };
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem('addBookFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    if (e.target.name === 'category') {
      const capitalizedCategory = capitalizeFirstLetter(e.target.value);
      const matchedCategory = existingCategories.find(
        cat => cat.toLowerCase() === capitalizedCategory.toLowerCase()
      );
      setFormData({ 
        ...formData, 
        [e.target.name]: matchedCategory || capitalizedCategory 
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.author) newErrors.author = 'Author is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.rating || isNaN(formData.rating) || formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be a number between 0 and 5';
    }
   
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.image) newErrors.image = 'Image URL is required';
    if (!formData.price || isNaN(formData.price) || formData.price < 0) {
      newErrors.price = 'Price must be a positive number';
    }
    if (!formData.language) newErrors.language = 'Language is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newBook = {
        ...formData,
        id: Date.now(), // Generate a unique ID
        rating: parseFloat(formData.rating),
        price: parseFloat(formData.price),
      };
      dispatch(addBook(newBook));
      localStorage.removeItem('addBookFormData');
      navigate('/books');
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
          />
          {errors.title && <p className="text-error mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="label">
            <span className="label-text">Author</span>
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.author ? 'input-error' : ''}`}
          />
          {errors.author && <p className="text-error mt-1">{errors.author}</p>}
        </div>
        <div>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.category ? 'input-error' : ''}`}
          />
          {errors.category && <p className="text-error mt-1">{errors.category}</p>}
        </div>
        <div>
          <label className="label">
            <span className="label-text">Rating (0-5)</span>
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            className={`input input-bordered w-full ${errors.rating ? 'input-error' : ''}`}
          />
          {errors.rating && <p className="text-error mt-1">{errors.rating}</p>}
        </div>
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
          />
          {errors.description && <p className="text-error mt-1">{errors.description}</p>}
        </div>
        <div>
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.image ? 'input-error' : ''}`}
          />
          {errors.image && <p className="text-error mt-1">{errors.image}</p>}
        </div>
        <div>
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={`input input-bordered w-full ${errors.price ? 'input-error' : ''}`}
          />
          {errors.price && <p className="text-error mt-1">{errors.price}</p>}
        </div>
        <div>
          <label className="label">
            <span className="label-text">Language</span>
          </label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.language ? 'input-error' : ''}`}
          />
          {errors.language && <p className="text-error mt-1">{errors.language}</p>}
        </div>
        <button type="submit" className="btn btn-primary w-full">Add Book</button>
      </form>
    </motion.div>
  );
};

export default AddBookPage;