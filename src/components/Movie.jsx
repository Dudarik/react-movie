  // {
  //     "Title": "The Matrix",
  //     "Year": "1999",
  //     "imdbID": "tt0133093",
  //     "Type": "movie",
  //     "Poster": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
  // },

export default function Movie(props){
  const {Title: title, Year: year, imdbID, Type: type, Poster: posterURL} = props.value
  return(
    <div className="movie card">
      <div className="col s12 m7">
        {/* <div className="card"> */}
          <div className="card-image">
            {posterURL === 'N/A' ? <img src={`https://via.placeholder.com/400x580.png?text=${title}`} alt={title}/> : <img src={posterURL} alt={title}/>}
            
            <span className="card-title">{title}</span>
          </div>
          <div className="card-content">
            <p>Year: {year}</p>
            <p>Type: <span>{type}</span></p>
          </div>
          <div className="card-action">
            <a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${imdbID}/`}>IMDB: {title}</a>
          </div>
        {/* </div> */}
      </div>
    </div>
  )
}