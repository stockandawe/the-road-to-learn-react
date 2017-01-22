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
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
    }
  }

  render() {
    return (
      <div className="App">
        {
          this.state.list.map(item => {
            return(
              // Note: Don't use an array index which isn't a stable value.
              // React will have a hard time identifying the items if their order changes.
              // Use a stable value (e.g. objectID) returns from the data itself.
              <div key={item.objectID}>
                <span><a href={item.url}>{item.title}</a></span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
