import React from "react";
import Header from "./layout/Header";
import Main from "./layout/Main";
import Footer from "./layout/Footer";

const API_KEY = process.env.REACT_APP_API_KEY

export default class App extends React.Component {
  constructor(){
    super()

    this.state = {
      movies: [],
      searchString: 'matrix',
      type: 'all',
      isLoading: false,
      totalResults: 0,
      itemPerPage: 10,
      currentPage: 1,
    }

    this.searchOnChangeHandle = this.searchOnChangeHandle.bind(this)
    this.searchOnChangeRadioHandle = this.searchOnChangeRadioHandle.bind(this)
    this.searchOnClickHandle = this.searchOnClickHandle.bind(this)
    this.paginationHandle = this.paginationHandle.bind(this)

  }
  paginationHandle(event){
    let searchString = this.state.searchString.slice()
    let page = event.target.dataset.page

    let totalPages = +this.state.totalResults,
        itemPerPage = +this.state.itemPerPage,
        pages = +Math.ceil(totalPages / itemPerPage)
  
    
    if (page < 1) { 
      page = 1
      return
    }

    if (page > pages) { 
      page = pages
      return
    }
    
    event.preventDefault()
    this.setState({currentPage: page, movies:[]})
    this.getMoviesFromAPI({paramArr:[searchString], type: this.state.type, page})
  }

  searchOnChangeRadioHandle(event){

    let searchString = this.state.searchString.slice()
    const type = event.target.value

    if(searchString.length === 0) return
    
    this.setState(() => ({type}),() => (this.getMoviesFromAPI({paramArr:[searchString], type, currentPage: 1})))

    console.log(event.target.value, this.state)    
  }

  componentDidMount() {
    this.getMoviesFromAPI({paramArr:['matrix'], page: this.state.currentPage})
    console.log('mount',this.state)
  }

  searchOnChangeHandle (event) {
    this.setState({searchString: event.target.value, page:this.state.currentPage})    
  }

  searchOnClickHandle() {
    let searchString = this.state.searchString.slice()
    if(searchString.length === 0) return

    this.setState({currentPage: 1})

    this.getMoviesFromAPI({paramArr:[searchString], type: this.state.type, page:this.state.currentPage})
  }

  getMoviesFromAPI = ({paramArr, request = 's', url = 'https://www.omdbapi.com/?apikey=', apikey = API_KEY, type = '', page = 1}) => {
    
    this.setState({isLoading: true})

    let apiURL = `${url}${apikey}&page=${page}&${request}=`

    paramArr.forEach(item => apiURL += `${item}&`)

    if (type === 'movie') apiURL += 'type=movie&'

    if (type === 'series') apiURL += 'type=series&'

    // console.log(apiURL)

    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      if(data.Response === 'False') {
        console.log(data.Error)
        this.setState({movies:[], totalResults: 0, isLoading: false})
        return
      }
      const movies = data.Search, 
            totalResults = data.totalResults

      this.setState({movies, totalResults, isLoading: false})
      // console.log(this.state)
    })
    .catch(err => console.error(err))
  }

  render(){
    return(
      <>
        <Header />
          <Main value = {this.state} 
                searchOnClickHandle = {this.searchOnClickHandle} 
                searchOnChangeHandle = {this.searchOnChangeHandle}
                searchOnChangeRadioHandle = {this.searchOnChangeRadioHandle}
                paginationHandle = {this.paginationHandle}
          />
        <Footer/>
      </>
    );    
  } 
}