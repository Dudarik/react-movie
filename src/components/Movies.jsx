import Movie from "./Movie"

export default function Movies(props){
  return(
    <div className="movies">
      {props.movies.map(movie => <Movie value={movie} key={movie.imdbID}/>)}
    </div>
  )
}