import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getActiveStreams, currentStream, getFeatured} from '../actions/index';
import VideoPlayer from '../containers/videoplayer';
import uuid from 'uuid';

class ActiveStreams extends Component {

    componentDidMount() {
      const {getActiveStreams} = this.props;
      getActiveStreams();
      this.interval = setInterval(getActiveStreams, 30000)

    }
    componentDidUpdate(prevProps) {
        if (this.props.activeStreamers.length > 0) {
          const sortedViewers = this.props.activeStreamers.sort((a, b) => +a.items[0].liveStreamingDetails.concurrentViewers < +b.items[0].liveStreamingDetails.concurrentViewers ? 1 : -1);
          this.props.getFeatured(sortedViewers[0]);
        }
    }

    render() {

        return (
            <div>
              <div className="container bordertopme">
                <div className='row row2'>
                  <div className="col s12">{''}</div>
                  <h4 className="fontme">Active Streamers</h4>
                  {this.props.activeStreamers.length > 0 ? this.renderActive() : ''}
                </div>
              </div>
              <VideoPlayer onRef={ref => (this.child = ref)} />
            </div>
        );



    }
    renderActive() {
    const {activeStreamers} = this.props;
    const filterUndefined = activeStreamers.filter(item => item.items[0].liveStreamingDetails.concurrentViewers);

    const sortedViewers = filterUndefined.sort((a, b) => +a.items[0].liveStreamingDetails.concurrentViewers < +b.items[0].liveStreamingDetails.concurrentViewers ? 1 : -1);


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
                  <p className="mt"><a onClick={(e) => this.onClick(e, vidId, stream)} className="purple lighten-2 btn-small focusme">Watch</a></p>
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
        if ( window.innerWidth <= 600) {
          const youtubeLink = `https://www.youtube.com/watch?v=${vidid}`;
          const win = window.open(youtubeLink, '_blank');
          win.focus();
          return;
        };
        this.props.currentStream(stream);
        this.child.toggle(vidid);
     }
    }


function getProps({streamerData, activeStreamers}) {
   return {
        activeStreamers
   }
}
export default connect(getProps, {getActiveStreams, currentStream, getFeatured})(ActiveStreams);
