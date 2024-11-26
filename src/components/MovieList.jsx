import { useEffect } from "react";

export default function MovieList({movies,setSelectedId,setShow,handleWatched}){
  
  

    return(
        <ul className="list list-movies">
        {movies?.map((movie) => (
          <li key={movie.imdbID} onClick={()=>{setSelectedId(movie.imdbID);setShow(false);} }
                                 onDoubleClick={()=>{setSelectedId(movie.imdbID);handleWatched(movie.imdbID);setShow(true);}}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    )

}