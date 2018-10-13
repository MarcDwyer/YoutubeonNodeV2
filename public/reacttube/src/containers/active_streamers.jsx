import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getActiveStreams, currentStream} from '../actions/index';
import VideoPlayer from '../containers/videoplayer';

class ActiveStreams extends Component {
    state = {

        currentVideo: null,

    }
    componentDidUpdate(prevProps) {
        if (prevProps.streamerData !== this.props.streamerData) {
            const activeStreamsx = this.props.streamerData.filter((streamer) => streamer.items.length > 0).map(name => name.name);
            this.props.getActiveStreams(activeStreamsx);
        }

    }

    render() {
        return (
            <div>
            <div className="container">
            <div className='row row2'>
            <div className="col s12">{''}</div>
            <h5>Active Streamers</h5>
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
        const imageUrl = snippet.thumbnails.high.url;
        const viewerCount = stream.items[0].liveStreamingDetails.concurrentViewers;

        const vidId = stream.items[0].id
           return (
            <div className="col s12 m6 l3">
              <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
         <img className="activator" src={imageUrl} />
     </div>
     <div className="card-content">
      <span className="card-title activator">{newName} <span className="viewercount">{viewerCount + ' Viewers'}</span> <i className="material-icons right">more_vert</i></span>
      <p className="mt"><a onClick={(e) => this.onClick(e, vidId, stream)} className="purple lighten-2 btn-small focusme" href="#">Watch Now</a></p>
      <span></span>
    </div>
    <div className="card-reveal">
      <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
      <p className="grey-text text-darken-4">Here is some more information about this product that is only revealed once clicked on.</p>
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
export default connect(getProps, {getActiveStreams, currentStream})(ActiveStreams);