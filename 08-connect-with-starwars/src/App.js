import React, { useEffect, useState, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
   const [movies, setMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(false);

   const fetchMovieHandler = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try {
         setIsLoading(true);
         const datas = await fetch(
            'https://react-practice-7898e-default-rtdb.firebaseio.com/movies.json'
         );

         const parsedDatas = await datas.json();

         const transformedMovies = parsedDatas.results.map((movie) => {
            return {
               id: movie.episode_id,
               title: movie.title,
               openingText: movie.opening_crawl,
               realseDate: movie.release_date,
            };
         });
         setMovies(transformedMovies);
         setIsLoading(false);
      } catch (err) {
         setError(err.message);
      }
      setIsLoading(false);
   }, []);

   useEffect(() => {
      fetchMovieHandler();
   }, [fetchMovieHandler]);

   const addMovieHandler = async (movie) => {
      try {
         const datas = await fetch(
            'https://react-practice-7898e-default-rtdb.firebaseio.com/movies.json',
            {
               method: 'POST',
               body: JSON.stringify(movie),
               headers: { 'Content-Type': 'acpplication/json' },
            }
         );
         const parsedDatas = await datas.json();
         console.log(parsedDatas);
      } catch (err) {
         setError(err);
         console.log(err);
      }
   };

   let content;
   movies.length > 0
      ? (content = <MoviesList movies={movies} />)
      : error
      ? (content = <p>{error}</p>)
      : isLoading
      ? (content = <p>Loading...</p>)
      : (content = <p>Found no movies</p>);

   return (
      <React.Fragment>
         <section>
            <AddMovie onAddMovie={addMovieHandler} />
         </section>
         <section>
            <button onClick={fetchMovieHandler}>Fetch Movies</button>
         </section>
         <section>{content}</section>
      </React.Fragment>
   );
}

export default App;
