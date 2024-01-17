

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchBooksThunk } from "../State/bookSlices/allBooksSlice";
import { fetchAuthorThunk } from "../State/bookSlices/authorSlice";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleEnter = () => {
    dispatch(fetchBooksThunk(searchTerm));
  };

  const handleAuthorModal = (key) => {
    dispatch(fetchAuthorThunk(key))
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const booksPerPage = 10;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = state.allBooks.books.slice(indexOfFirstBook, indexOfLastBook);

  if(state.allBooks.loading){
    return <h3>Searching...</h3>
  }

  return (
    <div >
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleEnter}>Search</button>

      <div style={{display:'flex', flexWrap:'wrap', gap:'50px'}}>
      {currentBooks.map((each) => {
        return (
            <div key={each.key}>
                <img src={`https://covers.openlibrary.org/b/id/${each.cover_i}-M.jpg`} alt={each.title} className="book-cover" />
                <p >{each.title}</p>
                <p onClick={() => handleAuthorModal(each.author_key[0])}>
                {each.author_name[0]}
              </p>
            </div>
        );
      })}
      
    </div>
    <button onClick={handlePrev}>Prev</button>
    <button onClick={handleNext}>Next</button>
    </div>
  );
}
