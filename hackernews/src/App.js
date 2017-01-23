import React, { Component } from 'react';
import './App.css';
import Button from './Button';

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
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        >
          Search
        </Search>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange, children } = this.props;
    return (
      <form>
        {children} <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    )
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        { list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)}>
                Dismiss
              </Button>
            </span>
          </div>
        )}
      </div>
    );
  }
}



export default App;
