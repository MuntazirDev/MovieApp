

export default function WatchedList({watched}){
    return(
        <ul className="list">
                {watched.map((movie,index) => (
                  <li key={index}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.Runtime} </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
    )

}