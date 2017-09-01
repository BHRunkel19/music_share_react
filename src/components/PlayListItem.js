import React, {Component} from 'react';

export default class PlayListItem extends Component {
  render() {
    let boxes = this.props.songs.map( song => {
     return (
         <ul className="box song-box" key={song._id}>
           <li>
             <span className="desc">User:</span><span className="tunes"> {song.userName}</span>
           </li>
           <li>
             <span className="desc">Artist/Band:</span><span className="tunes"> {song.songArtist}</span>
           </li>
           <li>
             <span className="desc">Title:</span><span className="tunes"> {song.songTitle}</span>
           </li>
           <li>
             <span className="desc col-md-1">Notes:</span><span className="tunes"> {song.songNotes}</span>
           </li>
         </ul>
       );
     });
     return (
       <div className="boxes">
         {boxes}
       </div>
     );
   }
 }
