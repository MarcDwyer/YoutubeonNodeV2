import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getActiveStreams, currentStream, getFeatured} from '../actions/index';
import VideoPlayer from '../containers/videoplayer';
import uuid from 'uuid';

class ActiveStreams extends Component {
    state = {
        currentVideo: null
    }
    componentDidUpdate(prevProps) {
        if (prevProps.streamerData !== this.props.streamerData) {
            const activeStreamsx = this.props.streamerData.filter((streamer) => streamer.items.length > 0).map(name => name.name);
            this.props.getActiveStreams(activeStreamsx);
        }
        if (this.props.activeStreamers.length > 0) {
          const sortedViewers = this.props.activeStreamers.sort((a, b) => +a.items[0].liveStreamingDetails.concurrentViewers < +b.items[0].liveStreamingDetails.concurrentViewers ? 1 : -1);
          this.props.getFeatured(sortedViewers[0]);
        }
    

    }

    render() {
        return (
            <div>
              <div className="container">
                <div className='row row2'>
                  <div className="col s12">{''}</div>
                  <h5 className="fontme">Active Streamers</h5>
                  {this.props.activeStreamers.length > 0 ? this.renderActive() : ''}
                </div>
              </div>
              <VideoPlayer onRef={ref => (this.child = ref)} videoId={this.state.currentVideo} />
           </div>
        );



    }
    renderActive() {
    const {activeStreamers} = this.props;
    const sortedViewers = activeStreamers.sort((a, b) => +a.items[0].liveStreamingDetails.concurrentViewers < +b.items[0].liveStreamingDetails.concurrentViewers ? 1 : -1);
    

  return sortedViewers.map((stream) => {
        const newName = stream.name.charAt(0).toUpperCase() + stream.name.slice(1);
        const {snippet} = stream.items[0];
        const imageUrl = snippet.thumbnails.maxres ? snippet.thumbnails.maxres.url : snippet.thumbnails.high.url;
        const viewerCount = stream.items[0].liveStreamingDetails.concurrentViewers;
        const vidId = stream.items[0].id
           return (
            <div key={uuid()} className="col s12 m6 l4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={imageUrl} />
                </div>
                <div className="card-content">
                  <span className="card-title activator">{newName} <i className="material-icons right">more_vert</i></span>
                  <span className="viewercount">{viewerCount + ' Viewers'}</span>
                  <p className="mt"><a onClick={(e) => this.onClick(e, vidId, stream)} className="purple lighten-2 btn-small focusme" href="#">Watch Now</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title ">{snippet.title}<i className="material-icons right closer">close</i></span>
                  <p>{snippet.description}</p>
                </div>
              </div>
            </div>
           );
       })
    }
     onClick = (e, vidid, stream) => {
        this.props.currentStream(stream);
        this.child.toggle(vidid);
     }
    }


function getProps({streamerData, activeStreamers}) {
   return {
    streamerData,
    activeStreamers
   }
}
export default connect(getProps, {getActiveStreams, currentStream, getFeatured})(ActiveStreams);
