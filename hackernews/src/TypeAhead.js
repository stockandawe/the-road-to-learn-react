import React, { Component } from 'react';
import './TypeAhead.css';

const list = [
  {
    city: "New York",
    growth_from_2000_to_2013: "4.8%",
    latitude: 40.7127837,
    longitude: -74.0059413,
    population: "8405837",
    rank: "1",
    state: "New York"
  },
  {
    city: "Los Angeles",
    growth_from_2000_to_2013: "4.8%",
    latitude: 34.0522342,
    longitude: -118.2436849,
    population: "3884307",
    rank: "2",
    state: "California"
  },
]

// The following function could be updated to the following ES6 syntax:
//const isSearched = (searchTerm) => (item) =>
//!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm || item.city.toLowerCase().includes(searchTerm.toLowerCase());
  }
};

class TypeAhead extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTerm: '',
    }

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const cities = [];
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => cities.push(...data))
      .then(this.setState({ list: cities } ));
  };

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <form className="search-form">
          <input
            type="text"
            className="search"
            placeholder="City or State"
            onChange={this.onSearchChange}
          />
          <ul className="suggestions">
          {
            this.state.list.filter(isSearched(this.state.searchTerm)).map(item => {
              const regex = new RegExp(this.value, 'gi');
              const cityName = item.city.replace(regex, `<span class="hl">${this.value}</span>`);


              return(
                <li key={item.latitude}>
                  <span className="name">{item.city}, {item.state}</span>
                  <span className="population">{item.population}</span>
                </li>
              )
            })
          }
          </ul>
        </form>
      </div>
    )
  }
}

export default TypeAhead;
