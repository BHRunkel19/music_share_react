import React, {Component} from 'react';

import PlayListItem from './PlayListItem.js';

export default class PlayList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: []
    }

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    fetch('https://tiny-lasagna-server.herokuapp.com/collections/playlisting').then(results => {
      return results.json();
    }).then(data => {
      this.setState({songs: data});
      // console.log("state", this.state.songs);
    })
  }

  fetchData(event){
    event.preventDefault();
    fetch('https://tiny-lasagna-server.herokuapp.com/collections/playlisting').then(results => {
      return results.json();
    }).then(data => {
      this.setState({songs: data});
    });
  };

  render() {
    return (
      <div className="col-md-6">
        <button type="submit" className="btn update-btn form-control" onClick={this.fetchData}>
          Update
        </button>
        <PlayListItem songs={this.state.songs}/>
      </div>
    );
  }
}
