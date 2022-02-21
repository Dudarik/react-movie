import Movie from "./Movie"

export default function Movies(props){
  return(
    <div className="movies">
      {props.movies.length ? props.movies.map(movie => <Movie value={movie} key={movie.imdbID} />) : <h3>Nothing found</h3>}
    </div>
  )
}