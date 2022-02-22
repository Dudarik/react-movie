import Movies from "../components/Movies"
import Preloader from "../components/Preloader"
import Search from "../components/Search"
import Pagination from "../components/Pagination"

export default function Main(props){
  const {movies, searchString, type, isLoading} = props.value
  // console.log(props)

  return (
    <main className="container content">
      <Search 
        type = {type}
        value = {searchString} 
        searchOnChangeHandle = {props.searchOnChangeHandle} 
        searchOnClickHandle = {props.searchOnClickHandle}
        searchOnChangeRadioHandle = {props.searchOnChangeRadioHandle}
      />
      {!isLoading ? <Pagination value = {props.value} paginationHandle = {props.paginationHandle}/> : ''}
      {!isLoading ? <Movies movies={movies}/> : <div className="dfcc"><Preloader /></div>}
      {!isLoading ? <Pagination value = {props.value} paginationHandle = {props.paginationHandle}/> : ''}
      {/* movies.length    */}
    </main>
  )
}