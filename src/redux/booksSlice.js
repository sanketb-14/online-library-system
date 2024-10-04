import { createSlice } from '@reduxjs/toolkit';

import initialBooks from '../data/initialBooks';

const loadBooksFromLocalStorage = () => {
  const storedBooks = localStorage.getItem('books');
  return storedBooks ? JSON.parse(storedBooks) : initialBooks;
};

const saveBooksToLocalStorage = (books) => {
  localStorage.setItem('books', JSON.stringify(books));
};

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: loadBooksFromLocalStorage(),
  },
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
      saveBooksToLocalStorage(state.books);
    },
    
  },
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;