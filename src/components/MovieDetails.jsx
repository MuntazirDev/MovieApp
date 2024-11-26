import { useState } from "react";
import { useEffect } from "react";

export default function MovieDetails ({selectedMovie,setShow,setSelectedMovie,selectedId}){
  const [userRating,setUserRating]=useState(0);
  const [show,setshow]=useState(false);

 
  useEffect( function(){
    async function getMovie(){
       const res=await fetch(`https://www.omdbapi.com/?apikey=c380bfba&i=${selectedId}`);
       const data = await res.json();
       await setSelectedMovie(data);   
    }
    getMovie();
    setUserRating(0);
  },[selectedId]);

  useEffect(function(){
  {selectedMovie.Response=== 'True' && setSelectedMovie({...selectedMovie,userRating:userRating}); }
  },[userRating])
  

    return(
        <div className="details">
        <header>
         <button className="btn-back" onClick={()=>setShow(true)} >X</button>
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
         <button className="btn-add" onClick={()=>setshow(!show)}  >Rating</button>

         </div>
        </header>
        
        <div className="rating">
          
       {Array.from({length:9}).map(function(_,index){
        return(<Xx key={index} id={index+1} userRating={userRating} setUserRating={setUserRating} show={show} />)
       })}
        
        {/* <span className="seconds">1</span> */}
        </div>
    
     </div> 
    )
}

function Xx({id,userRating,setUserRating,show}){
 
   function haendle(){
    setUserRating(id);
  }

  return(
    <svg className="seconds" onClick={haendle} display={show?'':'none'}
  xmlns="http://www.w3.org/2000/svg"
  fill={id<=userRating? '#f7d61b':'none'}
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>
  )
}