import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  }, {
    title: 'Redux',
    url: 'https://github.come/reactjs/redux',
    author: 'Dan Abramov, Andrew Clack',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];


// The following function could be updated to the following ES6 syntax:
//const isSearched = (searchTerm) => (item) =>
//!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
function isSearched(searchTerm) {
  return function(item) {
    // code to return true or false
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTerm: '',
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const unmatchedId = item => item.objectID !== id;
    const updatedLIst = this.state.list.filter(unmatchedId);
    this.setState({ list: updatedLIst });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, list } = this.state;

    return (
      <div className="App">
        <form>
          <input
            type="text"
            value={searchTerm}
            onChange={this.onSearchChange}
          />
        </form>
        {
          list.filter(isSearched(searchTerm)).map(item => {
            return(
              // Note: Don't use an array index which isn't a stable value.
              // React will have a hard time identifying the items if their order changes.
              // Use a stable value (e.g. objectID) returns from the data itself.
              <div key={item.objectID}>
                <span><a href={item.url}>{item.title}</a></span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
                <span>
                  <button
                    onClick={() => this.onDismiss(item.objectID)}
                    type="botton"
                  >
                    Dismiss
                  </button>
                </span>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
