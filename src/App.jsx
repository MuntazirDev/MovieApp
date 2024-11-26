import { useEffect, useState } from "react";

import Nav from "./components/Nav";
import SearchInput from "./components/SearchInput";
import NumResult from "./components/NumResult";

import Main from "./components/Main";
import Box from "./components/Boxp";
import MovieList from "./components/MovieList";
import SummaryList from "./components/SummeryList";
import WatchedList from "./components/WatchedList";
import MovieDetails from "./components/MovieDetails";


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    Runtime: "148 min",
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    Runtime: "116 min",
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => Math.round(acc + cur / arr.length), 0);

export default function App() {
  const [query, setQuery] = useState('batman');

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  
  // const [isOpen1, setIsOpen1] = useState(true);
  // const [isOpen2, setIsOpen2] = useState(true);
  const[lodang,setLodang]=useState(false);
  const[error,setError]=useState('');
  
  const [selectedMovie,setSelectedMovie] = useState({});
  const [selectedId,setSelectedId]=useState(null);
  const [show,setShow]=useState(true);




  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => Number(movie.Runtime.slice(0,4))));
  
  useEffect(function(){
    async function fetchMovies(){
      try{
        setLodang(true);

        const res= await fetch(`https://www.omdbapi.com/?apikey=c380bfba&s=${query}`);
        

        if(!res.ok) throw new Error();

        const data =await res.json();
        

        if(data.Response==="False"){throw  new Error('Movie not found!'); }
        setMovies(data.Search);
        setError('');

      }
      catch(e){
       setError(e.message);
    
      }
      finally{
        setLodang(false);

      }
     
    }
    fetchMovies();
  },[query]);



  // get selected Moive
  //  console.log(selectedMovie);
  //  useEffect( function(){
  //   async function getMovie(){
  //      const res=await fetch(`https://www.omdbapi.com/?apikey=c380bfba&i=${selectedId}`);
  //      const data = await res.json();
  //      setSelectedMovie(data);
  //   }
  //   getMovie();
  // },[selectedId]);

 


   function handleWatched(w){
     {selectedMovie.Response=== 'True' &&  setWatched( e=> [selectedMovie,...e]);}
  }

  
  return (
    <>
      <Nav>
          <SearchInput query={query}setQuery={setQuery}/>
          <NumResult movies={movies} />
      </Nav>
      <Main >
          <Box  >
            
          {/* {lodang? <p className="loader">Loading....</p>:<MovieList movies={movies} handleWatched={handleWatched} />} */}
          {/* {error? <p className="error">{error}</p>:<MovieList movies={movies} handleWatched={handleWatched} />} */}
          {/* {lodang? <p className="loader">Loading....</p>:
           error?  <p className="error">{error}</p>:<MovieList movies={movies} handleWatched={handleWatched} />} */}
           
          {lodang&& <p className="loader">Loading....</p>}

          {!lodang&&!error&&(<MovieList movies={movies} setSelectedId={setSelectedId}
                                        setShow={setShow} handleWatched={handleWatched}/>)}

          {error&& !lodang&& <p className="error">{error}</p>}


          </Box> 

          <Box>

            {show ? <><SummaryList
              watched={watched}
              avgImdbRating={avgImdbRating}
              avgUserRating={avgUserRating}
              avgRuntime={avgRuntime}/>

            <WatchedList watched={watched}/></> :<MovieDetails selectedId={selectedId} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} setShow={setShow}/>}
            
            {/* <MovieDetails selectedMovie={selectedMovie}/> */}

            {/* <SummaryList
              watched={watched}
              avgImdbRating={avgImdbRating}
              avgUserRating={avgUserRating}
              avgRuntime={avgRuntime}/>

            <WatchedList watched={watched}/> */}
          
          </Box>
      </Main>

     
    </>
  );
}

/*
const [selectedMovie,setSelectedMovie] = useState({});

  useEffect(function(){
    async function getMovieDetails(){
      const res = await fetch(`https://www.omdbapi.com/?apikey=c380bfba&i=${selectedID}`);
      const data = await res.json();

      setSelectedMovie(data);

    }
    getMovieDetails();
  },[selectedID]);

  console.log(selectedMovie); 
*/


/* 
<div className="details">
       <header>
        <button className="btn-back">X</button>
        <img  src={selectedMovie.Poster}/>
        <div className="details-overview">
          <h2>{selectedMovie.Title}</h2>
          <p>
            {selectedMovie.Released} : {selectedMovie.Runtime}
          </p>
          <p>
            {selectedMovie.Genre}
          </p>
          <p>
            IMDB Rating : {selectedMovie.imdbRating} 
          </p>
        </div>
       </header>
    </div>

*/