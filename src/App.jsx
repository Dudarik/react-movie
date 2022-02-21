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
    }

    this.searchOnChangeHandle = this.searchOnChangeHandle.bind(this)
    this.searchOnChangeRadioHandle = this.searchOnChangeRadioHandle.bind(this)
    this.searchOnClickHandle = this.searchOnClickHandle.bind(this)

  }

  searchOnChangeRadioHandle(event){

    let searchString = this.state.searchString.slice()
    const type = event.target.value

    if(searchString.length === 0) return
    
    this.setState(() => ({type}),() => (this.getMoviesFromAPI({paramArr:[searchString], type})))

    console.log(event.target.value, this.state)    
  }

  componentDidMount() {
    this.getMoviesFromAPI({paramArr:['matrix']})
  }

  searchOnChangeHandle (event) {
    

    this.setState({searchString: event.target.value})
    
  }

  searchOnClickHandle() {
    let searchString = this.state.searchString.slice()
    if(searchString.length === 0) return

    this.getMoviesFromAPI({paramArr:[searchString], type: this.state.type})

    // searchString = ''

    // this.setState({searchString})
  }

  getMoviesFromAPI = ({paramArr, request = 's', url = 'http://www.omdbapi.com/?apikey=', apikey = API_KEY, type = ''}) => {
    this.setState({isLoading: true})

    let apiURL = `${url}${apikey}&${request}=`

    paramArr.forEach(item => apiURL += `${item}&`)

    if (type === 'movie') apiURL += 'type=movie&'

    if (type === 'series') apiURL += 'type=series&'

    // console.log(apiURL)

    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      if(data.Response === 'False') {
        console.log(data.Error)
        this.setState({movies:[], isLoading: false})
        return
      }
      const movies = data.Search
      this.setState({movies, isLoading: false})
      // console.log(this.state)
    })    
  }

  render(){
    return(
      <>
        <Header />
          <Main value = {this.state} 
                searchOnClickHandle = {this.searchOnClickHandle} 
                searchOnChangeHandle = {this.searchOnChangeHandle}
                searchOnChangeRadioHandle = {this.searchOnChangeRadioHandle}
          />
        <Footer/>
      </>
    );    
  } 
}