import React from "react";

export default class Search extends React.Component{
  render(){
    // console.log(this.props.value)
    return(
      <div className="row">
        <div className="input-field">        
            <input 
              id="search" 
              placeholder="search" 
              type="search" 
              className="validate" 
              value={this.props.value}
              onChange={(event) => {
                  this.props.searchOnChangeHandle(event)          
                }
              }
              onKeyPress = {(event) => {
                if (event.key === 'Enter')
                  this.props.searchOnClickHandle()
              }}
            />
           
          
        </div>
        <button
              className="btn search-btn"
              onClick={() => {this.props.searchOnClickHandle()}}
            >
            Search
          </button>

          <label className="mr-1 ml-1">
            <input 
              className="with-gap" 
              name="type" 
              type="radio" 
              value='all' 
              checked={this.props.type === 'all'}
              onChange={(event) => this.props.searchOnChangeRadioHandle(event)}              
            />
              <span>All</span>
          </label>

          <label className="mr-1">
            <input 
             className="with-gap" 
             name="type" 
             type="radio" 
             value='movie' 
             checked={this.props.type === 'movie'}
             onChange={(event) => this.props.searchOnChangeRadioHandle(event)}
             />
              <span>Movies</span>
          </label>

          <label>
            <input 
              className="with-gap" 
              name="type" 
              type="radio"  
              value='series' 
              checked={this.props.type === 'series'}
              onChange={(event) => this.props.searchOnChangeRadioHandle(event)}/>
              <span>Series</span>
          </label>        
      </div>
    )
  }
}