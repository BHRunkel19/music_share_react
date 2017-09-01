import React, {Component} from 'react';

export default class PlayListForm extends Component {
  constructor(props) {
    super(props);

    this.handleUserName = this.handleUserName.bind(this);
    this.handleSongArtist = this.handleSongArtist.bind(this);
    this.handleSongTitle = this.handleSongTitle.bind(this);
    this.handleSongNotes = this.handleSongNotes.bind(this);

    this.state = {
      userName: " ",
      songArtist: " ",
      songTitle: " ",
      songNotes: " "
    }
  }

  handleUserName(event) {
    this.setState({userName: event.target.value});
  }

  handleSongArtist(event) {
    this.setState({songArtist: event.target.value});
  }

  handleSongTitle(event) {
    this.setState({songTitle: event.target.value});
  }

  handleSongNotes(event) {
    this.setState({songNotes: event.target.value})
  }

  //function used to add to dynamic list
  addToList = (e) => {
    e.preventDefault();
    this.setState({userName: e.target.value, songTitle: e.target.value, songArtist: e.target.value, songNotes: e.target.value});
    let listItem = JSON.stringify(this.state);

    fetch("https://tiny-lasagna-server.herokuapp.com/collections/playlisting", {
      method: "POST",
      body: listItem,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response, "yay");

    }).catch(err => {
      console.log(err, "boo!");
    });
    this.setState({userName: '', songNotes: '', songArtist: '', songTitle: ''});
  }

  //fetch the data and set state of new songs
  componentDidMount() {
    fetch('https://tiny-lasagna-server.herokuapp.com/collections/playlisting').then(results => {
      return results.json();
    }).then(data => {
      this.setState({songs: data});
      console.log("state", this.state.songs);
    })
  }

  render() {
    return (
      <form className="col-md-6">
        <div className="form-group">
          <label htmlFor="username">User Name:
          </label>
          <input type="text" name="userName" onChange={this.handleUserName} value={this.state.userName} className="form-control" placeholder="Name or User Name"/>
        </div>
        <div className="form-group">
          <label htmlFor="songArtist">Artist/Brand:
          </label>
          <input type="text" name="songArtist" onChange={this.handleSongArtist} value={this.state.songArtist} className="form-control" placeholder="Artist or Band Name"/>
        </div>
        <div className="form-group">
          <label htmlFor="songTitle">Song Title:
          </label>
          <input type="text" name="songTitle" value={this.state.songTitle} className="form-control" placeholder="Song Title" onChange={this.handleSongTitle} />
        </div>
        <div className="form-group">
          <label htmlFor="songNotes">Notes about Song:
          </label>
          <input type="textarea" name="songNotes" onChange={this.handleSongNotes} value={this.state.songNotes} className="form-control song_notes"/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn submit-btn form-control" onClick={this.addToList}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}
