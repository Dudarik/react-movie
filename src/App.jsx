import React from "react";
import Header from "./layout/Header";
import Main from "./layout/Main";
import Footer from "./layout/Footer";


// http://www.omdbapi.com/?i=tt3896198&apikey=6e699cc1 - api key

export default class App extends React.Component {
  constructor(){
    super()

    this.state = {
      movies: []
    }
    
  }
  componentDidMount() {
    this.getMoviesFromAPI()
  }

  getMoviesFromAPI = () => {
    const apiURL = 'http://www.omdbapi.com/?apikey=6e699cc1&s=matrix'
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      if(!data.Response) {
        console.log(data.Error)
        return
      }
      const movies = data.Search
      this.setState({movies})
    })    
  }

  render(){
    return(
      <>
        <Header />
          <Main movies={this.state.movies}/>
        <Footer/>
      </>
    );    
  } 
}